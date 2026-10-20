import "server-only";

import { notFound } from "next/navigation";

import { isLocale, type Locale } from "./config";

/** Reads and validates the [locale] route param (404 for unknown locales). */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
