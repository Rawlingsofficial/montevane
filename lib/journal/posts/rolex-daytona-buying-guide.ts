import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "rolex-daytona-buying-guide",
  title: "Rolex Daytona Buying Guide: References, Metals and Prices",
  metaTitle: "Rolex Daytona Buying Guide: 126500LN, 116500LN & Gold Models",
  description: "Rolex Daytona buying guide: the history, the key references from 116520 to 126500LN, steel vs gold vs platinum, dials, what to check and current prices.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-01-20",
  keyword: "rolex daytona buying guide",
  keywords: ["rolex daytona 126500ln", "rolex daytona 116500ln", "daytona panda", "rolex daytona price", "daytona gold"],
  image: "watches_showcase",
  cover: "rolex-daytona-116520-stainless-steel-white-index-dial-oyster-bracelet-40-mm",
  picks: { brand: "rolex", query: "daytona", sort: "price_asc", limit: 8 },
  intro: [
    "The Cosmograph Daytona is the most sought-after Rolex of all. Created in 1963 for racing drivers, it became a legend through vintage \"Paul Newman\" dials and remains the hardest modern Rolex to buy at retail.",
    "Here's how to choose the right one.",
  ],
  sections: [
    {
      id: "generations",
      heading: "Modern generations",
      blocks: [
        {
          table: {
            head: ["Era", "Movement", "Key steel references", "What changed"],
            rows: [
              ["2000 – 2016", "Rolex calibre 4130", "116520", "First in-house Daytona movement"],
              ["2016 – 2023", "Calibre 4130", "116500LN", "Black ceramic bezel; the white \"panda\" dial became an icon"],
              ["2023 –", "Calibre 4131", "126500LN", "Refined case and bezel, updated movement finishing"],
            ],
          },
        },
        "Before 2000, the Daytona used a Zenith-based automatic movement (1988 – 2000), and earlier still, manual-wind movements – the vintage era collectors chase.",
      ],
    },
    {
      id: "metals",
      heading: "Steel, gold or platinum?",
      blocks: [
        {
          list: [
            "**Steel** – the most in demand, and usually the hardest to find.",
            "**Two-tone (Rolesor)** – steel and yellow or Everose gold, often more accessible than full steel on the secondary market.",
            "**Yellow, white or Everose gold** – on bracelet or Oysterflex rubber strap; meteorite and gem-set dials sit here.",
            "**Platinum** – with its ice-blue dial and brown ceramic bezel, the top of the range.",
          ],
        },
      ],
    },
    {
      id: "check",
      heading: "What to check",
      blocks: [
        {
          list: [
            "**Box and papers** – the warranty card should match the serial.",
            "**Chronograph function** – start, stop and reset should be crisp; the hand should reset exactly to zero.",
            "**Bezel** – ceramic bezels resist scratches but can chip.",
            "**Polishing** – sharp case edges and chamfers indicate an unpolished watch.",
          ],
        },
        "More in our [Rolex buying guide](/journal/rolex-buying-guide) and [how to spot a fake Rolex](/journal/how-to-spot-a-fake-rolex).",
      ],
    },
    {
      id: "shop",
      heading: "Available now",
      blocks: [
        { products: { brand: "rolex", query: "daytona", max: 60000, sort: "price_asc" }, title: "Daytona under $60,000" },
        { products: { brand: "rolex", query: "daytona", min: 60000, sort: "price_asc" }, title: "Gold and platinum Daytona" },
      ],
    },
  ],
  faq: [
    { q: "What is the current steel Daytona reference?", a: "The 126500LN, introduced in 2023, with calibre 4131. It replaced the 116500LN." },
    { q: "Why is the Rolex Daytona so hard to buy?", a: "Demand far exceeds supply at retail, especially for steel models, so most buyers purchase on the secondary market." },
    { q: "What is a Daytona panda?", a: "The nickname for a white dial with black sub-dials, as on the 116500LN and 126500LN." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
    { label: "COSC – Swiss Official Chronometer Testing Institute", url: "https://www.cosc.swiss/en" },
  ],
  shop: [
    { label: "Rolex Daytona", path: "/models/rolex-daytona" },
    { label: "Shop Rolex", path: "/shop/watches/rolex" },
  ],
};
