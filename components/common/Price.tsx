import { promoActive, type PriceSource } from "@/lib/catalog/pricing";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

// Both currencies are rendered; the visitor's choice (html[data-currency]) shows
// one with CSS. Static pages stay static and switching never shifts the layout.

export type PriceAmounts = { usd: number; eur: number | null; usdWas: number | null; eurWas: number | null };

export function priceAmounts(p: PriceSource): PriceAmounts {
  const promo = promoActive(p);
  const ratio = promo ? p.promoPrice! / p.price : 1;
  const eur = p.prices.EUR ?? null;
  return {
    usd: promo ? p.promoPrice! : p.price,
    eur: eur ? Math.round(eur * ratio) : null,
    usdWas: promo ? p.price : null,
    eurWas: promo && eur ? eur : null,
  };
}

const format = (locale: string, currency: string, n: number) =>
  new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(n);

export function Price({ amounts, locale, className }: { amounts: PriceAmounts; locale: Locale | string; className?: string }) {
  const was = "ml-2 text-[0.8em] text-muted-foreground";
  return (
    <span className={cn("whitespace-nowrap", className)}>
      <span data-price="USD">
        {format(locale, "USD", amounts.usd)}
        {amounts.usdWas && <s className={was}>{format(locale, "USD", amounts.usdWas)}</s>}
      </span>
      <span data-price="EUR">
        {amounts.eur ? format(locale, "EUR", amounts.eur) : format(locale, "USD", amounts.usd)}
        {amounts.eurWas && <s className={was}>{format(locale, "EUR", amounts.eurWas)}</s>}
      </span>
    </span>
  );
}
