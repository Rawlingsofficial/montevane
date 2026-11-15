import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "rolex-day-date-36-vs-40",
  title: "Rolex Day-Date 36 vs 40: The President in Two Sizes",
  metaTitle: "Rolex Day-Date 36 vs 40: Sizes, Metals, Dials & Prices",
  description: "Rolex Day-Date 36 or 40? The \"President\" watch in both sizes: metals, the President bracelet, iconic dials, how each wears and which to choose.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-02-19",
  keyword: "day-date 36 vs 40",
  keywords: ["rolex day-date 40", "rolex day-date 36", "rolex president", "day-date platinum ice blue", "day-date 228238"],
  image: "watch_1",
  cover: "rolex-day-date-36-18238-18k-yellow-gold-champagne-dial-36-mm",
  picks: { brand: "rolex", query: "day-date", sort: "price_asc", limit: 8 },
  intro: [
    "Launched in 1956, the Day-Date was the first wristwatch to show the day of the week spelled out in full. It is only made in precious metals, and its President bracelet gave it the nickname by which most people know it.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Day-Date 36", "Day-Date 40"],
            rows: [
              ["Case", "36 mm", "40 mm"],
              ["Metals", "Yellow, white or Everose gold; platinum", "Yellow, white or Everose gold; platinum"],
              ["Current movement", "Calibre 3255", "Calibre 3255"],
              ["Character", "Classic, elegant, unisex", "Modern presence"],
              ["Bezel", "Fluted, smooth or gem-set", "Fluted, smooth or gem-set"],
            ],
          },
        },
      ],
    },
    {
      id: "dials",
      heading: "The dials that define it",
      blocks: [
        "Day-Date dials are part of its legend: champagne and silver classics, Roman numerals, day discs offered in many languages, meteorite, stone dials, and the ice-blue dial reserved for platinum. Dial rarity can change a Day-Date's value dramatically.",
      ],
    },
    {
      id: "choose",
      heading: "Which size?",
      blocks: [
        "The **36** is the historic size and the more versatile – it suits most wrists and works for men and women. The **40** has more presence and makes a statement on larger wrists. Use our [watch size guide](/journal/watch-size-guide) if unsure.",
        { products: { brand: "rolex", query: "day-date 36", sort: "price_asc" }, title: "Day-Date 36" },
        { products: { brand: "rolex", query: "day-date 40", sort: "price_asc" }, title: "Day-Date 40" },
      ],
    },
  ],
  faq: [
    { q: "Why is the Day-Date called the President?", a: "Because of its President bracelet and its long association with world leaders." },
    { q: "Is the Day-Date available in steel?", a: "No. It is made only in gold or platinum." },
    { q: "What is the ice-blue dial?", a: "A pale blue dial Rolex reserves for its platinum models." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
    { label: "COSC – Swiss Official Chronometer Testing Institute", url: "https://www.cosc.swiss/en" },
  ],
  shop: [
    { label: "Shop Rolex", path: "/shop/watches/rolex" },
  ],
};
