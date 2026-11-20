import Link from "next/link";
import type { Metadata } from "next";

import { SceneFill } from "@/components/common/GalleryImage";
import { gallery } from "@/lib/catalog/gallery";
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
      <PageHero eyebrow={t.home.collectionsEyebrow} title={t.listing.collectionsHeading} description={t.listing.collectionsBody} image="col-best-sellers" priority />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-16 sm:grid-cols-2 lg:px-10">
        {collections.map((collection) => {
          const copy = t.collections[collection.slug] ?? collection;
          return (
            <Link key={collection.slug} href={localePath(locale, `/collections/${collection.slug}`)} className="group block bg-[#f5f0e9]">
              <div className="relative aspect-[4/3] overflow-hidden">
                {(() => {
                  const scene = gallery(collectionImage(collection.slug));
                  return scene && <SceneFill scene={scene} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />;
                })()}
              </div>
              <div className="flex items-end justify-between gap-6 px-6 pt-2 pb-7 sm:px-8">
                <div>
                  <h2 className="font-heading text-2xl font-light">{copy.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{copy.description}</p>
                </div>
                <span aria-hidden="true" className="shrink-0 text-xl transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
}
