import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";
import { Pagination, pagePath } from "@/components/common/Pagination";
import { SourcingCta } from "@/components/common/SourcingCta";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getCategories, getContactChannels, getProductPage } from "@/lib/data/catalog";
import { fmt, getDictionary, localePath, type Locale } from "@/lib/i18n";
import { categoryImage } from "@/lib/images";
import { pageMetadata } from "@/lib/seo/metadata";
import { MODELS } from "@/lib/seo/models";

// Shared by /shop/[category] (page 1) and /shop/[category]/page/[n].

const VIDEO: Record<string, string> = { watches: "/videos/hero.mp4", jewelry: "/videos/jewelry.mp4" };

/** Category copy from the dictionary, or a generic version for categories added in admin. */
async function categoryCopy(slug: string, locale: Locale) {
  const t = getDictionary(locale);
  const known = t.categories[slug];
  if (known) return known;
  const category = (await getCategories()).find((c) => c.slug === slug);
  if (!category) return null;
  const title = fmt(t.meta.brandTitle, { brand: category.name });
  return { name: category.name, title: category.name, metaTitle: title, metaDescription: fmt(t.meta.brandDescription, { brand: category.name }), intro: "" };
}

/** Shared by page 1 (this route) and /shop/[category]/page/[n]. */
export async function categoryMetadata(locale: Locale, category: string, page: number): Promise<Metadata> {
  const copy = await categoryCopy(category, locale);
  if (!copy) return {};
  const suffix = page > 1 ? ` — ${fmt(getDictionary(locale).listing.page, { n: page })}` : "";
  return pageMetadata({
    locale,
    path: pagePath(`/shop/${category}`, page),
    title: copy.metaTitle + suffix,
    description: copy.metaDescription,
  });
}

export async function CategoryListing({ locale, category, page }: { locale: Locale; category: string; page: number }) {
  const copy = await categoryCopy(category, locale);
  if (!copy) notFound();

  const t = getDictionary(locale);
  const [listing, channels] = await Promise.all([getProductPage({ category }, page, locale), getContactChannels()]);
  if (!listing) notFound();
  const models = MODELS.filter((m) => m.category === category);
  const base = `/shop/${category}`;

  return (
    <>
      <PageHero eyebrow={t.listing.eyebrow} title={copy.title} image={categoryImage(category)} video={VIDEO[category]} priority />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t.nav.home, path: "/" },
            { name: copy.name, path: base },
            ...(page > 1 ? [{ name: fmt(t.listing.page, { n: page }), path: pagePath(base, page) }] : []),
          ]}
        />
        {copy.intro && page === 1 && <p className="max-w-3xl text-base leading-relaxed text-foreground/80">{copy.intro}</p>}

        {models.length > 0 && page === 1 && (
          <nav aria-label={copy.name} className="mt-8 flex flex-wrap gap-2">
            {models.map((m) => (
              <Link
                key={m.slug}
                href={localePath(locale, `/models/${m.slug}`)}
                className="border border-border px-3 py-2 text-xs tracking-[0.1em] uppercase transition-colors hover:border-foreground"
              >
                {m.brand} {m.model}
              </Link>
            ))}
          </nav>
        )}

        <section className="mt-12">
          <h2 className="mb-6 text-xs tracking-[0.1em] text-muted-foreground uppercase">
            {listing.total === 1 ? t.listing.piece : fmt(t.listing.pieces, { n: listing.total })}
          </h2>
          {listing.products.length > 0 ? (
            <ProductGrid products={listing.products} channels={channels} locale={locale} />
          ) : (
            <p className="text-sm text-muted-foreground">{t.listing.empty}</p>
          )}
          <Pagination locale={locale} base={base} page={listing.page} pages={listing.pages} />
        </section>

        <SourcingCta locale={locale} />
      </div>
    </>
  );
}

