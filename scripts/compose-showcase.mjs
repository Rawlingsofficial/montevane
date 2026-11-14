// Builds the home page tile images ("Shop by Category" and "Featured
// Collections") from real products on the site: each product is cut out of
// its studio background and 1–3 pieces are composed on one ivory canvas with
// soft floor shadows, so a tile reads as a single still life.
//
//   node --env-file=.env.local scripts/compose-showcase.mjs [https://www.montevane.com]
//
// Re-run whenever stock changes a lot. Writes public/images/showcase/*.webp
// and lib/catalog/showcase.json (which products each tile shows).

import { mkdirSync, writeFileSync } from "node:fs";
import pg from "pg";
import sharp from "sharp";

const BASE = process.argv[2] ?? "https://www.montevane.com";
const OUT = "public/images/showcase";
const W = 1200;
const H = 1500;
const IVORY = { r: 250, g: 248, b: 245 };

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const LIVE = `status = 'published' and (published_at is null or published_at <= now()) and main_image_url <> ''`;
const RARE = `(availability_status = 'in_stock') desc, price desc`;
// All-white pieces vanish on the ivory tile (the Himalaya is fine: grey gradient).
const NOT_WHITE = `not (slug ~* '(neige|blanc-|white|craie)' and slug !~* 'himalaya')`;
const inCollection = (c) => `('${c}' = collection_slug or '${c}' = any(collection_slugs))`;

const SLOTS = [
  { id: "category-birkin-bags", n: 2, where: `category_slug = 'birkin-bags' and ${NOT_WHITE}`, order: RARE, vary: "color" },
  { id: "category-kelly-bags", n: 2, where: `category_slug = 'kelly-bags'`, order: RARE, vary: "color" },
  { id: "category-watches", n: 1, where: `category_slug = 'watches' and brand_slug in ('patek-philippe','audemars-piguet','rolex','richard-mille')`, order: RARE, vary: "brand_slug" },
  { id: "category-jewelry", n: 2, where: `category_slug = 'jewelry' and facets->>'piece_type' in ('Necklace', 'Bracelet')`, order: RARE, vary: "facets->>'piece_type'" },
  { id: "category-bag-charms", n: 2, where: `category_slug = 'bag-charms'`, order: RARE, vary: "color" },
  { id: "category-twilly-scarves", n: 2, where: `category_slug = 'twilly-scarves'`, order: RARE, vary: "color" },
  { id: "category-scarves-shawls", n: 2, where: `category_slug = 'scarves-shawls' and slug not like '%tigre-royal%'`, order: RARE, vary: "color" },
  { id: "category-bag-organizers", n: 2, where: `category_slug = 'bag-organizers' and brand_slug = 'baginizer'`, order: RARE, vary: "color" },
  { id: "collection-best-sellers", n: 3, where: inCollection("best-sellers"), order: RARE, vary: "category_slug" },
  { id: "collection-exotic-hermes", n: 3, where: inCollection("exotic-hermes") + ` and ${NOT_WHITE}`, order: RARE, vary: "color" },
  { id: "collection-new-arrivals", n: 3, where: inCollection("new-arrivals"), order: `(availability_status = 'in_stock') desc, created_at desc`, vary: "category_slug" },
  { id: "collection-rare-watches", n: 3, where: inCollection("rare-watches") + ` and brand_slug in ('patek-philippe','audemars-piguet','rolex','richard-mille')`, order: RARE, vary: "brand_slug" },
];

const dist = (d, i, j) => Math.abs(d[i] - d[j]) + Math.abs(d[i + 1] - d[j + 1]) + Math.abs(d[i + 2] - d[j + 2]);

/** Product cut out of its background (flood fill from the edges), trimmed, as RGBA PNG — or null if unusable. */
async function cutout(url) {
  const res = await fetch(BASE + url);
  if (!res.ok) return null;
  const src = sharp(Buffer.from(await res.arrayBuffer())).resize(900, 900, { fit: "inside" }).removeAlpha();
  const { data, info } = await src.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const at = (x, y) => (y * w + x) * 3;

  // Background reference: median of the border.
  const border = [];
  for (let x = 0; x < w; x++) border.push(at(x, 0), at(x, h - 1));
  for (let y = 0; y < h; y++) border.push(at(0, y), at(w - 1, y));
  const lum = (i) => data[i] + data[i + 1] + data[i + 2];
  const ref = border.sort((a, b) => lum(a) - lum(b))[border.length >> 1];
  if (lum(ref) < 3 * 150) return null; // dark backgrounds don't cut cleanly
  const darkest = lum(border[Math.floor(border.length * 0.02)]);
  // Studio backgrounds are neutral (low saturation) and may run as a gradient.
  const isBg = (i) => Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]) < 22 && lum(i) >= darkest - 24;

  const bg = new Uint8Array(w * h);
  const queue = [];
  for (const i of border) {
    const p = i / 3;
    if (!bg[p] && isBg(i)) { bg[p] = 1; queue.push(p); }
  }
  while (queue.length) {
    const p = queue.pop();
    const x = p % w;
    const y = (p / w) | 0;
    for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const q = ny * w + nx;
      if (bg[q]) continue;
      if (isBg(q * 3) && dist(data, q * 3, p * 3) < 16) { bg[q] = 1; queue.push(q); }
    }
  }

  // Enclosed background (inside a necklace loop or a handle): large patches
  // the fill couldn't reach that are almost exactly the background colour.
  const near = (i) => dist(data, i, ref) < 18;
  const seen = new Uint8Array(w * h);
  for (let start = 0; start < w * h; start++) {
    if (bg[start] || seen[start] || !near(start * 3)) continue;
    const region = [start];
    seen[start] = 1;
    for (let k = 0; k < region.length; k++) {
      const p = region[k], x = p % w, y = (p / w) | 0;
      for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const q = ny * w + nx;
        if (!bg[q] && !seen[q] && near(q * 3)) { seen[q] = 1; region.push(q); }
      }
    }
    if (region.length > w * h * 0.004) for (const p of region) bg[p] = 1;
  }

  // Foreground sanity: a real object, not touching the frame (cropped product).
  let fg = 0, minX = w, minY = h, maxX = 0, maxY = 0, edge = 0, bottom = 0;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (!bg[y * w + x]) {
        fg++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        // Touching the bottom is fine (the piece stands on the floor line);
        // touching the top or sides means the product is cropped.
        if (y >= h - 2) bottom++;
        else if (x < 2 || y < 2 || x >= w - 2) edge++;
      }
  const share = fg / (w * h);
  if (share < 0.04 || share > 0.8 || edge > (w + h) * 0.01) {
    if (process.env.DEBUG) console.log("  reject", url.split("/").pop(), { share: share.toFixed(2), edge, bottom });
    return null;
  }

  const alpha = Buffer.alloc(w * h);
  for (let p = 0; p < w * h; p++) alpha[p] = bg[p] ? 0 : 255;
  const mask = await sharp(alpha, { raw: { width: w, height: h, channels: 1 } }).blur(1.2).extractChannel(0).raw().toBuffer();
  const rgba = Buffer.alloc(w * h * 4);
  for (let p = 0; p < w * h; p++) {
    rgba[p * 4] = data[p * 3];
    rgba[p * 4 + 1] = data[p * 3 + 1];
    rgba[p * 4 + 2] = data[p * 3 + 2];
    rgba[p * 4 + 3] = mask[p];
  }
  const pad = 4;
  const left = Math.max(0, minX - pad), top = Math.max(0, minY - pad);
  const width = Math.min(w - left, maxX - minX + pad * 2), height = Math.min(h - top, maxY - minY + pad * 2);
  return sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).extract({ left, top, width, height }).png().toBuffer();
}

