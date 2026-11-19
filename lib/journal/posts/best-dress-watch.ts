import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "best-dress-watch",
  title: "Cartier Tank vs Patek Philippe Calatrava: The Best Dress Watch?",
  metaTitle: "Best Dress Watch: Cartier Tank vs Patek Calatrava",
  description: "The best dress watch? Cartier Tank Louis Cartier vs Patek Philippe Calatrava: rectangular vs round, size, movements, price and which one suits a suit – and you.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-06-11",
  keyword: "best dress watch",
  keywords: ["tank louis cartier", "calatrava 5196", "dress watch for suit", "thin dress watch", "classic dress watch"],
  image: "watches_showcase",
  cover: "cartier-tank-louis-wgta0011-18k-rose-gold-silver-roman-dial-38-mm",
  picks: { brand: "cartier", query: "tank", sort: "price_asc", limit: 8 },
  intro: [
    "A dress watch should be thin, simple and slip under a shirt cuff. Two designs have defined the genre for almost a century: Cartier's Tank and Patek Philippe's Calatrava.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Cartier Tank Louis Cartier", "Patek Philippe Calatrava"],
            rows: [
              ["Since", "1917 (Tank), 1922 (Louis Cartier)", "1932"],
              ["Shape", "Rectangular, with brancards (side rails)", "Round, the Bauhaus-inspired ideal"],
              ["Movement", "Manual-wind or quartz", "Manual-wind or automatic, Patek in-house"],
              ["Feel", "Art, jewelry and fashion", "Pure watchmaking"],
              ["Price", "More accessible", "Considerably higher"],
            ],
          },
        },
      ],
    },
    {
      id: "choose",
      heading: "Which one?",
      blocks: [
        "Choose the **Tank** if you want a design icon that works with everything from black tie to jeans – compare the Tank with its sibling in [Santos vs Tank](/journal/cartier-santos-vs-tank). Choose the **Calatrava** if watchmaking is what moves you: a Patek movement, hand-finished, in a perfectly proportioned round case. Read our [Calatrava guide](/journal/patek-calatrava-guide).",
        { products: { brand: "patek-philippe", query: "calatrava", sort: "price_asc" }, title: "Calatravas available now" },
      ],
    },
  ],
  faq: [
    { q: "What is the best dress watch?", a: "The Cartier Tank and Patek Philippe Calatrava are the two classic answers: one rectangular and design-led, the other round and watchmaking-led." },
    { q: "What size should a dress watch be?", a: "Usually 34 to 39 mm for a round watch, and thin enough to slide under a cuff. See our watch size guide." },
    { q: "Can you wear a dress watch every day?", a: "Yes, but most are less water-resistant than sports watches, so take care around water." },
  ],
  sources: [
    { label: "Cartier – official site", url: "https://www.cartier.com/" },
    { label: "Patek Philippe – Calatrava collection", url: "https://www.patek.com/en/collection/calatrava" },
  ],
  shop: [
    { label: "Shop Cartier", path: "/shop/watches/cartier" },
    { label: "Shop Patek Philippe", path: "/shop/watches/patek-philippe" },
  ],
};
