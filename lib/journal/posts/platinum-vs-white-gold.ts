import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "platinum-vs-white-gold",
  title: "Platinum vs White Gold: Which Metal for Fine Jewelry?",
  metaTitle: "Platinum vs White Gold: Rings, Durability, Upkeep & Price",
  description: "Platinum vs white gold for engagement rings and fine jewelry: colour, rhodium plating, durability, weight, patina, allergies and price – and which to choose.",
  category: "Jewelry Guides",
  cluster: "jewelry",
  date: "2027-06-21",
  keyword: "platinum vs white gold",
  keywords: ["platinum ring", "rhodium plating", "white gold yellowing", "platinum engagement ring", "white gold ring"],
  image: "gallery/cat-jewelry",
  cover: "fancy-pink-cushion-and-round-cut-diamond-engagement-ring-platinum-and-18k-rose-gold",
  picks: { category: "jewelry", query: "platinum", sort: "price_asc", limit: 8 },
  intro: [
    "Side by side in the shop, platinum and white gold look almost identical. The difference shows over years of wear – and in the price.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Platinum", "White gold (18k)"],
            rows: [
              ["Composition", "About 95% platinum (950)", "75% gold alloyed with white metals"],
              ["Colour", "Naturally white", "Slightly warm; rhodium-plated for brightness"],
              ["Upkeep", "Develops a soft patina; can be polished", "Re-plating every year or two keeps it bright"],
              ["Weight", "Heavier, substantial", "Lighter"],
              ["Sensitive skin", "Hypoallergenic", "Usually fine; depends on the alloy"],
              ["Price", "Higher", "Lower"],
            ],
          },
        },
      ],
    },
    {
      id: "choose",
      heading: "Which to choose",
      blocks: [
        "For an engagement ring worn every day, platinum holds settings securely and never needs plating – a strong choice for a diamond solitaire. White gold gives the same look at a lower price and a lighter feel, with occasional re-plating. Compare with [14k vs 18k gold](/journal/14k-vs-18k-gold), then read our [engagement ring buying guide](/journal/engagement-ring-buying-guide).",
      ],
    },
  ],
  faq: [
    { q: "Is platinum better than white gold?", a: "Platinum is naturally white, denser and hypoallergenic; white gold is lighter and less expensive but needs re-plating." },
    { q: "Does white gold turn yellow?", a: "Over time the rhodium plating wears and the warmer gold colour shows; re-plating restores it." },
    { q: "Does platinum scratch?", a: "It develops a soft patina rather than losing metal; it can be polished back to a shine." },
  ],
  sources: [
    { label: "GIA – Gem Encyclopedia", url: "https://www.gia.edu/gem-encyclopedia" },
  ],
  shop: [
    { label: "Shop rings", path: "/shop/jewelry/rings" },
    { label: "Shop jewelry", path: "/shop/jewelry" },
  ],
};
