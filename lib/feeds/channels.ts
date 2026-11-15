import { feedItems, type FeedItem } from "./items";
import { pinterestItems } from "./pinterest";
import { connexityTsv, glamiXml, googleRss, idealoCsv, microsoftTsv } from "./formats";

/**
 * Every marketplace / shopping channel, built from the same product data.
 * Served at /feeds/<name>.<ext> and /feeds/<name>.<ext>.gz (see docs/feeds.md).
 */
export type Channel = {
  name: string;
  ext: "xml" | "csv" | "tsv" | "txt";
  /** Landing-page language: decides link, text and currency (en = USD, de = EUR). */
  locale: "en" | "de";
  render: (items: FeedItem[]) => string;
  /** Who reads it, for docs and the admin. */
  label: string;
};

const rss = (shipping: boolean) => (items: FeedItem[]) => googleRss(items, { shipping });

export const CHANNELS: Channel[] = [
  { name: "google-merchant", ext: "xml", locale: "en", render: rss(true), label: "Google Merchant Center" },
  { name: "microsoft", ext: "xml", locale: "en", render: rss(true), label: "Microsoft Merchant Center (Bing Shopping)" },
  { name: "microsoft", ext: "txt", locale: "en", render: microsoftTsv, label: "Microsoft Merchant Center, tab-separated" },
  { name: "meta", ext: "xml", locale: "en", render: rss(false), label: "Meta Commerce Manager (Facebook / Instagram)" },
  { name: "pinterest", ext: "xml", locale: "en", render: (items) => googleRss(pinterestItems(items), { shipping: false }), label: "Pinterest Catalogs (in-stock, unaltered pieces only)" },
  { name: "tiktok", ext: "xml", locale: "en", render: rss(false), label: "TikTok Catalog" },
  { name: "lyst", ext: "xml", locale: "en", render: rss(false), label: "Lyst" },
  { name: "connexity", ext: "tsv", locale: "en", render: connexityTsv, label: "Connexity (US comparison shopping)" },
  { name: "kelkoo-de", ext: "xml", locale: "de", render: rss(false), label: "Kelkoo Germany (EUR)" },
  { name: "idealo-de", ext: "csv", locale: "de", render: idealoCsv, label: "idealo.de (EUR)" },
  { name: "glami", ext: "xml", locale: "de", render: glamiXml, label: "GLAMI (EUR)" },
];

const CONTENT_TYPE = { xml: "application/xml; charset=utf-8", csv: "text/csv; charset=utf-8", tsv: "text/tab-separated-values; charset=utf-8", txt: "text/plain; charset=utf-8" };

export const channelFiles = () => CHANNELS.flatMap((c) => [`${c.name}.${c.ext}`, `${c.name}.${c.ext}.gz`]);

export function findChannel(file: string): { channel: Channel; gzip: boolean; contentType: string } | null {
  const gzip = file.endsWith(".gz");
  const base = gzip ? file.slice(0, -3) : file;
  const channel = CHANNELS.find((c) => `${c.name}.${c.ext}` === base);
  return channel ? { channel, gzip, contentType: CONTENT_TYPE[channel.ext] } : null;
}

// Items are loaded once per language and shared by every channel built in the same render.
const cache = new Map<string, Promise<FeedItem[]>>();
export async function buildFeed(channel: Channel): Promise<string> {
  let items = cache.get(channel.locale);
  if (!items) {
    items = feedItems(channel.locale);
    cache.set(channel.locale, items);
    items.finally(() => setTimeout(() => cache.delete(channel.locale), 60_000));
  }
  return channel.render(await items);
}
