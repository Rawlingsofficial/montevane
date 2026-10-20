// Site languages. English is served without a prefix (/products) and covers
// both US and UK audiences; German (/de) targets Germany, Austria and
// Switzerland; Uzbek (/uz) targets Uzbekistan.
export const LOCALES = ["en", "de", "uz"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

/** hreflang codes per locale. en is listed for both US and UK. */
export const HREFLANG: Record<Locale, string[]> = {
  en: ["en-US", "en-GB", "en"],
  de: ["de-DE", "de-AT", "de-CH", "de"],
  uz: ["uz-UZ", "uz"],
};

/** Open Graph locale tags. */
export const OG_LOCALE: Record<Locale, string> = { en: "en_US", de: "de_DE", uz: "uz_UZ" };

export const LOCALE_LABEL: Record<Locale, string> = { en: "English", de: "Deutsch", uz: "O'zbekcha" };

/** Path for `path` (always starting with "/") in `locale`. */
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Removes a locale prefix: "/de/products" → "/products". */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (first && isLocale(first)) return `/${rest.join("/")}`;
  return pathname;
}

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}
