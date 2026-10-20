import type { MetadataRoute } from "next";

import { getBrands, getCategories, getCollections, getProductIndex } from "@/lib/data/catalog";
import { JOURNAL_POSTS } from "@/lib/constants";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/i18n/config";
import { absoluteUrl, languageAlternates } from "@/lib/seo/metadata";
import { MODELS } from "@/lib/seo/models";

// Regenerated hourly so new products show up without a deploy.
export const revalidate = 3600;

type Entry = { path: string; priority: number; lastModified?: Date; locales?: readonly Locale[] };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, brands, categories, collections] = await Promise.all([
    getProductIndex(),
    getBrands(),
    getCategories(),
    getCollections(),
  ]);

  const entries: Entry[] = [
    { path: "/", priority: 1 },
    { path: "/products", priority: 0.9 },
    ...categories.map((c) => ({ path: `/shop/${c.slug}`, priority: 0.9 })),
    ...MODELS.map((m) => ({ path: `/models/${m.slug}`, priority: 0.9 })),
    ...products.map((p) => ({ path: `/products/${p.slug}`, priority: 0.8, lastModified: p.updatedAt })),
    { path: "/brands", priority: 0.7 },
    ...brands.map((b) => ({ path: `/brands/${b.slug}`, priority: 0.7 })),
    { path: "/collections", priority: 0.6 },
    ...collections.map((c) => ({ path: `/collections/${c.slug}`, priority: 0.6 })),
    { path: "/payment-shipping", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/about", priority: 0.5 },
    { path: "/privacy", priority: 0.2 },
    // Journal articles are English-only.
    { path: "/journal", priority: 0.5, locales: [DEFAULT_LOCALE] },
    ...JOURNAL_POSTS.map((post) => ({ path: `/journal/${post.slug}`, priority: 0.5, locales: [DEFAULT_LOCALE] as const })),
  ];

  // One URL per language, each listing its translations (hreflang).
  return entries.flatMap(({ path, priority, lastModified, locales = LOCALES }) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified: lastModified ?? new Date(),
      priority,
      alternates: { languages: languageAlternates(path, locales) },
    }))
  );
}
