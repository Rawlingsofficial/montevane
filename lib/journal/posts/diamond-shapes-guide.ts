import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "diamond-shapes-guide",
  title: "Diamond Shapes: Every Cut Compared",
  metaTitle: "Diamond Shapes Guide: Round, Oval, Emerald, Pear & More",
  description: "Every diamond shape compared: round, oval, cushion, emerald, pear, radiant, princess, marquise and heart – how each looks, sparkles, wears and what to check.",
  category: "Jewelry Guides",
  cluster: "jewelry",
  date: "2026-11-30",
  keyword: "diamond shapes",
  keywords: ["diamond cuts", "oval vs round diamond", "emerald cut diamond", "pear shaped diamond", "which diamond shape looks biggest"],
  image: "gallery/cat-jewelry",
  cover: "oval-cut-diamond-toi-et-moi-ring-platinum-oval-cut-diamond-toi-et-moi-ring-c-7-09-ct-s-1",
  picks: { category: "jewelry", piece: "Ring", sort: "price_asc", limit: 8 },
  intro: [
    "Shape is the most personal choice in a diamond. It changes how the stone sparkles, how big it looks, how it suits a hand – and how much it costs per carat.",
    "Here is every major shape, with what to check before you buy. For grading, see our [diamond buying guide](/journal/diamond-buying-guide).",
  ],
  sections: [
    {
      id: "compared",
      heading: "All shapes at a glance",
      blocks: [
        {
          table: {
            head: ["Shape", "Sparkle", "Looks larger?", "Watch out for"],
            rows: [
              ["Round brilliant", "Highest", "Standard", "Highest price per carat"],
              ["Oval", "High", "Yes", "Bow-tie shadow across the middle"],
              ["Cushion", "High, soft", "Slightly smaller", "Very different cutting styles"],
              ["Emerald", "Hall-of-mirrors flashes", "Yes", "Inclusions are visible – buy higher clarity"],
              ["Pear", "High", "Yes", "Fragile point; asymmetry"],
              ["Radiant", "High", "Slightly", "Depth hides weight"],
              ["Princess", "High", "No", "Sharp corners need protection"],
              ["Marquise", "High", "Largest of all", "Bow-tie; two fragile points"],
              ["Heart", "High", "Yes", "Needs good symmetry and size (over 0.5 ct)"],
            ],
          },
        },
      ],
    },
    {
      id: "brilliant",
      heading: "Brilliant shapes: maximum sparkle",
      blocks: [
        "Round, oval, pear, marquise, heart, cushion and radiant are all brilliant-cut: their facets are arranged to return as much light as possible. The round brilliant is the benchmark and the only shape that GIA gives an overall cut grade to.",
        "Elongated brilliants – oval, pear and marquise – spread their weight over a larger surface, so they look bigger than a round of the same carat and make fingers look longer.",
      ],
    },
    {
      id: "step",
      heading: "Step cuts: elegance and clarity",
      blocks: [
        "Emerald and Asscher cuts have long, parallel facets like steps. Instead of sparkle, they produce broad flashes of light – a calm, architectural look loved by Art Deco collectors. Because the facets are open, inclusions are easier to see, so choose VS2 or better.",
        { products: { category: "jewelry", query: "emerald cut", sort: "price_asc" }, title: "Emerald cut pieces available now" },
      ],
    },
    {
      id: "fancy",
      heading: "Shapes and fancy colour",
      blocks: [
        "Fancy colour diamonds are usually cut as cushions or radiants because those shapes intensify colour. That's why most [fancy yellow diamonds](/journal/fancy-yellow-diamonds) you'll see are cushion or radiant cut.",
        { products: { category: "jewelry", query: "fancy yellow", sort: "price_asc" }, title: "Fancy yellow diamonds" },
      ],
    },
    {
      id: "choose",
      heading: "How to choose",
      blocks: [
        {
          list: [
            "**Want the most sparkle?** Round brilliant.",
            "**Want the biggest look for the budget?** Oval, pear or marquise.",
            "**Want something vintage?** Cushion or Asscher.",
            "**Want understated elegance?** Emerald cut.",
            "**Can't decide?** A [Toi et Moi ring](/journal/toi-et-moi-rings) lets you combine two shapes.",
          ],
        },
      ],
    },
  ],
  faq: [
    { q: "Which diamond shape looks the biggest?", a: "Marquise, oval and pear shapes look largest for their weight because they spread it over a longer surface." },
    { q: "Which diamond shape sparkles the most?", a: "The round brilliant, which is cut specifically to maximise brilliance and fire." },
    { q: "Are oval diamonds cheaper than round?", a: "Generally yes, per carat. Round brilliants lose more rough diamond in cutting and are the most in demand." },
  ],
  sources: [
    { label: "GIA – Diamond quality factors", url: "https://www.gia.edu/diamond-quality-factor" },
    { label: "GIA – Gem encyclopedia", url: "https://www.gia.edu/gem-encyclopedia" },
  ],
  shop: [
    { label: "Diamond rings", path: "/shop/jewelry/rings" },
    { label: "Fine jewelry", path: "/shop/jewelry" },
  ],
};
