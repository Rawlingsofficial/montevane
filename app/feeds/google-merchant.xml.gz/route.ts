import { gzipSync } from "node:zlib";

import { promoActive } from "@/lib/catalog/pricing";
import { REGION_COUNTRIES, SECURE_COURIER_FROM, shippingRates, type Region } from "@/lib/catalog/shipping";
import { getProducts, type StoreProduct } from "@/lib/data/catalog";
import { siteUrl } from "@/lib/i18n/config";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/metadata";

// Google Merchant Center product feed (RSS 2.0 + g: namespace), fetched on a
// schedule by Merchant Center. Rebuilt hourly so new, sold and repriced pieces
// reach Google without anyone uploading anything. Served gzipped (Merchant
// Center accepts .gz): the plain XML is ~10 MB, over Vercel's response limit.
export const dynamic = "force-static";
export const revalidate = 3600;

/** Shipping is sent for the main markets only; Merchant Center ignores countries a feed doesn't target. */
const FEED_COUNTRIES: Record<Region, string[]> = {
  us: REGION_COUNTRIES.us,
  europe: ["GB", "DE", "FR", "IT", "ES", "NL", "AT", "CH", "IE", "BE"],
  world: ["AE", "CA", "AU", "JP", "SG"],
};

/** Google product taxonomy (text paths are accepted in place of ids). */
const GOOGLE_CATEGORY: Record<string, string> = {
  watches: "Apparel & Accessories > Jewelry > Watches",
  "birkin-bags": "Apparel & Accessories > Handbags, Wallets & Cases > Handbags",
  "kelly-bags": "Apparel & Accessories > Handbags, Wallets & Cases > Handbags",
  "twilly-scarves": "Apparel & Accessories > Clothing Accessories > Scarves & Shawls",
  "scarves-shawls": "Apparel & Accessories > Clothing Accessories > Scarves & Shawls",
  "bag-charms": "Apparel & Accessories > Handbag & Wallet Accessories",
  "bag-organizers": "Apparel & Accessories > Handbag & Wallet Accessories",
};
const JEWELRY_CATEGORY: Record<string, string> = {
  ring: "Apparel & Accessories > Jewelry > Rings",
  earrings: "Apparel & Accessories > Jewelry > Earrings",
  necklace: "Apparel & Accessories > Jewelry > Necklaces",
  pendant: "Apparel & Accessories > Jewelry > Charms & Pendants",
  bracelet: "Apparel & Accessories > Jewelry > Bracelets",
};

const AVAILABILITY: Record<StoreProduct["availability"], string> = {
  in_stock: "in_stock",
  pre_order: "backorder",
  coming_soon: "preorder",
  sold_out: "out_of_stock",
};

const esc = (s: string) =>
  s
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const tag = (name: string, value: string | number | null | undefined) => (value === null || value === undefined || value === "" ? "" : `<g:${name}>${esc(String(value))}</g:${name}>`);
const money = (n: number) => `${n.toFixed(2)} USD`;
const image = (url: string) => (url.startsWith("http") ? url : `${siteUrl()}${url}`);
const plain = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

function category(p: StoreProduct): string {
  if (p.categorySlug === "jewelry") return JEWELRY_CATEGORY[(p.facets.piece_type ?? "").toLowerCase()] ?? "Apparel & Accessories > Jewelry";
  return GOOGLE_CATEGORY[p.categorySlug] ?? "Apparel & Accessories";
}

function item(p: StoreProduct, inTwoWeeks: string): string {
  const promo = promoActive(p);
  const price = promo ? p.promoPrice! : p.price;
  const rates = shippingRates(price);
  const service = price >= SECURE_COURIER_FROM ? "Secure courier" : "Insured express";
  const toOrder = p.availability === "pre_order" || p.availability === "coming_soon";
  const reference = p.facets.reference?.trim();
  const description = plain(p.description || p.shortDescription || p.title).slice(0, 5000);
  const extra = p.images.slice(1, 11);

  const shipping = (Object.keys(FEED_COUNTRIES) as Region[])
    .flatMap((region) =>
      FEED_COUNTRIES[region].map(
        (country) => `<g:shipping><g:country>${country}</g:country><g:service>${service}</g:service><g:price>${money(rates[region])}</g:price></g:shipping>`
      )
    )
    .join("");

  return [
    "<item>",
    tag("id", p.sku),
    `<title>${esc(p.title.slice(0, 150))}</title>`,
    `<description>${esc(description)}</description>`,
    `<link>${esc(absoluteUrl("en", `/products/${p.slug}`))}</link>`,
    tag("image_link", image(p.images[0].url)),
    ...extra.map((img) => tag("additional_image_link", image(img.url))),
    tag("availability", AVAILABILITY[p.availability]),
    toOrder ? tag("availability_date", inTwoWeeks) : "",
    tag("price", money(p.price)),
    promo ? tag("sale_price", money(p.promoPrice!)) : "",
    tag("condition", p.condition === "new" ? "new" : "used"),
    p.showBrand ? tag("brand", p.brand) : "",
    reference ? tag("mpn", reference) : "",
    p.showBrand && reference ? "" : tag("identifier_exists", "no"),
    tag("google_product_category", category(p)),
    tag("product_type", [p.categorySlug.replace(/-/g, " "), p.showBrand ? p.brand : ""].filter(Boolean).join(" > ")),
    tag("age_group", "adult"),
    tag("gender", p.categorySlug === "watches" ? "unisex" : "female"),
    tag("color", p.color),
    tag("material", p.materials.slice(0, 200)),
    tag("min_handling_time", toOrder ? 7 : 1),
    tag("max_handling_time", toOrder ? 14 : 3),
    shipping,
    "</item>",
  ].join("");
}

export async function GET() {
  const products = (await getProducts({ limit: 10_000 })).filter((p) => p.price > 0 && p.images[0]?.url);
  const inTwoWeeks = new Date(Date.now() + 14 * 86_400_000).toISOString().slice(0, 10) + "T12:00:00Z";

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">',
    "<channel>",
    `<title>${esc(SITE_NAME)}</title>`,
    `<link>${siteUrl()}</link>`,
    `<description>${esc(SITE_NAME)} product feed</description>`,
    ...products.map((p) => item(p, inTwoWeeks)),
    "</channel>",
    "</rss>",
  ].join("\n");

  return new Response(new Uint8Array(gzipSync(xml)), {
    headers: { "Content-Type": "application/gzip", "Content-Disposition": 'inline; filename="google-merchant.xml.gz"' },
  });
}
