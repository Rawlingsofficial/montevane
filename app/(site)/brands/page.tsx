import Link from "next/link";
import type { Metadata } from "next";

import { AssetImage } from "@/components/common/AssetImage";
import { PageHero } from "@/components/common/PageHero";
import { getBrands } from "@/lib/data/catalog";
import { brandBanner } from "@/lib/images";

export const metadata: Metadata = {
  title: "Brands — Montévane",
};

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <>
      <PageHero
        eyebrow="The Houses"
        title="Shop by Brand"
        description="Each house carries its own century of craft. Explore each house by name."
        image="hero_2"
      />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-border px-6 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
        {brands.map((brand) => (
          <Link key={brand.slug} href={`/brands/${brand.slug}`} className="group relative block overflow-hidden bg-background">
            <AssetImage
              base={brandBanner(brand.slug)}
              alt={brand.name}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="aspect-[4/3] transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="p-6">
              <h2 className="font-heading text-xl font-light">{brand.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{brand.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
