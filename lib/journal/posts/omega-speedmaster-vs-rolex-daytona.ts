import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "omega-speedmaster-vs-rolex-daytona",
  title: "Omega Speedmaster vs Rolex Daytona",
  metaTitle: "Omega Speedmaster vs Rolex Daytona: Moonwatch or Daytona?",
  description: "Omega Speedmaster Moonwatch or Rolex Daytona? History, movements, size, wearability, availability and price compared for the two most famous chronographs.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-03-12",
  keyword: "speedmaster vs daytona",
  keywords: ["omega moonwatch", "rolex daytona", "best luxury chronograph", "speedmaster price", "daytona alternative"],
  image: "gallery/cat-watches",
  cover: "omega-speedmaster-311-92-44-30-01-001-dark-side-of-the-moon-ceramic-skeleton-dial-44-mm",
  picks: { brand: "omega", sort: "price_asc", limit: 4 },
  intro: [
    "They are the two most famous chronographs ever made. One went to the Moon; the other became the most coveted Rolex of all. They also sit at very different prices.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "Omega Speedmaster Moonwatch", "Rolex Daytona"],
            rows: [
              ["Born", "1957", "1963"],
              ["Fame", "Worn on the Moon in 1969", "Racing heritage and the \"Paul Newman\" legend"],
              ["Movement", "Manual-wind chronograph", "Automatic chronograph (calibre 4131 today)"],
              ["Size", "42 mm", "40 mm"],
              ["Feel", "Tool watch, vintage character", "Polished, precise, jewelry-like"],
              ["Price", "A fraction of a Daytona", "Much higher, especially in steel"],
            ],
          },
        },
      ],
    },
    {
      id: "speedmaster",
      heading: "Why choose the Speedmaster",
      blocks: [
        "History you can wear, a manual-wind ritual, and an honest tool-watch character – at a price that leaves room in the collection for something else.",
        { products: { brand: "omega", query: "speedmaster", sort: "price_asc" }, title: "Speedmaster available now" },
      ],
    },
    {
      id: "daytona",
      heading: "Why choose the Daytona",
      blocks: [
        "Rolex finishing, an automatic movement and the strongest value retention of any chronograph. Read the [Daytona buying guide](/journal/rolex-daytona-buying-guide).",
        { products: { brand: "rolex", query: "daytona", sort: "price_asc" }, title: "Daytona available now" },
      ],
    },
  ],
  faq: [
    { q: "Which is better, the Speedmaster or the Daytona?", a: "Neither is objectively better. The Speedmaster offers Moon history and a manual movement at a lower price; the Daytona offers Rolex finishing and stronger value retention." },
    { q: "Is the Omega Speedmaster manual or automatic?", a: "The Moonwatch is manual-wind. Some other Speedmaster models are automatic." },
    { q: "Why is the Daytona so much more expensive?", a: "Demand far exceeds supply, especially for steel models, so it trades well above retail on the secondary market." },
  ],
  sources: [
    { label: "Omega – official site", url: "https://www.omegawatches.com/" },
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
  ],
  shop: [
    { label: "Shop Omega", path: "/shop/watches/omega" },
    { label: "Rolex Daytona", path: "/models/rolex-daytona" },
  ],
};
