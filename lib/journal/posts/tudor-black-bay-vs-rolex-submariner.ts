import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "tudor-black-bay-vs-rolex-submariner",
  title: "Tudor Black Bay vs Rolex Submariner",
  metaTitle: "Tudor Black Bay vs Rolex Submariner: Is the Rolex Worth More?",
  description: "Tudor Black Bay or Rolex Submariner? History, sizes, movements, water resistance, finishing, prices and value retention compared to help you choose.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-01-15",
  keyword: "tudor black bay vs rolex submariner",
  keywords: ["tudor vs rolex", "black bay 58", "is tudor as good as rolex", "rolex submariner 124060", "tudor black bay review"],
  image: "watch_3",
  cover: "tudor-black-bay-79230n-steel-red-bezel-black-dial-41-mm",
  picks: { brand: "tudor", sort: "price_asc", limit: 4 },
  intro: [
    "Tudor was founded by Hans Wilsdorf, the man behind Rolex, to offer Rolex reliability at a more accessible price. Today the Black Bay is Tudor's answer to the Submariner – and many buyers wonder whether the Rolex is worth several times the price.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Tudor Black Bay", "Rolex Submariner"],
            rows: [
              ["Sizes", "37 mm (54), 39 mm (58), 41 mm", "41 mm"],
              ["Movement", "Tudor manufacture calibres, about 70 hours", "Rolex calibre 3230 / 3235, about 70 hours"],
              ["Water resistance", "200 m", "300 m"],
              ["Bezel", "Aluminium insert", "Ceramic (Cerachrom)"],
              ["Style", "Vintage-inspired: snowflake hands, gilt or red accents", "Modern classic"],
              ["Price on the secondary market", "A fraction of a Submariner", "Several times a Black Bay"],
            ],
          },
        },
      ],
    },
    {
      id: "tudor",
      heading: "Why choose the Black Bay",
      blocks: [
        "The Black Bay offers in-house movements, excellent finishing for its price and a vintage character the modern Submariner doesn't have. The Black Bay 58, at 39 mm, is one of the best-proportioned divers made today and suits smaller wrists better than the Submariner.",
        { products: { brand: "tudor", sort: "price_asc" }, title: "Tudor available now" },
      ],
    },
    {
      id: "rolex",
      heading: "Why choose the Submariner",
      blocks: [
        "The Submariner's finishing, ceramic bezel, bracelet and clasp are a level above, and it is the reference that defines the dive watch. It also holds its value far better: a Submariner bought well is likely to retain much more of its price over time. See [Submariner Date vs No-Date](/journal/rolex-submariner-date-vs-no-date).",
        { products: { brand: "rolex", query: "submariner", sort: "price_asc" }, title: "Submariner available now" },
      ],
    },
  ],
  faq: [
    { q: "Is Tudor as good as Rolex?", a: "Tudor offers excellent quality for its price, with in-house movements. Rolex finishing, materials and value retention are a level above." },
    { q: "Is the Black Bay 58 smaller than the Submariner?", a: "Yes. The Black Bay 58 is 39 mm; the current Submariner is 41 mm." },
    { q: "Which holds its value better?", a: "The Rolex Submariner, by a wide margin." },
  ],
  sources: [
    { label: "Tudor – official site", url: "https://www.tudorwatch.com/" },
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
  ],
  shop: [
    { label: "Shop Tudor", path: "/shop/watches/tudor" },
    { label: "Rolex Submariner", path: "/models/rolex-submariner" },
  ],
};
