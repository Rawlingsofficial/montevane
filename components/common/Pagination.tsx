import Link from "next/link";

import { fmt, getDictionary, localePath, type Locale } from "@/lib/i18n";

/** URL of page `n` of a listing at `base` (page 1 is the base URL itself). */
export const pagePath = (base: string, n: number) => (n <= 1 ? base : `${base}/page/${n}`);

/** "/page/3" → 3; anything else (missing, 1, junk) → null so the route can 404. */
export function parsePage(value: string): number | null {
  const n = Number(value);
  return Number.isInteger(n) && n >= 2 ? n : null;
}

/** Page numbers to show: first, last and two either side of the current page; null = gap. */
function window(page: number, pages: number): (number | null)[] {
  const out: (number | null)[] = [];
  for (let n = 1; n <= pages; n++) {
    if (n === 1 || n === pages || Math.abs(n - page) <= 2) out.push(n);
    else if (out[out.length - 1] !== null) out.push(null);
  }
  return out;
}

export function Pagination({
  locale,
  base,
  page,
  pages,
  query = "",
}: {
  locale: Locale;
  base: string;
  page: number;
  pages: number;
  /** Filter/sort query string ("?sort=price_asc") carried to every page. */
  query?: string;
}) {
  if (pages <= 1) return null;
  const t = getDictionary(locale).listing;
  const href = (n: number) => localePath(locale, pagePath(base, n)) + query;
  const link = "flex h-11 min-w-11 items-center justify-center border px-3 text-xs tracking-[0.1em] uppercase transition-colors";

  return (
    <nav aria-label={t.pagination} className="mt-16 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={href(page - 1)} rel="prev" className={`${link} border-border hover:border-foreground`}>
          {t.prev}
        </Link>
      )}
      {window(page, pages).map((n, i) =>
        n === null ? (
          <span key={`gap-${i}`} aria-hidden="true" className="px-1 text-muted-foreground">
            …
          </span>
        ) : n === page ? (
          <span key={n} aria-current="page" className={`${link} border-foreground bg-foreground text-background`}>
            {n}
          </span>
        ) : (
          <Link key={n} href={href(n)} aria-label={fmt(t.page, { n })} className={`${link} border-border hover:border-foreground`}>
            {n}
          </Link>
        )
      )}
      {page < pages && (
        <Link href={href(page + 1)} rel="next" className={`${link} border-border hover:border-foreground`}>
          {t.next}
        </Link>
      )}
    </nav>
  );
}
