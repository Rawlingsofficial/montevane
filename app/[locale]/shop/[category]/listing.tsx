import { Waitlist } from "@/components/shop/Waitlist";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";
import { Pagination, pagePath } from "@/components/common/Pagination";
import { SourcingCta } from "@/components/common/SourcingCta";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Expandable } from "@/components/shop/Expandable";
import { ListingFaq } from "@/components/shop/ListingFaq";
import { ListingFilters, type FilterLabels } from "@/components/shop/ListingFilters";
import { EMPTY_QUERY, hasQuery, queryString, type ListingQuery } from "@/lib/catalog/filters";
import { BRAND_SUBCATEGORIES, JEWELRY_TYPES } from "@/lib/catalog/taxonomy";
import {
  getCategories,
  getContactChannels,
  getFilterOptions,
  getLiveModels,
  getProductPage,
  getSubcategories,
  subcategoryFilter,
  type ProductFilter,
} from "@/lib/data/catalog";
import { fmt, getDictionary, localePath, type Locale } from "@/lib/i18n";
import { categoryImage } from "@/lib/images";
import { guideFor } from "@/lib/journal";
import { pageMetadata } from "@/lib/seo/metadata";

// Shared by /shop/[category], /shop/[category]/[sub] and their /page/[n] routes.
// Subcategories are brands under Watches (/shop/watches/rolex) and piece
// types under Jewelry (/shop/jewelry/rings).

const VIDEO: Record<string, string> = { watches: "/videos/hero.mp4", jewelry: "/videos/jewelry.mp4" };

type Copy = { name: string; title: string; metaTitle: string; metaDescription: string; intro: string };

/** Category copy from the dictionary, or a generic version for categories added in admin. */
async function categoryCopy(slug: string, locale: Locale): Promise<Copy | null> {
  const t = getDictionary(locale);
  // Categories without products in stock 404 (they come back with the first product).
  const category = (await getCategories()).find((c) => c.slug === slug);
  if (!category) return null;
  const known = t.categories[slug];
  if (known) return known;
  const title = fmt(t.meta.brandTitle, { brand: category.name });
  return { name: category.name, title: category.name, metaTitle: title, metaDescription: fmt(t.meta.brandDescription, { brand: category.name }), intro: "" };
}

/** Copy and product filter for a category page, or a subcategory page when `sub` is set. */
async function resolveListing(locale: Locale, category: string, sub?: string) {
  const parent = await categoryCopy(category, locale);
  if (!parent) return null;
  if (!sub) return { parent, copy: parent, filter: { category } as ProductFilter, base: `/shop/${category}` };

  const found = await subcategoryFilter(category, sub);
  if (!found) return null;
  const t = getDictionary(locale).listing;
  let copy: Copy;
  if (BRAND_SUBCATEGORIES.has(category)) {
    const title = fmt(t.watchBrandTitle, { brand: found.name });
    copy = {
      name: found.name,
      title,
      metaTitle: fmt(t.watchBrandMetaTitle, { brand: found.name }),
      metaDescription: fmt(t.watchBrandDescription, { brand: found.name }),
      intro: fmt(t.watchBrandIntro, { brand: found.name }),
    };
  } else {
    const type = getDictionary(locale).jewelryTypes[sub] ?? found.name;
    copy = {
      name: type,
      title: type,
      metaTitle: fmt(t.jewelryTypeMetaTitle, { type }),
      metaDescription: fmt(t.jewelryTypeDescription, { type: type.toLowerCase() }),
      intro: t.jewelryTypeIntro,
    };
  }
  return { parent, copy, filter: found.filter, base: `/shop/${category}/${sub}` };
}

/** Filtered views (?model=…&sort=…) are noindex,follow and canonical to the plain listing. */
export async function categoryMetadata(locale: Locale, category: string, page: number, sub?: string, filtered = false): Promise<Metadata> {
  const listing = await resolveListing(locale, category, sub);
  if (!listing) return {};
  const suffix = page > 1 ? ` — ${fmt(getDictionary(locale).listing.page, { n: page })}` : "";
  return pageMetadata({
    locale,
    path: filtered ? listing.base : pagePath(listing.base, page),
    title: listing.copy.metaTitle + suffix,
    description: listing.copy.metaDescription,
    noindex: filtered,
  });
}

const chip = "border border-border px-3 py-2 text-xs tracking-[0.1em] uppercase transition-colors hover:border-foreground";

function faqFor(category: string): "watches" | "jewelry" | "hermes" {
  return category === "watches" || category === "jewelry" ? category : "hermes";
}

export function filterLabels(locale: Locale): FilterLabels {
  const t = getDictionary(locale);
  const values: Record<string, string> = {};
  for (const [k, v] of Object.entries(t.product.condition)) values[`condition.${k}`] = v;
  for (const [k, v] of Object.entries(t.availability)) values[`availability.${k}`] = v;
  for (const { slug, piece } of JEWELRY_TYPES) values[`type.${piece}`] = t.jewelryTypes[slug] ?? piece;
  return { ...t.ui.filters, close: t.nav.closeMenu, values };
}

