import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/common/PageHero";
import { ProductCard } from "@/components/products/ProductCard";
import { BRANDS, COLLECTIONS, PRODUCTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All Products — Montévane",
};

type SearchParams = Promise<{ collection?: string; brand?: string }>;

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const { collection, brand } = await searchParams;

  const products = PRODUCTS.filter((p) => {
    if (collection && p.collectionSlug !== collection) return false;
    if (brand && p.brandSlug !== brand) return false;
    return true;
  });

  const activeCollectionName = COLLECTIONS.find((c) => c.slug === collection)?.name;
  const activeBrandName = BRANDS.find((b) => b.slug === brand)?.name;

  return (
    <>
      <PageHero
        eyebrow="The Collection"
        title={activeBrandName ?? activeCollectionName ?? "All Products"}
        image="hero_4"
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          <FilterPill href="/products" active={!collection && !brand} label="All" />
          {COLLECTIONS.map((c) => (
            <FilterPill
              key={c.slug}
              href={`/products?collection=${c.slug}${brand ? `&brand=${brand}` : ""}`}
              active={collection === c.slug}
              label={c.name}
            />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 border-t border-border pt-3">
          {BRANDS.map((b) => (
            <FilterPill
              key={b.slug}
              href={`/products?brand=${b.slug}${collection ? `&collection=${collection}` : ""}`}
              active={brand === b.slug}
              label={b.name}
            />
          ))}
        </div>

        <p className="mt-8 text-xs tracking-[0.1em] text-muted-foreground uppercase">
          {products.length} {products.length === 1 ? "Piece" : "Pieces"}
        </p>

        {products.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
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
