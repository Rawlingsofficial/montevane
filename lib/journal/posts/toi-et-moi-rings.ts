import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "toi-et-moi-rings",
  title: "Toi et Moi Rings: The Two-Stone Ring Explained",
  metaTitle: "Toi et Moi Rings: History, Stone Pairings & How to Choose",
  description: "Toi et Moi rings explained: the history from Napoleon and Joséphine, the best stone pairings, settings and proportions, and choosing one to propose.",
  category: "Jewelry Guides",
  cluster: "jewelry",
  date: "2027-02-03",
  keyword: "toi et moi ring",
  keywords: ["toi et moi engagement ring", "two stone ring", "pear and oval toi et moi", "toi et moi meaning", "double stone engagement ring"],
  image: "jewelry_1",
  cover: "pear-shaped-diamond-halo-toi-et-moi-ring-18k-white-gold-2-pear-shaped-halo-diamond-toi-et",
  picks: { category: "jewelry", query: "toi moi", sort: "price_asc", limit: 8 },
  intro: [
    "\"Toi et moi\" is French for \"you and me\": a ring with two stones set side by side, one for each person. It is one of the oldest romantic designs in jewelry and, today, one of the most requested engagement rings.",
  ],
  sections: [
    {
      id: "history",
      heading: "A ring with a story",
      blocks: [
        "The most famous Toi et Moi is the ring Napoleon Bonaparte gave Joséphine in 1796, pairing a diamond with a sapphire. The design flourished in the Victorian era and again in the 1920s, and returned to the spotlight in recent years when several high-profile engagements featured two-stone rings.",
      ],
    },
    {
      id: "pairings",
      heading: "Choosing the pair",
      blocks: [
        {
          table: {
            head: ["Pairing", "Look"],
            rows: [
              ["Pear + pear", "Mirrored, graceful, the classic modern Toi et Moi"],
              ["Pear + oval", "Soft and romantic, slightly asymmetric"],
              ["Emerald + pear", "Architectural meets romantic"],
              ["Heart + radiant", "Playful and bold"],
              ["White + fancy colour diamond", "Two personalities in one ring"],
            ],
          },
        },
        "Mixing shapes is the point – our [diamond shapes guide](/journal/diamond-shapes-guide) shows each one.",
      ],
    },
    {
      id: "proportion",
      heading: "Proportions and setting",
      blocks: [
        {
          list: [
            "**Equal stones** look balanced and modern; **unequal stones** feel more personal and vintage.",
            "**Angle** – stones set diagonally across the finger flatter most hands.",
            "**Halo** – a halo around each stone adds sparkle and apparent size.",
            "**Band** – a slim band keeps the focus on the pair; check that a wedding band can sit flush.",
          ],
        },
      ],
    },
    {
      id: "shop",
      heading: "Toi et Moi rings available now",
      blocks: [
        { products: { category: "jewelry", query: "toi moi", sort: "price_asc", limit: 8 } },
        "See also our [engagement ring buying guide](/journal/engagement-ring-buying-guide).",
      ],
    },
  ],
  faq: [
    { q: "What does toi et moi mean?", a: "French for \"you and me\". The two stones represent the two people in a relationship." },
    { q: "Can a Toi et Moi ring be an engagement ring?", a: "Yes – it is one of the most popular engagement ring styles today." },
    { q: "Do the stones need to match?", a: "No. Mixing shapes, sizes or colours is part of the design's charm." },
  ],
  sources: [
    { label: "GIA – Gem encyclopedia", url: "https://www.gia.edu/gem-encyclopedia" },
    { label: "GIA – Diamond quality factors", url: "https://www.gia.edu/diamond-quality-factor" },
  ],
  shop: [
    { label: "Diamond rings", path: "/shop/jewelry/rings" },
    { label: "Fine jewelry", path: "/shop/jewelry" },
  ],
};
