import type { Metadata } from "next";

import { DEFAULT_LOCALE, HREFLANG, LOCALES, OG_LOCALE, localePath, siteUrl, type Locale } from "@/lib/i18n/config";

export const SITE_NAME = "Montévane";
export const DEFAULT_OG_IMAGE = "/images/web_optimized/hero_1.webp";

/** Absolute URL of `path` in `locale`. */
export const absoluteUrl = (locale: Locale, path: string) => `${siteUrl()}${localePath(locale, path)}`;

/** hreflang map for a page that exists at `path` in `locales`. */
export function languageAlternates(path: string, locales: readonly Locale[] = LOCALES): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    for (const code of HREFLANG[locale]) languages[code] = absoluteUrl(locale, path);
  }
  languages["x-default"] = absoluteUrl(locales.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : locales[0], path);
  return languages;
}

/**
 * Metadata for one storefront page: title, description, canonical URL,
 * hreflang alternates for every language the page exists in, Open Graph and
 * Twitter cards. Titles get " | Montévane" from the layout template unless
 * `absoluteTitle` is set.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  locales = LOCALES,
  absoluteTitle = false,
  noindex = false,
  type = "website",
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  locales?: readonly Locale[];
  absoluteTitle?: boolean;
  noindex?: boolean;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(locale, path);
  const images = [{ url: image ?? DEFAULT_OG_IMAGE, alt: title }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path, locales) },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images,
    },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/** Trims to `max` characters on a word boundary (meta descriptions). */
export function truncate(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, clean.lastIndexOf(" ", max - 1))}…`;
}
