import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "hermes-leather-types",
  title: "Hermès Leather Glossary: Every Leather Explained",
  metaTitle: "Hermès Leather Types: Togo, Clemence, Epsom, Swift & More",
  description: "Every Hermès leather explained: Togo, Clemence, Epsom, Swift, Box calf, Barenia, Chèvre and the exotics – how each looks, feels, ages and which bags it suits.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-04-19",
  keyword: "hermes leather types",
  keywords: ["togo clemence swift", "barenia", "box calf", "epsom leather", "hermes chevre"],
  image: "gallery/cat-bag-organizers",
  cover: "hermes-etain-togo-birkin-30-palladium-hardware-2017",
  picks: { category: "birkin-bags", sort: "newest", limit: 8 },
  intro: [
    "The leather decides how a Hermès bag looks, how it holds its shape and how it ages. Here are the leathers you'll meet most often, from everyday Togo to the rarest exotics.",
  ],
  sections: [
    {
      id: "calf",
      heading: "Calf leathers",
      blocks: [
        {
          table: {
            head: ["Leather", "Look and feel", "Ages", "Best for"],
            rows: [
              ["Togo", "Raised, natural grain; matte", "Very well; hides scratches", "Everyday Birkins and Kellys"],
              ["Clemence", "Flatter, wider grain; heavier and softer", "Slouches gently; dislikes water", "Relaxed Birkins, larger sizes"],
              ["Epsom", "Embossed fine grain; light and rigid", "Keeps its shape; colours stay crisp", "Sellier Kellys, structured looks"],
              ["Swift", "Smooth, soft, fine grain; vivid colour", "Shows scratches but can soften them with care", "Small bags and accessories"],
              ["Box calf", "Smooth and glazed", "Develops a rich patina; sensitive to water", "Vintage-style Kellys and Constances"],
              ["Barenia", "Saddle leather with a waxy finish", "Darkens beautifully; marks with water", "Collectors who love patina"],
            ],
          },
        },
        "Torn between the two most popular? Read [Togo vs Epsom](/journal/togo-vs-epsom) and [Togo vs Clemence](/journal/togo-vs-clemence).",
      ],
    },
    {
      id: "goat",
      heading: "Goatskin",
      blocks: [
        "**Chèvre** (including Chèvre Mysore) is light, finely grained and tough, with a subtle sheen. It is often used for smaller bags and the interiors of exotic bags.",
      ],
    },
    {
      id: "exotic",
      heading: "Exotic leathers",
      blocks: [
        "Hermès also works in crocodile, alligator, ostrich and lizard, in shiny or matte finishes. These are the rarest and most expensive bags, and they travel with CITES paperwork – read our [exotic leathers guide](/journal/hermes-exotic-leathers).",
        { products: { category: "birkin-bags", query: "crocodile", sort: "price_desc" }, title: "Exotic Birkins available now" },
      ],
    },
  ],
  faq: [
    { q: "What is the most durable Hermès leather?", a: "Togo and Epsom are the most durable for everyday use; Togo hides scratches and Epsom keeps its shape." },
    { q: "What is the difference between Togo and Clemence?", a: "Clemence has a flatter, wider grain and is heavier and softer, so it slouches more; Togo is lighter and more structured." },
    { q: "Which Hermès leather develops a patina?", a: "Box calf and Barenia develop the richest patina over time." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Christie's – Handbags & Accessories", url: "https://www.christies.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
    { label: "Shop Kelly bags", path: "/shop/kelly-bags" },
  ],
};
