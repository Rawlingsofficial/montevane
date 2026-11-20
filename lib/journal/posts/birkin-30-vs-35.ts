import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "birkin-30-vs-35",
  title: "Birkin 30 vs 35: Size, Capacity and Which to Choose",
  metaTitle: "Birkin 30 vs 35: Dimensions, What Fits & Which to Buy",
  description: "Birkin 30 or Birkin 35? Dimensions, what fits inside each, how they look on different heights, weight by leather, resale demand and our advice.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-02-05",
  keyword: "birkin 30 vs 35",
  keywords: ["birkin 35 size", "birkin 30 dimensions", "what fits in a birkin 35", "birkin 35 for work", "birkin size guide"],
  image: "gallery/cat-birkin-bags",
  cover: "hermes-birkin-30-gold-togo-palladium-hardware",
  picks: { category: "birkin-bags", query: "35", sort: "newest", limit: 4 },
  intro: [
    "The Birkin 35 was once the classic size. Today the 30 is the favourite and the 25 the most coveted – but the 35 has quietly become one of the best-value Birkins on the market.",
    "Here's how the two compare. If you're also considering the 25, read [Birkin 25 vs 30](/journal/birkin-25-vs-30).",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Birkin 30", "Birkin 35"],
            rows: [
              ["Approx. dimensions", "30 × 22 × 16 cm", "35 × 25 × 18 cm"],
              ["Fits", "Wallet, phone, small pouch, sunglasses, a small tablet", "All that, plus a laptop up to about 13 inches, a scarf, a water bottle"],
              ["Best for", "Everyday, day to evening", "Work, travel, carrying a lot"],
              ["On the arm", "Balanced for most heights", "Statement; looks best on taller frames"],
              ["Resale demand", "Very high", "Lower – often better value"],
            ],
          },
        },
      ],
    },
    {
      id: "weight",
      heading: "Weight matters on the 35",
      blocks: [
        "A full Birkin 35 can be heavy. Choose a lighter leather such as Epsom or Swift if you'll carry it daily, and avoid overfilling. Read [Togo vs Epsom](/journal/togo-vs-epsom) for the difference in weight and structure.",
      ],
    },
    {
      id: "advice",
      heading: "Our advice",
      blocks: [
        "Choose the **30** if you want the most versatile Birkin and the strongest resale. Choose the **35** if you need a bag for work or travel, or want a rare exotic or colour at a lower price than the same specification in a smaller size.",
        { products: { category: "birkin-bags", query: "30", sort: "newest" }, title: "Birkin 30" },
        { products: { category: "birkin-bags", query: "35", sort: "newest" }, title: "Birkin 35" },
      ],
    },
  ],
  faq: [
    { q: "What are the dimensions of a Birkin 35?", a: "Approximately 35 × 25 × 18 cm." },
    { q: "Does a laptop fit in a Birkin 35?", a: "A small laptop, up to about 13 inches, usually fits. It does not fit in a Birkin 30." },
    { q: "Is the Birkin 35 still in fashion?", a: "Smaller sizes are more in demand today, which makes the 35 better value – and it remains the most practical Birkin for work and travel." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Sotheby's – Handbags & Accessories department", url: "https://www.sothebys.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
  ],
};
