import Image from "next/image";
import Link from "next/link";

import { AssetImage } from "@/components/common/AssetImage";
import { getCategories, getProducts } from "@/lib/data/catalog";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { categoryImage } from "@/lib/images";

// Watches and jewelry keep their editorial shots; the Hermès categories show
// their newest piece, so the tile always matches what is actually in stock.
const EDITORIAL = new Set(["watches", "jewelry"]);

export async function ShopByCategory({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const categories = (await getCategories()).filter((c) => t.categories[c.slug]);
  const covers = await Promise.all(
    categories.map(async (c) => (EDITORIAL.has(c.slug) ? null : (await getProducts({ category: c.slug, limit: 1 }, locale))[0]?.images[0] ?? null))
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="mb-14 text-center">
        <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{t.home.categoriesEyebrow}</p>
        <h2 className="mt-3 text-4xl">{t.home.categoriesTitle}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {categories.map((c, i) => {
          const copy = t.categories[c.slug];
          const cover = covers[i];
          return (
            <Link key={c.slug} href={localePath(locale, `/shop/${c.slug}`)} className="group relative block overflow-hidden bg-[var(--ivory)]">
              {cover ? (
                <div className="relative aspect-[4/5]">
                  <Image
                    src={cover.url}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-6 pb-16 transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              ) : (
                <AssetImage
                  base={categoryImage(c.slug)}
                  alt=""
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="aspect-[4/5] transition-transform duration-500 ease-out group-hover:scale-105"
                />
              )}
              <div
                className={`absolute inset-0 flex items-end p-5 sm:p-6 ${cover ? "" : "bg-gradient-to-t from-black/60 via-transparent to-transparent"}`}
              >
                <h3 className={`font-heading text-xl font-light sm:text-2xl ${cover ? "text-foreground" : "text-white"}`}>{copy.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
