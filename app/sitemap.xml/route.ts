import { sitemapIndex } from "@/lib/seo/sitemap";

// Sitemap index: one file per language plus the image sitemap (lib/seo/sitemap.ts).
export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return new Response(sitemapIndex(), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
