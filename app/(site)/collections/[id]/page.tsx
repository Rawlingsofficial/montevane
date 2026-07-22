import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PageHero } from "@/components/common/PageHero";
import { ProductCard } from "@/components/products/ProductCard";
import { COLLECTIONS, PRODUCTS } from "@/lib/constants";
import { collectionImage } from "@/lib/images";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === id);
  if (!collection) return {};
  return { title: `${collection.name} — Montévane`, description: collection.description };
}

export default async function CollectionPage({ params }: { params: Params }) {
  const { id } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === id);
  if (!collection) notFound();

  const products = PRODUCTS.filter((p) => p.collectionSlug === collection.slug);

  return (
    <>
      <PageHero eyebrow="Collection" title={collection.name} description={collection.description} image={collectionImage(collection.slug)} priority />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl">In This Collection</h2>
          <Link href="/collections" className="text-xs font-medium tracking-[0.15em] uppercase text-foreground/70 hover:text-[var(--gold)]">
            All Collections
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">This collection is being curated. Check back soon.</p>
        )}
      </section>
    </>
  );
}
