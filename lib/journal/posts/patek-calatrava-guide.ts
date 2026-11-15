import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "patek-calatrava-guide",
  title: "The Patek Philippe Calatrava: The Ultimate Dress Watch",
  metaTitle: "Patek Philippe Calatrava Guide: 5227, 6119, 5196 & Prices",
  description: "A guide to the Patek Philippe Calatrava: its 1932 origins, design codes, key references from the 5196 to the 6119 and 5227, how to choose one and prices.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-03-10",
  keyword: "patek philippe calatrava",
  keywords: ["calatrava 6119", "calatrava 5227", "calatrava 5196", "best dress watch", "patek calatrava price"],
  image: "watch_2",
  cover: "patek-philippe-calatrava-5524g-001-pilot-travel-time-18k-white-gold-blue-dial-42-mm",
  picks: { brand: "patek-philippe", query: "calatrava", sort: "price_asc", limit: 8 },
  intro: [
    "Since 1932, the Calatrava has defined what a dress watch should be: a round case, a clean dial, perfect proportions and nothing superfluous. If the Nautilus is Patek Philippe's most famous watch, the Calatrava is its purest.",
  ],
  sections: [
    {
      id: "codes",
      heading: "What makes a Calatrava",
      blocks: [
        {
          list: [
            "**Round case**, simple and slim, inspired by Bauhaus principles.",
            "**Clean dial** with baton or Breguet numerals.",
            "**Clous de Paris** hobnail bezel on some references – a signature detail.",
            "**Manual-wind or automatic** movements, beautifully finished and often visible through a sapphire back.",
          ],
        },
      ],
    },
    {
      id: "refs",
      heading: "Key references",
      blocks: [
        {
          table: {
            head: ["Reference", "What it is"],
            rows: [
              ["96", "The 1932 original"],
              ["5196", "A modern, faithful 37 mm interpretation with small seconds"],
              ["5227", "Automatic with a hinged \"officer's\" case back"],
              ["6119", "Manual-wind with a Clous de Paris bezel, introduced in 2021"],
            ],
          },
        },
        { products: { brand: "patek-philippe", query: "calatrava", sort: "price_asc" }, title: "Calatrava available now" },
      ],
    },
    {
      id: "choose",
      heading: "Choosing a Calatrava",
      blocks: [
        "Choose the metal that suits your skin and wardrobe – white gold for understatement, rose or yellow gold for warmth. The Calatrava is meant to be worn with a suit; at 36–40 mm it slides under any cuff. Compare it with other houses in [the Holy Trinity of watchmaking](/journal/holy-trinity-of-watchmaking), and read our [Patek Philippe buying guide](/journal/patek-philippe-buying-guide).",
      ],
    },
  ],
  faq: [
    { q: "When was the Patek Philippe Calatrava introduced?", a: "In 1932, with reference 96." },
    { q: "What is a Clous de Paris bezel?", a: "A hobnail guilloché pattern on the bezel, a signature of some Calatrava references such as the 6119." },
    { q: "Is the Calatrava a good investment?", a: "Calatravas are bought for their beauty and quality rather than speculation; they generally hold value well, but less dramatically than the Nautilus." },
  ],
  sources: [
    { label: "Patek Philippe – Calatrava collection", url: "https://www.patek.com/en/collection/calatrava" },
  ],
  shop: [
    { label: "Shop Patek Philippe", path: "/shop/watches/patek-philippe" },
  ],
};
