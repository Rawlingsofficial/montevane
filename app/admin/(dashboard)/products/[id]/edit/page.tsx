import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ProductForm } from "@/components/admin/ProductForm";
import { createClient } from "@/lib/supabase/server";

type Params = Promise<{ id: string }>;

export const metadata: Metadata = {
  title: "Edit Product — Admin | Montévane",
};

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: product }, { data: brands }, { data: collections }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single(),
    supabase.from("brands").select("slug, name").order("name"),
    supabase.from("collections").select("slug, name").order("name"),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl">Edit Product</h1>
      <div className="mt-8">
        <ProductForm
          brands={brands ?? []}
          collections={collections ?? []}
          defaultValues={{
            id: product.id,
            brand_slug: product.brand_slug,
            name: product.name,
            sku: product.sku,
            slug: product.slug,
            price: product.price,
            color: product.color,
            materials: product.materials,
            dimensions: product.dimensions,
            weight: product.weight,
            description: product.description,
            authenticity_notes: product.authenticity_notes ?? "",
            main_image_url: product.main_image_url,
            main_image_alt: product.main_image_alt ?? "",
            related_images: product.related_images ?? [],
            collection_slug: product.collection_slug,
            tags: (product.tags ?? []).join(", "),
            meta_title: product.meta_title ?? "",
            meta_description: product.meta_description ?? "",
            whatsapp_number: product.whatsapp_number ?? "",
            whatsapp_enabled: product.whatsapp_enabled,
            availability_status: product.availability_status,
            condition: product.condition,
            status: product.status,
            scheduled_at: product.scheduled_at ?? "",
          }}
        />
      </div>
    </div>
  );
}
