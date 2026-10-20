import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ProductForm } from "@/components/admin/ProductForm";
import { eq } from "drizzle-orm";

import { getCatalogOptions } from "@/lib/data/admin";
import { db, schema } from "@/lib/db";

type Params = Promise<{ id: string }>;

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
          defaultValues={{
            id: product.id,
            brand_slug: product.brandSlug,
            name: product.name,
            sku: product.sku,
            slug: product.slug,
            price: product.price,
            color: product.color,
            materials: product.materials,
            dimensions: product.dimensions,
            weight: product.weight,
            description: product.description,
            authenticity_notes: product.authenticityNotes ?? "",
            main_image_url: product.mainImageUrl,
            main_image_alt: product.mainImageAlt ?? "",
            related_images: product.relatedImages,
            category_slug: product.categorySlug,
            collection_slug: product.collectionSlug,
            tags: (product.tags ?? []).join(", "),
            meta_title: product.metaTitle ?? "",
            meta_description: product.metaDescription ?? "",
            availability_status: product.availabilityStatus,
            condition: product.condition,
            status: product.status,
            scheduled_at: product.scheduledAt ? product.scheduledAt.toISOString().slice(0, 16) : "",
          }}
        />
      </div>
    </div>
  );
}
