import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "vacheron-constantin-overseas",
  title: "Vacheron Constantin Overseas Buying Guide",
  metaTitle: "Vacheron Constantin Overseas Guide: 4500V, Dual Time & More",
  description: "Vacheron Constantin Overseas buying guide: the 1996 sports watch, the 4500V, Dual Time and chronograph, the interchangeable strap system, and Overseas vs Royal Oak.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-06-30",
  keyword: "vacheron constantin overseas",
  keywords: ["overseas 4500v", "overseas dual time", "overseas vs royal oak", "overseas chronograph", "vacheron sports watch"],
  image: "watches_showcase",
  cover: "vacheron-constantin-overseas-4520v-210r-b705-18k-rose-gold-sunburst-blue-index-dial-41-mm",
  picks: { brand: "vacheron-constantin", sort: "price_asc", limit: 8 },
  intro: [
    "In the conversation about luxury sports watches, the Overseas is the one connoisseurs bring up. It comes from Vacheron Constantin, the oldest manufacture in continuous production, and it's still a little under the radar.",
  ],
  sections: [
    {
      id: "story",
      heading: "The Overseas in brief",
      blocks: [
        "The Overseas was launched in 1996 as Vacheron Constantin's sports watch, with a bezel and bracelet links inspired by the Maltese cross, the house emblem. The current generation, introduced in 2016, added a quick-change system so you can swap the bracelet for a leather or rubber strap without tools.",
      ],
    },
    {
      id: "models",
      heading: "The models",
      blocks: [
        {
          table: {
            head: ["Model", "What it offers"],
            rows: [
              ["Overseas self-winding (4500V)", "41 mm time and date; the core model"],
              ["Overseas Dual Time", "A second time zone with day/night indicator"],
              ["Overseas Chronograph", "In-house automatic chronograph"],
              ["Overseas Perpetual Calendar Ultra-Thin", "The high-complication flagship"],
            ],
          },
        },
        "The famous blue dial is the most sought-after colour.",
      ],
    },
    {
      id: "vs",
      heading: "Overseas vs Royal Oak and Nautilus",
      blocks: [
        "The Overseas is less recognisable than the [Royal Oak or Nautilus](/journal/nautilus-vs-royal-oak) – which is exactly why some collectors prefer it. It comes with three straps in the box, finishing to Vacheron's high standard, and usually a lower price than its rivals. Learn more about the house in [the holy trinity of watchmaking](/journal/holy-trinity-of-watchmaking).",
      ],
    },
  ],
  faq: [
    { q: "When was the Vacheron Constantin Overseas launched?", a: "In 1996; the current generation followed in 2016 with an interchangeable strap system." },
    { q: "What size is the Overseas 4500V?", a: "41 mm." },
    { q: "Is the Overseas better than the Royal Oak?", a: "It's a matter of taste. The Overseas is more discreet and comes with interchangeable straps; the Royal Oak is the design icon." },
  ],
  sources: [
    { label: "Vacheron Constantin – official site", url: "https://www.vacheron-constantin.com/" },
  ],
  shop: [
    { label: "Shop Vacheron Constantin", path: "/shop/watches/vacheron-constantin" },
  ],
};
