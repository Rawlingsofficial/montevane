import Link from "next/link";

import { ProductCard } from "@/components/products/ProductCard";
import { getContactChannels, getProducts } from "@/lib/data/catalog";

export async function BestSellers() {
  const [products, channels] = await Promise.all([getProducts({ limit: 6 }), getContactChannels()]);
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="mb-14 flex items-end justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">Just In</p>
          <h2 className="mt-3 text-4xl">Latest Pieces</h2>
        </div>
        <Link
          href="/products"
          className="hidden text-xs font-medium tracking-[0.15em] uppercase text-foreground/70 hover:text-[var(--gold)] sm:block"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} channels={channels} />
        ))}
      </div>
    </section>
  );
}
