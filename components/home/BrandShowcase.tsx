import Link from "next/link";

import { getBrands } from "@/lib/data/catalog";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export async function BrandShowcase({ locale }: { locale: Locale }) {
  const brands = await getBrands();
  const t = getDictionary(locale).home;

  return (
    <section className="bg-[var(--ivory)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{t.brandsEyebrow}</p>
          <h2 className="mt-3 text-4xl">{t.brandsTitle}</h2>
        </div>

        <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={localePath(locale, `/brands/${brand.slug}`)}
              className="group flex aspect-[3/2] items-center justify-center bg-[var(--ivory)] transition-colors hover:bg-white"
            >
              <span className="font-heading text-lg font-light tracking-wide text-foreground/80 transition-colors group-hover:text-[var(--gold)]">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
