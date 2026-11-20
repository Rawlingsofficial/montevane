import Link from "next/link";

import { ProductCard } from "@/components/products/ProductCard";
import { getProducts } from "@/lib/data/catalog";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export async function BestSellers({ locale }: { locale: Locale }) {
  // Newest per category, interleaved — so a run of new rings can't fill the row.
  const [birkins, watches, kellys, jewelry] = await Promise.all(
    ["birkin-bags", "watches", "kelly-bags", "jewelry"].map((category) => getProducts({ category, available: true, limit: 2 }, locale))
  );
  const products = [birkins[0], watches[0], kellys[0], jewelry[0], birkins[1], watches[1]].filter((x) => x !== undefined);
  const t = getDictionary(locale).home;
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="mb-8 flex lg:mb-12 items-end justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{t.latestEyebrow}</p>
          <h2 className="mt-3 text-3xl lg:text-4xl">{t.latestTitle}</h2>
        </div>
        <Link
          href={localePath(locale, "/products")}
          className="hidden text-xs font-medium tracking-[0.15em] uppercase text-foreground/70 hover:text-[var(--gold)] sm:block"
        >
          {t.viewAll}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} locale={locale} />
        ))}
      </div>
    </section>
  );
}
