import "server-only";

import { and, arrayContains, asc, desc, eq, getTableColumns, ilike, isNull, lte, ne, or, sql, type SQL } from "drizzle-orm";

import { db, schema } from "@/lib/db";
import type { ProductLocaleFields, RegionalPrices, SpecRow } from "@/lib/db/schema";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { BRAND_SUBCATEGORIES, JEWELRY_TYPES, WATCH_BRAND_ORDER } from "@/lib/catalog/taxonomy";
import { MODELS, type ModelPage } from "@/lib/seo/models";

// Storefront reads. Only published, released products are ever returned.
// Text fields come back in the requested locale, falling back to English.

export type StoreProduct = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  /** False for unbranded pieces: the brand name is not shown anywhere. */
  showBrand: boolean;
  /** Display name: brand + name, or just the name for unbranded pieces. */
  title: string;
  collectionSlug: string;
  categorySlug: string;
  price: number;
  currency: string;
  prices: RegionalPrices;
  promoPrice: number | null;
  promoStartsAt: Date | null;
  promoEndsAt: Date | null;
  featured: boolean;
  shortDescription: string;
  modifications: string | null;
  facets: Record<string, string>;
  specs: SpecRow[];
  color: string;
  materials: string;
  dimensions: string;
  weight: string;
  description: string;
  authenticityNotes: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  availability: "in_stock" | "pre_order" | "sold_out" | "coming_soon";
  condition: "new" | "pre_owned" | "like_new" | "excellent" | "very_good";
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
  const title = row.showBrand ? `${brand} ${name}` : name;
  const alt = row.mainImageAlt || title;
  const extra = [...row.relatedImages]
    .sort((a, b) => a.position - b.position)
    .map((img, i) => ({ url: img.url, alt: `${alt} — ${i + 2}` }));

  return {
    id: row.id,
    slug: row.slug,
    name,
    brand,
    brandSlug: row.brandSlug,
    showBrand: row.showBrand,
    title,
    collectionSlug: row.collectionSlug,
    categorySlug: row.categorySlug,
    price: row.price,
    currency: row.currency,
    prices: row.prices,
    promoPrice: row.promoPrice,
    promoStartsAt: row.promoStartsAt,
    promoEndsAt: row.promoEndsAt,
    featured: row.featured,
    shortDescription: row.shortDescription,
    modifications: row.modifications,
    facets: row.facets,
    specs: row.specs,
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
  /** Jewelry type, matched on the `piece_type` facet (Ring, Necklace…). */
  piece?: string;
  /** Free-text search: every word must match name, brand, reference or tags. */
  query?: string;
  excludeSlug?: string;
  limit?: number;
  offset?: number;
};

function filterWhere(filter: ProductFilter) {
  return and(
    filter.brand ? eq(p.brandSlug, filter.brand) : undefined,
    filter.nameMatches?.length ? or(...filter.nameMatches.map((t) => ilike(p.name, `%${t}%`))) : undefined,
    filter.collection
      ? or(eq(p.collectionSlug, filter.collection), arrayContains(p.collectionSlugs, [filter.collection]))
      : undefined,
    filter.category ? eq(p.categorySlug, filter.category) : undefined,
    filter.piece ? sql`${p.facets}->>'piece_type' = ${filter.piece}` : undefined,
    ...searchTerms(filter.query).map((term) => {
      const like = `%${term}%`;
      return sql`(${p.name} ilike ${like} or ${p.sku} ilike ${like} or ${p.brandSlug} in (select slug from ${schema.brands} where name ilike ${like})
        or array_to_string(${p.tags}, ' ') ilike ${like} or ${p.facets}->>'reference' ilike ${like})`;
    }),
    filter.excludeSlug ? ne(p.slug, filter.excludeSlug) : undefined
  );
}

/** Up to six search words, with LIKE wildcards escaped. */
function searchTerms(query: string | undefined): string[] {
  if (!query) return [];
  return query
    .normalize("NFKC")
    .split(/[\s,]+/)
    .map((w) => w.replace(/[\\%_]/g, (c) => `\\${c}`).trim())
    .filter((w) => w.length > 0)
    .slice(0, 6);
}

export async function getProducts(filter: ProductFilter = {}, locale: Locale = DEFAULT_LOCALE): Promise<StoreProduct[]> {
  const query = selectProducts(filterWhere(filter))
    .orderBy(desc(p.createdAt), asc(p.slug))
    .limit(filter.limit ?? 200)
    .offset(filter.offset ?? 0);

  return (await query).map((row) => toStoreProduct(row, locale));
}

export async function countProducts(filter: ProductFilter = {}): Promise<number> {
  const [row] = await db.select({ n: sql<number>`count(*)::int` }).from(p).where(and(isLive, filterWhere(filter)));
  return row?.n ?? 0;
}

export const PAGE_SIZE = 48;

/** One page of a listing; null when the page number is out of range. */
export async function getProductPage(filter: ProductFilter, page: number, locale: Locale) {
  const total = await countProducts(filter);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (page < 1 || page > pages) return null;
  const products = await getProducts({ ...filter, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }, locale);
  return { products, total, page, pages };
}

export async function getProduct(slug: string, locale: Locale = DEFAULT_LOCALE): Promise<StoreProduct | null> {
  const [row] = await selectProducts(eq(p.slug, slug)).limit(1);
  return row ? toStoreProduct(row, locale) : null;
}

