import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ProductForm } from "@/components/admin/ProductForm";
import { eq } from "drizzle-orm";

import { getCatalogOptions } from "@/lib/data/admin";
import { db, schema } from "@/lib/db";
import type { ProductFormValues } from "@/lib/validation/product";

type Params = Promise<{ id: string }>;

const localInput = (d: Date | null) => (d ? new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 16) : "");

function toFormValues(product: typeof schema.products.$inferSelect): ProductFormValues {
  return {
    id: product.id,
    brand_slug: product.brandSlug,
    category_slug: product.categorySlug,
    name: product.name,
    slug: product.slug,
    short_description: product.shortDescription,
    description: product.description,
    modifications: product.modifications ?? "",
    condition: product.condition === "new" ? "new" : "pre_owned",
    show_brand: product.showBrand,
    featured: product.featured,
    authenticity_notes: product.authenticityNotes ?? "",
    variants: product.variants.length ? product.variants : [{ name: "Standard", sku: product.sku, stock: 1, active: true }],
    availability_status: product.availabilityStatus,
    price: product.price,
    price_gbp: product.prices.GBP,
    price_eur: product.prices.EUR,
    promo_price: product.promoPrice ?? undefined,
    promo_starts_at: localInput(product.promoStartsAt),
    promo_ends_at: localInput(product.promoEndsAt),
    main_image_url: product.mainImageUrl,
    main_image_alt: product.mainImageAlt ?? "",
    related_images: product.relatedImages,
    color: product.color,
    materials: product.materials,
    dimensions: product.dimensions,
    weight: product.weight,
    facets: product.facets,
    specs: product.specs,
    collection_slugs: product.collectionSlugs.length ? product.collectionSlugs : [product.collectionSlug],
    tags: (product.tags ?? []).join(", "),
    meta_title: product.metaTitle ?? "",
    meta_description: product.metaDescription ?? "",
    i18n: product.i18n,
    status: product.status,
    scheduled_at: localInput(product.scheduledAt),
  };
}

export const metadata: Metadata = {
  title: "Edit Product — Admin | Montévane",
};

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  // A malformed id would make Postgres throw on the uuid cast.
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();

  const [[product], { brands, categories, collections }] = await Promise.all([
    db.select().from(schema.products).where(eq(schema.products.id, id)),
    getCatalogOptions(),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl">Edit Product</h1>
      <div className="mt-8">
        <ProductForm
          brands={brands}
          categories={categories}
          collections={collections}
          defaultValues={toFormValues(product)}
        />
      </div>
    </div>
  );
}
