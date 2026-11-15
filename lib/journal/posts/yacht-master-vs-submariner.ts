import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "yacht-master-vs-submariner",
  title: "Rolex Yacht-Master vs Submariner",
  metaTitle: "Rolex Yacht-Master vs Submariner: Sailing vs Diving Watch",
  description: "Rolex Yacht-Master vs Submariner: Rolesium and platinum bezels, 100 m vs 300 m, bidirectional vs dive bezel, sizes and materials – and which suits you.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-05-28",
  keyword: "yacht-master vs submariner",
  keywords: ["platinum bezel", "rolesium", "sailing watch", "yacht-master 40", "yacht-master 42"],
  image: "watch_3",
  cover: "rolex-yacht-master-126621-stainless-steel-and-18k-rose-gold-chocolate-index-dial-oyster",
  picks: { brand: "rolex", query: "yacht-master", sort: "price_asc", limit: 8 },
  intro: [
    "Both are Rolex sports watches made for the water. The Submariner is a professional dive watch; the Yacht-Master, introduced in 1992, is its more luxurious, sailing-inspired cousin.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Yacht-Master 40", "Submariner"],
            rows: [
              ["Bezel", "Bidirectional, raised polished numerals", "Unidirectional dive bezel, Cerachrom"],
              ["Materials", "Rolesium (steel with a platinum bezel), gold; 42 mm also in titanium", "Steel, two-tone, gold"],
              ["Water resistance", "100 m", "300 m"],
              ["Size", "37, 40 and 42 mm", "41 mm"],
              ["Character", "Polished, yacht-club luxury", "Pure tool watch"],
            ],
          },
        },
      ],
    },
    {
      id: "choose",
      heading: "Which one?",
      blocks: [
        "If you dive or want the most iconic Rolex sports watch, choose the Submariner – compare it with the [Explorer](/journal/rolex-explorer-vs-submariner) and the [Tudor Black Bay](/journal/tudor-black-bay-vs-rolex-submariner). If you want something a little rarer on the wrist with a softer, more luxurious feel, the Yacht-Master is the one. Its 40 mm in Rolesium is the classic choice; the gold versions on Oysterflex rubber are perfect for summer – see [summer watches](/journal/summer-watch).",
        { products: { brand: "rolex", query: "submariner", sort: "price_asc" }, title: "Submariners available now" },
      ],
    },
  ],
  faq: [
    { q: "What is Rolesium?", a: "Rolex's name for its combination of Oystersteel and platinum, used on the Yacht-Master with a platinum bezel and dial." },
    { q: "Can you dive with a Yacht-Master?", a: "It's water-resistant to 100 m, enough for swimming and snorkelling; for diving, the Submariner's 300 m rating is the right tool." },
    { q: "Is the Yacht-Master cheaper than the Submariner?", a: "It depends on the material; the steel-and-platinum Yacht-Master 40 is broadly comparable, while gold versions cost more." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
  ],
  shop: [
    { label: "Shop Rolex", path: "/shop/watches/rolex" },
  ],
};
