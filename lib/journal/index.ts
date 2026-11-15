import { POSTS } from "@/lib/journal/posts/all";
import type { Block, Cluster, Post } from "@/lib/journal/types";

export type { Post } from "@/lib/journal/types";

/** Journal topics, in index order. */
export const TOPICS: { id: Cluster; title: string; description: string }[] = [
  { id: "hermes", title: "Hermès", description: "Buying guides, comparisons and care for the Birkin, Kelly and the wider world of Hermès." },
  { id: "watches", title: "Rare Watches", description: "References, comparisons and collecting advice for Rolex, Patek Philippe, Audemars Piguet and independent watchmaking." },
  { id: "jewelry", title: "Fine Jewelry", description: "Diamonds, coloured stones, grading reports and how to choose fine jewelry with confidence." },
  { id: "buying", title: "Gifts & Buying Advice", description: "Gift guides, delivery, payment, insurance and travel: practical advice for buying and owning luxury pieces." },
];

/** Every article, newest first. Scheduled posts are included; use publishedPosts() for anything public. */
const ALL: Post[] = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

/** Posts whose date has arrived (UTC day). Pages revalidate hourly, so scheduled posts appear on their day. */
export function publishedPosts(now = new Date()): Post[] {
  const today = now.toISOString().slice(0, 10);
  return ALL.filter((p) => p.date <= today);
}

export function getPost(slug: string, now = new Date()): Post | null {
  return publishedPosts(now).find((p) => p.slug === slug) ?? null;
}

/** Up to `n` other published posts, same cluster first. */
export function relatedPosts(post: Post, n = 3): Post[] {
  const others = publishedPosts().filter((p) => p.slug !== post.slug);
  return [...others.filter((p) => p.cluster === post.cluster), ...others.filter((p) => p.cluster !== post.cluster)].slice(0, n);
}

/** The pillar guide a shop page links to (category, plus brand or type for subpages). */
export function guideFor(category: string, sub?: string): Post | null {
  const slug =
    category === "watches"
      ? ({ rolex: "rolex-buying-guide", "patek-philippe": "patek-philippe-buying-guide", "audemars-piguet": "audemars-piguet-royal-oak-guide" } as Record<string, string>)[sub ?? ""] ?? "rolex-buying-guide"
      : category === "jewelry"
        ? "diamond-buying-guide"
        : category === "kelly-bags"
          ? "hermes-kelly-buying-guide"
          : category === "birkin-bags"
            ? "hermes-birkin-buying-guide"
            : "how-to-authenticate-hermes";
  return getPost(slug);
}

/** Rough reading time from all text in the post. */
export function readingMinutes(post: Post): number {
  const text = (b: Block): string => (typeof b === "string" ? b : "list" in b ? b.list.join(" ") : "table" in b ? b.table.rows.flat().join(" ") : "note" in b ? b.note : "");
  const words = [...post.intro, ...post.sections.flatMap((s) => [s.heading, ...s.blocks.map(text)]), ...post.faq.flatMap((f) => [f.q, f.a])].join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
