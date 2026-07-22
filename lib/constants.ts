export const SITE_NAME = "Montévane";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "New Arrivals", href: "/products?collection=new-arrivals" },
  { label: "Brands", href: "/brands" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
] as const;

export type Brand = {
  name: string;
  slug: string;
  description: string;
};

export const BRANDS: Brand[] = [
  { name: "Hermès", slug: "hermes", description: "The pinnacle of French leather craftsmanship since 1837." },
  { name: "Chanel", slug: "chanel", description: "Timeless Parisian elegance defined by the quilted flap." },
  { name: "Louis Vuitton", slug: "louis-vuitton", description: "The house that made the monogram a global icon." },
  { name: "LOEWE", slug: "loewe", description: "Spanish heritage leathercraft reimagined for the modern era." },
  { name: "Gucci", slug: "gucci", description: "Italian maximalism and eclectic luxury from Florence." },
  { name: "Prada", slug: "prada", description: "Minimalist innovation and quiet confidence from Milan." },
  { name: "Saint Laurent", slug: "saint-laurent", description: "Effortless Parisian cool with an edge of rock and roll." },
  { name: "Dior", slug: "dior", description: "Haute couture heritage, carried in every stitch." },
  { name: "Celine", slug: "celine", description: "Understated Parisian luxury built for everyday wear." },
  { name: "Burberry", slug: "burberry", description: "British heritage craftsmanship with a modern silhouette." },
  { name: "Givenchy", slug: "givenchy", description: "Structured French elegance with architectural precision." },
  { name: "Chloé", slug: "chloe", description: "Bohemian romanticism rooted in effortless femininity." },
];

export type Collection = {
  name: string;
  slug: string;
  description: string;
};

export const COLLECTIONS: Collection[] = [
  { name: "New Arrivals", slug: "new-arrivals", description: "The latest additions to the collection." },
  { name: "Best Sellers", slug: "best-sellers", description: "Our most sought-after pieces." },
  { name: "Limited Edition", slug: "limited-edition", description: "Rare finds, once gone forever." },
  { name: "Classic Heritage", slug: "classic-heritage", description: "Timeless icons that never fade." },
];

export type Product = {
  slug: string;
  brand: string;
  brandSlug: string;
  name: string;
  price: number;
  collection: string;
  collectionSlug: string;
  color: string;
  materials: string;
  dimensions: string;
  weight: string;
  description: string;
  availability: "In Stock" | "Pre-Order" | "Sold Out";
};

