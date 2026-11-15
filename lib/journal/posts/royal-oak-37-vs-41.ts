import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "royal-oak-37-vs-41",
  title: "Audemars Piguet Royal Oak 37 vs 41",
  metaTitle: "Royal Oak 37 vs 41 mm: 15550ST vs 15510ST Compared",
  description: "Royal Oak 37 mm vs 41 mm: the 15550ST and 15510ST compared – how each wears, dials, movements and which Royal Oak size suits your wrist.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-04-30",
  keyword: "royal oak 37 vs 41",
  keywords: ["15550st", "15510st", "royal oak size", "royal oak 37mm", "royal oak 41mm"],
  image: "watch_2",
  cover: "audemars-piguet-royal-oak-15550st-50th-anniversary-stainless-steel-silver-index-dial-37-mm",
  picks: { brand: "audemars-piguet", query: "royal oak", sort: "price_asc", limit: 8 },
  intro: [
    "The Royal Oak's integrated bracelet and octagonal bezel make it wear larger than its diameter. That's why the choice between 37 mm and 41 mm matters more than four millimetres suggests.",
  ],
  sections: [
    {
      id: "compared",
      heading: "37 vs 41 at a glance",
      blocks: [
        {
          table: {
            head: ["", "Royal Oak 37 (15550ST)", "Royal Oak 41 (15510ST)"],
            rows: [
              ["Diameter", "37 mm", "41 mm"],
              ["On the wrist", "Balanced on most wrists; elegant", "Bold; best on wrists over about 17 cm"],
              ["Dial", "Grande Tapisserie", "Grande Tapisserie"],
              ["Movement", "Automatic, in-house", "Automatic, in-house"],
              ["Earlier equivalent", "15450", "15400 / 15500"],
            ],
          },
        },
      ],
    },
    {
      id: "wear",
      heading: "How they wear",
      blocks: [
        "Because the bracelet flows straight out of the case, the Royal Oak's lug-to-lug length and flat profile make it look big. Many collectors with average wrists find the 37 closer to the spirit of the original 1972 watch, while the 41 has the presence people expect of a modern sports watch. Measure first with our [watch size guide](/journal/watch-size-guide).",
      ],
    },
    {
      id: "more",
      heading: "Beyond the time-and-date",
      blocks: [
        "The Royal Oak family also includes the chronograph, the Jumbo Extra-Thin and the Offshore. Start with our [Royal Oak guide](/journal/audemars-piguet-royal-oak-guide) and [Royal Oak vs Offshore](/journal/royal-oak-vs-royal-oak-offshore).",
      ],
    },
  ],
  faq: [
    { q: "Is the Royal Oak 37 too small for a man?", a: "No. Many men wear the 37 because the integrated bracelet makes it wear larger than its diameter." },
    { q: "What is the difference between the 15510 and 15500?", a: "The 15510ST replaced the 15500ST with a newer in-house movement and refined details; both are 41 mm." },
    { q: "Which Royal Oak size holds value best?", a: "Both are in demand. Dial colour, condition and completeness matter more than size." },
  ],
  sources: [
    { label: "Audemars Piguet – Royal Oak collection", url: "https://www.audemarspiguet.com/com/en/watch-collection/royal-oak.html" },
  ],
  shop: [
    { label: "Shop Audemars Piguet", path: "/shop/watches/audemars-piguet" },
  ],
};
