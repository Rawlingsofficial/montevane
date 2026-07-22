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
};

// Collection slug → cover asset base. Only two dedicated collection banners
// exist, so the other two reuse the feature-card shots.
export const COLLECTION_IMAGE: Record<string, string> = {
  "new-arrivals": "collection_curated",
  "best-sellers": "collection_monochrome",
  "limited-edition": "feature_card_1",
  "classic-heritage": "feature_card_2",
};

// Product slug → card/hero asset base. There is one real product photo set
// (four angles), so cards cycle a curated mix of the product, feature-card,
// and lifestyle shots for visual variety.
export const PRODUCT_IMAGE: Record<string, string> = {
  "hermes-birkin-25-togo": "product_front",
  "chanel-classic-flap-black": "feature_card_1",
  "lv-neverfull-mm-monogram": "feature_card_2",
  "loewe-puzzle-bag-small": "product_45deg",
  "gucci-marmont-small-shoulder": "product_side",
  "prada-re-edition-2005": "product_interior",
  "ysl-loulou-medium": "lifestyle_1",
  "dior-lady-dior-medium": "lifestyle_2",
  "celine-triomphe-canvas": "lifestyle_3",
  "burberry-lola-small": "feature_card_1",
  "givenchy-antigona-small": "product_front",
  "chloe-marcie-bucket": "feature_card_2",
};

// Standard product-detail gallery angles (shared studio set).
export const PRODUCT_GALLERY: { base: string; label: string }[] = [
  { base: "product_45deg", label: "Angle Shot" },
  { base: "product_interior", label: "Detail / Interior" },
  { base: "product_side", label: "Side View" },
  { base: "product_front", label: "Back View" },
];

// Journal post slug → editorial asset base.
export const JOURNAL_IMAGE: Record<string, string> = {
  "inside-the-atelier": "editorial_setup",
  "brief-history-of-the-quilt": "lifestyle_1",
  "how-to-authenticate-a-luxury-handbag": "product_interior",
  "spring-editorial-pastels-and-patent": "lifestyle_2",
  "the-rise-of-the-micro-bag": "lifestyle_3",
  "caring-for-your-investment-piece": "feature_card_1",
};

export function productImage(slug: string): string {
  return PRODUCT_IMAGE[slug] ?? "product_front";
}

export function brandBanner(slug: string): string {
  return BRAND_BANNER[slug] ?? "hero_2";
}

export function collectionImage(slug: string): string {
  return COLLECTION_IMAGE[slug] ?? "collection_curated";
}

export function journalImage(slug: string): string {
  return JOURNAL_IMAGE[slug] ?? "editorial_setup";
}
