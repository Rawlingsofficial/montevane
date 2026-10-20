import de from "./dictionaries/de";
import en, { type Dictionary } from "./dictionaries/en";
import uz from "./dictionaries/uz";
import type { Locale } from "./config";

export * from "./config";
export type { Dictionary };

const DICTIONARIES: Record<Locale, Dictionary> = { en, de, uz };

export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];

/** Fills "{key}" placeholders: fmt("Hi {name}", { name: "Ana" }). */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? `{${key}}`));
}
