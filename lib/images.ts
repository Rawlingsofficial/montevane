// Central mapping of storefront content to the web-optimized assets in
// public/images/web_optimized. Only WebP assets from that folder are used —
// never the raw PNGs.

const DIR = "/images/web_optimized";

export function asset(base: string): string {
  return `${DIR}/${base}.webp`;
}

export const LOGO = {
  wordmark: asset("logo_montevane_wordmark"),
  crest: asset("logo_montevane_crest"),
  full: asset("logo_montevane_full"),
} as const;

export const HERO_IMAGES = ["hero_1", "hero_2", "hero_3", "hero_4"] as const;

// Brand slug → banner asset base. watch_* / jewelry_* are the watch and
// jewelry shots; the rest of the library is Hermès-style bag photography.
export const BRAND_BANNER: Record<string, string> = {
  hermes: "banner_hermes",
  "bag-bestie": "product_interior",
  baginizer: "product_interior",
  rolex: "watch_1",
  "patek-philippe": "watch_2",
  "audemars-piguet": "watch_1",
  cartier: "watch_3",
  "van-cleef-arpels": "jewelry_1",
  "van-cleef-and-arpels": "jewelry_1",
  tiffany: "jewelry_1",
  "tiffany-co": "jewelry_1",
  bvlgari: "jewelry_1",
};

// Category slug → hero asset base (shop pages and the home category tiles).
export const CATEGORY_IMAGE: Record<string, string> = {
  "birkin-bags": "hero_2",
  "kelly-bags": "hero_4",
  watches: "watch_1",
  jewelry: "jewelry_1",
  "bag-charms": "product_45deg",
  "twilly-scarves": "lifestyle_3",
  "scarves-shawls": "lifestyle_1",
  "bag-organizers": "product_interior",
};

export function categoryImage(slug: string): string {
  return CATEGORY_IMAGE[slug] ?? "hero_2";
}

// Collection slug → cover asset base. Only two dedicated collection banners
// exist, so the other two reuse the feature-card shots.
export const COLLECTION_IMAGE: Record<string, string> = {
  "new-arrivals": "collection_curated",
  "best-sellers": "collection_monochrome",
  "limited-edition": "feature_card_1",
  "classic-heritage": "feature_card_2",
  "exotic-hermes": "hero_3",
  "hss-special-order": "feature_card_1",
  "pre-owned-hermes": "lifestyle_1",
  "custom-rare": "product_45deg",
};

// Journal post slug → editorial asset base.
export const JOURNAL_IMAGE: Record<string, string> = {
  "inside-the-atelier": "editorial_setup",
  "brief-history-of-the-quilt": "lifestyle_1",
  "how-to-authenticate-a-luxury-handbag": "product_interior",
  "spring-editorial-pastels-and-patent": "lifestyle_2",
  "the-rise-of-the-micro-bag": "product_45deg",
  "caring-for-your-investment-piece": "feature_card_1",
};

export function brandBanner(slug: string): string {
  return BRAND_BANNER[slug] ?? "hero_2";
}

export function collectionImage(slug: string): string {
  return COLLECTION_IMAGE[slug] ?? "collection_curated";
}

export function journalImage(slug: string): string {
  return JOURNAL_IMAGE[slug] ?? "editorial_setup";
}
