import Link from "next/link";

import { AssetImage } from "@/components/common/AssetImage";
import { COLLECTIONS } from "@/lib/constants";
import { collectionImage } from "@/lib/images";

export function FeaturedCollections() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="mb-14 text-center">
        <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">Curated</p>
        <h2 className="mt-3 text-4xl">Featured Collections</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {COLLECTIONS.map((collection) => (
          <Link
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className="group relative block overflow-hidden"
          >
            <AssetImage
              base={collectionImage(collection.slug)}
              alt={collection.name}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="aspect-[4/5] transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-8">
              <h3 className="font-heading text-2xl font-light text-white">{collection.name}</h3>
              <p className="mt-1 text-sm text-white/70">{collection.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
