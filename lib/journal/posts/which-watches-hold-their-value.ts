import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "which-watches-hold-their-value",
  title: "Which Luxury Watches Hold Their Value?",
  metaTitle: "Which Luxury Watches Hold Their Value Best?",
  description: "Which luxury watches hold their value and why: the brands and models with the strongest resale, what loses value, and how to buy well.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-03-31",
  keyword: "watches that hold their value",
  keywords: ["rolex resale value", "best watch investment", "do watches hold value", "patek resale value", "royal oak resale"],
  image: "watches_showcase",
  cover: "rolex-submariner-116613ln-stainless-steel-and-18k-yellow-gold-black-index-dial-oyster",
  picks: { brand: "rolex", query: "submariner", sort: "price_asc", limit: 8 },
  intro: [
    "Most luxury goods lose value the moment you buy them. Some watches don't – a few have even sold for more than their retail price for years. But the market moves, and value retention is never guaranteed.",
    "Here's what drives it. This is general information, not financial advice.",
  ],
  sections: [
    {
      id: "strong",
      heading: "What tends to hold value",
      blocks: [
        {
          list: [
            "**Steel sports models from Rolex, Patek Philippe and Audemars Piguet** – Submariner, GMT-Master II, Daytona, Nautilus, Aquanaut, Royal Oak.",
            "**Discontinued icons** – such as the Nautilus 5711. See [5711 vs 5811](/journal/patek-5711-vs-5811).",
            "**Independent makers with tiny production** – like [F.P. Journe](/journal/fp-journe-guide).",
          ],
        },
      ],
    },
    {
      id: "weak",
      heading: "What tends to lose value",
      blocks: [
        {
          list: [
            "Watches from brands with frequent discounting.",
            "Precious-metal and gem-set models, relative to their high retail price.",
            "Aftermarket modifications – see [factory vs aftermarket diamonds](/journal/rolex-aftermarket-diamonds).",
            "Heavily polished cases, missing papers, replaced parts.",
          ],
        },
      ],
    },
    {
      id: "buy",
      heading: "How to buy well",
      blocks: [
        {
          list: [
            "Buy the most original, complete example you can afford.",
            "Pay the right price – check recent sales, not asking prices.",
            "Keep box, papers and service records together.",
            "Buy what you love: market prices move, but the pleasure of wearing it doesn't.",
          ],
        },
        "Similar logic applies to bags – see [is a Birkin a good investment?](/journal/is-a-birkin-a-good-investment)",
      ],
    },
  ],
  faq: [
    { q: "Which Rolex holds its value best?", a: "Historically, steel sports models such as the Daytona, Submariner and GMT-Master II." },
    { q: "Are watches a good investment?", a: "Some watches have held or grown in value, but prices can fall. Treat a watch as a purchase you enjoy, not a financial plan, and speak to a licensed adviser about investments." },
    { q: "Do papers affect a watch's value?", a: "Yes. A complete set with box and papers usually sells for more and more easily." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
    { label: "Patek Philippe – Nautilus collection", url: "https://www.patek.com/en/collection/nautilus" },
  ],
  shop: [
    { label: "Shop Rolex", path: "/shop/watches/rolex" },
    { label: "All watches", path: "/shop/watches" },
  ],
};
