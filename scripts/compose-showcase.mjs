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

import { cutout as cutoutFrom } from "./lib/cutout.mjs";

const cutout = (url) => cutoutFrom(url, BASE);

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
