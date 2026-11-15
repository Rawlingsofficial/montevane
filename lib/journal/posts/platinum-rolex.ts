import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "platinum-rolex",
  title: "Platinum vs Gold Rolex",
  metaTitle: "Platinum Rolex vs Gold: Ice-Blue Dials, Weight & Price",
  description: "Platinum vs gold Rolex: 950 platinum and the ice-blue dial, weight, colour, the Day-Date and Daytona in platinum, Everose and yellow gold – and which to choose.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-06-18",
  keyword: "platinum rolex",
  keywords: ["ice blue dial", "950 platinum", "yellow gold rolex", "everose gold", "platinum daytona"],
  image: "watch_1",
  cover: "rolex-daytona-116576tbr-platinum-ice-blue-arabic-language-dial-oyster-bracelet-40-mm",
  picks: { brand: "rolex", query: "platinum", sort: "price_desc", limit: 8 },
  intro: [
    "Rolex's precious-metal watches come in 18k yellow, white and Everose gold – and, at the top, platinum. Platinum is the quietest of them, and the one insiders recognise instantly.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Platinum vs gold",
      blocks: [
        {
          table: {
            head: ["", "Platinum (950)", "18k gold"],
            rows: [
              ["Colour", "Cool, bright white", "Yellow, white or Everose (rose)"],
              ["Weight", "Noticeably heavier", "Heavy, but lighter than platinum"],
              ["Signature", "Ice-blue dial, reserved for platinum", "Many dial options"],
              ["Discretion", "Can pass for steel", "Unmistakably gold (except white gold)"],
              ["Price", "The highest", "High"],
            ],
          },
        },
      ],
    },
    {
      id: "models",
      heading: "Which Rolex models come in platinum",
      blocks: [
        "Platinum Rolexes include the Day-Date and the Daytona, typically paired with the ice-blue dial; the platinum Daytona also has a brown ceramic bezel. For more on the President, see [Day-Date 36 vs 40](/journal/rolex-day-date-36-vs-40) and the [Daytona buying guide](/journal/rolex-daytona-buying-guide).",
        { products: { brand: "rolex", query: "day-date", sort: "price_desc" }, title: "Day-Date available now" },
      ],
    },
    {
      id: "choose",
      heading: "How to choose",
      blocks: [
        {
          list: [
            "**You want the ultimate, but discreet:** platinum.",
            "**You love warmth and classic luxury:** yellow gold.",
            "**You want something modern and flattering on every skin tone:** Everose.",
            "**You want gold that looks like steel:** white gold, lighter than platinum.",
          ],
        },
      ],
    },
  ],
  faq: [
    { q: "Why is the ice-blue dial only on platinum Rolex?", a: "Rolex reserves its ice-blue dial for platinum models, which makes it a signature of the metal." },
    { q: "Is platinum heavier than gold?", a: "Yes. Platinum is denser, so a platinum Rolex feels noticeably heavier than the same model in gold." },
    { q: "What is Everose?", a: "Rolex's own 18k rose gold alloy, designed to keep its colour." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
  ],
  shop: [
    { label: "Shop Rolex", path: "/shop/watches/rolex" },
  ],
};
