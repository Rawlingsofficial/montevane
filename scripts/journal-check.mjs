// Checks every journal post: unique slugs, Mon/Wed/Fri dates, title and
// description lengths, internal /journal links, and that each product row has
// live stock. Run: node --env-file=.env.local scripts/journal-check.mjs
import { readdirSync } from "node:fs";
import pg from "pg";
const dir = new URL("../lib/journal/posts/", import.meta.url);
const posts = [];
for (const f of readdirSync(dir).filter((f) => f.endsWith(".ts") && f !== "all.ts")) posts.push((await import(new URL(f, dir).href)).post);
const slugs = new Set(posts.map((p) => p.slug));
const issues = [];
if (slugs.size !== posts.length) issues.push("duplicate slugs");
const c = new pg.Client({ connectionString: process.env.DATABASE_URL }); await c.connect();
async function count(pk) {
  const w = ["status='published'", "(published_at is null or published_at<=now())", "availability_status in ('in_stock','pre_order')"], v = [];
  const add = (sql, val) => { v.push(val); w.push(sql.replace("?", "$" + v.length)); };
  if (pk.brand) add("brand_slug = ?", pk.brand);
  if (pk.category) add("category_slug = ?", pk.category);
  if (pk.piece) add("facets->>'piece_type' = ?", pk.piece);
  if (pk.min != null) add("price >= ?", pk.min);
  if (pk.max != null) add("price < ?", pk.max);
  for (const t of (pk.query ?? "").split(/[\s,]+/).filter(Boolean)) { v.push(`%${t}%`); const n = "$" + v.length; w.push(`(name ilike ${n} or sku ilike ${n} or brand_slug in (select slug from brands where name ilike ${n}) or array_to_string(tags,' ') ilike ${n} or facets->>'reference' ilike ${n})`); }
  return (await c.query(`select count(*)::int n from products where ${w.join(" and ")}`, v)).rows[0].n;
}
const paths = new Set();
const today = new Date().toISOString().slice(0, 10);
for (const p of posts) {
  const day = new Date(p.date + "T00:00:00Z").getUTCDay();
  if (p.date > today && ![1, 3, 5].includes(day)) issues.push(`${p.slug}: ${p.date} not Mon/Wed/Fri`);
  if (p.metaTitle.length > 65) issues.push(`${p.slug}: metaTitle ${p.metaTitle.length}`);
  if (p.description.length > 165) issues.push(`${p.slug}: description ${p.description.length}`);
  const text = JSON.stringify(p);
  for (const m of text.matchAll(/\]\((\/[^)#\s]+)/g)) paths.add(m[1] + "|" + p.slug);
  for (const s of p.shop) paths.add(s.path + "|" + p.slug);
  const picks = [p.picks, ...p.sections.flatMap((s) => s.blocks).filter((b) => b && typeof b === "object" && "products" in b).map((b) => b.products)].filter(Boolean);
  for (const pk of picks) { const n = await count(pk); if (n < 2) issues.push(`${p.slug}: picks ${JSON.stringify(pk)} -> ${n}`); }
}
const dates = {}; for (const p of posts) (dates[p.date] ??= []).push(p.slug);
for (const [d, s] of Object.entries(dates)) if (d > today && s.length > 1) issues.push(`two posts on ${d}: ${s}`);
const other = [];
for (const entry of paths) { const [path, from] = entry.split("|"); if (path.startsWith("/journal/")) { if (!slugs.has(path.slice(9))) issues.push(`${from}: missing post ${path}`); } else other.push(path); }
console.log(posts.length, "posts;", Object.keys(dates).length, "dates");
console.log(issues.join("\n") || "no issues");
console.log("PATHS " + [...new Set(other)].join(" "));
await c.end();
