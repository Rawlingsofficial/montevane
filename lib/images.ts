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

// Brand slug → banner asset base. Two houses use short filenames.
export const BRAND_BANNER: Record<string, string> = {
  hermes: "banner_hermes",
  chanel: "banner_chanel",
  "louis-vuitton": "banner_lv",
  loewe: "banner_loewe",
  gucci: "banner_gucci",
  prada: "banner_prada",
  "saint-laurent": "banner_ysl",
  dior: "banner_dior",
  celine: "banner_celine",
  burberry: "banner_burberry",
  givenchy: "banner_givenchy",
  chloe: "banner_chloe",
  // Watch and jewelry houses have no dedicated banner yet.
  rolex: "hero_4",
  "patek-philippe": "hero_4",
  "audemars-piguet": "hero_4",
  cartier: "feature_card_2",
  "van-cleef-arpels": "lifestyle_2",
  "van-cleef-and-arpels": "lifestyle_2",
  tiffany: "lifestyle_2",
  "tiffany-co": "lifestyle_2",
  bvlgari: "lifestyle_2",
};

// Collection slug → cover asset base. Only two dedicated collection banners
// exist, so the other two reuse the feature-card shots.
export const COLLECTION_IMAGE: Record<string, string> = {
  "new-arrivals": "collection_curated",
  "best-sellers": "collection_monochrome",
  "limited-edition": "feature_card_1",
  "classic-heritage": "feature_card_2",
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
