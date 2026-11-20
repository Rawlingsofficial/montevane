import { BAG_SUB_CATEGORIES, BRAND_SUBCATEGORIES, brandPath } from "@/lib/catalog/taxonomy";
import { countProducts, getBrandConditions, getBrands, getCategories, getCollections, getLiveModels, getProductIndex, getSubcategories, landingIndexable } from "@/lib/data/catalog";
import { publishedPosts, TOPICS } from "@/lib/journal";
import { DEFAULT_LOCALE, LOCALES, siteUrl, type Locale } from "@/lib/i18n/config";
import { absoluteUrl, languageAlternates } from "@/lib/seo/metadata";

/**
 * Sitemaps. /sitemap.xml is an index pointing at one file per language
 * (/sitemaps/en.xml, …) plus /sitemap-images.xml. A single file with every
 * language and its hreflang links grew past 13 MB and was rebuilt on every
 * request, which crawlers often give up on; the per-language files are a few
 * MB each and served from cache.
 */

type Entry = { path: string; priority: number; lastModified?: Date; locales?: readonly Locale[] };

export const SITEMAP_LOCALES = LOCALES;

async function entries(): Promise<Entry[]> {
  const [products, brands, categories, collections, models] = await Promise.all([
    getProductIndex(),
    getBrands(),
    getCategories(),
    getCollections(),
    getLiveModels(),
  ]);
  const subcategories = await Promise.all(
    categories.map(async (c) => {
      const subs = await getSubcategories(c.slug);
      // Bag landing pages join the sitemap only when indexable (see landingIndexable).
      const total = BAG_SUB_CATEGORIES.has(c.slug) ? await countProducts({ category: c.slug }) : 0;
      const paths = subs.filter((s) => !BAG_SUB_CATEGORIES.has(c.slug) || landingIndexable(s.count, total)).map((s) => `/shop/${c.slug}/${s.slug}`);
      if (!BRAND_SUBCATEGORIES.has(c.slug)) return paths;
      // Each watch brand's New / Pre-Owned page, same rule against the brand's own total.
      const conditions = await Promise.all(
        subs.map(async (s) => (await getBrandConditions(s.slug)).filter((x) => landingIndexable(x.count, s.count)).map((x) => `/shop/${c.slug}/${s.slug}/${x.slug}`))
      );
      return [...paths, ...conditions.flat()];
    })
  );

  return [
    { path: "/", priority: 1 },
    { path: "/products", priority: 0.9 },
    ...categories.map((c) => ({ path: `/shop/${c.slug}`, priority: 0.9 })),
    ...subcategories.flat().map((path) => ({ path, priority: 0.8 })),
    ...models.map((m) => ({ path: `/models/${m.slug}`, priority: 0.9 })),
    ...products.map((p) => ({ path: `/products/${p.slug}`, priority: 0.8, lastModified: p.updatedAt })),
    { path: "/brands", priority: 0.7 },
    // Watch-only brands are already listed as /shop/watches/<brand>.
    ...brands.map((b) => ({ path: brandPath(b.slug, b.categories), priority: 0.7 })).filter((e) => e.path.startsWith("/brands/")),
    { path: "/collections", priority: 0.6 },
    ...collections.map((c) => ({ path: `/collections/${c.slug}`, priority: 0.6 })),
    { path: "/authenticity", priority: 0.6 },
    { path: "/payment-shipping", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/sell", priority: 0.6 },
    { path: "/about", priority: 0.5 },
    { path: "/privacy", priority: 0.2 },
    // Journal articles are English-only.
    { path: "/journal", priority: 0.5, locales: [DEFAULT_LOCALE] },
    ...TOPICS.filter((t) => publishedPosts().some((p) => p.cluster === t.id)).map((t) => ({ path: `/journal/topic/${t.id}`, priority: 0.4, locales: [DEFAULT_LOCALE] as const })),
    ...publishedPosts().map((post) => ({ path: `/journal/${post.slug}`, priority: 0.7, lastModified: new Date(post.updated ?? post.date), locales: [DEFAULT_LOCALE] as const })),
  ];
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Every page in one language, each with its hreflang alternates. */
export async function localeSitemap(locale: Locale): Promise<string> {
  const now = new Date().toISOString();
  const urls = (await entries())
    .filter((e) => (e.locales ?? LOCALES).includes(locale))
    .map(({ path, priority, lastModified, locales = LOCALES }) => {
      const links = Object.entries(languageAlternates(path, locales))
        .map(([lang, href]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${esc(href)}"/>`)
        .join("");
      return `<url><loc>${esc(absoluteUrl(locale, path))}</loc>${links}<lastmod>${lastModified?.toISOString() ?? now}</lastmod><priority>${priority}</priority></url>`;
    });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
}

/** The index Search Console and robots.txt point at. */
export function sitemapIndex(): string {
  const now = new Date().toISOString();
  const files = [...SITEMAP_LOCALES.map((l) => `/sitemaps/${l}.xml`), "/sitemap-images.xml"];
  const body = files.map((f) => `<sitemap><loc>${siteUrl()}${f}</loc><lastmod>${now}</lastmod></sitemap>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}
