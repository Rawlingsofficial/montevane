"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import type { ProductI18n } from "@/lib/db/schema";
import { pgErrorMessage } from "@/lib/db/errors";
import { productSchema, type ProductFormValues } from "@/lib/validation/product";

export type SaveProductResult = { id: string } | { error: string };

export async function saveProduct(values: ProductFormValues): Promise<SaveProductResult> {
  const admin = await requireAdmin();

  const parsed = productSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid product data." };
  }
  const data = parsed.data;

  const tags = (data.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  // Drop empty strings so storefront fallbacks (English, generated SEO) apply.
  const i18n: ProductI18n = {};
  for (const [locale, fields] of Object.entries(data.i18n)) {
    const kept = Object.fromEntries(Object.entries(fields ?? {}).filter(([, v]) => v?.trim()).map(([k, v]) => [k, v!.trim()]));
    if (Object.keys(kept).length) i18n[locale as keyof ProductI18n] = kept;
  }

  const record = {
    brandSlug: data.brand_slug,
    name: data.name,
    sku: data.sku,
    slug: data.slug,
    price: data.price,
    color: data.color,
    materials: data.materials,
    dimensions: data.dimensions,
    weight: data.weight,
    description: data.description,
    authenticityNotes: data.authenticity_notes || null,
    mainImageUrl: data.main_image_url,
    mainImageAlt: data.main_image_alt || null,
    relatedImages: data.related_images,
    categorySlug: data.category_slug,
    collectionSlug: data.collection_slug,
    tags,
    metaTitle: data.meta_title || null,
    metaDescription: data.meta_description || null,
    i18n,
    availabilityStatus: data.availability_status,
    condition: data.condition,
    status: data.status,
    scheduledAt: data.status === "scheduled" && data.scheduled_at ? new Date(data.scheduled_at) : null,
    publishedAt: data.status === "published" ? new Date() : null,
  };

  let id: string;
  try {
    if (data.id) {
      await db.update(schema.products).set(record).where(eq(schema.products.id, data.id));
      id = data.id;
    } else {
      const [row] = await db
        .insert(schema.products)
        .values({ ...record, createdBy: admin.id })
        .returning({ id: schema.products.id });
      id = row.id;
    }
  } catch (error) {
    return { error: pgErrorMessage(error, "That SKU or slug is already in use.") };
  }

  revalidatePath("/", "layout");
  return { id };
}

export async function deleteProduct(id: string): Promise<{ error?: string }> {
  await requireAdmin();
  await db.delete(schema.products).where(eq(schema.products.id, id));
  revalidatePath("/", "layout");
  return {};
}
