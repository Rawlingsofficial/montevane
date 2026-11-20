// Builds the storefront's banners from real products on the site: each piece
// is cut out of its studio photo and set on a stone plinth in a quiet gallery
// (warm wall, soft floor, a downlight over every piece, floor shadows). Every
// scene is rendered twice — wide for desktop with room for text on the left,
// tall for phones with room for text on top — so nothing important is cropped.
// It also writes detail crops ("loupe" shots) cut from the product photos.
//
//   node --env-file=.env.local scripts/compose-gallery.mjs [https://www.montevane.com]
//   ONLY=home-hero,cat-birkin-bags node --env-file=.env.local scripts/compose-gallery.mjs
//
// Writes public/images/gallery/<id>.webp, <id>_m.webp and lib/catalog/gallery.json
// (which products each scene shows — used for alt text). Re-run when stock changes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import pg from "pg";
import sharp from "sharp";

import { cleanCutout, cutout } from "./lib/cutout.mjs";

const BASE = process.argv[2] ?? "https://www.montevane.com";
const OUT = "public/images/gallery";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 60000, max: 2 });
// The database link is flaky from some networks: retry a query a few times.
const pool = {
  async query(sql) {
    for (let i = 0; ; i++) {
      try {
        return await db.query(sql);
      } catch (e) {
        if (i >= 4) throw e;
        await new Promise((r) => setTimeout(r, 3000 * (i + 1)));
      }
    }
  },
  end: () => db.end(),
};

const LIVE = `status = 'published' and (published_at is null or published_at <= now()) and main_image_url <> ''`;
const RARE = `(availability_status = 'in_stock') desc, price desc`;
// All-white pieces vanish on the ivory set (the Himalaya is fine: grey gradient).
const NOT_WHITE = `not (slug ~* '(neige|blanc-|white|craie|gris-perle)' and slug !~* 'himalaya')`;
const inCollection = (c) => `('${c}' = collection_slug or '${c}' = any(collection_slugs))`;
const TOP_WATCH = `category_slug = 'watches' and brand_slug in ('patek-philippe','audemars-piguet','rolex','richard-mille','fp-journe')`;

// ---------------------------------------------------------------- pieces

/** Named queries a scene can draw from. `vary` keeps a scene's pieces different from each other. */
const POOLS = {
  birkin: { where: `category_slug = 'birkin-bags' and ${NOT_WHITE}`, vary: "color" },
  kelly: { where: `category_slug = 'kelly-bags' and ${NOT_WHITE}`, vary: "color" },
  watch: { where: TOP_WATCH, vary: "brand_slug" },
  necklace: { where: `category_slug = 'jewelry' and facets->>'piece_type' = 'Necklace'`, vary: "slug" },
  bracelet: { where: `category_slug = 'jewelry' and facets->>'piece_type' = 'Bracelet'`, vary: "slug" },
  ring: { where: `category_slug = 'jewelry' and facets->>'piece_type' = 'Ring'`, vary: "slug" },
  earrings: { where: `category_slug = 'jewelry' and facets->>'piece_type' = 'Earrings'`, vary: "slug" },
  charm: { where: `category_slug = 'bag-charms'`, vary: "color" },
  twilly: { where: `category_slug = 'twilly-scarves'`, vary: "color" },
  scarf: { where: `category_slug = 'scarves-shawls' and slug not like '%tigre-royal%'`, vary: "color" },
  organizer: { where: `category_slug = 'bag-organizers'`, vary: "color" },
  exotic: { where: `${inCollection("exotic-hermes")} and ${NOT_WHITE}`, vary: "color" },
  hss: { where: `${inCollection("hss-special-order")} and ${NOT_WHITE}`, vary: "color" },
  custom: { where: `${inCollection("custom-rare")} and ${NOT_WHITE}`, vary: "color" },
  limited: { where: `${inCollection("limited-edition")} and ${NOT_WHITE}`, vary: "color" },
  preowned: { where: `category_slug in ('birkin-bags','kelly-bags') and condition <> 'new' and ${NOT_WHITE}`, vary: "color" },
  newbag: { where: `category_slug in ('birkin-bags','kelly-bags') and condition = 'new' and ${NOT_WHITE}`, vary: "color" },
  arrival: { where: `${inCollection("new-arrivals")}`, vary: "category_slug", order: `(availability_status = 'in_stock') desc, created_at desc` },
  bestseller: { where: `${inCollection("best-sellers")} and ${NOT_WHITE}`, vary: "category_slug" },
  rarewatch: { where: `${inCollection("rare-watches")} and ${TOP_WATCH}`, vary: "brand_slug" },
  classic: { where: `${inCollection("classic-heritage")} and ${NOT_WHITE}`, vary: "color" },
};

