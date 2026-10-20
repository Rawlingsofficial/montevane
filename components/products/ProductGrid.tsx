import { ProductCard } from "@/components/products/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import type { ContactChannels, StoreProduct } from "@/lib/data/catalog";
import type { Locale } from "@/lib/i18n/config";
import { itemListLd } from "@/lib/seo/structured-data";

export function ProductGrid({
  products,
  channels,
  locale,
  columns = 4,
}: {
  products: StoreProduct[];
  channels: ContactChannels;
  locale: Locale;
  columns?: 3 | 4;
}) {
  return (
    <>
      <div className={`grid grid-cols-2 gap-x-6 gap-y-12 ${columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} channels={channels} locale={locale} />
        ))}
      </div>
      {products.length > 0 && <JsonLd data={itemListLd(locale, products)} />}
    </>
  );
}
