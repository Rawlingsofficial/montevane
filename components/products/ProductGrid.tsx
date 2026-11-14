import { ProductCard } from "@/components/products/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import type { ContactChannels, StoreProduct } from "@/lib/data/catalog";
import type { Locale } from "@/lib/i18n/config";
import { itemListLd } from "@/lib/seo/structured-data";

export function ProductGrid({
  products,
  locale,
  columns = 4,
}: {
  products: StoreProduct[];
  /** Unused since cards dropped the quick-contact button; kept so callers needn't change. */
  channels?: ContactChannels;
  locale: Locale;
  columns?: 3 | 4;
}) {
  return (
    <>
      <div className={`grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 ${columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
        {products.map((product, i) => (
          <ProductCard key={product.slug} product={product} locale={locale} priority={i < 4} />
        ))}
      </div>
      {products.length > 0 && <JsonLd data={itemListLd(locale, products)} />}
    </>
  );
}
