import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "is-a-birkin-a-good-investment",
  title: "Is a Hermès Birkin a Good Investment?",
  metaTitle: "Is a Birkin a Good Investment? What Holds Value and Why",
  description: "Does a Hermès Birkin hold its value? What drives resale prices, which sizes, leathers and colours hold best, the costs and risks, and how to think about it.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2026-12-03",
  image: "lifestyle_2",
  intro: [
    "The Birkin is often described as a better investment than gold or stocks. The truth is more nuanced: some Birkins hold or grow their value remarkably well, others don't, and there are costs that headlines usually leave out.",
    "Here's what drives Birkin prices and what to weigh up. This is general information, not financial advice.",
  ],
  sections: [
    {
      id: "why",
      heading: "Why Birkins hold value",
      blocks: [
        {
          list: [
            "**Scarcity.** Hermès makes a limited number by hand and allocates them to established clients, so demand outstrips supply at retail.",
            "**Price increases.** Hermès raises retail prices regularly, which lifts the resale market.",
            "**Brand strength.** The Birkin's status has been stable for decades.",
          ],
        },
      ],
    },
    {
      id: "what-holds",
      heading: "What holds value best",
      blocks: [
        {
          table: {
            head: ["Factor", "Tends to hold value", "Less certain"],
            rows: [
              ["Size", "25 and 30", "35 and 40"],
              ["Leather", "Togo, Epsom; rare exotics", "Delicate leathers that mark easily"],
              ["Colour", "Black, Gold, Etoupe, Craie", "Seasonal or very bright colours"],
              ["Hardware", "Gold or palladium in good condition", "Plated hardware with scratches"],
              ["Condition", "New or pristine, full set", "Visible wear, missing accessories"],
            ],
          },
        },
      ],
    },
    {
      id: "risks",
      heading: "Costs and risks",
      blocks: [
        {
          list: [
            "**Buying above retail.** On the secondary market you pay a premium, which narrows any future gain.",
            "**Selling costs.** Resellers and auction houses take commissions, and selling can take time.",
            "**Condition.** Using the bag reduces its value; storage and insurance add cost.",
            "**Market cycles.** Resale prices for some models have fallen as well as risen.",
            "**Authenticity.** A fake has no value at all, so buy from a trusted source.",
          ],
        },
      ],
    },
    {
      id: "verdict",
      heading: "Our view",
      blocks: [
        "Buy a Birkin because you love it. A classic size, leather and colour, kept in excellent condition, is likely to retain much of its value – and that makes it a far better purchase than most luxury goods. But treat any gain as a bonus, not a plan. See our [Birkin buying guide](/journal/hermes-birkin-buying-guide) to choose well.",
      ],
    },
  ],
  faq: [
    { q: "Do Birkin bags go up in value?", a: "Some do, particularly classic sizes and colours in excellent condition and rare exotics. Others sell below their purchase price on the secondary market. There is no guarantee." },
    { q: "Which Birkin holds its value best?", a: "Historically, the Birkin 25 and 30 in neutral colours such as Black, Gold and Etoupe, in Togo or Epsom, plus rare exotics such as the Himalaya." },
    { q: "Is a Birkin better than gold as an investment?", a: "They are very different assets. A Birkin is a physical luxury good with selling costs and condition risk; it is not a substitute for a diversified portfolio. Speak to a licensed financial adviser about investments." },
  ],
  sources: [
    { label: "Christie's – Handbags & Accessories department", url: "https://www.christies.com/en/departments/handbags-and-accessories" },
    { label: "Sotheby's – Handbags & Accessories department", url: "https://www.sothebys.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Hermès Birkin bags", path: "/shop/birkin-bags" },
    { label: "Togo vs Epsom", path: "/journal/togo-vs-epsom" },
  ],
};
