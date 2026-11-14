import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PageHero } from "@/components/common/PageHero";
import { Pagination, pagePath } from "@/components/common/Pagination";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getCategories, getCollections, getContactChannels, getProductPage } from "@/lib/data/catalog";
import { fmt, getDictionary, localePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo/metadata";

// Shared by /products (page 1) and /products/page/[n].

export function productsMetadata(locale: Locale, page: number): Metadata {
  const t = getDictionary(locale);
  const suffix = page > 1 ? ` — ${fmt(t.listing.page, { n: page })}` : "";
  return pageMetadata({ locale, path: pagePath("/products", page), title: t.meta.productsTitle + suffix, description: t.meta.productsDescription });
}

export async function ProductsListing({ locale, page }: { locale: Locale; page: number }) {
  const t = getDictionary(locale);
  const [listing, categories, collections, channels] = await Promise.all([
    getProductPage({}, page, locale),
    getCategories(),
    getCollections(),
    getContactChannels(),
  ]);
  if (!listing) notFound();

  // Filters are links to real, indexable pages — not ?query variants.
  const pills = [
    ...categories.map((c) => ({ href: `/shop/${c.slug}`, label: t.categories[c.slug]?.name ?? c.name })),
    ...collections.map((c) => ({ href: `/collections/${c.slug}`, label: t.collections[c.slug]?.name ?? c.name })),
    { href: "/brands", label: t.nav.brands },
  ];

  return (
    <>
      <PageHero eyebrow={t.listing.eyebrow} title={t.meta.productsTitle} image="hero_2" priority />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <nav aria-label={t.nav.shop} className="flex flex-wrap gap-x-3 gap-y-2">
          {pills.map((pill) => (
            <Link
              key={pill.href}
              href={localePath(locale, pill.href)}
              className="px-3 py-1.5 text-xs font-medium tracking-[0.1em] text-foreground/70 uppercase transition-colors hover:text-foreground"
            >
              {pill.label}
            </Link>
          ))}
        </nav>

        <h2 className="mt-8 text-xs tracking-[0.1em] text-muted-foreground uppercase">
          {listing.total === 1 ? t.listing.piece : fmt(t.listing.pieces, { n: listing.total })}
          {page > 1 && ` · ${fmt(t.listing.page, { n: page })}`}
        </h2>

        <div className="mt-6">
          {listing.products.length > 0 ? (
            <ProductGrid products={listing.products} channels={channels} locale={locale} />
          ) : (
            <p className="mt-16 text-center text-sm text-muted-foreground">{t.listing.empty}</p>
          )}
        </div>
        <Pagination locale={locale} base="/products" page={listing.page} pages={listing.pages} />
      </section>
    </>
  );
}
