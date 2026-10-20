import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/common/PageHero";
import { ProductCard } from "@/components/products/ProductCard";
import { COLLECTIONS } from "@/lib/constants";
import { getBrands, getCategories, getContactChannels, getProducts } from "@/lib/data/catalog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All Products — Montévane",
};

type SearchParams = Promise<{ collection?: string; brand?: string; category?: string }>;

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const { collection, brand, category } = await searchParams;

  const [products, brands, categories, channels] = await Promise.all([
    getProducts({ collection, brand, category }),
    getBrands(),
    getCategories(),
    getContactChannels(),
  ]);

  // Builds a filter URL that keeps the other active filters.
  const href = (next: { collection?: string; brand?: string; category?: string }) => {
    const q = new URLSearchParams(Object.entries({ collection, brand, category, ...next }).filter(([, v]) => v) as [string, string][]);
    return q.size ? `/products?${q}` : "/products";
  };

  const activeCollectionName = COLLECTIONS.find((c) => c.slug === collection)?.name;
  const activeBrandName = brands.find((b) => b.slug === brand)?.name;
  const activeCategoryName = categories.find((c) => c.slug === category)?.name;

  return (
    <>
      <PageHero
        eyebrow="The Collection"
        title={activeBrandName ?? activeCategoryName ?? activeCollectionName ?? "All Products"}
        image="hero_4"
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          <FilterPill href="/products" active={!collection && !brand && !category} label="All" />
          {categories.map((c) => (
            <FilterPill key={c.slug} href={href({ category: c.slug })} active={category === c.slug} label={c.name} />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 border-t border-border pt-3">
          {COLLECTIONS.map((c) => (
            <FilterPill key={c.slug} href={href({ collection: c.slug })} active={collection === c.slug} label={c.name} />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 border-t border-border pt-3">
          {brands.map((b) => (
            <FilterPill key={b.slug} href={href({ brand: b.slug })} active={brand === b.slug} label={b.name} />
          ))}
        </div>

        <p className="mt-8 text-xs tracking-[0.1em] text-muted-foreground uppercase">
          {products.length} {products.length === 1 ? "Piece" : "Pieces"}
        </p>

        {products.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} channels={channels} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            No pieces currently match this selection.
          </p>
        )}
      </section>
    </>
  );
}

function FilterPill({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-1.5 text-xs font-medium tracking-[0.1em] uppercase transition-colors",
        active ? "bg-foreground text-background" : "bg-transparent text-foreground/60 hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
}
