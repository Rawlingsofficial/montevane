"use server";

import { count, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { pgErrorMessage } from "@/lib/db/errors";
import { collectionSchema, type CollectionFormValues } from "@/lib/validation/collection";

export type SaveCollectionResult = { id: string } | { error: string };

export async function saveCollection(values: CollectionFormValues): Promise<SaveCollectionResult> {
  await requireAdmin();

  const parsed = collectionSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid collection data." };
  }
  const data = parsed.data;

  const record = {
    slug: data.slug,
    name: data.name,
    description: data.description || null,
    coverImageUrl: data.cover_image_url || null,
    featured: data.featured,
  };

  let id: string;
  try {
    if (data.id) {
      await db.update(schema.collections).set(record).where(eq(schema.collections.id, data.id));
      id = data.id;
    } else {
      const [row] = await db.insert(schema.collections).values(record).returning({ id: schema.collections.id });
      id = row.id;
    }
  } catch (error) {
    return { error: pgErrorMessage(error, "That slug is already in use.") };
  }

  revalidatePath("/[locale]", "layout");
  return { id };
}

export async function deleteCollection(id: string, slug: string): Promise<{ error?: string }> {
  await requireAdmin();

  const [{ n }] = await db
    .select({ n: count() })
    .from(schema.products)
    .where(eq(schema.products.collectionSlug, slug));

  if (n > 0) {
    return { error: `${n} product${n === 1 ? "" : "s"} still use this collection. Reassign them first.` };
  }

  await db.delete(schema.collections).where(eq(schema.collections.id, id));
  revalidatePath("/[locale]", "layout");
  return {};
}
