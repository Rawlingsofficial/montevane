import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "diamond-fluorescence",
  title: "Diamond Fluorescence: Good, Bad or Irrelevant?",
  metaTitle: "Diamond Fluorescence Explained: Does It Affect Price?",
  description: "What diamond fluorescence is, how GIA grades it from None to Very Strong, when blue fluorescence helps or hurts a diamond's look, and how it affects price.",
  category: "Jewelry Guides",
  cluster: "jewelry",
  date: "2027-05-03",
  keyword: "diamond fluorescence",
  keywords: ["strong blue fluorescence", "does fluorescence affect price", "gia fluorescence", "medium blue fluorescence", "fluorescence none"],
  image: "gallery/cat-jewelry",
  cover: "fancy-yellow-cushion-cut-diamond-sol-necklace-platinum-and-18k-yellow-gold-cushion-cut",
  picks: { category: "jewelry", sort: "price_desc", limit: 8 },
  intro: [
    "Under ultraviolet light, some diamonds glow – usually blue. That's fluorescence. It appears on every GIA report, and it can work for or against a stone.",
  ],
  sections: [
    {
      id: "what",
      heading: "What fluorescence is",
      blocks: [
        "Fluorescence is the visible light some diamonds emit under ultraviolet rays, such as daylight or a black light. GIA estimates that roughly a quarter to a third of diamonds show some fluorescence, and blue is by far the most common colour. You'll find it on the report next to the 4Cs – see [how to read a GIA report](/journal/how-to-read-a-gia-report).",
        {
          table: {
            head: ["GIA grade", "What it means"],
            rows: [
              ["None", "No visible reaction"],
              ["Faint", "Very slight glow under UV"],
              ["Medium", "Noticeable under UV, rarely in daylight"],
              ["Strong / Very Strong", "Clearly visible under UV"],
            ],
          },
        },
      ],
    },
    {
      id: "effect",
      heading: "Does it help or hurt?",
      blocks: [
        {
          list: [
            "**In lower colour grades (around I–K),** blue fluorescence can make the diamond look whiter in daylight – a plus.",
            "**In top colours (D–F),** it is less desirable; in rare cases very strong fluorescence can make a stone look hazy.",
            "**In most stones,** GIA research found that typical observers can't tell the difference in normal light.",
          ],
        },
        "Because of the market's preference, diamonds with strong fluorescence often cost less – which can mean better value if the stone looks right to your eye.",
      ],
    },
  ],
  faq: [
    { q: "Is fluorescence bad in a diamond?", a: "Not usually. Faint or medium fluorescence rarely affects appearance, and blue fluorescence can make lower colours look whiter." },
    { q: "Does fluorescence affect diamond price?", a: "Often, yes – strong fluorescence in top colours usually lowers the price, which can be good value." },
    { q: "Can you see fluorescence in normal light?", a: "Generally not. It shows under ultraviolet light; only very strong fluorescence occasionally affects the look in daylight." },
  ],
  sources: [
    { label: "GIA – Diamond quality factors", url: "https://www.gia.edu/diamond-quality-factor" },
    { label: "GIA – About GIA", url: "https://www.gia.edu/gia-about" },
  ],
  shop: [
    { label: "Shop jewelry", path: "/shop/jewelry" },
    { label: "Diamond buying guide", path: "/journal/diamond-buying-guide" },
  ],
};
