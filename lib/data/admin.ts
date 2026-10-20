import "server-only";

import { asc } from "drizzle-orm";

import { db, schema } from "@/lib/db";

/** Dropdown options for the product form and Settings. */
export async function getCatalogOptions() {
  const [brands, categories, collections] = await Promise.all([
    db.select({ slug: schema.brands.slug, name: schema.brands.name }).from(schema.brands).orderBy(asc(schema.brands.name)),
    db
      .select({ slug: schema.categories.slug, name: schema.categories.name })
      .from(schema.categories)
      .orderBy(asc(schema.categories.sortOrder)),
    db
      .select({ slug: schema.collections.slug, name: schema.collections.name })
      .from(schema.collections)
      .orderBy(asc(schema.collections.name)),
  ]);
  return { brands, categories, collections };
}
