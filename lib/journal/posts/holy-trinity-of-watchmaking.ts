import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "holy-trinity-of-watchmaking",
  title: "The Holy Trinity of Watchmaking: Patek, AP and Vacheron",
  metaTitle: "Holy Trinity Watches: Patek Philippe, AP & Vacheron Constantin",
  description: "The Holy Trinity of watchmaking explained: Patek Philippe, Audemars Piguet and Vacheron Constantin – their histories, icons, character and which to start with.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-02-17",
  keyword: "holy trinity watches",
  keywords: ["patek philippe vs audemars piguet vs vacheron constantin", "vacheron constantin overseas", "best luxury watch brands", "haute horlogerie", "royal oak vs overseas"],
  image: "gallery/cat-watches",
  cover: "vacheron-constantin-overseas-7920v-210a-b546-dual-time-stainless-steel-black-index-dial",
  picks: { brand: "vacheron-constantin", sort: "price_asc", limit: 4 },
  intro: [
    "Collectors use \"the Holy Trinity\" for three Swiss houses that have made fine watches continuously for well over a century and are still independent: Patek Philippe, Audemars Piguet and Vacheron Constantin.",
    "Here's what sets each apart.",
  ],
  sections: [
    {
      id: "compared",
      heading: "The three houses",
      blocks: [
        {
          table: {
            head: ["", "Vacheron Constantin", "Patek Philippe", "Audemars Piguet"],
            rows: [
              ["Founded", "1755", "1839", "1875"],
              ["Character", "Discreet classicism, superb finishing", "The benchmark of complications and dress watches", "Bold design, the luxury sports watch"],
              ["Sports icon", "Overseas", "Nautilus, Aquanaut", "Royal Oak, Royal Oak Offshore"],
              ["Dress icon", "Patrimony, Traditionnelle", "Calatrava", "Code 11.59, Royal Oak Jumbo (as dress-sport)"],
              ["Signature strength", "Finishing and heritage", "Complications and collectability", "Case design and sports chronographs"],
            ],
          },
        },
      ],
    },
    {
      id: "vacheron",
      heading: "Vacheron Constantin",
      blocks: [
        "The oldest of the three in continuous production. Its Overseas, with a Maltese-cross-inspired bezel and interchangeable straps, is often the best value of the three sports icons.",
        { products: { brand: "vacheron-constantin", query: "overseas", sort: "price_asc" }, title: "Overseas available now" },
      ],
    },
    {
      id: "patek",
      heading: "Patek Philippe",
      blocks: [
        "The most collected name in watchmaking, from the Calatrava to grand complications. Start with our [Patek Philippe buying guide](/journal/patek-philippe-buying-guide).",
        { products: { brand: "patek-philippe", query: "calatrava", sort: "price_asc" }, title: "Calatrava available now" },
      ],
    },
    {
      id: "ap",
      heading: "Audemars Piguet",
      blocks: [
        "The house that invented the luxury steel sports watch with the Royal Oak in 1972. Read our [Royal Oak guide](/journal/audemars-piguet-royal-oak-guide).",
        { products: { brand: "audemars-piguet", query: "royal oak", sort: "price_asc" }, title: "Royal Oak available now" },
      ],
    },
    {
      id: "beyond",
      heading: "Beyond the Trinity",
      blocks: [
        "Many collectors add A. Lange & Söhne to the list, and independents such as [F.P. Journe](/journal/fp-journe-guide) now rival the Trinity in desirability.",
      ],
    },
  ],
  faq: [
    { q: "Which brands are the Holy Trinity of watches?", a: "Patek Philippe, Audemars Piguet and Vacheron Constantin." },
    { q: "Which is the oldest?", a: "Vacheron Constantin, founded in 1755." },
    { q: "Which Holy Trinity sports watch is the best value?", a: "The Vacheron Constantin Overseas generally trades below comparable Nautilus and Royal Oak models." },
  ],
  sources: [
    { label: "Vacheron Constantin – official site", url: "https://www.vacheron-constantin.com/" },
    { label: "Patek Philippe – official site", url: "https://www.patek.com/en/home" },
    { label: "Audemars Piguet – official site", url: "https://www.audemarspiguet.com/com/en/home.html" },
  ],
  shop: [
    { label: "Shop Vacheron Constantin", path: "/shop/watches/vacheron-constantin" },
    { label: "Shop Patek Philippe", path: "/shop/watches/patek-philippe" },
    { label: "Shop Audemars Piguet", path: "/shop/watches/audemars-piguet" },
  ],
};
