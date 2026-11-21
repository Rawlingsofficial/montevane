import type { Post } from "@/lib/journal/types";

const card = (name: string, alt: string) => ({ image: { src: `/images/ours/${name}.webp`, alt, width: 864, height: 1080 } });

export const post: Post = {
  slug: "hermes-colours-fall-winter-2026",
  title: "New Hermès Colours for Fall–Winter 2026",
  metaTitle: "Hermès Fall–Winter 2026 Colours: Granny, Canari & More",
  description: "The Hermès colours of Fall–Winter 2026: Granny, Vert d'Eau, Ciel, Canari and Vanille – what each shade looks like and where it appears this season.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2026-11-21",
  keyword: "hermes colors 2026",
  keywords: ["hermes fall winter 2026", "hermes granny", "hermes canari", "hermes vert d'eau", "hermes ciel", "hermes vanille"],
  image: "gallery/cat-kelly-bags",
  intro: [
    "Fall–Winter 2026 brings a palette that redefines the autumn season at Hermès: archival greens and blues return, a creamy neutral moves into classic leathers, and one completely new yellow joins the house colours.",
    "Our team put together a card for each shade. Here they are, with what to look for in each one.",
  ],
  sections: [
    {
      id: "palette",
      heading: "The Fall–Winter 2026 palette",
      blocks: [card("colours-fw26", "New Hermès colours Fall–Winter 2026: Canari, Granny, Vanille, Ciel and Vert d'Eau")],
    },
    {
      id: "granny",
      heading: "Granny (K6)",
      blocks: [
        "An archival apple green with a warm yellow undertone. It first appeared in the Hermès palette in the 1990s under the name Vert Cru, and later returned as Granny.",
        "In 2026 it features on the Mini Kelly in Veau Madame, the Evelyne 16, the Picotin 18 in Clémence and the Plume in Doblis suede.",
        card("colour-granny", "Hermès Granny (K6) colour card"),
      ],
    },
    {
      id: "vert-d-eau",
      heading: "Vert d'Eau (6U)",
      blocks: [
        "A light, delicate shade reminiscent of translucent sea foam. Vert d'Eau was previously seen mostly in exotic leathers and rare editions.",
        "This season it returns in classic leathers, including Veau Madame and Swift. It looks deeper than Vert Fizz while keeping its lightness and freshness.",
        card("colour-vert-d-eau", "Hermès Vert d'Eau (6U) colour card"),
      ],
    },
    {
      id: "ciel",
      heading: "Ciel (7G)",
      blocks: [
        "An archival Hermès colour, first introduced in 2009, that returns for Fall–Winter 2026. Ciel appears only in select seasons, which makes it especially prized by collectors.",
        "Its clean, airy tone refreshes the house's iconic silhouettes and gives them a modern lightness.",
        card("colour-ciel", "Hermès Ciel (7G) colour card"),
      ],
    },
    {
      id: "canari",
      heading: "Canari (9L)",
      blocks: [
        "A completely new Hermès colour in the Fall–Winter 2026 collection: a rich, sunny yellow and a bold addition to the house palette.",
        "Canari was introduced on the Picotin and the Kelly 20. Pure and energetic, it gives the iconic silhouettes a fresh look and could become one of the most coveted colours of the season.",
        card("colour-canari", "Hermès Canari (9L) colour card"),
        card("colour-kelly-20", "Kelly 20 in Granny Epsom and Kelly 20 in Canari Epsom, palladium hardware"),
      ],
    },
    {
      id: "vanille",
      heading: "Vanille (Y1)",
      blocks: [
        "A soft, creamy colour with a delicate yellow undertone that returns this season.",
        "Vanille was previously found mainly in exotic leathers and special orders. In the Fall–Winter 2026 collection it also comes in classic leathers, including Clémence.",
        card("colour-vanille", "Hermès Vanille (Y1) colour card"),
        { products: { category: "kelly-bags", sort: "newest", limit: 4 }, title: "Kellys available now" },
      ],
    },
  ],
  faq: [
    { q: "Which Hermès colour is new for Fall–Winter 2026?", a: "Canari (9L), a rich sunny yellow, is a completely new colour this season. It was introduced on the Picotin and the Kelly 20." },
    { q: "Which archival colours return this season?", a: "Granny (K6), first seen in the 1990s as Vert Cru, and Ciel (7G), first introduced in 2009. Vert d'Eau and Vanille, once mostly seen in exotics, also come in classic leathers this season." },
    { q: "Can you find a piece in one of these colours?", a: "Yes. Tell us the model, size and colour you want and our team will look for it. [Contact us](/contact)." },
  ],
  sources: [],
  shop: [
    { label: "Kelly bags", path: "/shop/kelly-bags" },
    { label: "Birkin bags", path: "/shop/birkin-bags" },
    { label: "The Hermès colour guide", path: "/journal/hermes-colour-guide" },
  ],
};
