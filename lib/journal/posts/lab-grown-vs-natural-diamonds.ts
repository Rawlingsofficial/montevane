import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "lab-grown-vs-natural-diamonds",
  title: "Lab-Grown vs Natural Diamonds: An Honest Comparison",
  metaTitle: "Lab-Grown vs Natural Diamonds: Price, Value & How to Tell",
  description: "Lab-grown vs natural diamonds compared honestly: what they are, how they're identified, price, resale value, and which makes sense for an engagement ring or gift.",
  category: "Jewelry Guides",
  cluster: "jewelry",
  date: "2026-12-25",
  keyword: "lab grown vs natural diamonds",
  keywords: ["are lab grown diamonds real", "lab diamond resale value", "natural diamond value", "can you tell a lab grown diamond", "lab grown engagement ring"],
  image: "jewelry_1",
  cover: "round-cut-diamond-engagement-ring-18k-white-gold-round-cut-diamond-engagement-ring-3-71-ct",
  picks: { category: "jewelry", sort: "price_asc", limit: 8 },
  intro: [
    "Lab-grown diamonds are real diamonds – the same carbon crystal, the same hardness, the same sparkle. They are also a completely different product from a natural diamond, and the difference shows up when you ask what it will be worth later.",
    "Here's an honest comparison to help you decide.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Natural", "Lab-grown"],
            rows: [
              ["What it is", "Carbon crystallised deep in the earth over billions of years", "The same crystal grown in a laboratory in weeks"],
              ["Looks and hardness", "Identical to the eye", "Identical to the eye"],
              ["How it's identified", "Gemological laboratory testing", "Gemological laboratory testing"],
              ["Grading report", "GIA natural diamond report", "Separate laboratory-grown report"],
              ["Price", "Much higher", "A fraction of a natural of the same size"],
              ["Resale value", "Retains a meaningful part of its value", "Very limited resale market"],
              ["Rarity", "Finite", "Can be produced at will"],
            ],
          },
        },
      ],
    },
    {
      id: "tell",
      heading: "Can you tell the difference?",
      blocks: [
        "Not with the naked eye, and not with a basic diamond tester. Gemological laboratories use advanced spectroscopy to tell them apart, and laboratory-grown stones are typically laser-inscribed on the girdle. Always ask for the grading report and check it – see [how to read a GIA report](/journal/how-to-read-a-gia-report).",
      ],
    },
    {
      id: "value",
      heading: "Price versus value",
      blocks: [
        "Lab-grown diamond prices have fallen steeply as production has scaled, and there is little demand for them on the secondary market. Natural diamonds have a long-established resale market. If you want the largest stone for a fixed budget and never intend to sell, lab-grown can make sense. If the ring is an heirloom, or value matters to you, choose natural.",
      ],
    },
    {
      id: "montevane",
      heading: "What we sell",
      blocks: [
        "We don't list laboratory-grown diamonds: each piece's description states its stones, and where a piece is certified, the report is listed with it. Ask us for the report number before you buy.",
        { products: { category: "jewelry", piece: "Ring", sort: "price_asc" }, title: "Natural diamond rings" },
      ],
    },
  ],
  faq: [
    { q: "Are lab-grown diamonds real diamonds?", a: "Yes. They have the same chemical and physical properties as natural diamonds. They are identified as laboratory-grown through gemological testing." },
    { q: "Do lab-grown diamonds hold their value?", a: "Very little. Prices have fallen as production has grown, and the resale market is limited." },
    { q: "Can a jeweller tell if a diamond is lab-grown?", a: "Not by eye. Identification requires laboratory equipment, which is why a grading report from a recognised lab matters." },
  ],
  sources: [
    { label: "GIA – Diamond quality factors", url: "https://www.gia.edu/diamond-quality-factor" },
    { label: "GIA – About the Gemological Institute of America", url: "https://www.gia.edu/gia-about" },
  ],
  shop: [
    { label: "Diamond rings", path: "/shop/jewelry/rings" },
    { label: "Fine jewelry", path: "/shop/jewelry" },
  ],
};
