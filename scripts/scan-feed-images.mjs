// Measures every product photo and lists those under 500 × 500 px in
// lib/feeds/small-images.json. Product feeds skip listed photos, because
// Google Merchant Center requires at least 500 × 500 px from 2027.
// New uploads below that size are refused, so this only needs re-running
// after bulk imports that bypass the admin.
//
//   node --env-file=.env.local scripts/scan-feed-images.mjs [https://www.montevane.com]

import { writeFileSync } from "node:fs";
import pg from "pg";
import sharp from "sharp";

const BASE = process.argv[2] ?? "https://www.montevane.com";
const MIN_SIDE = 500;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const { rows } = await pool.query("select main_image_url as main, related_images as related from products");
await pool.end();
const urls = [...new Set(rows.flatMap((r) => [r.main, ...(r.related ?? []).map((i) => i.url)]).filter(Boolean))];
console.log(`Measuring ${urls.length} photos…`);

const small = [];
const failed = [];
let done = 0;
async function worker() {
  while (urls.length) {
    const url = urls.pop();
    try {
      const res = await fetch(url.startsWith("http") ? url : BASE + url);
      if (!res.ok) throw new Error(String(res.status));
      const { width = 0, height = 0 } = await sharp(Buffer.from(await res.arrayBuffer())).metadata();
      if (Math.min(width, height) < MIN_SIDE) small.push(url);
    } catch (error) {
      failed.push(`${url} (${error.message})`);
    }
    if (++done % 1000 === 0) console.log(done);
  }
}
await Promise.all(Array.from({ length: 16 }, worker));

writeFileSync("lib/feeds/small-images.json", JSON.stringify(small.sort(), null, 1) + "\n");
console.log(`${small.length} photos under ${MIN_SIDE} px written to lib/feeds/small-images.json`);
if (failed.length) console.log(`Could not measure ${failed.length}:\n${failed.join("\n")}`);
