import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "kelly-25-vs-28",
  title: "Hermès Kelly 25 vs Kelly 28: Which Size?",
  metaTitle: "Hermès Kelly 25 vs 28: Size, Capacity and Which to Choose",
  description: "Hermès Kelly 25 vs Kelly 28: dimensions, what fits inside, how each wears by hand and on the shoulder strap, and which size suits you best.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-04-09",
  keyword: "kelly 25 vs 28",
  keywords: ["kelly 25 size", "kelly 28 size", "which kelly size", "kelly shoulder strap", "kelly sellier"],
  image: "product_front",
  cover: "hermes-kelly-28-sellier-ostrich-noir-ghw",
  picks: { category: "kelly-bags", sort: "price_asc", limit: 8 },
  intro: [
    "The Kelly comes in several sizes, but the 25 and 28 are the two most requested. Three centimetres sounds like little – in a structured bag it changes everything.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Kelly 25 vs 28 at a glance",
      blocks: [
        {
          table: {
            head: ["", "Kelly 25", "Kelly 28"],
            rows: [
              ["Width", "About 25 cm", "About 28 cm"],
              ["Fits", "Phone, cardholder, keys, lipstick", "Add sunglasses, a small wallet and a pouch"],
              ["Best for", "Evenings, petite frames, crossbody wear", "Everyday use, a little more room"],
              ["Shoulder strap", "Included", "Included"],
            ],
          },
        },
        "Both come with the detachable shoulder strap, so either can be worn by hand, on the arm or across the body. The sellier (rigid, stitched outside) and retourne (softer, stitched inside) constructions make a difference too – see [Sellier vs Retourne](/journal/birkin-sellier-vs-retourne).",
      ],
    },
    {
      id: "choose",
      heading: "How to choose",
      blocks: [
        {
          list: [
            "**You carry the essentials and love crossbody:** Kelly 25.",
            "**This will be your everyday bag:** Kelly 28.",
            "**You're petite:** the 25 keeps the proportions elegant.",
            "**You want one Kelly for everything:** the 28 is the safer all-rounder.",
          ],
        },
        "Read the full [Kelly buying guide](/journal/hermes-kelly-buying-guide) for leathers, colours and prices.",
      ],
    },
  ],
  faq: [
    { q: "Is the Kelly 25 too small?", a: "Not for evening or essentials. It fits a phone, cardholder, keys and lipstick; for a wallet and sunglasses, choose the 28." },
    { q: "Do both sizes come with a strap?", a: "Yes. The Kelly 25 and 28 both come with a detachable shoulder strap." },
    { q: "Which Kelly size holds value best?", a: "The 25 and 28 are both highly sought after; condition, leather and colour matter more than the size difference." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Christie's – Handbags & Accessories", url: "https://www.christies.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Kelly bags", path: "/shop/kelly-bags" },
  ],
};
