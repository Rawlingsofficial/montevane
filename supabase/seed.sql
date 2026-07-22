-- Montévane — seed data
-- Mirrors lib/constants.ts so the storefront has real rows to switch to once
-- the frontend is wired up to Supabase instead of the hardcoded constants.

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
  ('chloe', 'Chloé', 'Bohemian romanticism rooted in effortless femininity.');

insert into collections (slug, name, description, featured) values
  ('new-arrivals', 'New Arrivals', 'The latest additions to the vault.', true),
  ('best-sellers', 'Best Sellers', 'Our most sought-after pieces.', true),
  ('limited-edition', 'Limited Edition', 'Rare finds, once gone forever.', false),
  ('classic-heritage', 'Classic Heritage', 'Timeless icons that never fade.', false);

insert into products (
  brand_slug, name, sku, slug, price, color, materials, dimensions, weight,
  description, main_image_url, main_image_alt, related_images,
  collection_slug, whatsapp_number, meta_title, meta_description,
  availability_status, status, published_at
) values
  (
    'hermes', 'Birkin 25 Togo', 'HERMES-ETO-25-0001', 'hermes-birkin-25-togo', 24500,
    'Etoupe', 'Togo calfskin leather, palladium-tone hardware', '9.8 × 7.9 × 5.5 in', '1.5 lbs',
    'An icon of quiet power. The Birkin 25 in Togo leather carries the weight of its own legend — hand-stitched saddle seams, a single silhouette that has outlasted every trend since 1984.',
    '/images/products/hermes-birkin-25-togo/main.jpg', 'Hermès Birkin 25 Togo',
    '[{"url":"/images/products/hermes-birkin-25-togo/angle.jpg","label":"Angle Shot","position":0},{"url":"/images/products/hermes-birkin-25-togo/detail.jpg","label":"Detail / Interior","position":1},{"url":"/images/products/hermes-birkin-25-togo/side.jpg","label":"Side View","position":2},{"url":"/images/products/hermes-birkin-25-togo/back.jpg","label":"Back View","position":3}]'::jsonb,
    'limited-edition', '+237600000000', 'Birkin 25 Togo - Hermès | Montévane', 'Hermès Birkin 25 Togo. Authentic luxury handbag, verified and delivered with care.',
    'pre_order', 'published', now()
  ),
  (
    'chanel', 'Classic Flap Bag', 'CHANEL-BLK-MD-0002', 'chanel-classic-flap-black', 8800,
    'Black', 'Quilted lambskin leather, gold-tone hardware', '10 × 6.3 × 2.5 in', '1.3 lbs',
    'The diamond-quilted silhouette that defined a century of French elegance. Carried on a chain-and-leather strap, finished with the iconic CC turn-lock.',
    '/images/products/chanel-classic-flap-black/main.jpg', 'Chanel Classic Flap Bag',
    '[{"url":"/images/products/chanel-classic-flap-black/angle.jpg","label":"Angle Shot","position":0},{"url":"/images/products/chanel-classic-flap-black/detail.jpg","label":"Detail / Interior","position":1},{"url":"/images/products/chanel-classic-flap-black/side.jpg","label":"Side View","position":2},{"url":"/images/products/chanel-classic-flap-black/back.jpg","label":"Back View","position":3}]'::jsonb,
    'best-sellers', '+237600000000', 'Classic Flap Bag - Chanel | Montévane', 'Chanel Classic Flap Bag. Authentic luxury handbag, verified and delivered with care.',
    'in_stock', 'published', now()
  ),
  (
    'louis-vuitton', 'Neverfull MM Monogram', 'LV-MONO-MM-0003', 'lv-neverfull-mm-monogram', 2150,
    'Monogram Canvas', 'Coated monogram canvas, natural cowhide leather trim', '12.6 × 11.0 × 6.7 in', '1.9 lbs',
    'The everyday tote reimagined. Spacious, structured, and instantly recognizable, the Neverfull MM pairs monogram canvas with supple leather trim.',
    '/images/products/lv-neverfull-mm-monogram/main.jpg', 'Louis Vuitton Neverfull MM Monogram',
    '[{"url":"/images/products/lv-neverfull-mm-monogram/angle.jpg","label":"Angle Shot","position":0},{"url":"/images/products/lv-neverfull-mm-monogram/detail.jpg","label":"Detail / Interior","position":1},{"url":"/images/products/lv-neverfull-mm-monogram/side.jpg","label":"Side View","position":2},{"url":"/images/products/lv-neverfull-mm-monogram/back.jpg","label":"Back View","position":3}]'::jsonb,
    'new-arrivals', '+237600000000', 'Neverfull MM Monogram - Louis Vuitton | Montévane', 'Louis Vuitton Neverfull MM Monogram. Authentic luxury handbag, verified and delivered with care.',
    'in_stock', 'published', now()
  ),
  (
    'loewe', 'Puzzle Bag Small', 'LOEWE-CAR-SM-0004', 'loewe-puzzle-bag-small', 3450,
    'Caramel', 'Calfskin leather, geometric panel construction', '10.2 × 6.7 × 4.7 in', '1.4 lbs',
    'An architectural study in leather. The Puzzle''s geometric panels fold into an origami-like silhouette that unfolds into a surprisingly spacious interior.',
    '/images/products/loewe-puzzle-bag-small/main.jpg', 'LOEWE Puzzle Bag Small',
    '[{"url":"/images/products/loewe-puzzle-bag-small/angle.jpg","label":"Angle Shot","position":0},{"url":"/images/products/loewe-puzzle-bag-small/detail.jpg","label":"Detail / Interior","position":1},{"url":"/images/products/loewe-puzzle-bag-small/side.jpg","label":"Side View","position":2},{"url":"/images/products/loewe-puzzle-bag-small/back.jpg","label":"Back View","position":3}]'::jsonb,
    'new-arrivals', '+237600000000', 'Puzzle Bag Small - LOEWE | Montévane', 'LOEWE Puzzle Bag Small. Authentic luxury handbag, verified and delivered with care.',
    'in_stock', 'published', now()
  ),
  (
    'gucci', 'GG Marmont Small Shoulder Bag', 'GUCCI-BUR-SM-0005', 'gucci-marmont-small-shoulder', 2980,
    'Burgundy', 'Matelassé chevron leather, antique gold-tone hardware', '9.4 × 5.5 × 2.8 in', '1.1 lbs',
    'Chevron-quilted leather and the double-G hardware make this Marmont a modern staple, equally at home day and night.',
    '/images/products/gucci-marmont-small-shoulder/main.jpg', 'Gucci GG Marmont Small Shoulder Bag',
    '[{"url":"/images/products/gucci-marmont-small-shoulder/angle.jpg","label":"Angle Shot","position":0},{"url":"/images/products/gucci-marmont-small-shoulder/detail.jpg","label":"Detail / Interior","position":1},{"url":"/images/products/gucci-marmont-small-shoulder/side.jpg","label":"Side View","position":2},{"url":"/images/products/gucci-marmont-small-shoulder/back.jpg","label":"Back View","position":3}]'::jsonb,
    'best-sellers', '+237600000000', 'GG Marmont Small Shoulder Bag - Gucci | Montévane', 'Gucci GG Marmont Small Shoulder Bag. Authentic luxury handbag, verified and delivered with care.',
    'in_stock', 'published', now()
  ),
  (
    'prada', 'Re-Edition 2005', 'PRADA-BLK-NY-0006', 'prada-re-edition-2005', 2600,
    'Black Nylon', 'Recycled Re-Nylon, saffiano leather trim', '8.7 × 5.9 × 2.4 in', '0.9 lbs',
    'A revival of the archive icon. The Re-Edition 2005 pairs technical Re-Nylon with the enamel triangle logo, worn on the shoulder or across the body.',
    '/images/products/prada-re-edition-2005/main.jpg', 'Prada Re-Edition 2005',
    '[{"url":"/images/products/prada-re-edition-2005/angle.jpg","label":"Angle Shot","position":0},{"url":"/images/products/prada-re-edition-2005/detail.jpg","label":"Detail / Interior","position":1},{"url":"/images/products/prada-re-edition-2005/side.jpg","label":"Side View","position":2},{"url":"/images/products/prada-re-edition-2005/back.jpg","label":"Back View","position":3}]'::jsonb,
    'new-arrivals', '+237600000000', 'Re-Edition 2005 - Prada | Montévane', 'Prada Re-Edition 2005. Authentic luxury handbag, verified and delivered with care.',
    'in_stock', 'published', now()
  ),
  (
    'saint-laurent', 'LouLou Medium', 'YSL-NOI-MD-0007', 'ysl-loulou-medium', 2890,
    'Noir', 'Quilted "Y" leather, bronze-tone hardware', '12.0 × 8.0 × 4.0 in', '1.6 lbs',
    'A slouched, oversized quilt pattern gives the LouLou its signature ease — worn low on the shoulder, the way Saint Laurent intended.',
    '/images/products/ysl-loulou-medium/main.jpg', 'Saint Laurent LouLou Medium',
    '[{"url":"/images/products/ysl-loulou-medium/angle.jpg","label":"Angle Shot","position":0},{"url":"/images/products/ysl-loulou-medium/detail.jpg","label":"Detail / Interior","position":1},{"url":"/images/products/ysl-loulou-medium/side.jpg","label":"Side View","position":2},{"url":"/images/products/ysl-loulou-medium/back.jpg","label":"Back View","position":3}]'::jsonb,
    'best-sellers', '+237600000000', 'LouLou Medium - Saint Laurent | Montévane', 'Saint Laurent LouLou Medium. Authentic luxury handbag, verified and delivered with care.',
    'in_stock', 'published', now()
  ),
  (
    'dior', 'Lady Dior Medium', 'DIOR-CAN-MD-0008', 'dior-lady-dior-medium', 6200,
    'Cannage Black', 'Cannage-stitched lambskin, gold-tone Dior charms', '9.4 × 7.1 × 3.5 in', '1.4 lbs',
    'Named for a princess, defined by its cannage stitching. The Lady Dior carries dangling gold letter charms as a quiet signature of couture heritage.',
    '/images/products/dior-lady-dior-medium/main.jpg', 'Dior Lady Dior Medium',
    '[{"url":"/images/products/dior-lady-dior-medium/angle.jpg","label":"Angle Shot","position":0},{"url":"/images/products/dior-lady-dior-medium/detail.jpg","label":"Detail / Interior","position":1},{"url":"/images/products/dior-lady-dior-medium/side.jpg","label":"Side View","position":2},{"url":"/images/products/dior-lady-dior-medium/back.jpg","label":"Back View","position":3}]'::jsonb,
    'classic-heritage', '+237600000000', 'Lady Dior Medium - Dior | Montévane', 'Dior Lady Dior Medium. Authentic luxury handbag, verified and delivered with care.',
    'in_stock', 'published', now()
  ),
  (
    'celine', 'Triomphe Canvas Bag', 'CELINE-TAN-ST-0009', 'celine-triomphe-canvas', 3100,
    'Tan', 'Triomphe canvas, calfskin leather trim', '9.1 × 6.7 × 3.1 in', '1.2 lbs',
    'Understated and structured, the Triomphe canvas bag carries Celine''s interlocking emblem in a silhouette built for everyday permanence.',
    '/images/products/celine-triomphe-canvas/main.jpg', 'Celine Triomphe Canvas Bag',
    '[{"url":"/images/products/celine-triomphe-canvas/angle.jpg","label":"Angle Shot","position":0},{"url":"/images/products/celine-triomphe-canvas/detail.jpg","label":"Detail / Interior","position":1},{"url":"/images/products/celine-triomphe-canvas/side.jpg","label":"Side View","position":2},{"url":"/images/products/celine-triomphe-canvas/back.jpg","label":"Back View","position":3}]'::jsonb,
    'classic-heritage', '+237600000000', 'Triomphe Canvas Bag - Celine | Montévane', 'Celine Triomphe Canvas Bag. Authentic luxury handbag, verified and delivered with care.',
    'sold_out', 'published', now()
  ),
  (
    'burberry', 'Lola Small Bag', 'BURBERRY-BEI-SM-0010', 'burberry-lola-small', 2390,
    'Archive Beige', 'Quilted leather, House Check lining', '9.8 × 7.5 × 3.1 in', '1.2 lbs',
    'Named for a house muse, the Lola pairs a soft, rounded silhouette with the archive check lining synonymous with British heritage.',
    '/images/products/burberry-lola-small/main.jpg', 'Burberry Lola Small Bag',
    '[{"url":"/images/products/burberry-lola-small/angle.jpg","label":"Angle Shot","position":0},{"url":"/images/products/burberry-lola-small/detail.jpg","label":"Detail / Interior","position":1},{"url":"/images/products/burberry-lola-small/side.jpg","label":"Side View","position":2},{"url":"/images/products/burberry-lola-small/back.jpg","label":"Back View","position":3}]'::jsonb,
    'new-arrivals', '+237600000000', 'Lola Small Bag - Burberry | Montévane', 'Burberry Lola Small Bag. Authentic luxury handbag, verified and delivered with care.',
    'in_stock', 'published', now()
  ),
  (
    'givenchy', 'Antigona Small', 'GIVENCHY-BLK-SM-0011', 'givenchy-antigona-small', 2750,
    'Black', 'Grained calfskin leather, polished hardware', '9.8 × 7.9 × 4.7 in', '1.5 lbs',
    'Sharp, structured, architectural. The Antigona''s trapeze silhouette and double zip have made it a modern classic since 2011.',
    '/images/products/givenchy-antigona-small/main.jpg', 'Givenchy Antigona Small',
    '[{"url":"/images/products/givenchy-antigona-small/angle.jpg","label":"Angle Shot","position":0},{"url":"/images/products/givenchy-antigona-small/detail.jpg","label":"Detail / Interior","position":1},{"url":"/images/products/givenchy-antigona-small/side.jpg","label":"Side View","position":2},{"url":"/images/products/givenchy-antigona-small/back.jpg","label":"Back View","position":3}]'::jsonb,
    'classic-heritage', '+237600000000', 'Antigona Small - Givenchy | Montévane', 'Givenchy Antigona Small. Authentic luxury handbag, verified and delivered with care.',
    'in_stock', 'published', now()
  ),
  (
    'chloe', 'Marcie Bucket Bag', 'CHLOE-PNK-BK-0012', 'chloe-marcie-bucket', 2450,
    'Chalky Pink', 'Grained calfskin leather, saddle-stitched horseshoe detail', '9.4 × 9.8 × 5.1 in', '1.3 lbs',
    'Soft, slouched, and finished with the house''s saddle-stitched horseshoe hardware, the Marcie brings Chloé''s romantic ease to a bucket silhouette.',
    '/images/products/chloe-marcie-bucket/main.jpg', 'Chloé Marcie Bucket Bag',
    '[{"url":"/images/products/chloe-marcie-bucket/angle.jpg","label":"Angle Shot","position":0},{"url":"/images/products/chloe-marcie-bucket/detail.jpg","label":"Detail / Interior","position":1},{"url":"/images/products/chloe-marcie-bucket/side.jpg","label":"Side View","position":2},{"url":"/images/products/chloe-marcie-bucket/back.jpg","label":"Back View","position":3}]'::jsonb,
    'limited-edition', '+237600000000', 'Marcie Bucket Bag - Chloé | Montévane', 'Chloé Marcie Bucket Bag. Authentic luxury handbag, verified and delivered with care.',
    'in_stock', 'published', now()
  );
