// Central mapping of storefront content to the web-optimized assets in
// public/images/web_optimized. Only WebP assets from that folder are used —
// never the raw PNGs.

const DIR = "/images/web_optimized";

export function asset(base: string): string {
  // "gallery/<id>" names a gallery scene; plain names live in web_optimized.
  return base.startsWith("gallery/") ? `/images/${base}.webp` : `${DIR}/${base}.webp`;
}

export const LOGO = {
  wordmark: asset("logo_montevane_wordmark"),
  crest: asset("logo_montevane_crest"),
  full: asset("logo_montevane_full"),
} as const;

// Banners are gallery scenes built from real products (scripts/compose-gallery.mjs,
// public/images/gallery). Every page names its scene here.

/** Category page and mega-menu scene. */
export function categoryImage(slug: string): string {
  return `cat-${slug}`;
}

/** Collection page scene. */
export function collectionImage(slug: string): string {
  return `col-${slug}`;
}

/** Brand page scene: Hermès has its own; other brands show one of their pieces (PageHero cover). */
export function brandBanner(slug: string): string {
  return slug === "hermes" ? "hermes" : "all-pieces";
}

/** Birkin / Kelly landing page (lib/catalog/taxonomy BAG_SUBS) → scene. */
export const BAG_SUB_SCENE: Record<string, string> = {
  "pre-owned": "col-pre-owned-hermes",
  "new-unused": "new-bags",
  "exotic-leather": "col-exotic-hermes",
  hss: "col-hss-special-order",
  "custom-special-order": "col-custom-rare",
  "limited-edition": "col-limited-edition",
};
