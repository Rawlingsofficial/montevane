import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "rolex-datejust-for-women",
  title: "The Rolex Datejust for Women: 28, 31 or 36?",
  metaTitle: "Rolex Datejust for Women: Lady-Datejust 28 vs 31 vs 36",
  description: "Choosing a Rolex Datejust for women: the Lady-Datejust 28, Datejust 31 and 36 compared – sizes, metals, diamond bezels, mother-of-pearl dials and prices.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-03-03",
  keyword: "rolex datejust women",
  keywords: ["lady datejust 28", "datejust 31", "rolex for women", "datejust 31 vs 36", "rolex diamond bezel women"],
  image: "watch_1",
  cover: "rolex-datejust-31-278381rbr-steel-and-18k-rose-gold-diamond-bezel-aubergine-roman-dial-31",
  picks: { brand: "rolex", query: "datejust 31", sort: "newest", limit: 8 },
  intro: [
    "The Datejust is the most popular women's luxury watch in the world, and it comes in three sizes worn by women: the Lady-Datejust 28, the Datejust 31 and the Datejust 36. Each feels completely different on the wrist.",
  ],
  sections: [
    {
      id: "sizes",
      heading: "Three sizes compared",
      blocks: [
        {
          table: {
            head: ["", "Lady-Datejust 28", "Datejust 31", "Datejust 36"],
            rows: [
              ["Look", "Petite, jewelry-like", "Classic women's size", "Bold, borrowed-from-the-boys"],
              ["Best wrists", "Under about 15 cm", "Most wrists", "Larger wrists, or for a statement"],
              ["Metals", "Gold, Rolesor, gem-set", "Steel, Rolesor, gold, gem-set", "Steel, Rolesor, gold, gem-set"],
            ],
          },
        },
      ],
    },
    {
      id: "options",
      heading: "Bezels, dials and bracelets",
      blocks: [
        {
          list: [
            "**Diamond bezel** – the most glamorous choice; check that it is factory-set. See [factory vs aftermarket diamonds](/journal/rolex-aftermarket-diamonds).",
            "**Mother-of-pearl dials** – each one unique, often with diamond hour markers.",
            "**Fluted bezel** – timeless, catches the light.",
            "**President bracelet** (gold models) or **Jubilee** – both elegant and very comfortable.",
          ],
        },
      ],
    },
    {
      id: "shop",
      heading: "Available now",
      blocks: [
        { products: { brand: "rolex", query: "lady datejust", sort: "newest" }, title: "Lady-Datejust 28" },
        { products: { brand: "rolex", query: "datejust 31", sort: "newest" }, title: "Datejust 31" },
        { products: { brand: "rolex", query: "datejust 36", sort: "newest" }, title: "Datejust 36" },
      ],
    },
  ],
  faq: [
    { q: "What is the best Rolex size for a woman?", a: "The Datejust 31 suits most wrists. The 28 is more petite and jewelry-like; the 36 makes a bolder statement." },
    { q: "Is a diamond bezel Rolex a good choice?", a: "Yes, if it is factory-set – check the reference and the papers." },
    { q: "Is the Datejust 36 too big for a woman?", a: "Not at all. Many women choose the 36 for its presence, especially on a Jubilee bracelet." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
  ],
  shop: [
    { label: "Rolex Datejust", path: "/models/rolex-datejust" },
    { label: "Shop Rolex", path: "/shop/watches/rolex" },
  ],
};
