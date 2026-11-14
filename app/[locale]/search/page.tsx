import Link from "next/link";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SourcingCta } from "@/components/common/SourcingCta";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getContactChannels, getProductPage } from "@/lib/data/catalog";
import { fmt, getDictionary, localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";

// Search results: rendered per request, never indexed (robots.txt also disallows /search).

type Props = PageProps<"/[locale]/search">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).search;
  return pageMetadata({ locale, path: "/search", title: t.metaTitle, description: t.metaDescription, noindex: true });
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function SearchPage({ params, searchParams }: Props) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const s = t.search;
  const query = await searchParams;
  const q = one(query.q).trim().slice(0, 80);
  const requested = Number.parseInt(one(query.page), 10);
  const page = Number.isFinite(requested) && requested > 1 ? requested : 1;

  const [listing, channels] = await Promise.all([
    q ? getProductPage({ query: q }, page, locale) : Promise.resolve(null),
    getContactChannels(),
  ]);
  const href = (n: number) => localePath(locale, `/search?q=${encodeURIComponent(q)}${n > 1 ? `&page=${n}` : ""}`);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-16 lg:px-10">
      <Breadcrumbs
        locale={locale}
        items={[
          { name: t.nav.home, path: "/" },
          { name: s.title, path: "/search" },
        ]}
      />
      <h1 className="text-4xl font-light">{s.title}</h1>

      <form action={localePath(locale, "/search")} role="search" className="mt-8 flex max-w-2xl border-b border-foreground">
        <label htmlFor="search-page-q" className="sr-only">
          {s.label}
        </label>
        <input
          id="search-page-q"
          type="search"
          name="q"
          defaultValue={q}
          placeholder={s.placeholder}
          autoComplete="off"
          className="min-h-12 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none"
        />
        <button type="submit" className="min-h-12 px-4 text-xs font-medium tracking-[0.15em] uppercase hover:text-[var(--gold)]">
          {s.submit}
        </button>
      </form>

      <section className="mt-12">
        {!q && <p className="text-base text-muted-foreground">{s.prompt}</p>}
        {q && listing && listing.total > 0 && (
          <>
            <h2 className="mb-6 text-xs tracking-[0.1em] text-muted-foreground uppercase">
              {fmt(listing.total === 1 ? s.result : s.results, { n: listing.total, q })}
            </h2>
            <ProductGrid products={listing.products} channels={channels} locale={locale} />
            {listing.pages > 1 && (
              <nav aria-label={t.listing.pagination} className="mt-12 flex items-center justify-center gap-6 text-xs tracking-[0.15em] uppercase">
                {listing.page > 1 && (
                  <Link href={href(listing.page - 1)} rel="prev" className="min-h-11 content-center hover:text-[var(--gold)]">
                    {t.listing.prev}
                  </Link>
                )}
                <span className="text-muted-foreground">{fmt(t.listing.page, { n: listing.page })}</span>
                {listing.page < listing.pages && (
                  <Link href={href(listing.page + 1)} rel="next" className="min-h-11 content-center hover:text-[var(--gold)]">
                    {t.listing.next}
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
        {q && (!listing || listing.total === 0) && (
          <div>
            <p className="text-lg">{fmt(s.empty, { q })}</p>
            <p className="mt-2 text-base text-muted-foreground">{s.emptyHint}</p>
          </div>
        )}
      </section>

      <SourcingCta locale={locale} />
    </div>
  );
}
