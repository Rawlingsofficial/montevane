// Category tree: Hermès categories, Watches › Brand, Jewelry › Type.
// Jewelry types are the `piece_type` facet; watch "subcategories" are brands.

export const JEWELRY_TYPES = [
  { slug: "rings", piece: "Ring" },
  { slug: "necklaces", piece: "Necklace" },
  { slug: "bracelets", piece: "Bracelet" },
  { slug: "earrings", piece: "Earrings" },
  { slug: "pendants", piece: "Pendant" },
] as const;
export type JewelryType = (typeof JEWELRY_TYPES)[number]["slug"];

/** Hermès categories, in menu order. */
export const HERMES_CATEGORIES = ["birkin-bags", "kelly-bags", "bag-charms", "twilly-scarves", "scarves-shawls", "bag-organizers"];

/** Watch brands in menu order; any other live brand follows alphabetically. */
export const WATCH_BRAND_ORDER = [
  "rolex",
  "audemars-piguet",
  "patek-philippe",
  "richard-mille",
  "fp-journe",
  "cartier",
  "vacheron-constantin",
  "franck-muller",
  "hublot",
  "breitling",
  "tudor",
  "omega",
  "panerai",
];

/** Categories whose subcategories are brands (/shop/watches/rolex). */
export const BRAND_SUBCATEGORIES = new Set(["watches"]);

/** Where a brand's own page lives: watch-only brands sit under Watches. */
export function brandPath(slug: string, categories: string[]): string {
  return categories.length === 1 && BRAND_SUBCATEGORIES.has(categories[0]) ? `/shop/${categories[0]}/${slug}` : `/brands/${slug}`;
}

/** Showcase order: Hermès first, then the watch houses in menu order, then everyone else. */
export function brandRank(slug: string): number {
  if (slug === "hermes") return -1;
  const i = (WATCH_BRAND_ORDER as readonly string[]).indexOf(slug);
  return i === -1 ? 1_000 : i;
}
