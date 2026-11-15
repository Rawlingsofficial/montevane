import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "gmt-master-ii-vs-explorer-ii",
  title: "Rolex GMT-Master II vs Explorer II",
  metaTitle: "Rolex GMT-Master II vs Explorer II: Two Ways to Read 24 Hours",
  description: "Rolex GMT-Master II vs Explorer II: rotating vs fixed 24-hour bezel, two vs three time zones, Polar dial, 40 vs 42 mm – and which one suits the way you travel.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-05-21",
  keyword: "gmt-master ii vs explorer ii",
  keywords: ["explorer ii polar", "gmt bezel", "explorer ii 226570", "rolex gmt", "24 hour hand"],
  image: "watch_1",
  cover: "rolex-explorer-ii-16570-stainless-steel-black-index-dial-oyster-bracelet-40-mm",
  picks: { brand: "rolex", query: "explorer ii", sort: "price_asc", limit: 8 },
  intro: [
    "Both have a 24-hour hand and a 24-hour scale on the bezel. But the GMT-Master II was built for pilots crossing time zones, and the Explorer II for explorers who can't tell day from night.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "GMT-Master II", "Explorer II"],
            rows: [
              ["Bezel", "Rotating, two-colour Cerachrom", "Fixed steel, engraved 24-hour scale"],
              ["Time zones", "Up to three (with the bezel)", "Two"],
              ["24-hour hand", "Colour-matched to the bezel", "Bright orange"],
              ["Size", "40 mm", "42 mm"],
              ["Dials", "Black, or green on some models", "White ('Polar') or black"],
            ],
          },
        },
      ],
    },
    {
      id: "choose",
      heading: "Which one?",
      blocks: [
        "Choose the **GMT-Master II** if you travel often or follow a second time zone, and love a colourful bezel – compare the [Pepsi and Batman](/journal/rolex-gmt-pepsi-vs-batman). Choose the **Explorer II** if you prefer a tool watch that's a little more understated and a little larger; the white Polar dial is one of the most legible Rolex dials. For a dual-time watch with an annual calendar, see [Sky-Dweller vs GMT-Master II](/journal/rolex-sky-dweller-vs-gmt-master-ii).",
        { products: { brand: "rolex", query: "gmt-master", sort: "price_asc" }, title: "GMT-Master II available now" },
      ],
    },
  ],
  faq: [
    { q: "Can the Explorer II show a second time zone?", a: "Yes. Its independent 24-hour hand can be set to a second time zone and read against the fixed bezel." },
    { q: "Why does the Explorer II have a 24-hour hand?", a: "It was designed for explorers and cavers who need to tell day from night when they can't see the sun." },
    { q: "Which is bigger?", a: "The Explorer II at 42 mm; the GMT-Master II is 40 mm." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
  ],
  shop: [
    { label: "Shop Rolex", path: "/shop/watches/rolex" },
  ],
};
