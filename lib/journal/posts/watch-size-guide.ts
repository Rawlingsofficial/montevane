import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "watch-size-guide",
  title: "Watch Size Guide: What Suits Your Wrist?",
  metaTitle: "Watch Size Guide: How to Choose the Right Case Size",
  description: "How to choose the right watch size for your wrist: case diameter, lug-to-lug, thickness and shape, with a size chart and how Rolex, Patek and AP models wear.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-01-04",
  keyword: "watch size guide",
  keywords: ["what size watch should i wear", "watch size for wrist", "lug to lug", "36mm vs 40mm", "how to measure wrist for watch"],
  image: "watch_1",
  cover: "rolex-land-dweller-127234-stainless-steel-and-18k-white-gold-white-honeycomb-motif-dial",
  picks: { brand: "rolex", query: "36", sort: "newest", limit: 8 },
  intro: [
    "The number on a watch listing – 36 mm, 41 mm – tells you only part of the story. Two watches with the same diameter can wear completely differently.",
    "Here's how to measure, what the numbers mean and how to pick the right size, for yourself or as a gift.",
  ],
  sections: [
    {
      id: "measure",
      heading: "1. Measure your wrist",
      blocks: [
        "Wrap a strip of paper or a soft tape around your wrist just above the wrist bone, mark where it meets and measure it flat. To check someone else's wrist without asking, borrow a watch or bracelet they wear comfortably and measure that.",
      ],
    },
    {
      id: "chart",
      heading: "2. A rule-of-thumb size chart",
      blocks: [
        {
          table: {
            head: ["Wrist circumference", "Comfortable case size", "Examples"],
            rows: [
              ["Under 15 cm (6 in)", "26 – 34 mm", "Lady-Datejust 28, Datejust 31, Cartier Tank"],
              ["15 – 17 cm (6 – 6.7 in)", "34 – 39 mm", "Datejust 36, Royal Oak 37, Calatrava"],
              ["17 – 19 cm (6.7 – 7.5 in)", "38 – 42 mm", "Submariner 41, Datejust 41, Royal Oak 41"],
              ["Over 19 cm (7.5 in)", "41 mm and above", "Royal Oak Offshore, Sky-Dweller, Richard Mille"],
            ],
          },
        },
        { note: "These are guidelines, not rules. Many people with larger wrists love a 36 mm Datejust, and dress watches are traditionally worn smaller." },
      ],
    },
    {
      id: "lug",
      heading: "3. Lug-to-lug matters more than diameter",
      blocks: [
        "Lug-to-lug is the distance from the tip of the top lugs to the tip of the bottom lugs. If it's wider than the top of your wrist, the lugs overhang and the watch looks too big – whatever its diameter. Integrated bracelets such as the Royal Oak and Nautilus wear larger than round watches of the same size because the case flows into the bracelet.",
      ],
    },
    {
      id: "thickness",
      heading: "4. Thickness and shape",
      blocks: [
        "A thin watch sits under a shirt cuff; a thick one doesn't. Divers and chronographs are thicker by nature. Rectangular and tonneau watches (Cartier Tank, Richard Mille) are measured differently – check the length as well as the width.",
      ],
    },
    {
      id: "rolex",
      heading: "How popular models wear",
      blocks: [
        {
          list: [
            "**Rolex Datejust 36** – the classic size; wears well on almost any wrist. See [Datejust 36 vs 41](/journal/datejust-36-vs-41).",
            "**Rolex Submariner 41** – modern sizing with slimmer lugs; wears close to a 40.",
            "**Royal Oak 41** – wears larger than its diameter; try the 37 if your wrist is under 17 cm.",
            "**Patek Nautilus 5711** – 40 mm but wide ears; wears large and flat.",
          ],
        },
      ],
    },
  ],
  faq: [
    { q: "What size watch should a man wear?", a: "Most men wear 36–42 mm comfortably. Wrists of 17–19 cm usually suit 38–42 mm; smaller wrists suit 34–39 mm." },
    { q: "Is 36 mm too small for a man?", a: "No. 36 mm was the standard men's size for decades and the Datejust 36 remains one of the most popular watches in the world." },
    { q: "What is lug-to-lug?", a: "The distance between the tips of the top and bottom lugs. It decides whether a watch fits across the top of your wrist." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
    { label: "Audemars Piguet – Royal Oak collection", url: "https://www.audemarspiguet.com/com/en/watch-collection/royal-oak.html" },
  ],
  shop: [
    { label: "All watches", path: "/shop/watches" },
    { label: "Rolex Datejust", path: "/models/rolex-datejust" },
  ],
};
