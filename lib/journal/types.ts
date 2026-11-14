// Journal articles (English only). Paragraph strings may contain inline links
// written as [text](/path) or [text](https://…); internal paths are localised
// when rendered.

export type Block = string | { list: string[] } | { table: { head: string[]; rows: string[][] } } | { note: string };

export type Section = { id: string; heading: string; blocks: Block[] };

export type Cluster = "hermes" | "watches" | "jewelry";

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
  /** Asset base name in public/images/web_optimized. */
  image: string;
  intro: string[];
  sections: Section[];
  faq: { q: string; a: string }[];
  sources: { label: string; url: string }[];
  /** Shop pages this guide sends readers to. */
  shop: { label: string; path: string }[];
};
