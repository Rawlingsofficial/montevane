import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "patek-aquanaut-vs-nautilus",
  title: "Patek Philippe Aquanaut vs Nautilus",
  metaTitle: "Patek Philippe Aquanaut vs Nautilus: Design, Wear & Prices",
  description: "Patek Philippe Aquanaut or Nautilus? History, design, straps and bracelets, sizes, how each wears, key references and prices compared side by side.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-01-29",
  keyword: "aquanaut vs nautilus",
  keywords: ["patek aquanaut 5167a", "patek nautilus 5711", "aquanaut tropical strap", "patek philippe sports watch", "aquanaut price"],
  image: "gallery/cat-watches",
  cover: "patek-philippe-aquanaut-5067a-001-luce-stainless-steel-diamond-bezel-black-arabic-dial-36",
  picks: { brand: "patek-philippe", query: "aquanaut", sort: "price_asc", limit: 8 },
  intro: [
    "The Nautilus is Patek Philippe's most famous sports watch. The Aquanaut, born in 1997, is its younger, more casual sibling – and for many collectors, the more interesting watch to wear.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Aquanaut", "Nautilus"],
            rows: [
              ["Launched", "1997", "1976"],
              ["Case shape", "Rounded octagon, softer edges", "Rounded octagon with porthole \"ears\""],
              ["Dial", "Embossed checkerboard (\"grenade\")", "Horizontal embossed lines"],
              ["Strap", "\"Tropical\" composite strap; also bracelets", "Integrated bracelet"],
              ["Character", "Casual, modern, sporty", "Elegant, iconic, dressier"],
              ["Price", "Generally below the Nautilus", "Higher, especially steel references"],
            ],
          },
        },
      ],
    },
    {
      id: "aquanaut",
      heading: "Why choose the Aquanaut",
      blocks: [
        "The tropical strap is famously comfortable – light, soft and made for heat and water. The Aquanaut wears smaller and lighter than a Nautilus of similar size, and comes in more playful colours and complications, including Travel Time and chronograph versions.",
        { products: { brand: "patek-philippe", query: "aquanaut", sort: "price_asc" }, title: "Aquanaut available now" },
      ],
    },
    {
      id: "nautilus",
      heading: "Why choose the Nautilus",
      blocks: [
        "The Nautilus is the Gérald Genta original, the watch that defines luxury sports watches alongside the [Royal Oak](/journal/nautilus-vs-royal-oak). Its integrated bracelet and flat profile make it the more formal choice.",
        { products: { brand: "patek-philippe", query: "nautilus", sort: "price_asc" }, title: "Nautilus available now" },
      ],
    },
  ],
  faq: [
    { q: "Is the Aquanaut cheaper than the Nautilus?", a: "Generally yes, reference for reference, though rare Aquanauts and precious-metal versions can be very expensive." },
    { q: "What is the Aquanaut tropical strap made of?", a: "A composite material that is highly resistant to wear, saltwater and UV, and very comfortable in heat." },
    { q: "Which wears smaller?", a: "The Aquanaut, especially on its strap, wears lighter and smaller than a Nautilus on its bracelet." },
  ],
  sources: [
    { label: "Patek Philippe – Aquanaut collection", url: "https://www.patek.com/en/collection/aquanaut" },
    { label: "Patek Philippe – Nautilus collection", url: "https://www.patek.com/en/collection/nautilus" },
  ],
  shop: [
    { label: "Shop Patek Philippe", path: "/shop/watches/patek-philippe" },
    { label: "Nautilus", path: "/models/patek-philippe-nautilus" },
  ],
};
