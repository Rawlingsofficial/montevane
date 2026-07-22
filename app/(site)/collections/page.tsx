import Link from "next/link";
import type { Metadata } from "next";

import { AssetImage } from "@/components/common/AssetImage";
import { PageHero } from "@/components/common/PageHero";
import { COLLECTIONS } from "@/lib/constants";
import { collectionImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Collections — Montévane",
};

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Curated"
        title="Collections"
        description="Thematic edits of the collection, updated as new pieces arrive."
        image="collection_curated"
      />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-16 sm:grid-cols-2 lg:px-10">
        {COLLECTIONS.map((collection) => (
          <Link key={collection.slug} href={`/collections/${collection.slug}`} className="group relative block overflow-hidden">
            <AssetImage
              base={collectionImage(collection.slug)}
              alt={collection.name}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="aspect-[4/5] transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-8">
              <h2 className="font-heading text-2xl font-light text-white">{collection.name}</h2>
              <p className="mt-1 text-sm text-white/70">{collection.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
