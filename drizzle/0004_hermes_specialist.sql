ALTER TABLE "products" ALTER COLUMN "category_slug" SET DEFAULT 'birkin-bags';--> statement-breakpoint
ALTER TABLE "store_settings" ADD COLUMN "owner_name" text;--> statement-breakpoint
ALTER TABLE "store_settings" ADD COLUMN "owner_title" text;--> statement-breakpoint
ALTER TABLE "store_settings" ADD COLUMN "google_review_url" text;--> statement-breakpoint
-- Hermès & rare watches specialist: Hermès categories replace the generic "bags".
INSERT INTO "categories" ("slug", "name", "sort_order") VALUES
  ('birkin-bags', 'Birkin Bags', 0),
  ('kelly-bags', 'Kelly Bags', 1),
  ('watches', 'Watches', 2),
  ('jewelry', 'Jewelry', 3),
  ('bag-charms', 'Bag Charms', 4),
  ('twilly-scarves', 'Twilly Scarves', 5),
  ('scarves-shawls', 'Scarves & Shawls', 6),
  ('bag-organizers', 'Bag Organizers', 7)
ON CONFLICT ("slug") DO UPDATE SET "name" = EXCLUDED."name", "sort_order" = EXCLUDED."sort_order";--> statement-breakpoint
UPDATE "products" SET "category_slug" = CASE WHEN "name" ILIKE '%kelly%' THEN 'kelly-bags' ELSE 'birkin-bags' END WHERE "category_slug" = 'bags';--> statement-breakpoint
DELETE FROM "categories" WHERE "slug" = 'bags';--> statement-breakpoint
-- Kelly Pochette was saved under the wrong house.
UPDATE "products" SET "brand_slug" = 'hermes' WHERE "brand_slug" = 'audemars-piguet' AND "name" ILIKE '%kelly%';--> statement-breakpoint
-- Other bag houses are no longer carried (only removed when nothing references them).
DELETE FROM "brands" b WHERE b."slug" IN ('chanel','louis-vuitton','loewe','gucci','prada','saint-laurent','dior','celine','burberry','givenchy','chloe','goyard')
  AND NOT EXISTS (SELECT 1 FROM "products" p WHERE p."brand_slug" = b."slug");--> statement-breakpoint
INSERT INTO "brands" ("slug", "name", "description") VALUES
  ('bag-bestie', 'Bag Bestie', 'Organizers, pillows and covers made to protect and shape Hermès Birkin and Kelly bags.'),
  ('baginizer', 'Baginizer', 'Felt bag organizers sized for the Hermès Birkin and Kelly.')
ON CONFLICT ("slug") DO NOTHING;--> statement-breakpoint
INSERT INTO "collections" ("slug", "name", "description", "featured") VALUES
  ('exotic-hermes', 'Exotic Hermès', 'Birkin and Kelly bags in crocodile, alligator, ostrich and lizard.', true),
  ('hss-special-order', 'Hermès Special Order (HSS)', 'Horseshoe-stamped special orders: one-off colour and hardware combinations.', false),
  ('pre-owned-hermes', 'Pre-Owned Hermès', 'Pre-owned Hermès bags and accessories, each graded and authenticated.', false),
  ('custom-rare', 'Custom & Rare', 'Customised and hard-to-find Hermès pieces.', false)
ON CONFLICT ("slug") DO NOTHING;
