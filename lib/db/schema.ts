import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

// Admin accounts. There is no public sign-up — admins are added from
// Settings or with `npm run admin:create`.
export const admins = pgTable("admins", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  passwordHash: text("password_hash").notNull(),
  createdAt,
});

// Brands and categories are tables so adding one is a data change, not a deploy.
export const brands = pgTable("brands", {
  slug: text("slug").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt,
});

export const categories = pgTable("categories", {
  slug: text("slug").primaryKey(),
  name: text("name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt,
});

export const collections = pgTable("collections", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  coverImageUrl: text("cover_image_url"),
  featured: boolean("featured").notNull().default(false),
  createdAt,
  updatedAt,
});

export type RelatedImage = { url: string; label: string; position: number };

/**
 * Per-language overrides for a product. English lives in the base columns;
 * "de"/"uz" fall back to English (and to generated SEO text) when empty.
 * `focusKeyword` is the search phrase the page is optimised for.
 */
export type ProductLocaleFields = {
  name?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
};
export type ProductI18n = Partial<Record<"en" | "de" | "uz", ProductLocaleFields>>;

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    brandSlug: text("brand_slug")
      .notNull()
      .references(() => brands.slug, { onUpdate: "cascade" }),
    categorySlug: text("category_slug")
      .notNull()
      .default("bags")
      .references(() => categories.slug, { onUpdate: "cascade" }),
    collectionSlug: text("collection_slug")
      .notNull()
      .references(() => collections.slug, { onUpdate: "cascade" }),
    name: text("name").notNull(),
    sku: text("sku").notNull().unique(),
    slug: text("slug").notNull().unique(),
    price: numeric("price", { precision: 12, scale: 2, mode: "number" }).notNull(),
    currency: text("currency").notNull().default("USD"),
    color: text("color").notNull(),
    materials: text("materials").notNull(),
    dimensions: text("dimensions").notNull(),
    weight: text("weight").notNull(),
    description: text("description").notNull(),
    authenticityNotes: text("authenticity_notes"),
    mainImageUrl: text("main_image_url").notNull(),
    mainImageAlt: text("main_image_alt"),
    relatedImages: jsonb("related_images").$type<RelatedImage[]>().notNull().default([]),
    tags: text("tags").array().notNull().default(sql`'{}'::text[]`),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    i18n: jsonb("i18n").$type<ProductI18n>().notNull().default({}),
    availabilityStatus: text("availability_status", {
      enum: ["in_stock", "pre_order", "sold_out", "coming_soon"],
    })
      .notNull()
      .default("in_stock"),
    condition: text("condition", { enum: ["new", "like_new", "excellent", "very_good"] })
      .notNull()
      .default("new"),
    status: text("status", { enum: ["draft", "published", "scheduled"] }).notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
    viewCount: integer("view_count").notNull().default(0),
    createdBy: uuid("created_by").references(() => admins.id, { onDelete: "set null" }),
    createdAt,
    updatedAt,
  },
  (t) => [
    check("products_price_positive", sql`${t.price} > 0`),
    index("idx_products_brand_slug").on(t.brandSlug),
    index("idx_products_category_slug").on(t.categorySlug),
    index("idx_products_collection_slug").on(t.collectionSlug),
    index("idx_products_status").on(t.status),
    index("idx_products_created_at").on(t.createdAt.desc()),
  ]
);

export const inquiries = pgTable(
  "inquiries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    country: text("country"),
    message: text("message"),
    productId: uuid("product_id").references(() => products.id, { onDelete: "set null" }),
    productName: text("product_name"),
    contactMethods: text("contact_methods").array().notNull().default(sql`'{}'::text[]`),
    paymentMethod: text("payment_method"),
    status: text("status", { enum: ["new", "contacted", "closed"] }).notNull().default("new"),
    createdAt,
  },
  (t) => [
    check("inquiries_reachable", sql`${t.email} is not null or ${t.phone} is not null`),
    index("idx_inquiries_status").on(t.status),
    index("idx_inquiries_created_at").on(t.createdAt.desc()),
  ]
);

// Singleton row (id = 1). Contact channels here appear on every product.
export const storeSettings = pgTable(
  "store_settings",
  {
    id: integer("id").primaryKey().default(1),
    storeName: text("store_name").notNull().default("Montévane"),
    storeEmail: text("store_email"),
    supportEmail: text("support_email"),
    newsletterSenderEmail: text("newsletter_sender_email"),
    phoneNumber: text("phone_number"),
    contactEmail: text("contact_email"),
    whatsappNumber: text("whatsapp_number"),
    telegramUsername: text("telegram_username"),
    signalNumber: text("signal_number"),
    updatedAt,
  },
  (t) => [check("store_settings_singleton", sql`${t.id} = 1`)]
);

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  subscribed: boolean("subscribed").notNull().default(true),
  createdAt,
});
