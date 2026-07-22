import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AssetImage } from "@/components/common/AssetImage";
import { ProductAccordion } from "@/components/products/ProductAccordion";
import { ProductCard } from "@/components/products/ProductCard";
import { AddToCart } from "@/components/products/AddToCart";
import { PRODUCTS } from "@/lib/constants";
import { PRODUCT_GALLERY, productImage } from "@/lib/images";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.brand} | Montévane`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.brandSlug === product.brandSlug && p.slug !== product.slug).slice(0, 4);
  const relatedFallback = related.length > 0 ? related : PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <nav className="mb-8 text-xs tracking-[0.1em] text-muted-foreground uppercase">
        <Link href="/products" className="hover:text-foreground">
          Products
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/brands/${product.brandSlug}`} className="hover:text-foreground">
          {product.brand}
        </Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="grid grid-cols-2 gap-3">
          <AssetImage
            base={productImage(product.slug)}
            alt={`${product.brand} ${product.name}`}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="col-span-2 aspect-square"
          />
          {PRODUCT_GALLERY.map((shot) => (
            <AssetImage
              key={shot.label}
              base={shot.base}
              alt={`${product.name} — ${shot.label}`}
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="aspect-square"
            />
          ))}
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-[var(--gold)] uppercase">{product.brand}</p>
          <h1 className="mt-2 font-heading text-3xl font-light sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-xl">{currency.format(product.price)}</p>
          <p
            className={`mt-2 text-xs font-medium tracking-[0.1em] uppercase ${
              product.availability === "In Stock" ? "text-[var(--gold)]" : "text-muted-foreground"
            }`}
          >
            {product.availability}
          </p>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <AddToCart disabled={product.availability === "Sold Out"} />

          <div className="mt-10">
            <ProductAccordion
              items={[
                { title: "Description", content: product.description },
                {
                  title: "Details",
                  content: `Color: ${product.color}. Materials: ${product.materials}. Dimensions: ${product.dimensions}. Weight: ${product.weight}.`,
                },
                {
                  title: "Shipping",
                  content: "Fully insured worldwide shipping, tracked door to door. Most orders arrive within 5–7 business days.",
                },
                {
                  title: "Authenticity",
                  content: "Every piece is verified by an independent authenticator before listing, with certification included at delivery.",
                },
                {
                  title: "Returns",
                  content: "Easy 30-day returns on unused pieces in original packaging with all tags and authentication cards intact.",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="text-2xl">You May Also Like</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {relatedFallback.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
