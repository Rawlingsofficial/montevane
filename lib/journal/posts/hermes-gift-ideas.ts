import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "hermes-gift-ideas",
  title: "Hermès Gift Ideas, from Twillys to Birkins",
  metaTitle: "Hermès Gift Ideas: The Best Hermès Gifts at Every Price",
  description: "The best Hermès gifts at every price: Twillys from $350, Rodeo and Pegase charms, silk carrés, bag organisers, and the Birkin and Kelly for the ultimate surprise.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2026-11-15",
  keyword: "hermes gift ideas",
  keywords: ["hermes gifts under 1000", "hermes rodeo charm gift", "hermes scarf gift", "cheapest hermes item", "hermes twilly"],
  image: "feature_card_1",
  cover: "hermes-twilly-bolduc-au-carre-plumetis-corail-jaune-and-rose-fluo-set-of-2",
  picks: { category: "twilly-scarves", sort: "newest", limit: 8 },
  intro: [
    "An orange box is a gift in itself. But walk into an Hermès boutique in December and you will find that most of what people want – the charms, the bags, the rarest silks – isn't on the shelves.",
    "Here is every Hermès gift worth giving, from the first Twilly to a Birkin, all available now and ready to ship.",
  ],
  sections: [
    {
      id: "by-budget",
      heading: "Hermès gifts by budget",
      blocks: [
        {
          table: {
            head: ["Budget", "Gift", "Who it's for"],
            rows: [
              ["$350 – $1,650", "[Twilly](/shop/twilly-scarves)", "Anyone – a first piece of Hermès"],
              ["$425 – $6,500", "[Silk carré or shawl](/shop/scarves-shawls)", "Scarf lovers and collectors"],
              ["$700 – $14,300", "[Rodeo and Pegase charms](/shop/bag-charms)", "Birkin and Kelly owners"],
              ["$150 – $3,200", "[Bag organisers](/shop/bag-organizers)", "Anyone who carries a Birkin daily"],
              ["$10,000+", "[Birkin](/shop/birkin-bags) or [Kelly](/shop/kelly-bags)", "The ultimate surprise"],
            ],
          },
        },
        { note: "Prices are the ranges on Montévane in November 2026." },
      ],
    },
    {
      id: "twilly",
      heading: "The Twilly: the perfect first Hermès gift",
      blocks: [
        "A silk ribbon about 86 cm long, printed with the same designs as the famous carrés. It can be worn on a bag handle, at the neck, in the hair or on the wrist. Buy them in pairs: one for each handle of a Birkin.",
        { products: { category: "twilly-scarves", sort: "price_asc" } },
      ],
    },
    {
      id: "charms",
      heading: "Rodeo and Pegase charms",
      blocks: [
        "The Rodeo – a little leather horse made from the offcuts of Hermès bags – is the most coveted charm in fashion. The winged Pegase is its rarer cousin. Both are hard to find in boutiques. See our [Rodeo charm guide](/journal/hermes-rodeo-charm-guide) for sizes.",
        { products: { category: "bag-charms", query: "rodeo", sort: "newest" } },
      ],
    },
    {
      id: "silk",
      heading: "Silk carrés and shawls",
      blocks: [
        "The 90 cm carré is Hermès' signature since 1937. The larger 140 cm shawls, often in cashmere and silk, are the warmest – and most luxurious – winter gift.",
        { products: { category: "scarves-shawls", sort: "newest" } },
      ],
    },
    {
      id: "bags",
      heading: "The ultimate gift: a Birkin or Kelly",
      blocks: [
        "At the boutique, a Birkin is offered, not bought – usually after a long purchase history (see [how to get a Birkin](/journal/how-to-get-a-birkin)). Pre-owned, it can be wrapped and delivered before Christmas. A Birkin 30 in Togo or Epsom, in Black, Gold or Etoupe, is the safest choice.",
        { products: { category: "birkin-bags", query: "30", max: 40000, sort: "price_desc" } },
      ],
    },
  ],
  faq: [
    { q: "What is the cheapest Hermès item worth gifting?", a: "The Twilly, from around $350 on Montévane. It comes in the orange box and is as recognisably Hermès as any bag." },
    { q: "Is the Rodeo charm worth it?", a: "Yes for anyone who owns a Birkin, Kelly or other Hermès bag. It is the collector's accessory and holds its value well." },
    { q: "Do Hermès gifts come in the orange box?", a: "Ask us before you order: we'll tell you exactly what comes with the piece you choose, including its box and dust bag." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Sotheby's – Handbags & Accessories department", url: "https://www.sothebys.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Twilly scarves", path: "/shop/twilly-scarves" },
    { label: "Bag charms", path: "/shop/bag-charms" },
    { label: "Scarves & shawls", path: "/shop/scarves-shawls" },
    { label: "Bag organisers", path: "/shop/bag-organizers" },
  ],
};
