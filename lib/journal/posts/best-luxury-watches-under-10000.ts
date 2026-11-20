import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "best-luxury-watches-under-10000",
  title: "The Best Luxury Watches Under $10,000",
  metaTitle: "Best Luxury Watches Under $10,000: Rolex, Tudor, Cartier…",
  description: "The best luxury watches under $10,000: an entry Rolex, Tudor Black Bay, Cartier Santos and Tank, Omega Speedmaster, Grand Seiko and Breitling – what each offers.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-03-24",
  keyword: "best luxury watches under 10000",
  keywords: ["best watch under 10k", "first luxury watch", "entry level rolex", "tudor vs omega", "grand seiko"],
  image: "gallery/cat-watches",
  cover: "rolex-oyster-perpetual-28-276200-stainless-steel-mediterranean-blue-index-dial-oyster",
  picks: { category: "watches", min: 2500, max: 10000, sort: "price_desc", limit: 8 },
  intro: [
    "You don't need six figures to own a watch that will last a lifetime. Under $10,000 you'll find some of the best-made watches in the world – including Rolex.",
  ],
  sections: [
    {
      id: "list",
      heading: "Our shortlist",
      blocks: [
        {
          table: {
            head: ["Watch", "Why it's on the list"],
            rows: [
              ["Rolex Oyster Perpetual / Datejust 36 (pre-owned)", "The Rolex experience, built to last generations"],
              ["Tudor Black Bay", "In-house movements and vintage style; see [Black Bay vs Submariner](/journal/tudor-black-bay-vs-rolex-submariner)"],
              ["Cartier Santos or Tank", "A century of design; see [Santos vs Tank](/journal/cartier-santos-vs-tank)"],
              ["Omega Speedmaster", "The Moonwatch; see [Speedmaster vs Daytona](/journal/omega-speedmaster-vs-rolex-daytona)"],
              ["Grand Seiko", "Japanese finishing that rivals the Swiss"],
              ["Breitling Navitimer", "The pilot's chronograph"],
            ],
          },
        },
      ],
    },
    {
      id: "available",
      heading: "Available now under $10,000",
      blocks: [
        { products: { category: "watches", min: 2500, max: 10000, sort: "price_desc" } },
      ],
    },
    {
      id: "tips",
      heading: "How to choose",
      blocks: [
        {
          list: [
            "**One watch for everything?** A Datejust 36 or Black Bay on a bracelet.",
            "**Mostly suits?** A Cartier Tank.",
            "**Love history?** The Speedmaster.",
            "**Value retention matters?** Rolex, then Tudor and Omega.",
          ],
        },
        "Check the fit with our [watch size guide](/journal/watch-size-guide).",
      ],
    },
  ],
  faq: [
    { q: "Can you buy a Rolex for under $10,000?", a: "Yes – pre-owned Oyster Perpetual and Datejust 36 models can be found under $10,000." },
    { q: "What is the best first luxury watch?", a: "A Rolex Datejust 36, Tudor Black Bay, Omega Speedmaster or Cartier Santos are all excellent first watches." },
    { q: "Which watches under $10,000 hold their value?", a: "Rolex holds value best, followed by Tudor and Omega's most popular models." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
    { label: "Tudor – official site", url: "https://www.tudorwatch.com/" },
    { label: "Omega – official site", url: "https://www.omegawatches.com/" },
  ],
  shop: [
    { label: "All watches", path: "/shop/watches" },
  ],
};