export async function CategoryListing({
  locale,
  category,
  sub,
  page,
  query = EMPTY_QUERY,
}: {
  locale: Locale;
  category: string;
  sub?: string;
  page: number;
  query?: ListingQuery;
}) {
  const resolved = await resolveListing(locale, category, sub);
  if (!resolved) notFound();
  const { parent, copy, filter, base } = resolved;

  const t = getDictionary(locale);
  const filtered = hasQuery(query);
  const [listing, channels, subcategories, liveModels, options] = await Promise.all([
    getProductPage({ ...filter, listing: query }, page, locale),
    getContactChannels(),
    sub ? Promise.resolve([]) : getSubcategories(category),
    getLiveModels(),
    getFilterOptions(filter),
  ]);
  if (!listing) notFound();
  const models = liveModels.filter((m) => m.category === category && (!filter.brand || m.brandSlug === filter.brand));
  const byBrand = BRAND_SUBCATEGORIES.has(category);
  const guide = guideFor(category, sub);

  const crumbs = [
    { name: t.nav.home, path: "/" },
    { name: parent.name, path: `/shop/${category}` },
    ...(sub ? [{ name: copy.name, path: base }] : []),
    ...(page > 1 ? [{ name: fmt(t.listing.page, { n: page }), path: pagePath(base, page) }] : []),
  ];

  return (
    <>
      <PageHero eyebrow={sub ? parent.name : t.listing.eyebrow} title={copy.title} image={categoryImage(category)} video={VIDEO[category]} priority />

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10 lg:py-12">
        <Breadcrumbs locale={locale} items={crumbs} />
        {copy.intro && page === 1 && !filtered && (
          <Expandable more={t.ui.filters.readMore} less={t.ui.filters.readLess} className="max-w-3xl">
            <p className="text-base leading-relaxed text-foreground/80">{copy.intro}</p>
          </Expandable>
        )}

        <section className="mt-8 lg:mt-12">
          <ListingFilters
            locale={locale}
            basePath={localePath(locale, base)}
            options={options}
            query={query}
            hidden={[...(filter.brand ? (["brand"] as const) : []), ...(filter.piece ? (["type"] as const) : [])]}
            labels={filterLabels(locale)}
          />
          <h2 className="mb-6 text-xs tracking-[0.1em] text-muted-foreground uppercase">
            {listing.total === 1 ? t.listing.piece : fmt(t.listing.pieces, { n: listing.total })}
          </h2>
          {listing.products.length > 0 ? (
            <ProductGrid products={listing.products} channels={channels} locale={locale} />
          ) : (
            <p className="text-sm text-muted-foreground">{t.listing.empty}</p>
          )}
          <Pagination locale={locale} base={base} page={listing.page} pages={listing.pages} query={queryString(query)} />
        </section>

        {/* Brand / type / model links sit below the products: filters do the
            browsing up top, these keep crawlable links to every landing page. */}
        {page === 1 && !filtered && (subcategories.length > 0 || models.length > 0) && (
          <div className="mt-20 space-y-8 border-t border-border pt-10">
            {subcategories.length > 0 && (
              <nav aria-label={byBrand ? t.listing.byBrand : t.listing.byType}>
                <h2 className="mb-3 text-xs tracking-[0.1em] text-muted-foreground uppercase">{byBrand ? t.listing.byBrand : t.listing.byType}</h2>
                <ul className="flex flex-wrap gap-2">
                  {subcategories.map((s) => (
                    <li key={s.slug}>
                      <Link href={localePath(locale, `/shop/${category}/${s.slug}`)} className={chip}>
                        {byBrand ? s.name : (t.jewelryTypes[s.slug] ?? s.name)} <span className="text-muted-foreground">({s.count})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            {models.length > 0 && (
              <nav aria-label={copy.name}>
                <ul className="flex flex-wrap gap-2">
                  {models.map((m) => (
                    <li key={m.slug}>
                      <Link href={localePath(locale, `/models/${m.slug}`)} className={chip}>
                        {m.brand} {m.model}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        )}

        {page === 1 && !filtered && guide && (
          <Link href={localePath(locale, `/journal/${guide.slug}`)} hrefLang="en" className="group mt-16 flex max-w-3xl items-center justify-between gap-6 bg-[var(--ivory)] p-6 sm:p-8">
            <span>
              <span className="block text-xs tracking-[0.2em] text-[var(--gold)] uppercase">{t.ui.buyingGuide}</span>
              <span className="mt-2 block font-heading text-xl font-light sm:text-2xl">{guide.title}</span>
            </span>
            <span aria-hidden="true" className="text-2xl transition-transform group-hover:translate-x-1">→</span>
          </Link>
        )}

        {page === 1 && !filtered && <ListingFaq title={t.ui.faqTitle} items={t.ui.faq[faqFor(category)]} />}

        {page === 1 && !filtered && <Waitlist item={copy.name} labels={t.waitlist} className="mt-16 max-w-3xl" />}

        <SourcingCta locale={locale} />
      </div>
    </>
  );
}
