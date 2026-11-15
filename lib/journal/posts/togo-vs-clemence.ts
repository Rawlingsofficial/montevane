import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "togo-vs-clemence",
  title: "Togo vs Clemence: Which Hermès Leather?",
  metaTitle: "Togo vs Clemence Leather: Birkin Structure, Weight & Wear",
  description: "Hermès Togo vs Clemence: grain, weight, structure, how each slouches and handles water and scratches – and which leather to choose for your Birkin.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-05-14",
  keyword: "togo vs clemence",
  keywords: ["clemence slouch", "togo structure", "birkin leather", "taurillon clemence", "togo leather"],
  image: "product_side",
  cover: "hermes-hac-a-dos-pm-togo-bai-brun-phw",
  picks: { category: "birkin-bags", query: "togo", sort: "price_asc", limit: 8 },
  intro: [
    "Togo and Clemence are the two most common Birkin leathers, and at first glance they look almost identical. The differences show up in your hand – and after a few years of wear.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Togo", "Clemence"],
            rows: [
              ["Grain", "Raised, veined, smaller", "Flatter, wider, more irregular"],
              ["Weight", "Lighter", "Heavier"],
              ["Structure", "Holds its shape well", "Softens and slouches over time"],
              ["Scratches", "Very resistant", "Resistant"],
              ["Water", "Tolerant", "More sensitive; can mark"],
              ["Best sizes", "All sizes", "Often preferred in smaller sizes, where weight matters less"],
            ],
          },
        },
      ],
    },
    {
      id: "choose",
      heading: "How to choose",
      blocks: [
        {
          list: [
            "**You want a bag that keeps its shape and copes with daily life:** Togo.",
            "**You love a relaxed, softer silhouette:** Clemence.",
            "**You carry a lot:** Togo, to save weight in a 30 or 35.",
          ],
        },
        "For the full picture, see our [Hermès leather glossary](/journal/hermes-leather-types) and [Togo vs Epsom](/journal/togo-vs-epsom).",
        { products: { category: "birkin-bags", query: "clemence", sort: "price_asc" }, title: "Clemence Birkins available now" },
      ],
    },
  ],
  faq: [
    { q: "Is Togo or Clemence better for a Birkin?", a: "Togo keeps its structure and is lighter; Clemence is softer and slouches more. Both are durable." },
    { q: "Does Clemence leather slouch?", a: "Yes, over time Clemence softens and the bag relaxes, which many owners love." },
    { q: "Which is heavier?", a: "Clemence is heavier than Togo, which is noticeable in larger sizes." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
  ],
  shop: [
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
  ],
};
