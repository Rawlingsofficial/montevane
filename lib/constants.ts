export const SITE_NAME = "Montévane";

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