// ---------------------------------------------------------------- layouts

// A slot: plinth centre x, plinth width, plinth top y and base y (fractions of
// the canvas), and the piece's max width/height. Back slots first. Desktop
// layouts keep the left ~42% clear for text; mobile layouts keep the top clear.
const SLOT = (cx, pw, top, base, mw, mh) => ({ cx, pw, top, base, mw, mh });

const LAYOUTS = {
  // Three icons: a Birkin centre stage, a Kelly to its right, a watch raised on a tall slim plinth.
  trio: {
    desktop: { w: 2400, h: 1350, horizon: 0.74, slots: [SLOT(0.58, 0.075, 0.5, 0.86, 0.09, 0.2), SLOT(0.73, 0.2, 0.62, 0.9, 0.19, 0.4), SLOT(0.88, 0.13, 0.7, 0.93, 0.13, 0.27)] },
    // Phones crop the sides (cover-fit on a ~1:2 screen), so the pieces stay within the middle ~75%.
    mobile: { w: 1080, h: 1700, horizon: 0.8, slots: [SLOT(0.25, 0.14, 0.64, 0.9, 0.15, 0.13), SLOT(0.52, 0.32, 0.72, 0.94, 0.32, 0.24), SLOT(0.79, 0.2, 0.78, 0.96, 0.2, 0.15)] },
  },
  pair: {
    desktop: { w: 2400, h: 960, horizon: 0.72, slots: [SLOT(0.65, 0.19, 0.6, 0.88, 0.19, 0.52), SLOT(0.85, 0.15, 0.68, 0.93, 0.15, 0.42)] },
    mobile: { w: 1080, h: 810, horizon: 0.72, slots: [SLOT(0.36, 0.34, 0.57, 0.88, 0.34, 0.44), SLOT(0.7, 0.26, 0.66, 0.93, 0.27, 0.33)] },
  },
  single: {
    desktop: { w: 2400, h: 960, horizon: 0.72, slots: [SLOT(0.74, 0.22, 0.62, 0.9, 0.22, 0.54)] },
    mobile: { w: 1080, h: 810, horizon: 0.72, slots: [SLOT(0.5, 0.42, 0.6, 0.9, 0.42, 0.5)] },
  },
  row: {
    desktop: { w: 2400, h: 960, horizon: 0.72, slots: [SLOT(0.55, 0.125, 0.62, 0.86, 0.12, 0.42), SLOT(0.715, 0.155, 0.57, 0.9, 0.15, 0.5), SLOT(0.875, 0.125, 0.66, 0.92, 0.12, 0.4)] },
    mobile: { w: 1080, h: 810, horizon: 0.72, slots: [SLOT(0.2, 0.25, 0.62, 0.86, 0.24, 0.36), SLOT(0.5, 0.3, 0.56, 0.9, 0.29, 0.42), SLOT(0.8, 0.25, 0.65, 0.93, 0.24, 0.32)] },
  },
  // Social share card (1200×630): centred, no text area.
  share: {
    desktop: { w: 1200, h: 630, horizon: 0.74, slots: [SLOT(0.3, 0.1, 0.5, 0.86, 0.1, 0.22), SLOT(0.52, 0.26, 0.56, 0.9, 0.25, 0.44), SLOT(0.76, 0.17, 0.64, 0.93, 0.17, 0.31)] },
  },
};

// The home hero's three icons, picked by hand (the most recognisable pieces in stock).
const HERO = {
  birkin: "hermes-birkin-35-diamond-blanc-himalaya-matte-crocodile-limited-edition-bag",
  kelly: "hermes-kelly-mini-ii-sellier-box-calf-rouge-piment-ghw",
  watch: "patek-philippe-nautilus-5976-1g-001-40th-anniversary-18k-white-gold-blue-baguette-diamond",
};

/**
 * Every banner on the site. `pieces` name POOLS, in slot order (back first).
 * `sizes` scales a slot: watch photos are cropped tight, so beside bags they
 * would look oversized.
 */
