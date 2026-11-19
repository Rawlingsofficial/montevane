import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "royal-oak-vs-royal-oak-offshore",
  title: "Royal Oak vs Royal Oak Offshore: Which to Buy?",
  metaTitle: "Audemars Piguet Royal Oak vs Royal Oak Offshore Compared",
  description: "Royal Oak or Royal Oak Offshore? Design, size, thickness, straps, chronographs, character and prices compared to help you choose the right Audemars Piguet.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-01-22",
  keyword: "royal oak vs royal oak offshore",
  keywords: ["royal oak offshore", "royal oak offshore 42mm", "royal oak chronograph", "audemars piguet offshore price", "royal oak 41mm"],
  image: "watches_showcase",
  cover: "audemars-piguet-royal-oak-offshore-26470st-stainless-steel-blue-mega-tapisserie-arabic",
  picks: { brand: "audemars-piguet", query: "offshore", sort: "price_asc", limit: 8 },
  intro: [
    "Both are Royal Oaks. Both have the octagonal bezel with eight screws. But the Offshore, launched in 1993, was designed to be everything the original isn't: bigger, bolder and built for sport.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Royal Oak", "Royal Oak Offshore"],
            rows: [
              ["Launched", "1972 (Gérald Genta)", "1993 (Emmanuel Gueit)"],
              ["Typical sizes", "34, 37, 39, 41 mm", "37, 42, 43, 44 mm"],
              ["Thickness", "Slim", "Substantial"],
              ["Bracelet / strap", "Integrated bracelet", "Bracelet or rubber strap, often interchangeable"],
              ["Signature watch", "Time-and-date, Jumbo", "Chronograph"],
              ["Character", "Refined, wearable every day", "Sporty, bold, unmistakable"],
            ],
          },
        },
      ],
    },
    {
      id: "royal-oak",
      heading: "Choose the Royal Oak if…",
      blocks: [
        "You want the original design, a thin watch that slides under a cuff, and the classic integrated bracelet. The 41 mm 15510ST and the 39 mm Jumbo are the collector's choices. See our [Royal Oak guide](/journal/audemars-piguet-royal-oak-guide).",
        { products: { brand: "audemars-piguet", query: "royal oak selfwinding", sort: "price_asc" }, title: "Royal Oak available now" },
      ],
    },
    {
      id: "offshore",
      heading: "Choose the Offshore if…",
      blocks: [
        "You want presence on the wrist, a chronograph, rubber straps for summer and more colour and material options – ceramic, titanium, forged carbon. The Offshore suits larger wrists and casual dressing.",
        { products: { brand: "audemars-piguet", query: "offshore chronograph", sort: "price_asc" }, title: "Offshore chronographs available now" },
      ],
    },
  ],
  faq: [
    { q: "Who designed the Royal Oak Offshore?", a: "Emmanuel Gueit, in 1993. The original Royal Oak was designed by Gérald Genta in 1972." },
    { q: "Is the Royal Oak Offshore bigger than the Royal Oak?", a: "Yes. Most Offshores are 42–44 mm and noticeably thicker; the Royal Oak is usually 37–41 mm and slim." },
    { q: "Which holds its value better?", a: "Steel Royal Oaks, especially the 15510ST and the Jumbo, are generally more in demand than most Offshores." },
  ],
  sources: [
    { label: "Audemars Piguet – Royal Oak collection", url: "https://www.audemarspiguet.com/com/en/watch-collection/royal-oak.html" },
    { label: "Audemars Piguet – Royal Oak Offshore collection", url: "https://www.audemarspiguet.com/com/en/watch-collection/royal-oak-offshore.html" },
  ],
  shop: [
    { label: "Shop Audemars Piguet", path: "/shop/watches/audemars-piguet" },
    { label: "Royal Oak", path: "/models/audemars-piguet-royal-oak" },
  ],
};
