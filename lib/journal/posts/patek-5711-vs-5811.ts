import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "patek-5711-vs-5811",
  title: "Patek Philippe Nautilus 5711 vs 5811",
  metaTitle: "Patek Nautilus 5711/1A vs 5811/1G: What Changed?",
  description: "Patek Philippe Nautilus 5711/1A vs 5811/1G: steel vs white gold, 40 vs 41 mm, the bracelet clasp, dials, why the 5711 was discontinued and how they compare in price.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-03-19",
  keyword: "5711 vs 5811",
  keywords: ["patek 5711", "patek 5811", "nautilus white gold", "5711 discontinued", "nautilus 5811 price"],
  image: "watches_showcase",
  cover: "patek-philippe-nautilus-7008-1a-001-stainless-steel-diamond-bezel-blue-mother-of-pearl",
  picks: { brand: "patek-philippe", query: "nautilus", sort: "price_asc", limit: 8 },
  intro: [
    "When Patek Philippe ended production of the steel Nautilus 5711/1A in 2021, it created a legend overnight. Its successor, the 5811/1G, kept the spirit but changed the metal, the size and the price.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "5711/1A", "5811/1G"],
            rows: [
              ["Metal", "Stainless steel", "18k white gold"],
              ["Diameter", "40 mm", "41 mm"],
              ["Dial", "Blue, white, and the final green; special editions", "Blue gradient"],
              ["Production", "2006 – 2021", "From 2022"],
              ["On the wrist", "Lighter, the classic proportion", "Heavier, slightly larger"],
            ],
          },
        },
      ],
    },
    {
      id: "why",
      heading: "Why collectors still chase the 5711",
      blocks: [
        "Steel is the point of the Nautilus: a luxury watch in a humble metal. With the 5711 gone, the steel Nautilus became the most sought-after modern Patek. The 5811 is the more luxurious watch – white gold, heavier and refined – but many collectors still prefer the 5711.",
      ],
    },
    {
      id: "shop",
      heading: "Available now",
      blocks: [
        { products: { brand: "patek-philippe", query: "5711", sort: "price_asc" }, title: "Nautilus 5711" },
        { products: { brand: "patek-philippe", query: "5811", sort: "price_asc" }, title: "Nautilus 5811" },
        "Compare with the Royal Oak in [Nautilus vs Royal Oak](/journal/nautilus-vs-royal-oak).",
      ],
    },
  ],
  faq: [
    { q: "Why was the Patek 5711 discontinued?", a: "Patek Philippe ended production in 2021, with a final green-dial series, and introduced the white gold 5811/1G in 2022." },
    { q: "Is the 5811 bigger than the 5711?", a: "Yes: 41 mm against 40 mm, and heavier because it is made in white gold." },
    { q: "Which is more expensive?", a: "It depends on the dial and condition. Steel 5711s trade at a large premium; rare 5711 dials can exceed the 5811." },
  ],
  sources: [
    { label: "Patek Philippe – Nautilus collection", url: "https://www.patek.com/en/collection/nautilus" },
  ],
  shop: [
    { label: "Nautilus", path: "/models/patek-philippe-nautilus" },
    { label: "Shop Patek Philippe", path: "/shop/watches/patek-philippe" },
  ],
};
