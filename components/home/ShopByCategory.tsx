import Image from "next/image";
import Link from "next/link";

import { SceneFill } from "@/components/common/GalleryImage";
import { gallery } from "@/lib/catalog/gallery";
import { showcase } from "@/lib/catalog/showcase";
import { getCategories } from "@/lib/data/catalog";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { categoryImage } from "@/lib/images";

/** Each tile is a still life of real pieces from that category (see lib/catalog/showcase.ts). */
export async function ShopByCategory({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const categories = (await getCategories()).filter((c) => t.categories[c.slug]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="mb-10 text-center lg:mb-14">
        <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{t.home.categoriesEyebrow}</p>
        <h2 className="mt-3 text-3xl lg:text-4xl">{t.home.categoriesTitle}</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {categories.map((c, i) => {
          const copy = t.categories[c.slug];
          const still = showcase(`category-${c.slug}`);
          return (
            <Link key={c.slug} href={localePath(locale, `/shop/${c.slug}`)} className="group block bg-[var(--ivory)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                {still ? (
                  <Image
                    src={still.src}
                    alt={still.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    priority={i < 2}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  (() => {
                    const scene = gallery(categoryImage(c.slug));
                    return scene && <SceneFill scene={scene} sizes="(max-width: 1024px) 50vw, 25vw" />;
                  })()
                )}
              </div>
              <h3 className="px-4 pb-5 font-heading text-lg leading-snug font-light sm:px-6 sm:pb-6 sm:text-2xl">{copy.title}</h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
