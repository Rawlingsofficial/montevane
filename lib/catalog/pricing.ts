import type { Locale } from "@/lib/i18n/config";

// USD is the base price. German visitors see the EUR price when one is set.
const LOCALE_CURRENCY: Record<Locale, "USD" | "EUR"> = { en: "USD", de: "EUR", uz: "USD" };

export type PriceSource = {
  price: number;
  prices: { GBP?: number; EUR?: number };
  promoPrice: number | null;
  promoStartsAt: Date | null;
  promoEndsAt: Date | null;
};

export function promoActive(p: PriceSource, now = new Date()): boolean {
  if (p.promoPrice == null || p.promoPrice <= 0 || p.promoPrice >= p.price) return false;
  if (p.promoStartsAt && p.promoStartsAt > now) return false;
  if (p.promoEndsAt && p.promoEndsAt < now) return false;
  return true;
}

/** The price to show (and its original price while a promo runs) in the locale's currency. */
export function displayPrice(p: PriceSource, locale: Locale): { currency: string; amount: number; was: number | null } {
  const promo = promoActive(p);
  const wanted = LOCALE_CURRENCY[locale];
  const local = wanted === "EUR" ? p.prices.EUR : undefined;

  if (local) {
    // The promo discount carries over proportionally to the local price.
    const ratio = promo ? p.promoPrice! / p.price : 1;
    return { currency: wanted, amount: Math.round(local * ratio), was: promo ? local : null };
  }
  return { currency: "USD", amount: promo ? p.promoPrice! : p.price, was: promo ? p.price : null };
}

/** Rounds a converted price up to a clean figure (nearest 10). */
export function roundPrice(value: number): number {
  return Math.ceil(value / 10) * 10;
}
