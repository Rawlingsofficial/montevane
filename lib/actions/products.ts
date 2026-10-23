"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import type { ProductI18n } from "@/lib/db/schema";
import { pgErrorMessage } from "@/lib/db/errors";
import { productSchema, publishChecklist, type ProductFormValues } from "@/lib/validation/product";

export type SaveProductResult = { id: string } | { error: string };

export async function saveProduct(values: ProductFormValues): Promise<SaveProductResult> {
  const admin = await requireAdmin();

  const parsed = productSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid product data." };
  }
  const data = parsed.data;

  if (data.status !== "draft") {
    const missing = publishChecklist(data).find((item) => !item.ok);
    if (missing) return { error: `Can't publish yet: ${missing.label}. Save as draft or fix it first.` };
  }

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

  const variants = data.variants.map((v) => ({ ...v, name: v.name.trim(), sku: v.sku.trim() }));
  const stock = variants.filter((v) => v.active).reduce((sum, v) => sum + v.stock, 0);
  // Nothing left to sell means sold out; restocking flips it back.
  const availabilityStatus =
    data.availability_status === "in_stock" && stock === 0
      ? "sold_out"
      : data.availability_status === "sold_out" && stock > 0
        ? "in_stock"
        : data.availability_status;
  const date = (value?: string) => (value ? new Date(value) : null);

  const record = {
    brandSlug: data.brand_slug,
    name: data.name,
    // The first variant's SKU is the product's SKU (unique across products).
    sku: variants[0].sku,
    slug: data.slug,
    price: data.price,
    prices: { ...(data.price_gbp ? { GBP: data.price_gbp } : {}), ...(data.price_eur ? { EUR: data.price_eur } : {}) },
    promoPrice: data.promo_price ?? null,
    promoStartsAt: data.promo_price ? date(data.promo_starts_at) : null,
    promoEndsAt: data.promo_price ? date(data.promo_ends_at) : null,
    variants,
    color: data.color.trim(),
    materials: data.materials.trim(),
    dimensions: data.dimensions.trim(),
    weight: data.weight.trim(),
    facets: Object.fromEntries(Object.entries(data.facets).map(([k, v]) => [k, v.trim()]).filter(([, v]) => v)),
    specs: data.specs.map((r) => ({ label: r.label.trim(), value: r.value.trim() })).filter((r) => r.label && r.value),
    shortDescription: data.short_description.trim(),
    description: data.description.trim(),
    modifications: data.modifications?.trim() || null,
    showBrand: data.show_brand,
    featured: data.featured,
    authenticityNotes: data.authenticity_notes || null,
    mainImageUrl: data.main_image_url,
    mainImageAlt: data.main_image_alt || null,
    relatedImages: data.related_images,
    categorySlug: data.category_slug,
    collectionSlug: data.collection_slugs[0],
    collectionSlugs: data.collection_slugs,
    tags,
    metaTitle: data.meta_title || null,
    metaDescription: data.meta_description || null,
    i18n,
    availabilityStatus,
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
