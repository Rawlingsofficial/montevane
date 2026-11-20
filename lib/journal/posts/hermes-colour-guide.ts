import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "hermes-colour-guide",
  title: "Hermès Colours: Neutrals, Classics and Rarities",
  metaTitle: "Hermès Colour Guide: Gold, Etoupe, Craie, Noir & More",
  description: "A guide to Hermès colours: the neutrals that hold value (Noir, Gold, Etoupe, Craie, Etain), classic brights, rare shades, and how to choose.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-02-22",
  keyword: "hermes colors",
  keywords: ["best birkin color", "hermes gold vs etoupe", "hermes craie", "hermes etain", "birkin colors list"],
  image: "gallery/cat-birkin-bags",
  cover: "pre-owned-hermes-birkin-25-etoupe-togo-palladium-hardware",
  picks: { category: "birkin-bags", query: "etoupe", sort: "newest", limit: 8 },
  intro: [
    "Hermès introduces and retires colours every season, and the same name can look different on Togo, Epsom or Swift. Choosing a colour is the most personal decision in buying a Birkin – and it also has the biggest influence on resale value after size.",
  ],
  sections: [
    {
      id: "neutrals",
      heading: "The neutrals",
      blocks: [
        {
          table: {
            head: ["Colour", "Look", "Why people choose it"],
            rows: [
              ["Noir", "Black", "Goes with everything, every season"],
              ["Gold", "Warm caramel tan with contrast white stitching", "The signature Hermès colour"],
              ["Etoupe", "Taupe grey-brown", "Understated and endlessly versatile"],
              ["Etain", "Cool pewter grey", "Modern neutral, lovely with palladium"],
              ["Craie", "Chalk off-white", "Fresh and elegant; needs care"],
              ["Gris Asphalte, Gris Meyer", "Mid greys", "Softer alternatives to Etain"],
            ],
          },
        },
        { products: { category: "birkin-bags", query: "gold togo", sort: "newest" }, title: "Gold Birkins available now" },
      ],
    },
    {
      id: "classics",
      heading: "Classic colours",
      blocks: [
        "Beyond neutrals, a handful of colours recur across the decades: deep blues such as Bleu Nuit and Bleu Encre, reds like Rouge H and Rouge Casaque, and soft pinks such as Rose Sakura. They're colourful without being seasonal, and they hold their appeal well.",
      ],
    },
    {
      id: "rare",
      heading: "Rare and special colours",
      blocks: [
        "Some shades appear for only a season or two and become collectors' favourites. Two-tone bags – including **Verso** (a contrasting interior) and special-order combinations – are rarer still. For the ultimate rarity, see the [Himalaya Birkin](/journal/himalaya-birkin).",
      ],
    },
    {
      id: "choose",
      heading: "How to choose",
      blocks: [
        {
          list: [
            "**First Birkin?** A neutral: Noir, Gold or Etoupe.",
            "**Second bag?** A colour you'd wear – blue, red or pink.",
            "**Worried about care?** Avoid very light shades (Craie, Nata) on soft leathers.",
            "**Thinking of resale?** Neutrals in popular sizes are the most liquid. See [is a Birkin a good investment?](/journal/is-a-birkin-a-good-investment)",
          ],
        },
        "Pair your colour with the right hardware using our [hardware guide](/journal/hermes-hardware-guide).",
      ],
    },
  ],
  faq: [
    { q: "What is the most popular Birkin colour?", a: "Noir, Gold and Etoupe are consistently the most in demand." },
    { q: "Which Hermès colour holds its value best?", a: "Neutrals – especially Noir, Gold and Etoupe – in popular sizes are the most liquid on the resale market." },
    { q: "What is a Verso Birkin?", a: "A Birkin with an interior in a contrasting colour to the exterior." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Sotheby's – Handbags & Accessories department", url: "https://www.sothebys.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
    { label: "Shop Kelly bags", path: "/shop/kelly-bags" },
  ],
};