const SCENES = [
  { id: "home-hero", layout: "trio", pieces: ["watch", "birkin", "kelly"], pins: [HERO.watch, HERO.birkin, HERO.kelly] },
  { id: "share", layout: "share", pieces: ["watch", "birkin", "kelly"], pins: [HERO.watch, HERO.birkin, HERO.kelly] },
  { id: "cat-birkin-bags", layout: "pair", pieces: ["birkin", "birkin"] },
  { id: "cat-kelly-bags", layout: "pair", pieces: ["kelly", "kelly"] },
  { id: "cat-watches", layout: "row", pieces: ["watch", "watch", "watch"] },
  { id: "cat-jewelry", layout: "row", pieces: ["bracelet", "necklace", "ring"] },
  { id: "cat-bag-charms", layout: "row", pieces: ["charm", "charm", "charm"] },
  { id: "cat-twilly-scarves", layout: "row", pieces: ["twilly", "twilly", "twilly"] },
  { id: "cat-scarves-shawls", layout: "pair", pieces: ["scarf", "scarf"] },
  { id: "cat-bag-organizers", layout: "row", pieces: ["organizer", "organizer", "organizer"] },
  { id: "col-exotic-hermes", layout: "row", pieces: ["exotic", "exotic", "exotic"] },
  { id: "col-hss-special-order", layout: "pair", pieces: ["hss", "hss"] },
  { id: "col-custom-rare", layout: "pair", pieces: ["custom", "custom"] },
  { id: "col-limited-edition", layout: "pair", pieces: ["limited", "limited"] },
  { id: "col-pre-owned-hermes", layout: "pair", pieces: ["preowned", "preowned"] },
  { id: "col-new-arrivals", layout: "row", pieces: ["arrival", "arrival", "arrival"] },
  { id: "col-best-sellers", layout: "row", pieces: ["bestseller", "bestseller", "bestseller"] },
  { id: "col-classic-heritage", layout: "pair", pieces: ["classic", "classic"] },
  { id: "col-rare-watches", layout: "row", pieces: ["rarewatch", "rarewatch", "rarewatch"] },
  { id: "col-fine-jewelry", layout: "row", pieces: ["earrings", "necklace", "bracelet"] },
  { id: "hermes", layout: "row", pieces: ["kelly", "birkin", "charm"] },
  // Collections index: a piece from three different collections (its cards show each collection's own scene).
  { id: "collections", layout: "row", pieces: ["exotic", "rarewatch", "classic"], pins: ["hermes-birkin-20-sellier-ombre-varanus-salvator-lizard-palladium-hardware", "rolex-daytona-126595rbow-sapphire-rainbow-bezel-18k-rose-gold-black-sapphire-baguette", "hermes-kelly-25-matte-alligator-gold-ghw"], sizes: [1, 0.6, 1] },
  { id: "new-bags", layout: "pair", pieces: ["newbag", "newbag"] },
  { id: "all-pieces", layout: "row", pieces: ["watch", "birkin", "necklace"], sizes: [0.75, 1, 1] },
  { id: "houses", layout: "row", pieces: ["kelly", "watch", "bracelet"], sizes: [1, 0.65, 1], pins: ["hermes-kelly-25-colormatic-retourne-swift-noir-phw"] },
  { id: "journal", layout: "row", pieces: ["twilly", "birkin", "watch"], sizes: [1, 1, 0.75] },
  { id: "service", layout: "single", pieces: ["birkin"] },
  { id: "contact", layout: "pair", pieces: ["kelly", "watch"], sizes: [1, 0.7], pins: ["hermes-kelly-28-sellier-ostrich-noir-ghw"] },
  { id: "about", layout: "trio", pieces: ["ring", "birkin", "kelly"] },
];

// ---------------------------------------------------------------- rendering

const C = { wallTop: "#f5f0e9", wallLow: "#ece5db", floorTop: "#e6ded2", floorLow: "#efe9e0", plinthTop: "#faf7f2", plinthHi: "#f1ebe2", plinthLo: "#e2d9cc" };