/** Slugs and last-modified dates of every live product (sitemap, static params). */
export async function getProductIndex(): Promise<{ slug: string; updatedAt: Date }[]> {
  return db.select({ slug: p.slug, updatedAt: p.updatedAt }).from(p).where(isLive);
}

export type StoreBrand = {
  slug: string;
  name: string;
  description: string | null;
  /** Categories the brand has live products in (decides where its page lives). */
  categories: string[];
};

// Brands, categories and collections only appear on the storefront (links,
// menus, sitemap, their own pages) while they have at least one live product.
// The moment a product is published in one, it shows up; when the last one
// goes, it disappears again (admin saves revalidate the storefront).
const hasLive = (where: SQL) => sql`exists (select 1 from ${p} where ${isLive} and ${where})`;

export async function getBrands(): Promise<StoreBrand[]> {
  const b = schema.brands;
  const [brands, pairs] = await Promise.all([
    db
      .select({ slug: b.slug, name: b.name, description: b.description })
      .from(b)
      // Unbranded pieces sit under a house brand that is never shown.
      .where(hasLive(sql`${p.brandSlug} = ${b.slug} and ${p.showBrand}`))
      .orderBy(asc(b.name)),
    db.selectDistinct({ brand: p.brandSlug, category: p.categorySlug }).from(p).where(isLive),
  ]);
  return brands.map((brand) => ({
    ...brand,
    categories: pairs
      .filter((pair) => pair.brand === brand.slug)
      .map((pair) => pair.category)
      .sort(),
  }));
}

export type Subcategory = { slug: string; name: string; count: number };

/**
 * Live subcategories of a category: brands for Watches, piece types for
 * Jewelry (names come from the dictionary for those), none otherwise.
 */
export async function getSubcategories(category: string): Promise<Subcategory[]> {
  if (BRAND_SUBCATEGORIES.has(category)) {
    const rows = await db
      .select({ slug: schema.brands.slug, name: schema.brands.name, count: sql<number>`count(*)::int` })
      .from(p)
      .innerJoin(schema.brands, eq(schema.brands.slug, p.brandSlug))
      .where(and(isLive, eq(p.categorySlug, category), eq(p.showBrand, true)))
      .groupBy(schema.brands.slug, schema.brands.name);
    const rank = (slug: string) => {
      const i = WATCH_BRAND_ORDER.indexOf(slug);
      return i < 0 ? WATCH_BRAND_ORDER.length : i;
    };
    return rows.sort((a, b) => rank(a.slug) - rank(b.slug) || a.name.localeCompare(b.name));
  }
  if (category === "jewelry") {
    const rows = await db
      .select({ piece: sql<string>`${p.facets}->>'piece_type'`, count: sql<number>`count(*)::int` })
      .from(p)
      .where(and(isLive, eq(p.categorySlug, category)))
      .groupBy(sql`1`);
    const counts = new Map(rows.map((r) => [r.piece, r.count]));
    return JEWELRY_TYPES.filter((type) => counts.has(type.piece)).map((type) => ({
      slug: type.slug,
      name: type.piece,
      count: counts.get(type.piece)!,
    }));
  }
  return [];
}

/** The product filter for /shop/[category]/[sub]; null when `sub` isn't a live subcategory. */
export async function subcategoryFilter(category: string, sub: string): Promise<{ filter: ProductFilter; name: string } | null> {
  const found = (await getSubcategories(category)).find((s) => s.slug === sub);
  if (!found) return null;
  if (BRAND_SUBCATEGORIES.has(category)) return { filter: { category, brand: sub }, name: found.name };
  return { filter: { category, piece: found.name }, name: found.name };
}

export async function getCollections(): Promise<{ slug: string; name: string; description: string | null }[]> {
  const c = schema.collections;
  return db
    .select({ slug: c.slug, name: c.name, description: c.description })
    .from(c)
    .where(hasLive(sql`(${p.collectionSlug} = ${c.slug} or ${c.slug} = any(${p.collectionSlugs}))`))
    .orderBy(desc(c.featured), asc(c.name));
}

export async function getCategories(): Promise<{ slug: string; name: string }[]> {
  const c = schema.categories;
  return db
    .select({ slug: c.slug, name: c.name })
    .from(c)
    .where(hasLive(sql`${p.categorySlug} = ${c.slug}`))
    .orderBy(asc(c.sortOrder));
}

/** Model landing pages (Rolex Daytona, Cartier Love…) that currently have products. */
export async function getLiveModels(): Promise<ModelPage[]> {
  const counts = await Promise.all(
    MODELS.map((m) => countProducts({ brand: m.brandSlug, category: m.category, nameMatches: m.match }))
  );
  return MODELS.filter((_, i) => counts[i] > 0);
}

export type StoreProfile = { ownerName: string | null; ownerTitle: string | null; googleReviewUrl: string | null };

/** Owner name and Google review link from Settings (About / Contact pages). */
export async function getStoreProfile(): Promise<StoreProfile> {
  const [s] = await db.select().from(schema.storeSettings).where(eq(schema.storeSettings.id, 1));
  return { ownerName: s?.ownerName || null, ownerTitle: s?.ownerTitle || null, googleReviewUrl: s?.googleReviewUrl || null };
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
