// Journal articles (English only). Paragraph strings may contain inline links
// written as [text](/path) or [text](https://…); internal paths are localised
// when rendered.

/**
 * Live products from the shop. Resolved when the page renders (hourly), so
 * sold pieces drop out by themselves; only in-stock and pre-order pieces show.
 */
export type Picks = {
  brand?: string;
  category?: string;
  /** Every word must match name, brand, reference or tags (same as site search). */
  query?: string;
  /** Jewelry type facet: Ring, Necklace, Bracelet, Earrings, Pendant. */
  piece?: string;
  min?: number;
  max?: number;
  sort?: "newest" | "price_asc" | "price_desc";
  limit?: number;
};

export type Block =
  | string
  | { list: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string }
  /** A row of product cards inside the article, linking to the product pages. */
  | { products: Picks; title?: string }
  /** One of our own photos (public/images/ours), with an optional caption. */
  | { image: { src: string; alt: string; width: number; height: number; caption?: string } };

export type Section = { id: string; heading: string; blocks: Block[] };

export type Cluster = "hermes" | "watches" | "jewelry" | "buying";

export type Post = {
  slug: string;
  /** On-page H1. */
  title: string;
  /** <title> (≤ 60 chars works best). */
  metaTitle: string;
  /** Meta description and card excerpt (≤ 160 chars). */
  description: string;
  category: string;
  cluster: Cluster;
  /** Pillar guides lead their cluster and are linked from the shop pages. */
  pillar?: boolean;
  /** ISO date; the post goes live on this day (scheduled publishing). */
  date: string;
  updated?: string;
  /** Primary keyword: the one search this article is built to answer. */
  keyword: string;
  /** Supporting keywords used naturally in headings and copy. */
  keywords: string[];
  /** Fallback photo: asset base name in public/images/web_optimized. */
  image: string;
  /** Cover photo: a product slug. Defaults to the first of `picks`, then `image`. */
  cover?: string;
  /** Products shown in "Shop this guide" (and the default cover). */
  picks?: Picks;
  intro: string[];
  sections: Section[];
  faq: { q: string; a: string }[];
  sources: { label: string; url: string }[];
  /** Shop pages this guide sends readers to. */
  shop: { label: string; path: string }[];
};