/** Wall, floor, a downlight over each slot, vignette and fine grain — as SVG. */
function room(w, h, horizon, slots) {
  const hy = Math.round(h * horizon);
  const lights = slots
    .map((s, i) => `<radialGradient id="l${i}" cx="${s.cx * w}" cy="${s.top * h - h * 0.2}" r="${Math.max(s.pw * w * 1.6, h * 0.45)}" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#fffdf9" stop-opacity="0.9"/><stop offset="1" stop-color="#fffdf9" stop-opacity="0"/></radialGradient>
      <rect width="${w}" height="${hy}" fill="url(#l${i})"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.wallTop}"/><stop offset="1" stop-color="${C.wallLow}"/></linearGradient>
      <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.floorTop}"/><stop offset="1" stop-color="${C.floorLow}"/></linearGradient>
      <linearGradient id="seam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#3c2d1e" stop-opacity="0.07"/></linearGradient>
      <radialGradient id="vig" cx="0.5" cy="0.45" r="0.75"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#2b2116" stop-opacity="0.1"/></radialGradient>
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    </defs>
    <rect width="${w}" height="${hy}" fill="url(#wall)"/>
    ${lights}
    <rect y="${hy - h * 0.06}" width="${w}" height="${h * 0.06}" fill="url(#seam)"/>
    <rect y="${hy}" width="${w}" height="${h - hy}" fill="url(#floor)"/>
    <rect width="${w}" height="${h}" fill="url(#vig)"/>
    <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.035"/>
  </svg>`;
}

/** A stone plinth: lit top face, front face shaded light-to-dark from the left. */
function plinth(s, w, h, i) {
  const x = (s.cx - s.pw / 2) * w, pw = s.pw * w, ty = s.top * h, d = Math.max(10, h * 0.022), by = s.base * h;
  return `<linearGradient id="pf${i}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.plinthHi}"/><stop offset="0.65" stop-color="${C.plinthHi}"/><stop offset="1" stop-color="${C.plinthLo}"/></linearGradient>
    <linearGradient id="pv${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.18"/><stop offset="1" stop-color="#3c2d1e" stop-opacity="0.08"/></linearGradient>
    <rect x="${x}" y="${ty + d}" width="${pw}" height="${by - ty - d}" fill="url(#pf${i})"/>
    <rect x="${x}" y="${ty + d}" width="${pw}" height="${by - ty - d}" fill="url(#pv${i})"/>
    <rect x="${x}" y="${ty}" width="${pw}" height="${d}" fill="${C.plinthTop}"/>
    <rect x="${x}" y="${ty + d - 1.5}" width="${pw}" height="1.5" fill="#d9cfc1" opacity="0.6"/>`;
}

const blurred = (svg, sigma) => sharp(Buffer.from(svg)).blur(sigma).png().toBuffer();

async function render(layout, pngs, sizes = []) {
  const { w, h, horizon, slots } = layout;
  const layers = [{ input: Buffer.from(room(w, h, horizon, slots)), left: 0, top: 0 }];
  for (const [i, s] of slots.entries()) {
    const png = pngs[i];
    if (!png) continue;
    // Floor shadow cast to the right of the plinth, then the plinth itself.
    const fx = s.cx * w, fy = s.base * h, fw = s.pw * w;
    layers.push({
      input: await blurred(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><ellipse cx="${fx + fw * 0.18}" cy="${fy}" rx="${fw * 0.75}" ry="${h * 0.018}" fill="rgba(60,45,30,0.22)"/></svg>`, 16),
      left: 0,
      top: 0,
    });
    layers.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs></defs>${plinth(s, w, h, i)}</svg>`), left: 0, top: 0 });

    // The piece, standing on the plinth's top face, with a soft contact shadow.
    const k = sizes[i] ?? 1;
    const buf = await sharp(png).resize(Math.round(s.mw * w * k), Math.round(s.mh * h * k), { fit: "inside" }).toBuffer();
    const { width, height } = await sharp(buf).metadata();
    const stand = s.top * h + Math.max(10, h * 0.022) * 0.55;
    layers.push({
      input: await blurred(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><ellipse cx="${fx}" cy="${stand}" rx="${width * 0.46}" ry="${Math.max(6, h * 0.009)}" fill="rgba(50,36,22,0.35)"/></svg>`, 7),
      left: 0,
      top: 0,
    });
    layers.push({ input: buf, left: Math.round(fx - width / 2), top: Math.round(stand - height) });
  }
  return sharp({ create: { width: w, height: h, channels: 3, background: C.wallTop } }).composite(layers).webp({ quality: 84 }).toBuffer();
}

// ---------------------------------------------------------------- loupe crops

/**
 * Detail shots cut from real product photos: the hardware of a bag, the dial
 * of a watch, the stones of a necklace — framed square, at most ~2× zoom so
 * they stay sharp. Used where a page talks about inspecting the details.
 */
const LOUPES = [
  { id: "loupe-hardware", where: `category_slug = 'birkin-bags' and ${NOT_WHITE} and availability_status = 'in_stock'`, frame: { x: 0.5, y: 0.42, size: 0.42 } },
  { id: "loupe-dial", where: `${TOP_WATCH} and availability_status = 'in_stock'`, frame: { x: 0.5, y: 0.5, size: 0.5 } },
  { id: "loupe-stones", where: `category_slug = 'jewelry' and availability_status = 'in_stock'`, frame: { x: 0.5, y: 0.55, size: 0.5 } },
  { id: "loupe-silk", where: `category_slug = 'scarves-shawls'`, frame: { x: 0.5, y: 0.5, size: 0.45 } },
  { id: "loupe-exotic", where: `${inCollection("exotic-hermes")} and ${NOT_WHITE} and availability_status = 'in_stock'`, frame: { x: 0.5, y: 0.62, size: 0.36 } },
];

async function loupe(url, frame) {
  const buf = Buffer.from(await (await fetch(BASE + url)).arrayBuffer());
  const { width, height } = await sharp(buf).metadata();
  const side = Math.round(Math.min(width, height) * frame.size);
  const left = Math.max(0, Math.min(width - side, Math.round(width * frame.x - side / 2)));
  const top = Math.max(0, Math.min(height - side, Math.round(height * frame.y - side / 2)));
  return sharp(buf).extract({ left, top, width: side, height: side }).resize(900, 900).sharpen({ sigma: 0.6 }).webp({ quality: 86 }).toBuffer();
}

// ---------------------------------------------------------------- run

const only = process.env.ONLY?.split(",");
mkdirSync(OUT, { recursive: true });
let manifest = {};
try {
  manifest = JSON.parse(readFileSync("lib/catalog/gallery.json", "utf8"));
} catch {}




const cache = new Map();
// How often each piece already appears in other scenes: the picker prefers
// fresh pieces so banners across the site don't repeat the same few bags.
const seen = new Map();

async function usable(r) {
  if (!cache.has(r.slug)) cache.set(r.slug, await cutout(r.url, BASE, 1100).then((p) => p && cleanCutout(p)).catch(() => null));
  return cache.get(r.slug);
}

async function pieceFrom(name, used, pin) {
  const spec = POOLS[name];
  if (pin) {
    const { rows } = await pool.query(`select slug, name, main_image_url as url from products where ${LIVE} and slug = '${pin}'`);
    const png = rows[0] && (await usable(rows[0]));
    if (png) return take(rows[0], png, name, used, rows[0].slug);
    console.log("  pin not usable:", pin);
  }
  const { rows } = await pool.query(`select slug, name, main_image_url as url, ${spec.vary} as v from products where ${LIVE} and ${spec.where} order by ${spec.order ?? RARE} limit 80`);
  for (const maxSeen of [0, 1, 2, Infinity])
    for (const strict of [true, false])
      for (const r of rows) {
        if (used.slugs.has(r.slug) || (seen.get(r.slug) ?? 0) > maxSeen || (strict && used.vary.has(`${name}:${r.v}`))) continue;
        const png = await usable(r);
        if (png) return take(r, png, name, used, r.v);
      }
  return null;
}

function take(r, png, name, used, v) {
  used.slugs.add(r.slug);
  used.vary.add(`${name}:${v}`);
  seen.set(r.slug, (seen.get(r.slug) ?? 0) + 1);
  return { slug: r.slug, name: r.name, png };
}

for (const scene of SCENES.filter((s) => !only || only.includes(s.id)).sort((a, b) => !!b.pins - !!a.pins)) {
  const used = { slugs: new Set(), vary: new Set() };
  const picked = [];
  for (const [i, name] of scene.pieces.entries()) picked.push(await pieceFrom(name, used, scene.pins?.[i]));
  if (picked.every((p) => !p)) {
    console.log(scene.id.padEnd(24), "no usable photos");
    continue;
  }
  const layout = LAYOUTS[scene.layout];
  const pngs = picked.map((p) => p?.png);
  writeFileSync(`${OUT}/${scene.id}.webp`, await render(layout.desktop, pngs, scene.sizes));
  if (layout.mobile) writeFileSync(`${OUT}/${scene.id}_m.webp`, await render(layout.mobile, pngs, scene.sizes));
  manifest[scene.id] = picked.filter(Boolean).map((p) => ({ slug: p.slug, name: p.name }));
  console.log(scene.id.padEnd(24), picked.map((p) => p?.slug ?? "—").join(" | "));
}

for (const l of LOUPES.filter((s) => !only || only.includes(s.id))) {
  const { rows } = await pool.query(`select slug, name, main_image_url as url from products where ${LIVE} and ${l.where} order by ${RARE} limit 1`);
  if (!rows[0]) continue;
  writeFileSync(`${OUT}/${l.id}.webp`, await loupe(rows[0].url, l.frame));
  manifest[l.id] = [{ slug: rows[0].slug, name: rows[0].name }];
  console.log(l.id.padEnd(24), rows[0].slug);
}

writeFileSync("lib/catalog/gallery.json", JSON.stringify(manifest, null, 2) + "\n");
await pool.end();
