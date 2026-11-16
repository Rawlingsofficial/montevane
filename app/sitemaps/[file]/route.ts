import { localeSitemap, SITEMAP_LOCALES } from "@/lib/seo/sitemap";
import type { Locale } from "@/lib/i18n/config";

// One sitemap per language (/sitemaps/en.xml, …), listed in /sitemap.xml.
// Built ahead and served from cache; rebuilt hourly for new products.
export const dynamic = "force-static";
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return SITEMAP_LOCALES.map((locale) => ({ file: `${locale}.xml` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const locale = (await params).file.replace(/\.xml$/, "") as Locale;
  if (!SITEMAP_LOCALES.includes(locale)) return new Response("Not found", { status: 404 });
  return new Response(await localeSitemap(locale), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
