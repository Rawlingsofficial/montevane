import { LOCALES, siteUrl } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/seo/metadata";

/**
 * IndexNow tells Bing, Yandex, Seznam, Naver and other participating engines
 * that URLs changed, so they recrawl within minutes instead of days.
 * The key is public by design: it is served at /<key>.txt to prove ownership.
 */
export const INDEXNOW_KEY = "de9756b0e9d52551f086988ee54bc149";

/** Every language version of a storefront path. */
export const allLocaleUrls = (path: string) => LOCALES.map((l) => absoluteUrl(l, path));

/** Submits URLs (only on the live domain; no-op locally and on previews). */
export async function submitIndexNow(urls: string[]): Promise<{ sent: number; status?: number }> {
  const base = siteUrl();
  const host = new URL(base).host;
  if (process.env.VERCEL_ENV !== "production" || !host.endsWith("montevane.com") || urls.length === 0) {
    return { sent: 0 };
  }
  let status: number | undefined;
  // The protocol accepts up to 10,000 URLs per request.
  for (let i = 0; i < urls.length; i += 10_000) {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${base}/${INDEXNOW_KEY}.txt`,
        urlList: urls.slice(i, i + 10_000),
      }),
    }).catch(() => null);
    status = res?.status;
  }
  return { sent: urls.length, status };
}
