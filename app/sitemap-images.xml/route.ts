import { getProductIndex } from "@/lib/data/catalog";
import { DEFAULT_LOCALE, siteUrl } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/seo/metadata";

// Image sitemap for product photos (Google Images, Bing Images). Kept apart
// from /sitemap.xml so neither file grows past a comfortable size.
export const dynamic = "force-static";
export const revalidate = 3600;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const abs = (url: string) => (url.startsWith("http") ? url : `${siteUrl()}${url}`);

export async function GET() {
  const products = await getProductIndex();
  const body = products
    .filter((p) => p.images.length)
    .map(
      (p) =>
        `<url><loc>${esc(absoluteUrl(DEFAULT_LOCALE, `/products/${p.slug}`))}</loc>${p.images
          .slice(0, 10)
          .map((img) => `<image:image><image:loc>${esc(abs(img))}</image:loc></image:image>`)
          .join("")}</url>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
