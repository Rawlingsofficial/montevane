import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "diamond-tennis-bracelet-guide",
  title: "Diamond Tennis Bracelet Buying Guide",
  metaTitle: "Diamond Tennis Bracelet Guide: Carat, Settings & Clasps",
  description: "How to choose a diamond tennis bracelet: total carat weight, stone quality, prong vs bezel settings, clasps and safety catches, metals, fit and care.",
  category: "Jewelry Guides",
  cluster: "jewelry",
  date: "2027-03-15",
  keyword: "tennis bracelet buying guide",
  keywords: ["diamond tennis bracelet", "tennis bracelet carat weight", "tennis bracelet clasp", "fancy yellow tennis bracelet", "tennis necklace"],
  image: "gallery/cat-jewelry",
  cover: "round-cut-graduated-diamond-tennis-necklace-platinum-round-cut-graduated-diamond-tennis",
  picks: { category: "jewelry", query: "tennis", sort: "price_asc", limit: 8 },
  intro: [
    "A line of matched diamonds, set end to end. The tennis bracelet is the most wearable piece of fine jewelry there is – and its name comes from a match in 1978 when Chris Evert stopped play to look for the one she'd lost on court.",
  ],
  sections: [
    {
      id: "carat",
      heading: "Total carat weight",
      blocks: [
        "Tennis bracelets are described by **total carat weight** (tcw) – the weight of all the diamonds together. More carats means larger stones, not more of them. A few carats looks delicate and everyday; ten or more makes a statement.",
      ],
    },
    {
      id: "quality",
      heading: "Stone quality and matching",
      blocks: [
        "Because you see dozens of diamonds at once, consistency matters more than any single stone. Look for stones closely matched in colour and size, and for even sparkle along the whole line. Fancy yellow bracelets are a joyful alternative – see [fancy yellow diamonds](/journal/fancy-yellow-diamonds).",
      ],
    },
    {
      id: "setting",
      heading: "Settings",
      blocks: [
        {
          table: {
            head: ["Setting", "Look", "Practicality"],
            rows: [
              ["Four-prong", "Maximum light and sparkle", "Classic; prongs should be checked yearly"],
              ["Three-prong (martini)", "Stones appear slightly larger", "Elegant; lighter feel"],
              ["Bezel", "Smooth metal rim", "Most secure, slightly less sparkle"],
            ],
          },
        },
      ],
    },
    {
      id: "clasp",
      heading: "The clasp matters most",
      blocks: [
        "Choose a box clasp with at least one, ideally two, safety catches. The bracelet should be loose enough to move but not slide over the hand – about 1–2 cm larger than the wrist.",
        { products: { category: "jewelry", query: "tennis", sort: "price_asc" }, title: "Tennis bracelets and necklaces available now" },
      ],
    },
  ],
  faq: [
    { q: "Why is it called a tennis bracelet?", a: "After Chris Evert stopped a match at the 1978 US Open to find her diamond bracelet on court." },
    { q: "How many carats should a tennis bracelet be?", a: "Between about 2 and 5 carats is a popular everyday range; 10 carats and above is a statement piece." },
    { q: "Can I wear a tennis bracelet every day?", a: "Yes – it's designed to be. Check the prongs and clasp once a year." },
  ],
  sources: [
    { label: "GIA – Diamond quality factors", url: "https://www.gia.edu/diamond-quality-factor" },
  ],
  shop: [
    { label: "Fine jewelry", path: "/shop/jewelry" },
  ],
};
