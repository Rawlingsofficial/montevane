import Link from "next/link";

import { AssetImage } from "@/components/common/AssetImage";
import { getCollections } from "@/lib/data/catalog";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { collectionImage } from "@/lib/images";

export async function FeaturedCollections({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const collections = (await getCollections()).slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="mb-14 text-center">
        <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{t.home.collectionsEyebrow}</p>
        <h2 className="mt-3 text-4xl">{t.home.collectionsTitle}</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {collections.map((collection) => (
          <Link
            key={collection.slug}
            href={localePath(locale, `/collections/${collection.slug}`)}
            className="group relative block overflow-hidden"
          >
            <AssetImage
              base={collectionImage(collection.slug)}
              alt=""
              sizes="(max-width: 640px) 100vw, 50vw"
              className="aspect-[4/5] transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-8">
              <h3 className="font-heading text-2xl font-light text-white">{t.collections[collection.slug]?.name ?? collection.name}</h3>
              <p className="mt-1 text-sm text-white/70">{t.collections[collection.slug]?.description ?? collection.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
