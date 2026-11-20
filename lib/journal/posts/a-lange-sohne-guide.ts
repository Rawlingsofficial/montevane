import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "a-lange-sohne-guide",
  title: "A. Lange & Söhne: A Collector's Guide",
  metaTitle: "A. Lange & Söhne Guide: Lange 1, Datograph, Zeitwerk & Saxonia",
  description: "A collector's guide to A. Lange & Söhne: Glashütte history since 1845, the Lange 1, Datograph, Zeitwerk and Saxonia, German silver and double assembly.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-06-23",
  keyword: "a lange sohne",
  keywords: ["lange 1", "datograph", "saxonia", "zeitwerk", "glashutte watches"],
  image: "gallery/cat-watches",
  cover: "a-lange-and-sohne-320-025-platinum-silver-dial-39-mm",
  picks: { brand: "a-lange-sohne", sort: "price_asc", limit: 8 },
  intro: [
    "Many collectors who have owned everything end up at A. Lange & Söhne. The Saxon manufacture builds some of the most beautifully finished movements in the world, in a style entirely its own.",
  ],
  sections: [
    {
      id: "history",
      heading: "A short history",
      blocks: [
        "Ferdinand Adolph Lange founded his workshop in Glashütte, Saxony, in 1845 and built a watchmaking town around it. After the Second World War the company was expropriated, and the name disappeared for decades. In 1990, Lange's great-grandson Walter Lange re-founded the brand, and its first new collection, including the Lange 1, appeared in 1994.",
      ],
    },
    {
      id: "models",
      heading: "The key models",
      blocks: [
        {
          table: {
            head: ["Model", "Known for"],
            rows: [
              ["Lange 1", "Off-centre dial and the outsize date inspired by the Semperoper clock in Dresden"],
              ["Datograph", "A flyback chronograph admired for its movement architecture"],
              ["Zeitwerk", "A mechanical digital display of hours and minutes"],
              ["Saxonia", "Pure, understated dress watches"],
              ["1815", "Classical, inspired by historical pocket watches"],
            ],
          },
        },
      ],
    },
    {
      id: "finishing",
      heading: "What makes a Lange different",
      blocks: [
        {
          list: [
            "**German silver** three-quarter plates, which develop a soft golden tone with time.",
            "**Hand-engraved balance cocks** – each one slightly different.",
            "**Double assembly** – movements are assembled, taken apart, finished and assembled again.",
          ],
        },
        "For other makers at this level, see [the holy trinity of watchmaking](/journal/holy-trinity-of-watchmaking) and [independent watchmakers](/journal/independent-watchmakers).",
      ],
    },
  ],
  faq: [
    { q: "Where are A. Lange & Söhne watches made?", a: "In Glashütte, Saxony, Germany." },
    { q: "What is the most famous Lange watch?", a: "The Lange 1, with its off-centre dial and outsize date, introduced in 1994." },
    { q: "What is German silver?", a: "An alloy of copper, nickel and zinc used for Lange's movement plates; it develops a warm patina." },
  ],
  sources: [
    { label: "A. Lange & Söhne – official site", url: "https://www.alange-soehne.com/en" },
  ],
  shop: [
    { label: "Shop A. Lange & Söhne", path: "/shop/watches/a-lange-sohne" },
    { label: "Shop watches", path: "/shop/watches" },
  ],
};
