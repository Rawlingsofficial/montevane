import { and, eq, gte, or, sql } from "drizzle-orm";

import { db, schema } from "@/lib/db";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { publishedPosts } from "@/lib/journal";
import { allLocaleUrls, submitIndexNow } from "@/lib/seo/indexnow";
import { absoluteUrl } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

/**
 * Daily (vercel.json): submits what changed in the last day that no admin
 * save already reported — journal posts going live on their scheduled date,
 * the journal pages listing them, and products whose scheduled publish time
 * arrived or that were edited outside the admin (imports, scripts).
 */
export async function GET(request: Request) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const since = new Date(Date.now() - 25 * 60 * 60 * 1000);
  const sinceDay = since.toISOString().slice(0, 10);
  const posts = publishedPosts().filter((p) => p.date >= sinceDay || (p.updated ?? "") >= sinceDay);

  const p = schema.products;
  const products = await db
    .select({ slug: p.slug })
    .from(p)
    .where(and(eq(p.status, "published"), or(gte(p.updatedAt, since), and(gte(p.publishedAt, since), sql`${p.publishedAt} <= now()`))));

  const urls = [
    ...posts.map((post) => absoluteUrl(DEFAULT_LOCALE, `/journal/${post.slug}`)),
    ...(posts.length
      ? [absoluteUrl(DEFAULT_LOCALE, "/journal"), ...new Set(posts.map((post) => absoluteUrl(DEFAULT_LOCALE, `/journal/topic/${post.cluster}`)))]
      : []),
    ...products.flatMap((row) => allLocaleUrls(`/products/${row.slug}`)),
  ];

  const result = await submitIndexNow(urls);
  return Response.json({ posts: posts.length, products: products.length, ...result });
}
