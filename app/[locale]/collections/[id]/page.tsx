import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getCollections, getContactChannels, getProducts } from "@/lib/data/catalog";
import { getDictionary, localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { collectionImage } from "@/lib/images";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCollections()).map((c) => ({ id: c.slug }));
}

type Props = PageProps<"/[locale]/collections/[id]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { id } = await params;
  const t = getDictionary(locale);
  const collection = (await getCollections()).find((c) => c.slug === id);
  if (!collection) return {};
  const copy = t.collections[id] ?? { name: collection.name, description: collection.description ?? "" };
  return pageMetadata({ locale, path: `/collections/${id}`, title: copy.name, description: `${copy.description} ${t.meta.collectionsDescription}` });
}

export default async function CollectionPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const { id } = await params;
  const collection = (await getCollections()).find((c) => c.slug === id);
  if (!collection) notFound();

  const t = getDictionary(locale);
  const copy = t.collections[id] ?? { name: collection.name, description: collection.description ?? "" };
  const [products, channels] = await Promise.all([getProducts({ collection: id }, locale), getContactChannels()]);

  return (
    <>
      <PageHero eyebrow={t.listing.collectionEyebrow} title={copy.name} description={copy.description} image={collectionImage(id)} priority />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t.nav.home, path: "/" },
            { name: t.nav.collections, path: "/collections" },
            { name: copy.name, path: `/collections/${id}` },
          ]}
        />
        <section>
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl">{t.listing.inCollection}</h2>
            <Link href={localePath(locale, "/collections")} className="text-xs font-medium tracking-[0.15em] text-foreground/70 uppercase hover:text-[var(--gold)]">
              {t.listing.allCollections}
            </Link>
          </div>
          {products.length > 0 ? (
            <ProductGrid products={products} channels={channels} locale={locale} />
          ) : (
            <p className="text-sm text-muted-foreground">{t.listing.collectionEmpty}</p>
          )}
        </section>
      </div>
    </>
  );
}
