import Link from "next/link";
import type { Metadata } from "next";

import { AssetImage } from "@/components/common/AssetImage";
import { PageHero } from "@/components/common/PageHero";
import { getCollections } from "@/lib/data/catalog";
import { getDictionary, localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { collectionImage } from "@/lib/images";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps<"/[locale]/collections">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).meta;
  return pageMetadata({ locale, path: "/collections", title: t.collectionsTitle, description: t.collectionsDescription });
}

export default async function CollectionsPage({ params }: PageProps<"/[locale]/collections">) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const collections = await getCollections();

  return (
    <>
      <PageHero eyebrow={t.home.collectionsEyebrow} title={t.listing.collectionsHeading} description={t.listing.collectionsBody} image="collection_curated" priority />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-16 sm:grid-cols-2 lg:px-10">
        {collections.map((collection) => {
          const copy = t.collections[collection.slug] ?? collection;
          return (
            <Link key={collection.slug} href={localePath(locale, `/collections/${collection.slug}`)} className="group relative block overflow-hidden">
              <AssetImage
                base={collectionImage(collection.slug)}
                alt=""
                sizes="(max-width: 640px) 100vw, 50vw"
                className="aspect-[4/5] transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-8">
                <h2 className="font-heading text-2xl font-light text-white">{copy.name}</h2>
                <p className="mt-1 text-sm text-white/80">{copy.description}</p>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
}
