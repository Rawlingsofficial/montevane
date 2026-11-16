import { displayPrice, promoActive } from "@/lib/catalog/pricing";
import { REGION_COUNTRIES, SECURE_COURIER_FROM, shippingRates, type Region } from "@/lib/catalog/shipping";
import { getProducts, type StoreProduct } from "@/lib/data/catalog";
import { siteUrl, type Locale } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/seo/metadata";

import smallImages from "./small-images.json";

/**
 * One normalized product record that every channel format is rendered from.
 * Prices and links always match the landing page: USD on English pages, EUR
 * on German pages (every product carries an EUR price).
 */
export type FeedItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  images: string[];
  availability: "in_stock" | "out_of_stock" | "preorder";
  /** True for pieces sourced to order (longer handling time). */
  toOrder: boolean;
  currency: "USD" | "EUR";
  price: number;
  salePrice: number | null;
  condition: "new" | "used";
  brand: string | null;
  mpn: string | null;
  categorySlug: string;
  googleCategory: string;
  /** Human category path, e.g. "Watches > Rolex". */
  categoryPath: string;
  gender: "unisex" | "female";
  color: string;
  material: string;
  /** USD shipping by region (only used for USD feeds). */
  shipping: { region: Region; price: number; service: string }[];
  /** Shipping to the feed's home market (US for USD, Europe for EUR), in the feed currency. */
  homeShipping: number;
  /** Days until dispatch. */
  handling: [min: number, max: number];
};

/** Google product taxonomy (text paths are accepted in place of ids by Google, Microsoft, Meta, Pinterest and TikTok). */
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

const CATEGORY_NAME: Record<string, string> = {
  watches: "Watches",
  "birkin-bags": "Handbags > Birkin",
  "kelly-bags": "Handbags > Kelly",
  "twilly-scarves": "Scarves > Twilly",
  "scarves-shawls": "Scarves",
  "bag-charms": "Bag Accessories > Bag Charms",
  "bag-organizers": "Bag Accessories > Bag Organizers",
  jewelry: "Jewelry",
};

const AVAILABILITY: Record<StoreProduct["availability"], FeedItem["availability"]> = {
  in_stock: "in_stock",
  // Sourced to order: available to buy now, with a longer handling time (7–14 days).
  pre_order: "in_stock",
  coming_soon: "preorder",
  sold_out: "out_of_stock",
};

/**
 * Product photos under 500 × 500 px (Google Merchant Center's minimum from
 * 2027). Feeds skip them; a product left with no photo is dropped from feeds.
 * Uploads below that size are refused, so this list only shrinks. Regenerate
 * with `node --env-file=.env.local scripts/scan-feed-images.mjs`.
 */
const SMALL_IMAGES = new Set<string>(smallImages);
const feedImages = (p: StoreProduct) => p.images.map((i) => i.url).filter((url) => url && !SMALL_IMAGES.has(url));

const image = (url: string) => (url.startsWith("http") ? url : `${siteUrl()}${url}`);
// Strips HTML and stray control characters (they show as broken symbols in feeds).
const plain = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();

function googleCategory(p: StoreProduct): string {
  if (p.categorySlug === "jewelry") return JEWELRY_CATEGORY[(p.facets.piece_type ?? "").toLowerCase()] ?? "Apparel & Accessories > Jewelry";
  return GOOGLE_CATEGORY[p.categorySlug] ?? "Apparel & Accessories";
}

function toItem(p: StoreProduct, locale: Locale): FeedItem {
  const shown = displayPrice(p, locale);
  const usd = promoActive(p) ? p.promoPrice! : p.price;
  const rates = shippingRates(usd);
  const service = usd >= SECURE_COURIER_FROM ? "Secure courier" : "Insured express";
  const toOrder = p.availability === "pre_order" || p.availability === "coming_soon";
  const piece = p.categorySlug === "jewelry" ? p.facets.piece_type : "";

  return {
    id: p.sku,
    title: p.title.slice(0, 150),
    description: plain(p.description || p.shortDescription || p.title).slice(0, 5000),
    link: absoluteUrl(locale, `/products/${p.slug}`),
    images: feedImages(p).slice(0, 11).map(image),
    availability: AVAILABILITY[p.availability],
    toOrder,
    currency: shown.currency as FeedItem["currency"],
    price: shown.was ?? shown.amount,
    salePrice: shown.was ? shown.amount : null,
    condition: p.condition === "new" ? "new" : "used",
    brand: p.showBrand ? p.brand : null,
    mpn: p.facets.reference?.trim() || null,
    categorySlug: p.categorySlug,
    googleCategory: googleCategory(p),
    categoryPath: [CATEGORY_NAME[p.categorySlug] ?? p.categorySlug, piece, p.showBrand ? p.brand : ""].filter(Boolean).join(" > "),
    gender: p.categorySlug === "watches" ? "unisex" : "female",
    color: p.color,
    material: p.materials.slice(0, 200),
    shipping: (Object.keys(rates) as Region[]).map((region) => ({ region, price: rates[region], service })),
    // EUR shipping follows the product's own EUR/USD price ratio.
    homeShipping: shown.currency === "USD" ? rates.us : Math.round(rates.europe * (shown.amount / usd)),
    handling: toOrder ? [7, 14] : [1, 3],
  };
}

/** Every live, priced, photographed product as feed items for one landing-page language. */
export async function feedItems(locale: Locale): Promise<FeedItem[]> {
  const products = await getProducts({ limit: 10_000 }, locale);
  return products.filter((p) => p.price > 0 && feedImages(p).length > 0).map((p) => toItem(p, locale));
}

/** Main shipping markets (Merchant Center ignores countries a feed doesn't target). */
export const FEED_COUNTRIES: Record<Region, string[]> = {
  us: REGION_COUNTRIES.us,
  europe: ["GB", "DE", "FR", "IT", "ES", "NL", "AT", "CH", "IE", "BE"],
  world: ["AE", "CA", "AU", "JP", "SG"],
};
