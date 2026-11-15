import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "hermes-scarf-sizes",
  title: "Hermès Scarf Sizes: Twilly, Carré 70, 90 and Shawl 140",
  metaTitle: "Hermès Scarf Sizes Guide: Twilly vs Carré 90 vs Shawl 140",
  description: "Every Hermès scarf size compared: Twilly, Gavroche, Carré 70 and 90, Losange and the 140 shawl – dimensions, fabrics, how to wear each and which to buy first.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-03-05",
  keyword: "hermes scarf sizes",
  keywords: ["hermes carre 90", "hermes twilly vs scarf", "hermes shawl 140", "hermes carre 70", "how to wear hermes scarf"],
  image: "feature_card_1",
  cover: "hermes-lazy-leopardesses-silk-scarf-90-rose-vif-anthracite-and-miel",
  picks: { category: "scarves-shawls", sort: "newest", limit: 8 },
  intro: [
    "Hermès has printed silk since 1937, and its scarves come in more formats than most people realise. Each size changes how you wear it.",
  ],
  sections: [
    {
      id: "sizes",
      heading: "The sizes at a glance",
      blocks: [
        {
          table: {
            head: ["Format", "Approx. size", "Typical fabric", "Wear it"],
            rows: [
              ["Twilly", "86 × 5 cm", "Silk twill", "Bag handle, hair, neck, wrist"],
              ["Gavroche", "45 × 45 cm", "Silk twill", "Neckerchief, pocket square, bag"],
              ["Carré 70", "70 × 70 cm", "Silk twill or soft silk", "Neck, hair, a lighter carré"],
              ["Carré 90", "90 × 90 cm", "Silk twill", "The classic – neck, shoulders, belt, top"],
              ["Losange", "Diamond shape", "Silk", "Draped at the neck"],
              ["Shawl 140", "140 × 140 cm", "Cashmere and silk", "Shoulders, wrap, winter warmth"],
            ],
          },
        },
      ],
    },
    {
      id: "first",
      heading: "Which to buy first",
      blocks: [
        "For a first Hermès scarf, the **Carré 90** is the icon – the size the most famous designs were created for. If you mostly want to dress up a bag, start with a pair of [Twillys](/journal/how-to-tie-a-twilly). For winter, the **140 shawl** in cashmere and silk is the most luxurious piece in the range.",
        { products: { category: "scarves-shawls", sort: "price_asc" }, title: "Carrés and shawls available now" },
        { products: { category: "twilly-scarves", sort: "newest" }, title: "Twillys available now" },
      ],
    },
    {
      id: "care",
      heading: "Caring for Hermès silk",
      blocks: [
        "Silk twill should be dry-cleaned by a specialist; avoid perfume directly on the silk, and store scarves flat or loosely rolled, away from light. Hand-rolled hems are a sign of quality – never iron them flat.",
      ],
    },
  ],
  faq: [
    { q: "What size is a classic Hermès scarf?", a: "The classic Carré is 90 × 90 cm in silk twill." },
    { q: "What's the difference between a Twilly and a carré?", a: "A Twilly is a narrow ribbon (about 86 × 5 cm); a carré is a square scarf, usually 70 or 90 cm." },
    { q: "What is an Hermès 140 shawl?", a: "A large 140 cm square, usually in cashmere and silk, worn around the shoulders." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
  ],
  shop: [
    { label: "Scarves & shawls", path: "/shop/scarves-shawls" },
    { label: "Twilly scarves", path: "/shop/twilly-scarves" },
  ],
};
