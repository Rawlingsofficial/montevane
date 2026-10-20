import "server-only";

import { and, asc, desc, eq, getTableColumns, isNull, lte, ne, or, sql, type SQL } from "drizzle-orm";

import { db, schema } from "@/lib/db";

// Storefront reads. Only published, released products are ever returned.

export type StoreProduct = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  collectionSlug: string;
  categorySlug: string;
  price: number;
  currency: string;
  color: string;
  materials: string;
  dimensions: string;
  weight: string;
  description: string;
  authenticityNotes: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  availability: "in_stock" | "pre_order" | "sold_out" | "coming_soon";
  images: { url: string; alt: string }[];
};

export const AVAILABILITY_LABEL: Record<StoreProduct["availability"], string> = {
  in_stock: "In Stock",
  pre_order: "Pre-Order",
  sold_out: "Sold Out",
  coming_soon: "Coming Soon",
};

const p = schema.products;

const isLive = and(eq(p.status, "published"), or(isNull(p.publishedAt), lte(p.publishedAt, sql`now()`)));

type ProductRow = typeof p.$inferSelect & { brandName: string | null };

function toStoreProduct(row: ProductRow): StoreProduct {
  const brand = row.brandName ?? row.brandSlug;
  const alt = row.mainImageAlt || `${brand} ${row.name}`;
  const extra = [...row.relatedImages]
    .sort((a, b) => a.position - b.position)
    .map((img, i) => ({ url: img.url, alt: `${alt} — photo ${i + 2}` }));

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand,
    brandSlug: row.brandSlug,
    collectionSlug: row.collectionSlug,
    categorySlug: row.categorySlug,
    price: row.price,
    currency: row.currency,
    color: row.color,
    materials: row.materials,
    dimensions: row.dimensions,
    weight: row.weight,
    description: row.description,
    authenticityNotes: row.authenticityNotes,
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    availability: row.availabilityStatus,
    images: [{ url: row.mainImageUrl, alt }, ...extra],
  };
}

function selectProducts(where: SQL | undefined) {
  return db
    .select({ ...getTableColumns(p), brandName: schema.brands.name })
    .from(p)
    .leftJoin(schema.brands, eq(schema.brands.slug, p.brandSlug))
    .where(and(isLive, where));
}

export async function getProducts(
  filter: { brand?: string; collection?: string; category?: string; excludeSlug?: string; limit?: number } = {}
): Promise<StoreProduct[]> {
  const query = selectProducts(
    and(
      filter.brand ? eq(p.brandSlug, filter.brand) : undefined,
      filter.collection ? eq(p.collectionSlug, filter.collection) : undefined,
      filter.category ? eq(p.categorySlug, filter.category) : undefined,
      filter.excludeSlug ? ne(p.slug, filter.excludeSlug) : undefined
    )
  )
    .orderBy(desc(p.createdAt))
    .limit(filter.limit ?? 200);

  return (await query).map(toStoreProduct);
}

export async function getProduct(slug: string): Promise<StoreProduct | null> {
  const [row] = await selectProducts(eq(p.slug, slug)).limit(1);
  return row ? toStoreProduct(row) : null;
}

export type StoreBrand = { slug: string; name: string; description: string | null };

export async function getBrands(): Promise<StoreBrand[]> {
  return db
    .select({ slug: schema.brands.slug, name: schema.brands.name, description: schema.brands.description })
    .from(schema.brands)
    .orderBy(asc(schema.brands.name));
}

export async function getCategories(): Promise<{ slug: string; name: string }[]> {
  return db
    .select({ slug: schema.categories.slug, name: schema.categories.name })
    .from(schema.categories)
    .orderBy(asc(schema.categories.sortOrder));
}

export type ContactChannels = {
  whatsapp: string | null;
  telegram: string | null;
  signal: string | null;
  phone: string | null;
  email: string | null;
};

export async function getContactChannels(): Promise<ContactChannels> {
  const [s] = await db.select().from(schema.storeSettings).where(eq(schema.storeSettings.id, 1));

  return {
    whatsapp: s?.whatsappNumber || null,
    telegram: s?.telegramUsername || null,
    signal: s?.signalNumber || null,
    phone: s?.phoneNumber || null,
    email: s?.contactEmail || null,
  };
}
