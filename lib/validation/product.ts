import { z } from "zod";

export const relatedImageSchema = z.object({
  url: z.string(),
  label: z.string(),
  position: z.number(),
});

// Every field's input type matches its output type (no .coerce()/.default())
// so the zodResolver's inferred type lines up with a single useForm<T>
// generic — mixing coerce/default splits the input/output types apart and
// react-hook-form's resolver typing rejects that mismatch.
export const productSchema = z.object({
  id: z.string().uuid().optional(),
  brand_slug: z.string().min(1, "Brand is required"),
  name: z.string().min(1, "Name is required").max(100),
  sku: z.string().min(1, "SKU is required"),
  slug: z.string().min(1, "Slug is required"),
  price: z.number().min(500, "Minimum price is $500").max(50000, "Maximum price is $50,000"),
  color: z.string().min(1, "Color is required"),
  materials: z.string().min(1, "Materials are required"),
  dimensions: z.string().min(1, "Dimensions are required"),
  weight: z.string().min(1, "Weight is required"),
  description: z.string().min(1, "Description is required").max(1000),
  authenticity_notes: z.string().optional(),
  main_image_url: z.string().min(1, "Main product photo is required"),
  main_image_alt: z.string().optional(),
  related_images: z.array(relatedImageSchema),
  collection_slug: z.string().min(1, "Collection is required"),
  tags: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  whatsapp_number: z.string().optional(),
  whatsapp_enabled: z.boolean(),
  availability_status: z.enum(["in_stock", "pre_order", "sold_out", "coming_soon"]),
  condition: z.enum(["new", "like_new", "excellent", "very_good"]),
  status: z.enum(["draft", "published", "scheduled"]),
  scheduled_at: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