/** Where each piece sits: centre x, floor y, max width/height (fractions of the canvas). Back pieces first. */
const LAYOUT = {
  1: [{ cx: 0.5, floor: 0.86, mw: 0.74, mh: 0.66 }],
  2: [
    { cx: 0.37, floor: 0.82, mw: 0.56, mh: 0.56 },
    { cx: 0.67, floor: 0.88, mw: 0.48, mh: 0.44 },
  ],
  3: [
    { cx: 0.5, floor: 0.78, mw: 0.5, mh: 0.5 },
    { cx: 0.25, floor: 0.88, mw: 0.42, mh: 0.4 },
    { cx: 0.75, floor: 0.88, mw: 0.42, mh: 0.4 },
  ],
};

async function compose(pieces) {
  const layers = [];
  for (const [i, png] of pieces.entries()) {
    const spot = LAYOUT[pieces.length][i];
    const img = sharp(png).resize(Math.round(spot.mw * W), Math.round(spot.mh * H), { fit: "inside" });
    const buf = await img.toBuffer();
    const { width, height } = await sharp(buf).metadata();
    const left = Math.round(spot.cx * W - width / 2);
    const top = Math.round(spot.floor * H - height);
    // Soft floor shadow under the piece.
    const sw = Math.round(width * 0.9), sh = Math.max(24, Math.round(H * 0.035));
    const shadow = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${sw + 80}" height="${sh + 80}"><ellipse cx="${(sw + 80) / 2}" cy="${(sh + 80) / 2}" rx="${sw / 2}" ry="${sh / 2}" fill="rgba(60,45,30,0.22)"/></svg>`))
      .blur(18)
      .png()
      .toBuffer();
    layers.push({ input: shadow, left: Math.round(spot.cx * W - (sw + 80) / 2), top: Math.round(spot.floor * H - (sh + 80) / 2 - sh * 0.15) });
    layers.push({ input: buf, left, top });
  }
  return sharp({ create: { width: W, height: H, channels: 3, background: IVORY } })
    .composite(layers)
    .webp({ quality: 84 })
    .toBuffer();
}

mkdirSync(OUT, { recursive: true });
let manifest = {};
try {
  manifest = JSON.parse((await import("node:fs")).readFileSync("lib/catalog/showcase.json", "utf8"));
} catch {}
for (const slot of SLOTS.filter((s) => !process.env.ONLY || process.env.ONLY.split(',').includes(s.id))) {
  const { rows } = await pool.query(`select slug, name, main_image_url as url, ${slot.vary} as v from products where ${LIVE} and ${slot.where} order by ${slot.order} limit 120`);
  const picked = [];
  const used = new Set();
  const tried = new Map();
  // First pass keeps pieces varied (brand, colour, type); the second fills any gap.
  for (const strict of [true, false]) {
    for (const r of rows) {
      if (picked.length >= slot.n) break;
      if (picked.some((p) => p.slug === r.slug) || (strict && used.has(r.v))) continue;
      if (!tried.has(r.slug)) tried.set(r.slug, await cutout(r.url).catch(() => null));
      const png = tried.get(r.slug);
      if (!png) continue;
      used.add(r.v);
      picked.push({ ...r, png });
    }
  }
  if (!picked.length) {
    console.log(slot.id.padEnd(28), "no usable photos");
    continue;
  }
  writeFileSync(`${OUT}/${slot.id}.webp`, await compose(picked.map((p) => p.png)));
  manifest[slot.id] = picked.map((p) => ({ slug: p.slug, name: p.name }));
  console.log(slot.id.padEnd(28), picked.map((p) => p.slug).join(" | "));
}
writeFileSync("lib/catalog/showcase.json", JSON.stringify(manifest, null, 2) + "\n");
await pool.end();
