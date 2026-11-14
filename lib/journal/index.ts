import { post as apRoyalOak } from "@/lib/journal/posts/audemars-piguet-royal-oak-guide";
import { post as diamonds } from "@/lib/journal/posts/diamond-buying-guide";
import { post as birkin } from "@/lib/journal/posts/hermes-birkin-buying-guide";
import { post as kelly } from "@/lib/journal/posts/hermes-kelly-buying-guide";
import { post as authenticate } from "@/lib/journal/posts/how-to-authenticate-hermes";
import { post as patek } from "@/lib/journal/posts/patek-philippe-buying-guide";
import { post as rolex } from "@/lib/journal/posts/rolex-buying-guide";
import { post as birkin2530 } from "@/lib/journal/posts/birkin-25-vs-30";
import { post as gmt } from "@/lib/journal/posts/rolex-gmt-pepsi-vs-batman";
import { post as yellowDiamonds } from "@/lib/journal/posts/fancy-yellow-diamonds";
import { post as dateStamps } from "@/lib/journal/posts/hermes-date-stamp-chart";
import { post as nautilusRoyalOak } from "@/lib/journal/posts/nautilus-vs-royal-oak";
import { post as togoEpsom } from "@/lib/journal/posts/togo-vs-epsom";
import { post as giaReport } from "@/lib/journal/posts/how-to-read-a-gia-report";
import { post as submariner } from "@/lib/journal/posts/rolex-submariner-date-vs-no-date";
import { post as himalaya } from "@/lib/journal/posts/himalaya-birkin";
import { post as fakeRolex } from "@/lib/journal/posts/how-to-spot-a-fake-rolex";
import { post as birkinInvestment } from "@/lib/journal/posts/is-a-birkin-a-good-investment";
import { post as hermesCare } from "@/lib/journal/posts/how-to-care-for-a-hermes-bag";
import type { Block, Post } from "@/lib/journal/types";

export type { Post } from "@/lib/journal/types";

/** Every article, newest first. Scheduled posts are included; use publishedPosts() for anything public. */
const ALL: Post[] = [birkin, kelly, authenticate, rolex, patek, apRoyalOak, diamonds, birkin2530, gmt, yellowDiamonds, dateStamps, nautilusRoyalOak, togoEpsom, giaReport, submariner, himalaya, fakeRolex, birkinInvestment, hermesCare].sort((a, b) => b.date.localeCompare(a.date));

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
  const text = (b: Block): string => (typeof b === "string" ? b : "list" in b ? b.list.join(" ") : "table" in b ? b.table.rows.flat().join(" ") : b.note);
  const words = [...post.intro, ...post.sections.flatMap((s) => [s.heading, ...s.blocks.map(text)]), ...post.faq.flatMap((f) => [f.q, f.a])].join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
