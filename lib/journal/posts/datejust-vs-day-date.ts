import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "datejust-vs-day-date",
  title: "Rolex Datejust vs Day-Date",
  metaTitle: "Rolex Datejust vs Day-Date: Metals, Bracelets & Price",
  description: "Rolex Datejust vs Day-Date: steel and gold vs precious metals only, Jubilee vs President bracelet, the day window, sizes and price – and which one to buy.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-04-23",
  keyword: "datejust vs day-date",
  keywords: ["president vs jubilee", "day-date gold", "datejust steel", "rolex president", "day-date 40"],
  image: "watch_1",
  cover: "rolex-day-date-36-118208-18k-yellow-gold-champagne-dial-oyster-bracelet-36-mm",
  picks: { brand: "rolex", query: "day-date", sort: "price_asc", limit: 8 },
  intro: [
    "They look like siblings, and they are: the Datejust (1945) and the Day-Date (1956) share the same classic Oyster shape. But one is Rolex's everyday dress watch and the other its flagship.",
  ],
  sections: [
    {
      id: "compared",
      heading: "The differences",
      blocks: [
        {
          table: {
            head: ["", "Datejust", "Day-Date"],
            rows: [
              ["Metals", "Steel, Rolesor (steel and gold) or gold", "Gold or platinum only"],
              ["Display", "Date", "Day spelled out at 12 and date at 3"],
              ["Bracelet", "Oyster or Jubilee", "President"],
              ["Sizes", "28, 31, 36, 41 mm", "36 and 40 mm"],
              ["Price", "From steel prices", "Considerably higher – it's solid precious metal"],
            ],
          },
        },
      ],
    },
    {
      id: "datejust",
      heading: "Why choose the Datejust",
      blocks: [
        "The Datejust is the most versatile Rolex: dozens of dials, bezels and bracelets, and a steel option that makes it the natural first Rolex. See [Datejust 36 vs 41](/journal/datejust-36-vs-41) and the [dial guide](/journal/rolex-datejust-dial-guide).",
      ],
    },
    {
      id: "day-date",
      heading: "Why choose the Day-Date",
      blocks: [
        "Known as the President, the Day-Date is made only in precious metals and is the most prestigious watch in the Rolex catalogue. It has a heft and presence a Datejust doesn't. Compare sizes in [Day-Date 36 vs 40](/journal/rolex-day-date-36-vs-40).",
        { products: { brand: "rolex", query: "datejust", sort: "price_asc" }, title: "Datejusts available now" },
      ],
    },
  ],
  faq: [
    { q: "Is the Day-Date available in steel?", a: "No. The Day-Date is made only in 18k gold or platinum." },
    { q: "What is the difference between the President and Jubilee bracelets?", a: "The President has three rounded links and is reserved for the Day-Date and some precious-metal Datejusts; the Jubilee has five smaller links." },
    { q: "Which is better value?", a: "The Datejust, especially in steel. The Day-Date costs more because of its solid precious-metal case and bracelet." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
  ],
  shop: [
    { label: "Rolex Datejust", path: "/models/rolex-datejust" },
    { label: "Shop Rolex", path: "/shop/watches/rolex" },
  ],
};
