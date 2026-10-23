import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/common/PageHero";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getCategories, getCollections, getContactChannels, getProducts } from "@/lib/data/catalog";
import { fmt, getDictionary, localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps<"/[locale]/products">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).meta;
  return pageMetadata({ locale, path: "/products", title: t.productsTitle, description: t.productsDescription });
}

export default async function ProductsPage({ params }: PageProps<"/[locale]/products">) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const [products, categories, collections, channels] = await Promise.all([
    getProducts({}, locale),
    getCategories(),
    getCollections(),
    getContactChannels(),
  ]);

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
          {products.length === 1 ? t.listing.piece : fmt(t.listing.pieces, { n: products.length })}
        </h2>

        <div className="mt-6">
          {products.length > 0 ? (
            <ProductGrid products={products} channels={channels} locale={locale} />
          ) : (
            <p className="mt-16 text-center text-sm text-muted-foreground">{t.listing.empty}</p>
          )}
        </div>
      </section>
    </>
  );
}
