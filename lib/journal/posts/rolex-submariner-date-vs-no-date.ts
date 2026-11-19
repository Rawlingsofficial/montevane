import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "rolex-submariner-date-vs-no-date",
  title: "Rolex Submariner Date vs No-Date: Which to Buy?",
  metaTitle: "Rolex Submariner Date vs No-Date (126610 vs 124060)",
  description: "Rolex Submariner 124060 or 126610LN? Symmetry vs practicality, the green-bezel Kermit and Hulk, movements, generations and current prices compared.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2026-12-18",
  keyword: "submariner date vs no date",
  keywords: ["rolex 124060", "rolex 126610ln", "rolex kermit", "rolex hulk"],
  image: "watches_showcase",
  cover: "rolex-submariner-116618ln-18k-yellow-gold-black-index-dial-oyster-bracelet-40mm",
  picks: { query: "submariner", brand: "rolex", sort: "newest" },
  intro: [
    "The Submariner is the archetypal luxury dive watch, and the first decision when buying one is simple but surprisingly hard: with a date, or without?",
    "Here's how the two compare, plus the green-bezel versions collectors know as the Kermit and the Hulk. For Rolex fundamentals, see our [Rolex buying guide](/journal/rolex-buying-guide).",
  ],
  sections: [
    {
      id: "compared",
      heading: "The current models",
      blocks: [
        {
          table: {
            head: ["", "Submariner (No-Date)", "Submariner Date"],
            rows: [
              ["Reference", "124060", "126610LN (black), 126610LV (green bezel)"],
              ["Case", "41 mm Oystersteel", "41 mm Oystersteel"],
              ["Movement", "Calibre 3230", "Calibre 3235"],
              ["Dial", "Clean and symmetrical", "Date window at 3 with Cyclops lens"],
              ["Appeal", "Closest to the original 1953 tool watch", "Everyday practicality"],
            ],
          },
        },
        "Both arrived in 2020, replacing the 40 mm 114060 and 116610 generation.",
      ],
    },
    {
      id: "green",
      heading: "Kermit and Hulk",
      blocks: [
        {
          list: [
            "**Hulk (116610LV)** – green dial and green bezel, made from 2010 to 2020. Now discontinued and sought after.",
            "**Kermit (126610LV)** – black dial with a green bezel, introduced in 2020, echoing the anniversary Submariner of 2003.",
          ],
        },
        "At the time of writing (November 2026), the 126610LV on Montévane ranges from $14,300 to $17,400, and a Hulk is listed at $21,100.",
      ],
    },
    {
      id: "choose",
      heading: "Date or no date?",
      blocks: [
        {
          list: [
            "**Choose the No-Date** if you love symmetry and the purity of the original tool watch. Many collectors consider it the most \"correct\" Submariner.",
            "**Choose the Date** if you'll use it daily and want the convenience. The Cyclops has become part of the Rolex look.",
          ],
        },
        "See current pieces on our [Submariner page](/models/rolex-submariner) or browse all [Rolex watches](/shop/watches/rolex).",
      ],
    },
  ],
  faq: [
    { q: "What is the difference between the Submariner 124060 and 126610LN?", a: "The 124060 has no date and uses calibre 3230; the 126610LN has a date with a Cyclops lens and uses calibre 3235. Both are 41 mm in Oystersteel." },
    { q: "What is a Rolex Kermit?", a: "The nickname for the Submariner Date with a green bezel and black dial – currently reference 126610LV." },
    { q: "Is the Rolex Hulk discontinued?", a: "Yes. The 116610LV, with green dial and green bezel, was produced from 2010 to 2020." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
    { label: "COSC – Swiss Official Chronometer Testing Institute", url: "https://www.cosc.swiss/en" },
  ],
  shop: [
    { label: "Rolex Submariner", path: "/models/rolex-submariner" },
    { label: "Shop Rolex watches", path: "/shop/watches/rolex" },
  ],
};
