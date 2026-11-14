import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";
import { Pagination, pagePath } from "@/components/common/Pagination";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getCollections, getContactChannels, getProductPage } from "@/lib/data/catalog";
import { fmt, getDictionary, localePath, type Locale } from "@/lib/i18n";
import { collectionImage } from "@/lib/images";
import { pageMetadata } from "@/lib/seo/metadata";

// Shared by /collections/[id] (page 1) and /collections/[id]/page/[n].

async function collectionCopy(id: string, locale: Locale) {
  const collection = (await getCollections()).find((c) => c.slug === id);
  if (!collection) return null;
  return getDictionary(locale).collections[id] ?? { name: collection.name, description: collection.description ?? "" };
}

export async function collectionMetadata(locale: Locale, id: string, page: number): Promise<Metadata> {
  const copy = await collectionCopy(id, locale);
  if (!copy) return {};
  const t = getDictionary(locale);
  const suffix = page > 1 ? ` — ${fmt(t.listing.page, { n: page })}` : "";
  return pageMetadata({
    locale,
    path: pagePath(`/collections/${id}`, page),
    title: copy.name + suffix,
    description: `${copy.description} ${t.meta.collectionsDescription}`,
  });
}

export async function CollectionListing({ locale, id, page }: { locale: Locale; id: string; page: number }) {
  const copy = await collectionCopy(id, locale);
  if (!copy) notFound();

  const t = getDictionary(locale);
  const [listing, channels] = await Promise.all([getProductPage({ collection: id }, page, locale), getContactChannels()]);
  if (!listing) notFound();
  const base = `/collections/${id}`;

  return (
    <>
      <PageHero eyebrow={t.listing.collectionEyebrow} title={copy.name} description={copy.description} image={collectionImage(id)} priority />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t.nav.home, path: "/" },
            { name: t.nav.collections, path: "/collections" },
            { name: copy.name, path: base },
            ...(page > 1 ? [{ name: fmt(t.listing.page, { n: page }), path: pagePath(base, page) }] : []),
          ]}
        />
        <section>
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl">{t.listing.inCollection}</h2>
            <Link href={localePath(locale, "/collections")} className="text-xs font-medium tracking-[0.15em] text-foreground/70 uppercase hover:text-[var(--gold)]">
              {t.listing.allCollections}
            </Link>
          </div>
          {listing.products.length > 0 ? (
            <ProductGrid products={listing.products} channels={channels} locale={locale} />
          ) : (
            <p className="text-sm text-muted-foreground">{t.listing.collectionEmpty}</p>
          )}
          <Pagination locale={locale} base={base} page={listing.page} pages={listing.pages} />
        </section>
      </div>
    </>
  );
}
