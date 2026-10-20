import Link from "next/link";

import { getBrands } from "@/lib/data/catalog";

export async function BrandShowcase() {
  const brands = await getBrands();

  return (
    <section className="bg-[var(--ivory)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">The Houses</p>
          <h2 className="mt-3 text-4xl">Shop by Brand</h2>
        </div>

        <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
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
