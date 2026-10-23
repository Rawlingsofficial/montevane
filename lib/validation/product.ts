import { z } from "zod";

export const relatedImageSchema = z.object({
  url: z.string(),
  label: z.string(),
  position: z.number(),
});

export const variantSchema = z.object({
  name: z.string().min(1, "Variant name is required"),
  sku: z.string().min(1, "SKU is required"),
  stock: z.number().int("Stock must be a whole number").min(0, "Stock can't be negative"),
  active: z.boolean(),
});

const specRowSchema = z.object({ label: z.string(), value: z.string() });

// Every field's input type matches its output type (no .coerce()/.default())
// so the zodResolver's inferred type lines up with a single useForm<T>
// generic — mixing coerce/default splits the input/output types apart and
// react-hook-form's resolver typing rejects that mismatch.
const localeFieldsSchema = z.object({
  name: z.string().max(100).optional(),
  description: z.string().max(4000).optional(),
  metaTitle: z.string().max(120).optional(),
  metaDescription: z.string().max(300).optional(),
  focusKeyword: z.string().max(120).optional(),
});

const optionalPrice = z.number().positive("Price must be above 0").optional();

// Drafts only need enough to be saved; the publish checklist below covers
// everything a customer-facing listing needs.
export const productSchema = z.object({
  id: z.string().uuid().optional(),
  // Details
  brand_slug: z.string().min(1, "Brand is required"),
  category_slug: z.string().min(1, "Category is required"),
  name: z.string().min(1, "Name is required").max(100),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug: lowercase letters, numbers and dashes only"),
  short_description: z.string().max(200, "Short description: 200 characters max"),
  description: z.string().max(4000),
  modifications: z.string().optional(),
  condition: z.enum(["new", "pre_owned", "like_new", "excellent", "very_good"]),
  show_brand: z.boolean(),
  featured: z.boolean(),
  authenticity_notes: z.string().optional(),
  // Variants & stock
  variants: z.array(variantSchema).min(1, "Add at least one variant"),
  availability_status: z.enum(["in_stock", "pre_order", "sold_out", "coming_soon"]),
  // Pricing (USD is the base price)
  price: z.number({ error: "USD price is required" }).positive("USD price is required"),
  price_gbp: optionalPrice,
  price_eur: optionalPrice,
  promo_price: optionalPrice,
  promo_starts_at: z.string().optional(),
  promo_ends_at: z.string().optional(),
  // Photos
  main_image_url: z.string(),
  main_image_alt: z.string().optional(),
  related_images: z.array(relatedImageSchema),
  // Specs & facets
  color: z.string(),
  materials: z.string(),
  dimensions: z.string(),
  weight: z.string(),
  facets: z.record(z.string(), z.string()),
  specs: z.array(specRowSchema),
  // Collections
  collection_slugs: z.array(z.string()).min(1, "Pick at least one collection"),
  tags: z.string().optional(),
  // SEO
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  i18n: z.object({ en: localeFieldsSchema.optional(), de: localeFieldsSchema.optional(), uz: localeFieldsSchema.optional() }),
  // Publishing
  status: z.enum(["draft", "published", "scheduled"]),
  scheduled_at: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export const SHORT_DESCRIPTION_MAX = 200;
export const DESCRIPTION_WORDS = { min: 120, max: 300 };
export const SEO_TITLE_MAX = 60;
export const SEO_DESCRIPTION = { min: 120, max: 155 };

export function wordCount(text: string | undefined): number {
  return (text ?? "").trim().split(/\s+/).filter(Boolean).length;
}

export type ChecklistItem = { label: string; ok: boolean; tab: string };

/** Everything that must be true before a product goes live (checked in the form and on save). */
export function publishChecklist(v: ProductFormValues): ChecklistItem[] {
  const words = wordCount(v.description);
  const activeVariants = v.variants.filter((x) => x.active);
  const promoOk =
    v.promo_price == null ||
    (v.promo_price < v.price && (!v.promo_starts_at || !v.promo_ends_at || v.promo_starts_at < v.promo_ends_at));
  const seoTitle = (v.meta_title ?? "").length;
  const seoDescription = (v.meta_description ?? "").length;

  return [
    { label: "Name, slug and short description", ok: Boolean(v.name && v.slug && v.short_description.trim()), tab: "details" },
    { label: `Description ${DESCRIPTION_WORDS.min}–${DESCRIPTION_WORDS.max} words (now ${words})`, ok: words >= DESCRIPTION_WORDS.min && words <= DESCRIPTION_WORDS.max, tab: "details" },
    { label: "At least one photo", ok: Boolean(v.main_image_url), tab: "photos" },
    { label: "An active variant with a SKU", ok: activeVariants.some((x) => x.sku.trim()), tab: "variants" },
    { label: "USD price set; promo lower than price, dates in order", ok: v.price > 0 && promoOk, tab: "pricing" },
    { label: "In at least one collection", ok: v.collection_slugs.length > 0, tab: "collections" },
    {
      label: `SEO title ≤ ${SEO_TITLE_MAX} chars, description ${SEO_DESCRIPTION.min}–${SEO_DESCRIPTION.max} (or empty for auto)`,
      ok: seoTitle <= SEO_TITLE_MAX && (seoDescription === 0 || (seoDescription >= SEO_DESCRIPTION.min && seoDescription <= SEO_DESCRIPTION.max)),
      tab: "seo",
    },
    { label: `Scheduled date set`, ok: v.status !== "scheduled" || Boolean(v.scheduled_at), tab: "publish" },
  ];
}
