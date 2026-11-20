import Link from "next/link";

import { brandPath, brandRank } from "@/lib/catalog/taxonomy";
import { getBrands } from "@/lib/data/catalog";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Leading houses shown before "All brands": 8 on phones, 12 from tablet up. */
const MOBILE_COUNT = 8;
const COUNT = 12;

export async function BrandShowcase({ locale }: { locale: Locale }) {
  const all = (await getBrands()).sort((a, b) => brandRank(a.slug) - brandRank(b.slug) || a.name.localeCompare(b.name));
  const brands = all.slice(0, COUNT);
  const dict = getDictionary(locale);
  const t = dict.home;

  return (
    <section className="bg-[var(--ivory)] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-8 text-center lg:mb-14">
          <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{t.brandsEyebrow}</p>
          <h2 className="mt-3 text-3xl lg:text-4xl">{t.brandsTitle}</h2>
        </div>

        <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand, i) => (
            <Link
              key={brand.slug}
              href={localePath(locale, brandPath(brand.slug, brand.categories))}
              className={cn(
                "group flex h-16 items-center justify-center bg-[var(--ivory)] px-2 text-center transition-colors hover:bg-white sm:aspect-[3/2] sm:h-auto",
                i >= MOBILE_COUNT && "max-sm:hidden"
              )}
            >
              <span className="font-heading text-base font-light tracking-wide text-foreground/80 transition-colors group-hover:text-[var(--gold)] sm:text-lg">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>

        {all.length > MOBILE_COUNT && (
          <div className="mt-8 text-center lg:mt-12">
            <Link href={localePath(locale, "/brands")} className="inline-flex min-h-11 items-center border border-foreground px-6 text-xs tracking-[0.15em] uppercase">
              {dict.listing.allBrands} ({all.length})
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
