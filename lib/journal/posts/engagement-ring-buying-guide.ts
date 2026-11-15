import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "engagement-ring-buying-guide",
  title: "Engagement Ring Buying Guide: Shape, Setting and Stone",
  metaTitle: "Engagement Ring Buying Guide: How to Choose the Right Ring",
  description: "How to choose an engagement ring: diamond shapes, settings, metals, where to spend on the 4Cs, finding her ring size secretly, and what a GIA report tells you.",
  category: "Jewelry Guides",
  cluster: "jewelry",
  date: "2026-11-16",
  keyword: "engagement ring buying guide",
  keywords: ["how to choose an engagement ring", "engagement ring settings", "platinum vs white gold", "toi et moi engagement ring", "engagement ring size"],
  image: "jewelry_1",
  cover: "radiant-and-pear-shaped-diamond-toi-et-moi-engagement-ring-18k-white-gold-radiant-and",
  picks: { category: "jewelry", piece: "Ring", query: "engagement", sort: "price_asc", limit: 8 },
  intro: [
    "December is the most popular month of the year to propose, and most people buy the ring in the weeks before. If that's you, this guide is the short version of everything a jeweller would tell you.",
    "Start with what she'll notice – the shape and the setting – then decide where to spend on the stone. For the grading details, see our [diamond buying guide](/journal/diamond-buying-guide).",
  ],
  sections: [
    {
      id: "shape",
      heading: "1. Choose the shape",
      blocks: [
        "Shape is the first thing anyone sees and the most personal choice. Round brilliants sparkle most; elongated shapes (oval, pear, emerald) look larger for their weight and flatter the finger.",
        {
          table: {
            head: ["Shape", "Look", "Good to know"],
            rows: [
              ["Round", "Classic, maximum sparkle", "The most expensive per carat"],
              ["Oval", "Elegant, elongates the finger", "Check for a \"bow-tie\" shadow across the centre"],
              ["Emerald", "Architectural, Art Deco", "Shows inclusions – choose higher clarity"],
              ["Pear", "Romantic, distinctive", "Protect the point with a V-prong"],
              ["Cushion", "Soft, vintage", "Wide variation in cutting styles"],
              ["Radiant", "Brilliant sparkle, rectangular outline", "Hides inclusions well"],
            ],
          },
        },
        "See every shape compared in our [diamond shapes guide](/journal/diamond-shapes-guide).",
      ],
    },
    {
      id: "setting",
      heading: "2. Choose the setting",
      blocks: [
        {
          list: [
            "**Solitaire** – one stone, timeless, lets the diamond speak.",
            "**Halo** – a circle of small diamonds that makes the centre look larger.",
            "**Three-stone** – past, present and future; wonderful with a fancy colour centre.",
            "**Toi et Moi** – two stones side by side, \"you and me\". The most requested style of the moment. Read [Toi et Moi rings explained](/journal/toi-et-moi-rings).",
            "**Eternity band** – diamonds all the way round; increasingly chosen as the engagement ring itself.",
          ],
        },
        { products: { category: "jewelry", query: "toi moi", sort: "price_asc" }, title: "Toi et Moi rings available now" },
      ],
    },
    {
      id: "metal",
      heading: "3. Choose the metal",
      blocks: [
        "**Platinum** is dense, naturally white and very durable – the choice for most fine engagement rings. **18k white gold** looks similar, is lighter and slightly more affordable, and is rhodium-plated for its bright white finish (the plating is renewed every few years). **Yellow and rose gold** suit warmer skin tones and vintage styles, and make fancy yellow diamonds glow.",
      ],
    },
    {
      id: "4cs",
      heading: "4. Where to spend on the stone",
      blocks: [
        {
          list: [
            "**Cut first.** A well-cut diamond looks bigger and brighter than a poorly cut one of the same weight.",
            "**Colour: G–H** looks white in a platinum setting; in yellow gold you can go lower.",
            "**Clarity: VS2–SI1** is usually \"eye-clean\" in round and oval stones; choose higher for emerald cuts.",
            "**Carat: buy just below the round numbers** – a 0.95 ct looks the same as a 1.00 ct and costs noticeably less.",
          ],
        },
        "Always ask for the grading report and learn [how to read a GIA report](/journal/how-to-read-a-gia-report).",
      ],
    },
    {
      id: "size",
      heading: "5. Find her size without asking",
      blocks: [
        "Borrow a ring she wears on her ring finger (the right hand works if needed – sizes are often similar) and have a jeweller measure it, or press it into soap to keep its outline. If in doubt, go slightly larger: making a ring smaller is easier than making it bigger, and eternity bands can't be resized at all.",
      ],
    },
  ],
  faq: [
    { q: "How much should I spend on an engagement ring?", a: "There is no rule. Decide your budget first, then choose shape and setting, and spend what's left on cut quality before carat weight." },
    { q: "Is platinum better than white gold for an engagement ring?", a: "Platinum is more durable and stays white without plating; white gold is lighter and slightly more affordable. Both are excellent choices." },
    { q: "Can an engagement ring be resized?", a: "Most solitaire, halo and three-stone rings can be resized by one or two sizes. Full eternity bands generally cannot, so measure carefully." },
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
