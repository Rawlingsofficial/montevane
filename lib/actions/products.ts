"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { productSchema, type ProductFormValues } from "@/lib/validation/product";

export type SaveProductResult = { id: string } | { error: string };

export async function saveProduct(values: ProductFormValues): Promise<SaveProductResult> {
  const parsed = productSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid product data." };
  }
  const data = parsed.data;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const tags = (data.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const record = {
    brand_slug: data.brand_slug,
    name: data.name,
    sku: data.sku,
    slug: data.slug,
    price: data.price,
    color: data.color,
    materials: data.materials,
    dimensions: data.dimensions,
    weight: data.weight,
    description: data.description,
    authenticity_notes: data.authenticity_notes || null,
    main_image_url: data.main_image_url,
    main_image_alt: data.main_image_alt || `${data.brand_slug} ${data.name}`,
    related_images: data.related_images,
    collection_slug: data.collection_slug,
    tags,
    meta_title: data.meta_title || `${data.name} - ${data.brand_slug} | Montévane`,
    meta_description: data.meta_description || data.description.slice(0, 160),
    whatsapp_number: data.whatsapp_number || null,
    whatsapp_enabled: data.whatsapp_enabled,
    availability_status: data.availability_status,
    condition: data.condition,
    status: data.status,
    scheduled_at: data.status === "scheduled" && data.scheduled_at ? data.scheduled_at : null,
    published_at: data.status === "published" ? new Date().toISOString() : null,
  };

  let result;
  if (data.id) {
    result = await supabase.from("products").update(record).eq("id", data.id).select("id").single();
  } else {
    result = await supabase
      .from("products")
      .insert({ ...record, created_by: user?.id ?? null })
      .select("id")
      .single();
  }

  if (result.error) {
    return { error: result.error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${data.slug}`);

  return { id: result.data.id };
}

export async function deleteProduct(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  return {};
}
