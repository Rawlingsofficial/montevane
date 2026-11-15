import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "hermes-rodeo-charm-guide",
  title: "The Hermès Rodeo Charm: Sizes, Colours and How to Wear It",
  metaTitle: "Hermès Rodeo Charm Guide: PM vs MM vs GM, Pegase & Prices",
  description: "Hermès Rodeo charm guide: the PM, MM and GM sizes and which bag each suits, the winged Pegase, colour combinations, how to attach it and how to spot a fake.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2026-12-02",
  keyword: "hermes rodeo charm",
  keywords: ["rodeo charm sizes", "rodeo pm vs mm", "rodeo pegase", "hermes bag charm", "rodeo charm price"],
  image: "feature_card_1",
  cover: "hermes-rodeo-robeo-24-charm-pm-vert-mangrove-craie-black-milo-lambskin",
  picks: { category: "bag-charms", query: "rodeo", sort: "newest", limit: 8 },
  intro: [
    "The Rodeo is a little leather horse – and the accessory that finishes a Birkin. Made from leather, with a saddle and mane in contrasting colours, it has become one of the hardest Hermès pieces to find in a boutique.",
    "Here's how to choose the right size and colours, and how to wear one.",
  ],
  sections: [
    {
      id: "sizes",
      heading: "PM, MM or GM?",
      blocks: [
        "The Rodeo comes in three sizes: PM (small), MM (medium) and GM (large). The rule of thumb is to match the charm to the bag:",
        {
          table: {
            head: ["Size", "Best on", "Why"],
            rows: [
              ["PM", "Birkin 25, Kelly 25, Mini Kelly, Constance", "Stays in proportion on small bags"],
              ["MM", "Birkin 30, Kelly 28", "The most versatile – the classic choice"],
              ["GM", "Birkin 35 and 40, totes", "Holds its own on large bags"],
            ],
          },
        },
        "Many collectors break the rule on purpose – a PM on a Birkin 35 looks playful, a GM on a 25 looks bold. If in doubt, choose the MM.",
      ],
    },
    {
      id: "pegase",
      heading: "The Rodeo Pegase",
      blocks: [
        "The Pegase is the winged version of the Rodeo, released in smaller numbers and often in special colourways and prints. It is generally rarer and priced above a standard Rodeo of the same size.",
        { products: { category: "bag-charms", query: "pegase", sort: "price_asc" }, title: "Pegase charms available now" },
      ],
    },
    {
      id: "colours",
      heading: "Choosing colours",
      blocks: [
        {
          list: [
            "**Contrast** – a bright Rodeo on a neutral bag (Black, Gold, Etoupe) is the most popular look.",
            "**Tone on tone** – a Rodeo in shades close to the bag for a quieter, collector's look.",
            "**Match the Twilly** – pick a Rodeo that echoes a colour in your [Twilly](/journal/how-to-tie-a-twilly).",
          ],
        },
      ],
    },
    {
      id: "attach",
      heading: "How to attach it",
      blocks: [
        "Loop the Rodeo's strap around the base of a handle or through the clochette strap – never through the lock, which can scratch the leather. Remove it when storing the bag so it doesn't leave an imprint.",
      ],
    },
    {
      id: "authentic",
      heading: "Spotting a fake Rodeo",
      blocks: [
        "Genuine Rodeos have neat, even stitching, cleanly finished edges and an Hermès stamp. Uneven cuts, glue marks, rough edges and leather that feels plastic are warning signs. Every charm on Montévane is checked before it's listed – see [our authenticity guarantee](/authenticity).",
      ],
    },
  ],
  faq: [
    { q: "What size Rodeo charm should I get for a Birkin 30?", a: "The MM is the classic choice for a Birkin 30. The PM gives a more delicate look, the GM a bolder one." },
    { q: "What is the difference between a Rodeo and a Rodeo Pegase?", a: "The Pegase has wings and is produced in smaller numbers, often in special colours, so it is generally rarer and more expensive." },
    { q: "Can a Rodeo charm damage my bag?", a: "Not if attached to the handle base or clochette strap and removed for storage. Avoid hanging it from the lock." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Sotheby's – Handbags & Accessories department", url: "https://www.sothebys.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop bag charms", path: "/shop/bag-charms" },
    { label: "Twilly scarves", path: "/shop/twilly-scarves" },
  ],
};
