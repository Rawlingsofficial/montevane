import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "how-to-tie-a-twilly",
  title: "How to Tie a Twilly: 6 Ways to Wear Hermès Silk",
  metaTitle: "How to Tie a Hermès Twilly on a Birkin (and 5 Other Ways)",
  description: "How to tie a Hermès Twilly on a Birkin or Kelly handle, as a bow, in your hair, at the neck or on the wrist – step by step, plus how to choose and care for one.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2026-11-23",
  keyword: "how to tie a twilly",
  keywords: ["twilly on birkin handle", "hermes twilly", "how to wear a twilly", "twilly bow", "twilly hair"],
  image: "feature_card_1",
  cover: "hermes-twilly-les-mains-rouge-and-blue-set-of-two",
  picks: { category: "twilly-scarves", sort: "newest", limit: 8 },
  intro: [
    "The Twilly is a narrow silk ribbon about 86 cm long, printed with the same designs as Hermès' carrés. It's the house's most versatile accessory – and the easiest way to make a bag, an outfit or a gift feel personal.",
    "Here are six ways to wear one, from the classic handle wrap to the wrist.",
  ],
  sections: [
    {
      id: "handle",
      heading: "1. The classic handle wrap",
      blocks: [
        {
          list: [
            "Fold the Twilly in half to find the middle, and place the middle at the centre top of the handle.",
            "Wrap one end diagonally down toward the base, keeping each turn slightly overlapping and flat.",
            "Repeat with the other end in the opposite direction.",
            "Tuck each end under the last turn, or tie a small knot at the base of the handle and let the points hang.",
          ],
        },
        "Wrapping protects the handle from wear and hand creams – which is why many collectors use Twillys on every Birkin. Use two Twillys of the same design for a symmetrical look on both handles.",
        { note: "Avoid wrapping a Twilly very tightly on a handle for long periods, and don't leave it on a bag stored in heat: printed silk can transfer colour to light leathers." },
      ],
    },
    {
      id: "bow",
      heading: "2. The bow",
      blocks: [
        "Loop the Twilly once around the base of one handle and tie a simple bow, leaving the two ends long. It's the quickest way to add colour, and leaves the handle uncovered.",
      ],
    },
    {
      id: "hair",
      heading: "3. In the hair",
      blocks: [
        "Tie a Twilly around a ponytail or low bun and knot it with long ends, or use it as a headband: place the middle at the nape of the neck, bring the ends up over the head and knot them on top or to one side.",
      ],
    },
    {
      id: "neck",
      heading: "4. At the neck",
      blocks: [
        "Wrap the Twilly once around the neck and tie a small knot to one side, like a neckerchief. It works with an open collar, a crew neck or a blazer.",
      ],
    },
    {
      id: "wrist",
      heading: "5. On the wrist",
      blocks: [
        "Wrap it several times around the wrist and tie with a double knot – a silk bracelet that pairs beautifully with a watch.",
      ],
    },
    {
      id: "belt",
      heading: "6. As a belt",
      blocks: [
        "Thread two Twillys knotted together through the belt loops of jeans or a dress for a splash of print. Choose a Twilly with a strong base colour so it reads from a distance.",
      ],
    },
    {
      id: "choose",
      heading: "Choosing a Twilly for your bag",
      blocks: [
        "Pick one colour from the print that matches your bag's leather, or a contrasting colour from the same palette. Black, Gold and Etoupe bags work with almost any design. Collectors often keep several Twillys and change them with the seasons.",
        { products: { category: "twilly-scarves", sort: "price_asc" }, title: "Twillys available now" },
      ],
    },
  ],
  faq: [
    { q: "How long is an Hermès Twilly?", a: "About 86 cm long and 5 cm wide, in silk twill." },
    { q: "Do I need one or two Twillys for a Birkin?", a: "Two if you want to wrap both handles symmetrically; one is enough for a bow or a single wrapped handle." },
    { q: "Can a Twilly damage my bag?", a: "Not when used properly. Avoid very tight wrapping for long periods and storing a bag with a Twilly in heat or humidity, which can transfer colour to light leathers." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
  ],
  shop: [
    { label: "Twilly scarves", path: "/shop/twilly-scarves" },
    { label: "Scarves & shawls", path: "/shop/scarves-shawls" },
    { label: "Birkin bags", path: "/shop/birkin-bags" },
  ],
};
