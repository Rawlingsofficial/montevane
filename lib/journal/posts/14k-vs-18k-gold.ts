import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "14k-vs-18k-gold",
  title: "14k vs 18k Gold: Karats Explained",
  metaTitle: "14k vs 18k Gold: Purity, Colour, Durability & Price",
  description: "14k vs 18k gold explained: 58.3% vs 75% pure gold, hallmarks 585 and 750, colour, durability, rose vs yellow vs white gold – and which to choose for fine jewelry.",
  category: "Jewelry Guides",
  cluster: "jewelry",
  date: "2027-05-31",
  keyword: "14k vs 18k gold",
  keywords: ["gold purity", "rose gold vs yellow gold", "750 gold", "585 gold", "18k white gold"],
  image: "gallery/cat-jewelry",
  cover: "baguette-and-round-cut-diamond-pectoral-necklace-18k-white-gold-baguette-and-round-cut",
  picks: { category: "jewelry", sort: "price_asc", limit: 8 },
  intro: [
    "Pure gold is too soft for everyday jewelry, so it's alloyed with other metals. The karat tells you how much of the piece is gold – and that changes the colour, the feel and the price.",
  ],
  sections: [
    {
      id: "karats",
      heading: "What the karats mean",
      blocks: [
        {
          table: {
            head: ["Karat", "Gold content", "Hallmark", "Character"],
            rows: [
              ["24k", "99.9%", "999", "Very soft, deep yellow – rarely used for fine jewelry"],
              ["18k", "75%", "750", "Rich colour, the fine-jewelry and luxury-watch standard"],
              ["14k", "58.3%", "585", "Harder and lighter in colour; common in the US"],
            ],
          },
        },
      ],
    },
    {
      id: "choose",
      heading: "Which to choose",
      blocks: [
        {
          list: [
            "**Colour:** 18k has a warmer, richer yellow; 14k is paler.",
            "**Durability:** 14k is slightly harder, but 18k is entirely suitable for rings worn every day.",
            "**Sensitive skin:** 18k contains less alloy, so it's less likely to irritate.",
            "**Value:** 18k contains more gold, so it costs more – and it's what luxury houses such as Rolex and Cartier use.",
          ],
        },
      ],
    },
    {
      id: "colours",
      heading: "Yellow, rose and white gold",
      blocks: [
        "The colour comes from the alloy: copper gives rose gold its warmth, while white gold is alloyed with white metals and usually rhodium-plated for brightness. White gold vs platinum is a separate choice – see [platinum vs white gold](/journal/platinum-vs-white-gold).",
      ],
    },
  ],
  faq: [
    { q: "Is 18k gold better than 14k?", a: "18k has more gold and a richer colour; 14k is a little harder and cheaper. For fine jewelry and watches, 18k is the standard." },
    { q: "What does 750 mean on gold?", a: "750 is the hallmark for 18k gold: 750 parts per thousand, or 75%, pure gold." },
    { q: "Does 18k gold scratch easily?", a: "All gold scratches with wear; 18k is slightly softer than 14k, but it's perfectly suitable for everyday rings." },
  ],
  sources: [
    { label: "GIA – Gem Encyclopedia", url: "https://www.gia.edu/gem-encyclopedia" },
  ],
  shop: [
    { label: "Shop jewelry", path: "/shop/jewelry" },
  ],
};
