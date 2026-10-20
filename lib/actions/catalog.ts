"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { pgErrorMessage } from "@/lib/db/errors";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Adds a product category (e.g. Watches) or brand (e.g. Rolex) by name. */
export async function addCatalogEntry(kind: "categories" | "brands", name: string): Promise<{ error?: string }> {
  await requireAdmin();

  const trimmed = name.trim();
  const slug = slugify(trimmed);
  if (!slug) return { error: "Enter a name." };

  try {
    await db.insert(kind === "brands" ? schema.brands : schema.categories).values({ slug, name: trimmed });
  } catch (error) {
    return { error: pgErrorMessage(error, `"${trimmed}" already exists.`) };
  }

  revalidatePath("/", "layout");
  return {};
}
