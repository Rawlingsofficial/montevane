import { z } from "zod";

export const collectionSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1, "Slug is required"),
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().optional(),
  cover_image_url: z.string().optional(),
  featured: z.boolean(),
});

export type CollectionFormValues = z.infer<typeof collectionSchema>;
