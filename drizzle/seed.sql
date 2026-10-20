-- Montévane — seed data
-- Reference data: brands, categories, collections, the settings row, and one
-- reference product per collection (three photos each) to copy from when
-- listing real pieces. Safe to re-run — existing rows are left alone.

insert into store_settings (id) values (1) on conflict do nothing;

insert into categories (slug, name, sort_order) values
  ('bags', 'Bags', 0),
  ('watches', 'Watches', 1),
  ('jewelry', 'Jewelry', 2)
on conflict do nothing;

insert into brands (slug, name, description) values
  ('hermes', 'Hermès', 'The pinnacle of French leather craftsmanship since 1837.'),
  ('chanel', 'Chanel', 'Timeless Parisian elegance defined by the quilted flap.'),
  ('louis-vuitton', 'Louis Vuitton', 'The house that made the monogram a global icon.'),
  ('loewe', 'LOEWE', 'Spanish heritage leathercraft reimagined for the modern era.'),
  ('gucci', 'Gucci', 'Italian maximalism and eclectic luxury from Florence.'),
  ('prada', 'Prada', 'Minimalist innovation and quiet confidence from Milan.'),
  ('saint-laurent', 'Saint Laurent', 'Effortless Parisian cool with an edge of rock and roll.'),
  ('dior', 'Dior', 'Haute couture heritage, carried in every stitch.'),
  ('celine', 'Celine', 'Understated Parisian luxury built for everyday wear.'),
  ('burberry', 'Burberry', 'British heritage craftsmanship with a modern silhouette.'),
  ('givenchy', 'Givenchy', 'Structured French elegance with architectural precision.'),
  ('chloe', 'Chloé', 'Bohemian romanticism rooted in effortless femininity.')
on conflict do nothing;

insert into collections (slug, name, description, featured) values
  ('new-arrivals', 'New Arrivals', 'The latest additions to the vault.', true),
  ('best-sellers', 'Best Sellers', 'Our most sought-after pieces.', true),
  ('limited-edition', 'Limited Edition', 'Rare finds, once gone forever.', false),
  ('classic-heritage', 'Classic Heritage', 'Timeless icons that never fade.', false)
on conflict do nothing;

insert into products (
  brand_slug, name, sku, slug, price, color, materials, dimensions, weight,
  description, main_image_url, main_image_alt, related_images,
  collection_slug, meta_title, meta_description,
  availability_status, status, published_at
) values
  (
    'hermes', 'Birkin 25 Togo', 'HERMES-ETO-25-0001', 'hermes-birkin-25-togo', 24500,
    'Etoupe', 'Togo calfskin leather, palladium-tone hardware', '9.8 × 7.9 × 5.5 in', '1.5 lbs',
    'An icon of quiet power. The Birkin 25 in Togo leather carries the weight of its own legend — hand-stitched saddle seams, a single silhouette that has outlasted every trend since 1984.',
    '/images/web_optimized/product_front.webp', 'Hermès Birkin 25 Togo',
    '[{"url":"/images/web_optimized/product_45deg.webp","label":"Photo 2","position":0},{"url":"/images/web_optimized/product_interior.webp","label":"Photo 3","position":1}]'::jsonb,
    'limited-edition', 'Birkin 25 Togo - Hermès | Montévane', 'Hermès Birkin 25 Togo. Authentic luxury handbag, verified and delivered with care.',
    'pre_order', 'published', now()
  ),
  (
    'chanel', 'Classic Flap Bag', 'CHANEL-BLK-MD-0002', 'chanel-classic-flap-black', 8800,
    'Black', 'Quilted lambskin leather, gold-tone hardware', '10 × 6.3 × 2.5 in', '1.3 lbs',
    'The diamond-quilted silhouette that defined a century of French elegance. Carried on a chain-and-leather strap, finished with the iconic CC turn-lock.',
    '/images/web_optimized/product_front.webp', 'Chanel Classic Flap Bag',
    '[{"url":"/images/web_optimized/product_45deg.webp","label":"Photo 2","position":0},{"url":"/images/web_optimized/product_interior.webp","label":"Photo 3","position":1}]'::jsonb,
    'best-sellers', 'Classic Flap Bag - Chanel | Montévane', 'Chanel Classic Flap Bag. Authentic luxury handbag, verified and delivered with care.',
    'in_stock', 'published', now()
  ),
  (
    'louis-vuitton', 'Neverfull MM Monogram', 'LV-MONO-MM-0003', 'lv-neverfull-mm-monogram', 2150,
    'Monogram Canvas', 'Coated monogram canvas, natural cowhide leather trim', '12.6 × 11.0 × 6.7 in', '1.9 lbs',
    'The everyday tote reimagined. Spacious, structured, and instantly recognizable, the Neverfull MM pairs monogram canvas with supple leather trim.',
    '/images/web_optimized/product_front.webp', 'Louis Vuitton Neverfull MM Monogram',
    '[{"url":"/images/web_optimized/product_45deg.webp","label":"Photo 2","position":0},{"url":"/images/web_optimized/product_interior.webp","label":"Photo 3","position":1}]'::jsonb,
    'new-arrivals', 'Neverfull MM Monogram - Louis Vuitton | Montévane', 'Louis Vuitton Neverfull MM Monogram. Authentic luxury handbag, verified and delivered with care.',
    'in_stock', 'published', now()
  ),
  (
    'dior', 'Lady Dior Medium', 'DIOR-CAN-MD-0008', 'dior-lady-dior-medium', 6200,
    'Cannage Black', 'Cannage-stitched lambskin, gold-tone Dior charms', '9.4 × 7.1 × 3.5 in', '1.4 lbs',
    'Named for a princess, defined by its cannage stitching. The Lady Dior carries dangling gold letter charms as a quiet signature of couture heritage.',
    '/images/web_optimized/product_front.webp', 'Dior Lady Dior Medium',
    '[{"url":"/images/web_optimized/product_45deg.webp","label":"Photo 2","position":0},{"url":"/images/web_optimized/product_interior.webp","label":"Photo 3","position":1}]'::jsonb,
    'classic-heritage', 'Lady Dior Medium - Dior | Montévane', 'Dior Lady Dior Medium. Authentic luxury handbag, verified and delivered with care.',
    'in_stock', 'published', now()
  )
on conflict do nothing;
