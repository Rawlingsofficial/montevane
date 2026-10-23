ALTER TABLE "products" ADD COLUMN "short_description" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "modifications" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "show_brand" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "featured" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "variants" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "prices" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "promo_price" numeric(12, 2);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "promo_starts_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "promo_ends_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "specs" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "facets" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "collection_slugs" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
-- Existing products: one "Standard" variant and their current collection.
UPDATE "products" SET "variants" = jsonb_build_array(jsonb_build_object('name', 'Standard', 'sku', "sku", 'stock', CASE WHEN "availability_status" = 'sold_out' THEN 0 ELSE 1 END, 'active', true)) WHERE "variants" = '[]'::jsonb;--> statement-breakpoint
UPDATE "products" SET "collection_slugs" = ARRAY["collection_slug"] WHERE "collection_slugs" = '{}'::text[];
