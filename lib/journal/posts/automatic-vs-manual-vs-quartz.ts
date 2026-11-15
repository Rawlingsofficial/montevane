import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "automatic-vs-manual-vs-quartz",
  title: "Automatic vs Manual vs Quartz Watches, Explained",
  metaTitle: "Automatic vs Manual vs Quartz: Watch Movements Explained",
  description: "Watch movements explained: how automatic, manual-wind and quartz movements work, accuracy, servicing, which luxury brands use each, and which one suits you.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-03-01",
  keyword: "automatic vs manual vs quartz",
  keywords: ["watch movements explained", "automatic watch", "manual wind watch", "quartz luxury watch", "mechanical vs quartz"],
  image: "watch_2",
  cover: "patek-philippe-calatrava-6119g-001-18k-white-gold-grey-dial-39-mm",
  picks: { brand: "patek-philippe", query: "calatrava", sort: "price_asc", limit: 4 },
  intro: [
    "The movement is the engine of a watch. It decides how the watch is powered, how accurate it is, how often it needs servicing – and, for collectors, much of its soul.",
  ],
  sections: [
    {
      id: "compared",
      heading: "The three types",
      blocks: [
        {
          table: {
            head: ["", "Automatic", "Manual-wind", "Quartz"],
            rows: [
              ["Power", "Mainspring wound by a rotor as you move", "Mainspring wound by turning the crown", "Battery and quartz crystal"],
              ["Seconds hand", "Smooth sweep", "Smooth sweep", "Usually ticks once per second"],
              ["Accuracy", "A few seconds a day (chronometers)", "A few seconds a day", "A few seconds a month"],
              ["Servicing", "Periodic full service", "Periodic full service", "Battery changes; occasional service"],
              ["Examples", "Rolex Submariner, Royal Oak, Nautilus", "Omega Speedmaster, Patek Calatrava 6119, many F.P. Journes", "Cartier Tank Must, Grand Seiko quartz"],
            ],
          },
        },
      ],
    },
    {
      id: "automatic",
      heading: "Automatic",
      blocks: [
        "A weighted rotor spins as your wrist moves and winds the mainspring. Wear it daily and it never stops; leave it off and it runs for its power reserve – often 40 to 70 hours. Do you need a winder? See [our guide](/journal/do-you-need-a-watch-winder).",
      ],
    },
    {
      id: "manual",
      heading: "Manual-wind",
      blocks: [
        "Without a rotor, manual movements are thinner and show more of their finishing through a display back. Many collectors love the daily ritual of winding. They're common in dress watches and historic chronographs.",
      ],
    },
    {
      id: "quartz",
      heading: "Quartz",
      blocks: [
        "Quartz is the most accurate and lowest-maintenance option, and nothing to be embarrassed about: Cartier's Tank and many fine jewelry watches use quartz so they stay thin and ready to wear. Quartz watches usually hold less value than mechanical ones.",
      ],
    },
  ],
  faq: [
    { q: "Is automatic better than quartz?", a: "Not more accurate – quartz is more precise. Collectors prefer mechanical movements for their craftsmanship, longevity and value." },
    { q: "Do automatic watches need batteries?", a: "No. They are powered by a mainspring wound by the rotor as you move." },
    { q: "How long does an automatic watch run off the wrist?", a: "For its power reserve, usually between about 40 and 70 hours for modern watches." },
  ],
  sources: [
    { label: "COSC – Swiss Official Chronometer Testing Institute", url: "https://www.cosc.swiss/en" },
    { label: "Patek Philippe – Calatrava collection", url: "https://www.patek.com/en/collection/calatrava" },
  ],
  shop: [
    { label: "All watches", path: "/shop/watches" },
  ],
};
