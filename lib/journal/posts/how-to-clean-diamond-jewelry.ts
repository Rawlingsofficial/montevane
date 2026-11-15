import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "how-to-clean-diamond-jewelry",
  title: "How to Clean Diamond Jewelry at Home",
  metaTitle: "How to Clean a Diamond Ring Safely at Home",
  description: "How to clean diamond rings, earrings and bracelets safely at home: the gentle method, what to avoid, ultrasonic risks and when to see a jeweller.",
  category: "Jewelry Guides",
  cluster: "jewelry",
  date: "2027-03-22",
  keyword: "how to clean a diamond ring",
  keywords: ["clean diamond jewelry", "ultrasonic cleaner diamond", "diamond ring cloudy", "jewelry care", "check prongs"],
  image: "jewelry_1",
  cover: "emerald-cut-diamond-engagement-ring-platinum-emerald-cut-solitaire-diamond-engagement",
  picks: { category: "jewelry", piece: "Ring", sort: "price_asc", limit: 4 },
  intro: [
    "Diamonds attract oil. A few days of hand cream, soap and skin is enough to dull even a perfect stone. The good news: bringing back the sparkle takes five minutes.",
  ],
  sections: [
    {
      id: "method",
      heading: "The gentle method",
      blocks: [
        {
          list: [
            "Soak the piece in warm water with a few drops of mild washing-up liquid for 15–20 minutes.",
            "Brush gently with a very soft toothbrush, especially under the stone where oil collects.",
            "Rinse in clean warm water – with the plug in, or in a bowl.",
            "Dry with a lint-free cloth.",
          ],
        },
      ],
    },
    {
      id: "avoid",
      heading: "What to avoid",
      blocks: [
        {
          list: [
            "**Bleach, chlorine and harsh chemicals** – they can damage gold alloys.",
            "**Toothpaste and abrasives** – they scratch metal.",
            "**Ultrasonic cleaners on some stones** – risky for emeralds, pearls, opals, treated stones and pieces with loose settings.",
            "**Wearing jewelry in the pool or at the gym.**",
          ],
        },
      ],
    },
    {
      id: "jeweller",
      heading: "Once a year: see a jeweller",
      blocks: [
        "A jeweller can check prongs and clasps for wear, tighten loose stones and give the piece a professional clean. White gold may need re-rhodium plating every few years to stay bright white.",
        "Read more in our [diamond buying guide](/journal/diamond-buying-guide) and [tennis bracelet guide](/journal/diamond-tennis-bracelet-guide).",
      ],
    },
  ],
  faq: [
    { q: "How often should I clean my diamond ring?", a: "A quick home clean every week or two keeps it sparkling; a professional check once a year." },
    { q: "Can I use an ultrasonic cleaner on a diamond ring?", a: "For a well-set diamond in good condition, usually yes. Avoid it for emeralds, pearls, opals, treated stones and loose settings." },
    { q: "Why does my diamond look cloudy?", a: "Almost always because of oil and dirt on the back of the stone. A gentle clean restores the sparkle." },
  ],
  sources: [
    { label: "GIA – Gem encyclopedia", url: "https://www.gia.edu/gem-encyclopedia" },
  ],
  shop: [
    { label: "Fine jewelry", path: "/shop/jewelry" },
  ],
};
