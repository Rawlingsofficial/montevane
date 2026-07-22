import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PageHero } from "@/components/common/PageHero";
import { ProductCard } from "@/components/products/ProductCard";
import { BRANDS, PRODUCTS } from "@/lib/constants";
import { brandBanner } from "@/lib/images";

type Params = Promise<{ brand: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = BRANDS.find((b) => b.slug === brandSlug);
  if (!brand) return {};
  return { title: `${brand.name} — Montévane`, description: brand.description };
}

export default async function BrandPage({ params }: { params: Params }) {
  const { brand: brandSlug } = await params;
  const brand = BRANDS.find((b) => b.slug === brandSlug);
  if (!brand) notFound();

  const products = PRODUCTS.filter((p) => p.brandSlug === brand.slug);

  return (
    <>
      <PageHero eyebrow="The House Of" title={brand.name} description={brand.description} image={brandBanner(brand.slug)} priority />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl">Available Now</h2>
          <Link href="/brands" className="text-xs font-medium tracking-[0.15em] uppercase text-foreground/70 hover:text-[var(--gold)]">
            All Brands
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">New pieces from {brand.name} are on their way.</p>
        )}
      </section>
    </>
  );
}
