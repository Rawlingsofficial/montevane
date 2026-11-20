import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "birkin-sellier-vs-retourne",
  title: "Birkin Sellier vs Retourne: What's the Difference?",
  metaTitle: "Birkin Sellier vs Retourne: Stitching, Shape & Rarity",
  description: "Birkin Sellier vs the classic Retourne: how the stitching differs, structure and shape, the leathers that suit each, rarity and price.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-03-26",
  keyword: "birkin sellier",
  keywords: ["birkin sellier vs retourne", "sellier meaning hermes", "kelly sellier", "birkin sellier price", "hermes stitching"],
  image: "gallery/cat-kelly-bags",
  cover: "hermes-birkin-30-sellier-epsom-etoupe-phw",
  picks: { category: "birkin-bags", query: "sellier", sort: "newest", limit: 8 },
  intro: [
    "Most Birkins are made *retourne* – stitched inside out and turned. A Birkin Sellier is stitched on the outside, like a saddle, giving sharper lines and a more formal look. It is less common and increasingly sought after.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Retourne (classic)", "Sellier"],
            rows: [
              ["Stitching", "Inside, then the bag is turned", "Visible on the outside edges"],
              ["Shape", "Softer, rounded edges", "Rigid, sharp, structured"],
              ["Leathers", "Togo, Clemence, Swift, exotics", "Firmer leathers such as Epsom, Box and Madame"],
              ["Look", "Relaxed, everyday", "Formal, architectural"],
              ["Rarity", "The standard Birkin", "Less common"],
            ],
          },
        },
      ],
    },
    {
      id: "kelly",
      heading: "And the Kelly?",
      blocks: [
        "For the Kelly, both versions have always been standard – see our [Kelly buying guide](/journal/hermes-kelly-buying-guide). The Sellier Birkin borrows the Kelly Sellier's precision.",
      ],
    },
    {
      id: "choose",
      heading: "Which suits you?",
      blocks: [
        "Choose the **Sellier** if you love structure and a polished, evening-ready look, and don't need the bag to soften. Choose the **Retourne** for comfort and a bag that becomes more relaxed with use.",
        { products: { category: "birkin-bags", query: "sellier", sort: "newest" }, title: "Birkin Sellier available now" },
      ],
    },
  ],
  faq: [
    { q: "What does Sellier mean?", a: "\"Saddler\" in French. Sellier bags are stitched on the outside, as a saddle is." },
    { q: "Is a Birkin Sellier rarer?", a: "Yes – most Birkins are made Retourne." },
    { q: "Is a Sellier Birkin more expensive?", a: "Often, because it is less common and in demand, though specification and condition matter more." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Christie's – Handbags & Accessories department", url: "https://www.christies.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
    { label: "Shop Kelly bags", path: "/shop/kelly-bags" },
  ],
};
