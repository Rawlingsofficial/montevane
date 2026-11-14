import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "togo-vs-epsom",
  title: "Togo vs Epsom: Which Hermès Leather Is Right for You?",
  metaTitle: "Togo vs Epsom Leather: Hermès Birkin & Kelly Compared",
  description: "Togo or Epsom for your Hermès Birkin or Kelly? Grain, weight, structure, scratch resistance, colour and ageing compared to help you choose.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2026-11-24",
  image: "product_side",
  intro: [
    "Togo and Epsom are the two most popular leathers for the Birkin and Kelly, and between them they account for most of the calfskin Birkins on the market. They look similar in photos but feel completely different in the hand.",
  ],
  sections: [
    {
      id: "compared",
      heading: "At a glance",
      blocks: [
        {
          table: {
            head: ["", "Togo", "Epsom"],
            rows: [
              ["Surface", "Natural, irregular pebbled grain", "Embossed, fine and very regular grain"],
              ["Feel", "Soft and supple", "Firm and smooth to the touch"],
              ["Structure", "Relaxes and slouches slightly with use", "Holds its shape; edges stay crisp"],
              ["Weight", "Medium", "Light"],
              ["Scratches", "Resistant; grain hides marks", "Very resistant; easy to wipe clean"],
              ["Colour", "Slightly muted, deep", "Bright and saturated"],
              ["Corners", "Can show wear over time", "Corners are the main point of wear"],
            ],
          },
        },
      ],
    },
    {
      id: "togo",
      heading: "Why choose Togo",
      blocks: [
        "Togo is a calfskin with a natural grain – the pattern is the leather's own, not pressed in. It feels soft and warm, and over years of use it relaxes into a gentle slouch that many collectors love. It is the classic Birkin leather and pairs beautifully with larger sizes like the 30 and 35.",
      ],
    },
    {
      id: "epsom",
      heading: "Why choose Epsom",
      blocks: [
        "Epsom is calfskin embossed with a fine grain, which makes it rigid, light and remarkably easy to care for. It holds sharp lines, so Sellier Kellys and small Birkins look exactly as they did on day one. Colours look vivid on Epsom, making it a favourite for brights.",
      ],
    },
    {
      id: "verdict",
      heading: "Our advice",
      blocks: [
        "Choose **Togo** if you want a soft, classic bag that ages with you. Choose **Epsom** if you want a light, structured bag that stays pristine with minimal care. For more on every Hermès leather, see the leather section of our [Birkin buying guide](/journal/hermes-birkin-buying-guide#leathers).",
      ],
    },
  ],
  faq: [
    { q: "Is Togo or Epsom more durable?", a: "Both are durable. Epsom resists scratches and is easier to clean; Togo's grain hides small marks well. Epsom's weak point is its corners; Togo's is a gradual loss of structure." },
    { q: "Which is lighter, Togo or Epsom?", a: "Epsom. It is noticeably lighter, which matters on larger bags." },
    { q: "Does Togo leather sag?", a: "It softens and relaxes over time, giving a slightly slouchy look. Storing the bag stuffed and upright keeps the shape." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Christie's – Handbags & Accessories department", url: "https://www.christies.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Hermès Birkin bags", path: "/shop/birkin-bags" },
    { label: "Shop Hermès Kelly bags", path: "/shop/kelly-bags" },
  ],
};
