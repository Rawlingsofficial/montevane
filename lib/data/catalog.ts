import "server-only";

import { and, asc, desc, eq, getTableColumns, ilike, isNull, lte, ne, or, sql, type SQL } from "drizzle-orm";

import { db, schema } from "@/lib/db";
import type { ProductLocaleFields } from "@/lib/db/schema";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

// Storefront reads. Only published, released products are ever returned.
// Text fields come back in the requested locale, falling back to English.

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
  condition: "new" | "like_new" | "excellent" | "very_good";
  /** Locale-specific overrides (focus keyword, SEO title/description). */
  seo: ProductLocaleFields;
  images: { url: string; alt: string }[];
  updatedAt: Date;
};

const p = schema.products;

const isLive = and(eq(p.status, "published"), or(isNull(p.publishedAt), lte(p.publishedAt, sql`now()`)));

type ProductRow = typeof p.$inferSelect & { brandName: string | null };

function toStoreProduct(row: ProductRow, locale: Locale): StoreProduct {
  const local = (locale !== DEFAULT_LOCALE && row.i18n[locale]) || {};
  const brand = row.brandName ?? row.brandSlug;
  const name = local.name || row.name;
  const alt = row.mainImageAlt || `${brand} ${name}`;
  const extra = [...row.relatedImages]
    .sort((a, b) => a.position - b.position)
    .map((img, i) => ({ url: img.url, alt: `${alt} — ${i + 2}` }));

  return {
    id: row.id,
    slug: row.slug,
    name,
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
    description: local.description || row.description,
    authenticityNotes: row.authenticityNotes,
    metaTitle: locale === DEFAULT_LOCALE ? row.metaTitle : local.metaTitle || null,
    metaDescription: locale === DEFAULT_LOCALE ? row.metaDescription : local.metaDescription || null,
    availability: row.availabilityStatus,
    condition: row.condition,
    seo: row.i18n[locale] ?? {},
    images: [{ url: row.mainImageUrl, alt }, ...extra],
    updatedAt: row.updatedAt,
  };
}

function selectProducts(where: SQL | undefined) {
  return db
    .select({ ...getTableColumns(p), brandName: schema.brands.name })
    .from(p)
    .leftJoin(schema.brands, eq(schema.brands.slug, p.brandSlug))
    .where(and(isLive, where));
}

export type ProductFilter = {
  brand?: string;
  collection?: string;
  category?: string;
  /** Any of these terms in the product name (model landing pages). */
  nameMatches?: string[];
  excludeSlug?: string;
  limit?: number;
};

export async function getProducts(filter: ProductFilter = {}, locale: Locale = DEFAULT_LOCALE): Promise<StoreProduct[]> {
  const query = selectProducts(
    and(
      filter.brand ? eq(p.brandSlug, filter.brand) : undefined,
      filter.nameMatches?.length ? or(...filter.nameMatches.map((t) => ilike(p.name, `%${t}%`))) : undefined,
      filter.collection ? eq(p.collectionSlug, filter.collection) : undefined,
      filter.category ? eq(p.categorySlug, filter.category) : undefined,
      filter.excludeSlug ? ne(p.slug, filter.excludeSlug) : undefined
    )
  )
    .orderBy(desc(p.createdAt))
    .limit(filter.limit ?? 200);

  return (await query).map((row) => toStoreProduct(row, locale));
}

export async function getProduct(slug: string, locale: Locale = DEFAULT_LOCALE): Promise<StoreProduct | null> {
  const [row] = await selectProducts(eq(p.slug, slug)).limit(1);
  return row ? toStoreProduct(row, locale) : null;
}

/** Slugs and last-modified dates of every live product (sitemap, static params). */
export async function getProductIndex(): Promise<{ slug: string; updatedAt: Date }[]> {
  return db.select({ slug: p.slug, updatedAt: p.updatedAt }).from(p).where(isLive);
}

export type StoreBrand = { slug: string; name: string; description: string | null };

export async function getBrands(): Promise<StoreBrand[]> {
  return db
    .select({ slug: schema.brands.slug, name: schema.brands.name, description: schema.brands.description })
    .from(schema.brands)
    .orderBy(asc(schema.brands.name));
}

export async function getCollections(): Promise<{ slug: string; name: string; description: string | null }[]> {
  return db
    .select({ slug: schema.collections.slug, name: schema.collections.name, description: schema.collections.description })
    .from(schema.collections)
    .orderBy(desc(schema.collections.featured), asc(schema.collections.name));
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
  tiktok: string | null;
};

export async function getContactChannels(): Promise<ContactChannels> {
  const [s] = await db.select().from(schema.storeSettings).where(eq(schema.storeSettings.id, 1));

  return {
    whatsapp: s?.whatsappNumber || null,
    telegram: s?.telegramUsername || null,
    signal: s?.signalNumber || null,
    phone: s?.phoneNumber || null,
    email: s?.contactEmail || null,
    tiktok: s?.tiktokUrl || null,
  };
}
