import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "how-to-care-for-a-hermes-bag",
  title: "How to Care for a Hermès Bag",
  metaTitle: "How to Care for a Hermès Bag: Storage, Cleaning & Repairs",
  description: "How to care for your Hermès Birkin or Kelly: daily habits, storage, rain and stains, care for each leather and exotic, and when to go to the Hermès spa.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2026-12-21",
  keyword: "how to care for a hermes bag",
  keywords: ["birkin storage", "hermes spa", "clean hermes leather"],
  image: "product_front",
  cover: "hermes-birkin-30-black-togo-and-matte-alligator-touch-gold-hardware",
  picks: { category: "bag-organizers", sort: "newest" },
  intro: [
    "A Hermès bag is built to last for decades, and a little care keeps it looking its best – and keeps its value. Most of it comes down to simple habits.",
  ],
  sections: [
    {
      id: "daily",
      heading: "Everyday habits",
      blocks: [
        {
          list: [
            "**Clean hands.** Hand creams, oils and perfume can mark leather, especially handles.",
            "**Mind the corners.** Avoid setting the bag down on rough surfaces; corners wear first.",
            "**Watch the colour transfer.** Dark denim can stain light leathers.",
            "**Keep pens capped and liquids sealed** – or use an organiser inside.",
          ],
        },
      ],
    },
    {
      id: "storage",
      heading: "Storage",
      blocks: [
        {
          list: [
            "Store upright in its dust bag, in a cool, dry place away from direct sunlight.",
            "Stuff it lightly with acid-free tissue or a pillow insert to keep its shape.",
            "Don't hang it by the handles, and keep the clochette and lock off the leather (wrap them separately).",
            "Avoid plastic, which traps moisture.",
          ],
        },
      ],
    },
    {
      id: "leathers",
      heading: "Care by leather",
      blocks: [
        {
          table: {
            head: ["Leather", "Care notes"],
            rows: [
              ["Togo, Clemence", "Durable; wipe with a dry soft cloth. Store stuffed to prevent slouching."],
              ["Epsom", "Wipe clean easily; protect the corners."],
              ["Swift, Box", "Shows scratches; Box can be buffed by a specialist. Avoid rain."],
              ["Crocodile, alligator", "Keep away from water and heat; humidity can lift the scales."],
              ["Ostrich", "Relatively resilient; avoid moisture and oils."],
              ["Lizard", "Delicate; store flat-backed and away from heat."],
            ],
          },
        },
        "Not sure which leather you have? Our [Togo vs Epsom guide](/journal/togo-vs-epsom) explains the two most common.",
      ],
    },
    {
      id: "accidents",
      heading: "Rain and stains",
      blocks: [
        "If the bag gets wet, blot gently with a soft, dry cloth and let it dry naturally at room temperature – never with a hairdryer or near a radiator. For stains, don't use household cleaners or wipes; take it to a specialist or to Hermès.",
      ],
    },
    {
      id: "spa",
      heading: "The Hermès spa",
      blocks: [
        "Hermès offers repairs and refurbishment through its boutiques, sometimes called the \"spa\": reconditioning leather, restitching, replacing handles and refreshing hardware. Bags are sent to the Hermès workshops, so allow time. Hermès only services genuine bags.",
      ],
    },
  ],
  faq: [
    { q: "Can I use leather conditioner on my Hermès bag?", a: "It is best avoided. Many conditioners darken or change the finish of Hermès leathers. If the leather needs attention, use Hermès or a specialist." },
    { q: "How do I keep my Birkin from slouching?", a: "Store it upright and stuffed with acid-free tissue or an insert, and avoid overloading it." },
    { q: "Does Hermès repair bags bought second-hand?", a: "Hermès repairs genuine bags regardless of where they were bought, though it may decline some work." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
  ],
  shop: [
    { label: "Shop Hermès Birkin bags", path: "/shop/birkin-bags" },
    { label: "Shop Hermès Kelly bags", path: "/shop/kelly-bags" },
  ],
};