export const PRODUCTS: Product[] = [
  {
    slug: "hermes-birkin-25-togo",
    brand: "Hermès",
    brandSlug: "hermes",
    name: "Birkin 25 Togo",
    price: 24500,
    collection: "Limited Edition",
    collectionSlug: "limited-edition",
    color: "Etoupe",
    materials: "Togo calfskin leather, palladium-tone hardware",
    dimensions: "9.8 × 7.9 × 5.5 in",
    weight: "1.5 lbs",
    description:
      "An icon of quiet power. The Birkin 25 in Togo leather carries the weight of its own legend — hand-stitched saddle seams, a single silhouette that has outlasted every trend since 1984.",
    availability: "Pre-Order",
  },
  {
    slug: "chanel-classic-flap-black",
    brand: "Chanel",
    brandSlug: "chanel",
    name: "Classic Flap Bag",
    price: 8800,
    collection: "Best Sellers",
    collectionSlug: "best-sellers",
    color: "Black",
    materials: "Quilted lambskin leather, gold-tone hardware",
    dimensions: "10 × 6.3 × 2.5 in",
    weight: "1.3 lbs",
    description:
      "The diamond-quilted silhouette that defined a century of French elegance. Carried on a chain-and-leather strap, finished with the iconic CC turn-lock.",
    availability: "In Stock",
  },
  {
    slug: "lv-neverfull-mm-monogram",
    brand: "Louis Vuitton",
    brandSlug: "louis-vuitton",
    name: "Neverfull MM Monogram",
    price: 2150,
    collection: "New Arrivals",
    collectionSlug: "new-arrivals",
    color: "Monogram Canvas",
    materials: "Coated monogram canvas, natural cowhide leather trim",
    dimensions: "12.6 × 11.0 × 6.7 in",
    weight: "1.9 lbs",
    description:
      "The everyday tote reimagined. Spacious, structured, and instantly recognizable, the Neverfull MM pairs monogram canvas with supple leather trim.",
    availability: "In Stock",
  },
  {
    slug: "loewe-puzzle-bag-small",
    brand: "LOEWE",
    brandSlug: "loewe",
    name: "Puzzle Bag Small",
    price: 3450,
    collection: "New Arrivals",
    collectionSlug: "new-arrivals",
    color: "Caramel",
    materials: "Calfskin leather, geometric panel construction",
    dimensions: "10.2 × 6.7 × 4.7 in",
    weight: "1.4 lbs",
    description:
      "An architectural study in leather. The Puzzle's geometric panels fold into an origami-like silhouette that unfolds into a surprisingly spacious interior.",
    availability: "In Stock",
  },
  {
    slug: "gucci-marmont-small-shoulder",
    brand: "Gucci",
    brandSlug: "gucci",
    name: "GG Marmont Small Shoulder Bag",
    price: 2980,
    collection: "Best Sellers",
    collectionSlug: "best-sellers",
    color: "Burgundy",
    materials: "Matelassé chevron leather, antique gold-tone hardware",
    dimensions: "9.4 × 5.5 × 2.8 in",
    weight: "1.1 lbs",
    description:
      "Chevron-quilted leather and the double-G hardware make this Marmont a modern staple, equally at home day and night.",
    availability: "In Stock",
  },
  {
    slug: "prada-re-edition-2005",
    brand: "Prada",
    brandSlug: "prada",
    name: "Re-Edition 2005",
    price: 2600,
    collection: "New Arrivals",
    collectionSlug: "new-arrivals",
    color: "Black Nylon",
    materials: "Recycled Re-Nylon, saffiano leather trim",
    dimensions: "8.7 × 5.9 × 2.4 in",
    weight: "0.9 lbs",
    description:
      "A revival of the archive icon. The Re-Edition 2005 pairs technical Re-Nylon with the enamel triangle logo, worn on the shoulder or across the body.",
    availability: "In Stock",
  },
  {
    slug: "ysl-loulou-medium",
    brand: "Saint Laurent",
    brandSlug: "saint-laurent",
    name: "LouLou Medium",
    price: 2890,
    collection: "Best Sellers",
    collectionSlug: "best-sellers",
    color: "Noir",
    materials: "Quilted \"Y\" leather, bronze-tone hardware",
    dimensions: "12.0 × 8.0 × 4.0 in",
    weight: "1.6 lbs",
    description:
      "A slouched, oversized quilt pattern gives the LouLou its signature ease — worn low on the shoulder, the way Saint Laurent intended.",
    availability: "In Stock",
  },
  {
    slug: "dior-lady-dior-medium",
    brand: "Dior",
    brandSlug: "dior",
    name: "Lady Dior Medium",
    price: 6200,
    collection: "Classic Heritage",
    collectionSlug: "classic-heritage",
    color: "Cannage Black",
    materials: "Cannage-stitched lambskin, gold-tone Dior charms",
    dimensions: "9.4 × 7.1 × 3.5 in",
    weight: "1.4 lbs",
    description:
      "Named for a princess, defined by its cannage stitching. The Lady Dior carries dangling gold letter charms as a quiet signature of couture heritage.",
    availability: "In Stock",
  },
  {
    slug: "celine-triomphe-canvas",
    brand: "Celine",
    brandSlug: "celine",
    name: "Triomphe Canvas Bag",
    price: 3100,
    collection: "Classic Heritage",
    collectionSlug: "classic-heritage",
    color: "Tan",
    materials: "Triomphe canvas, calfskin leather trim",
    dimensions: "9.1 × 6.7 × 3.1 in",
    weight: "1.2 lbs",
    description:
      "Understated and structured, the Triomphe canvas bag carries Celine's interlocking emblem in a silhouette built for everyday permanence.",
    availability: "Sold Out",
  },
  {
    slug: "burberry-lola-small",
    brand: "Burberry",
    brandSlug: "burberry",
    name: "Lola Small Bag",
    price: 2390,
    collection: "New Arrivals",
    collectionSlug: "new-arrivals",
    color: "Archive Beige",
    materials: "Quilted leather, House Check lining",
    dimensions: "9.8 × 7.5 × 3.1 in",
    weight: "1.2 lbs",
    description:
      "Named for a house muse, the Lola pairs a soft, rounded silhouette with the archive check lining synonymous with British heritage.",
    availability: "In Stock",
  },
  {
    slug: "givenchy-antigona-small",
    brand: "Givenchy",
    brandSlug: "givenchy",
    name: "Antigona Small",
    price: 2750,
    collection: "Classic Heritage",
    collectionSlug: "classic-heritage",
    color: "Black",
    materials: "Grained calfskin leather, polished hardware",
    dimensions: "9.8 × 7.9 × 4.7 in",
    weight: "1.5 lbs",
    description:
      "Sharp, structured, architectural. The Antigona's trapeze silhouette and double zip have made it a modern classic since 2011.",
    availability: "In Stock",
  },
  {
    slug: "chloe-marcie-bucket",
    brand: "Chloé",
    brandSlug: "chloe",
    name: "Marcie Bucket Bag",
    price: 2450,
    collection: "Limited Edition",
    collectionSlug: "limited-edition",
    color: "Chalky Pink",
    materials: "Grained calfskin leather, saddle-stitched horseshoe detail",
    dimensions: "9.4 × 9.8 × 5.1 in",
    weight: "1.3 lbs",
    description:
      "Soft, slouched, and finished with the house's saddle-stitched horseshoe hardware, the Marcie brings Chloé's romantic ease to a bucket silhouette.",
    availability: "In Stock",
  },
];

