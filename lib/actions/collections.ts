"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { collectionSchema, type CollectionFormValues } from "@/lib/validation/collection";

export type SaveCollectionResult = { id: string } | { error: string };

export async function saveCollection(values: CollectionFormValues): Promise<SaveCollectionResult> {
  const parsed = collectionSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid collection data." };
  }
  const data = parsed.data;

  const supabase = await createClient();

  const record = {
    slug: data.slug,
    name: data.name,
    description: data.description || null,
    cover_image_url: data.cover_image_url || null,
    featured: data.featured,
  };

  let result;
  if (data.id) {
    result = await supabase.from("collections").update(record).eq("id", data.id).select("id").single();
  } else {
    result = await supabase.from("collections").insert(record).select("id").single();
  }

  if (result.error) {
    const message = result.error.code === "23505" ? "That slug is already in use." : result.error.message;
    return { error: message };
  }

  revalidatePath("/admin/collections");
  revalidatePath("/collections");

  return { id: result.data.id };
}

export async function deleteCollection(id: string, slug: string): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { count } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("collection_slug", slug);

  if (count && count > 0) {
    return { error: `${count} product${count === 1 ? "" : "s"} still use this collection. Reassign them first.` };
  }

  const { error } = await supabase.from("collections").delete().eq("id", id);
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/collections");
  revalidatePath("/collections");
  return {};
}
