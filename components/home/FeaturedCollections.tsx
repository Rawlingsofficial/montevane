import Image from "next/image";
import Link from "next/link";

import { SceneFill } from "@/components/common/GalleryImage";
import { gallery } from "@/lib/catalog/gallery";
import { showcase } from "@/lib/catalog/showcase";
import { getCollections } from "@/lib/data/catalog";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { collectionImage } from "@/lib/images";

/** Featured collections, each shown as a still life of pieces from it. */
export async function FeaturedCollections({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const collections = (await getCollections()).slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-32">
      <div className="mb-10 text-center lg:mb-14">
        <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{t.home.collectionsEyebrow}</p>
        <h2 className="mt-3 text-3xl lg:text-4xl">{t.home.collectionsTitle}</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {collections.map((collection) => {
          const still = showcase(`collection-${collection.slug}`);
          const name = t.collections[collection.slug]?.name ?? collection.name;
          const description = t.collections[collection.slug]?.description ?? collection.description;
          return (
            <Link key={collection.slug} href={localePath(locale, `/collections/${collection.slug}`)} className="group block bg-[var(--ivory)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                {still ? (
                  <Image src={still.src} alt={still.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                ) : (
                  (() => {
                    const scene = gallery(collectionImage(collection.slug));
                    return scene && <SceneFill scene={scene} />;
                  })()
                )}
              </div>
              <div className="flex items-end justify-between gap-6 px-6 pb-7 sm:px-8 sm:pb-8">
                <div>
                  <h3 className="font-heading text-2xl font-light sm:text-3xl">{name}</h3>
                  {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
                </div>
                <span aria-hidden="true" className="shrink-0 text-xl transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