export const FEATURED_PRODUCTS: Product[] = PRODUCTS.filter((p) =>
  ["hermes-birkin-25-togo", "chanel-classic-flap-black", "lv-neverfull-mm-monogram", "dior-lady-dior-medium", "loewe-puzzle-bag-small", "ysl-loulou-medium"].includes(
    p.slug
  )
);

export const WHY_SHOP = [
  {
    title: "Authenticity Guaranteed",
    description: "Every bag is verified by expert authenticators before it reaches you.",
  },
  {
    title: "Secure Worldwide Delivery",
    description: "Fully insured, tracked shipping with signature on delivery.",
  },
  {
    title: "Luxury Packaging",
    description: "An unboxing experience worthy of what's inside.",
  },
  {
    title: "Personal Concierge",
    description: "Dedicated care from first inquiry to final delivery.",
  },
] as const;

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  body: string[];
};

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "inside-the-atelier",
    title: "Inside the Atelier: The Craft Behind the Stitch",
    excerpt: "A single Hermès bag can take upward of eighteen hours in the hands of one artisan. We go behind the workbench.",
    category: "Craftsmanship",
    date: "2026-06-02",
    body: [
      "Every great handbag begins long before the first cut of leather — in the selection of hides, the training of hands, and the patience of a house willing to let a single artisan see a piece from start to finish.",
      "Saddle stitching, the technique that underpins nearly every luxury house's most iconic silhouettes, uses two needles and a single waxed thread pulled through each hole at an angle — a method that, unlike a sewing machine's lockstitch, won't unravel even if a thread breaks.",
      "It is slow. It is expensive. And it is precisely why the bags that carry it endure for decades rather than seasons.",
    ],
  },
  {
    slug: "brief-history-of-the-quilt",
    title: "A Brief History of the Quilted Bag",
    excerpt: "From equestrian blankets to the Chanel 2.55, how a padding technique became a status symbol.",
    category: "Heritage",
    date: "2026-05-18",
    body: [
      "The diamond quilt pattern predates fashion entirely — it was borrowed from the padded jackets worn by jockeys, prized for the way stitched channels of fill kept their shape under stress.",
      "Coco Chanel adapted it for the 2.55 in February 1955, using the quilting not for warmth but for structure, allowing a soft leather bag to hold its silhouette without the interior armature most handbags relied on.",
      "Seventy years later, nearly every house has its own take on the quilt — proof that the best ideas in leather goods rarely stay in one atelier for long.",
    ],
  },
  {
    slug: "how-to-authenticate-a-luxury-handbag",
    title: "How to Authenticate a Luxury Handbag",
    excerpt: "Serial numbers, stitch counts, and the details counterfeiters still get wrong.",
    category: "Guides",
    date: "2026-05-04",
    body: [
      "Authentication begins with weight and smell — genuine leather has a density and scent that coated synthetics rarely replicate convincingly, even to a casual hand.",
      "Stitch count matters more than most buyers realize: authentic houses hold themselves to a consistent number of stitches per inch, while counterfeit workshops optimize for speed over precision.",
      "Every bag we carry passes through a multi-point inspection by an independent authenticator before it's listed — hardware, date codes, lining, and stitch geometry, all cross-referenced against house archives.",
    ],
  },
  {
    slug: "spring-editorial-pastels-and-patent",
    title: "Spring Editorial: Pastels & Patent Leather",
    excerpt: "This season's palette trades the house's usual neutrals for something softer.",
    category: "Editorial",
    date: "2026-04-20",
    body: [
      "Spring calls for a different kind of luxury — one that trades the deep blacks and cognacs of winter for chalky pastels and the occasional flash of patent shine.",
      "We styled this season's arrivals against the quiet backdrop of early morning light, letting the bags carry the color story on their own.",
    ],
  },
  {
    slug: "the-rise-of-the-micro-bag",
    title: "The Rise of the Micro Bag",
    excerpt: "Function gave way to form years ago. Here's why the smallest bags command the largest prices.",
    category: "Trends",
    date: "2026-03-29",
    body: [
      "A bag that can barely hold a phone and a card case now routinely outsells its full-size counterpart — a shift that says less about utility and more about what luxury is being asked to signal.",
      "The micro bag isn't meant to carry your day. It's meant to announce that you don't need to.",
    ],
  },
  {
    slug: "caring-for-your-investment-piece",
    title: "Caring for Your Investment Piece",
    excerpt: "Storage, conditioning, and the mistakes that quietly shorten a bag's life.",
    category: "Guides",
    date: "2026-03-11",
    body: [
      "Leather is a living material — it breathes, it dries out, and it reacts to the conditions it's kept in far more than most owners realize.",
      "Stuff bags with their dust bag or acid-free tissue before storing, never plastic, which traps moisture and encourages mold on natural leather.",
      "Condition sparingly, no more than twice a year for most calfskins, and always test on an inconspicuous panel first.",
    ],
  },
];

export const SOCIAL_LINKS = {
  tiktok: "https://www.tiktok.com/@montevane",
} as const;

export const CONTACT_INFO = {
  email: "concierge@montevane.com",
  whatsapp: "+237600000000",
  hours: "Monday – Saturday, 9am – 6pm GMT",
} as const;
