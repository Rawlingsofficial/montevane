import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "hermes-constance-buying-guide",
  title: "Hermès Constance Buying Guide",
  metaTitle: "Hermès Constance Buying Guide: Sizes, Leathers & Prices",
  description: "Hermès Constance buying guide: the 1959 classic with the H clasp, Constance 18 and 24, Constance To Go, how to wear the strap, leathers and what affects price.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-06-09",
  keyword: "hermes constance buying guide",
  keywords: ["constance price", "constance 18", "constance to go", "constance 24", "hermes h clasp bag"],
  image: "gallery/col-custom-rare",
  cover: "hermes-kelly-pochette-swift-rose-sakura-phw",
  picks: { category: "kelly-bags", sort: "price_asc", limit: 8 },
  intro: [
    "With its sculpted H clasp, the Constance is the most instantly recognisable Hermès bag after the Birkin and Kelly. Created in 1959, it remains one of the house's most sought-after designs.",
  ],
  sections: [
    {
      id: "sizes",
      heading: "Sizes and versions",
      blocks: [
        {
          table: {
            head: ["Version", "What it is", "Best for"],
            rows: [
              ["Constance 18 (Mini)", "The small, most sought-after size", "Evening and crossbody"],
              ["Constance 24", "The original, larger size", "Everyday essentials"],
              ["Constance To Go", "A wallet on a strap", "Hands-free, cards and phone"],
              ["Constance Slim / wallets", "Belt bags and long wallets", "Small leather goods"],
            ],
          },
        },
      ],
    },
    {
      id: "wear",
      heading: "How to wear it",
      blocks: [
        "The strap can be worn long, crossbody, or doubled for a shoulder bag – which is why the Constance is so versatile. The H clasp comes in gold, palladium and other finishes, and in exotics such as alligator and lizard it becomes an evening piece.",
      ],
    },
    {
      id: "price",
      heading: "What affects the price",
      blocks: [
        {
          list: [
            "**Size:** the Constance 18 is usually the most in demand.",
            "**Leather:** Epsom is the most common; Box calf and exotics command more.",
            "**Hardware and colour:** gold hardware and classic colours are always popular.",
            "**Condition and completeness:** box, dust bag and receipt – see [what comes with a Birkin](/journal/what-comes-with-a-birkin); the same applies to the Constance.",
          ],
        },
        "Before buying, read [how to authenticate a Hermès bag](/journal/how-to-authenticate-hermes).",
      ],
    },
  ],
  faq: [
    { q: "What sizes does the Hermès Constance come in?", a: "Mainly 18 (the mini) and 24, plus the Constance To Go wallet-on-strap and Constance wallets." },
    { q: "When was the Constance created?", a: "In 1959. It takes its name, the story goes, from the designer's daughter." },
    { q: "Can the Constance be worn crossbody?", a: "Yes. The strap can be worn long across the body or doubled on the shoulder." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Christie's – Handbags & Accessories", url: "https://www.christies.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Hermès", path: "/brands/hermes" },
  ],
};
