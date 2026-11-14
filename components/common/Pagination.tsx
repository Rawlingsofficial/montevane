import Link from "next/link";

import { fmt, getDictionary, localePath, type Locale } from "@/lib/i18n";

/** URL of page `n` of a listing at `base` (page 1 is the base URL itself). */
export const pagePath = (base: string, n: number) => (n <= 1 ? base : `${base}/page/${n}`);

/** "/page/3" → 3; anything else (missing, 1, junk) → null so the route can 404. */
export function parsePage(value: string): number | null {
  const n = Number(value);
  return Number.isInteger(n) && n >= 2 ? n : null;
}

export function Pagination({ locale, base, page, pages }: { locale: Locale; base: string; page: number; pages: number }) {
  if (pages <= 1) return null;
  const t = getDictionary(locale).listing;
  const link = "flex h-10 min-w-10 items-center justify-center border px-3 text-xs tracking-[0.1em] uppercase transition-colors";

  return (
    <nav aria-label={t.pagination} className="mt-16 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={localePath(locale, pagePath(base, page - 1))} rel="prev" className={`${link} border-border hover:border-foreground`}>
          {t.prev}
        </Link>
      )}
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) =>
        n === page ? (
          <span key={n} aria-current="page" className={`${link} border-foreground bg-foreground text-background`}>
            {n}
          </span>
        ) : (
          <Link key={n} href={localePath(locale, pagePath(base, n))} aria-label={fmt(t.page, { n })} className={`${link} border-border hover:border-foreground`}>
            {n}
          </Link>
        )
      )}
      {page < pages && (
        <Link href={localePath(locale, pagePath(base, page + 1))} rel="next" className={`${link} border-border hover:border-foreground`}>
          {t.next}
        </Link>
      )}
    </nav>
  );
}
