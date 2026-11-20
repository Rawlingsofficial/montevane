import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "do-you-need-a-watch-winder",
  title: "Do You Need a Watch Winder? And How to Store a Collection",
  metaTitle: "Do You Need a Watch Winder? Storing Automatic Watches",
  description: "Do automatic watches need a winder? When it helps, when it doesn't, how to set turns per day, and how to store a watch collection safely.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-02-15",
  keyword: "do i need a watch winder",
  keywords: ["watch winder", "how to store watches", "automatic watch stopped", "turns per day", "watch storage box"],
  image: "gallery/cat-watches",
  cover: "audemars-piguet-royal-oak-26574st-perpetual-calendar-stainless-steel-grande-tapisserie",
  picks: { category: "watches", query: "perpetual calendar", sort: "price_asc", limit: 4 },
  intro: [
    "An automatic watch winds itself as you wear it. Take it off and it runs for its power reserve – typically 40 to 70 hours – then stops. A watch winder keeps it moving. But do you actually need one?",
  ],
  sections: [
    {
      id: "when",
      heading: "When a winder makes sense",
      blocks: [
        {
          list: [
            "**Perpetual and annual calendars, moon phases** – setting them after they stop is fiddly and, done wrong, can damage the mechanism.",
            "**A rotation of several automatics** you want ready to wear.",
            "**Convenience** – you simply like picking up a watch that's running.",
          ],
        },
      ],
    },
    {
      id: "not",
      heading: "When you don't need one",
      blocks: [
        "For a time-only or date watch like a Submariner or Datejust, letting it stop does no harm. Setting it takes a few seconds: wind it by hand a few dozen turns, set the time, then the date (avoid changing the date between about 9 pm and 3 am on older movements, when the date mechanism is engaged).",
      ],
    },
    {
      id: "setup",
      heading: "Setting up a winder",
      blocks: [
        {
          list: [
            "**Turns per day (TPD):** most watches need roughly 650–950; more is not better.",
            "**Direction:** clockwise, counter-clockwise or both – check your movement's specification.",
            "**Quality:** choose a winder with rest cycles and a well-shielded motor.",
          ],
        },
      ],
    },
    {
      id: "store",
      heading: "Storing a collection",
      blocks: [
        {
          list: [
            "Keep watches in a dry place, away from strong magnets (speakers, phone cases, tablets).",
            "Store them in individual compartments so cases and bracelets don't touch.",
            "Keep box and papers together, dry and safe – they matter for value.",
            "For travel, use a padded watch roll and keep it in your hand luggage.",
          ],
        },
        "Read also: [how to insure a Rolex or Birkin](/journal/how-to-insure-luxury-watch-handbag).",
      ],
    },
  ],
  faq: [
    { q: "Is it bad to let an automatic watch stop?", a: "No. A simple time-and-date watch can be left to stop and restarted. Complicated calendars are easier to keep running on a winder." },
    { q: "How many turns per day does a watch need?", a: "Most automatic watches need roughly 650–950 turns per day. Check the movement's specification." },
    { q: "Can a watch winder damage my watch?", a: "A quality winder used at the right settings won't. Avoid cheap units with poorly shielded motors." },
  ],
  sources: [
    { label: "COSC – Swiss Official Chronometer Testing Institute", url: "https://www.cosc.swiss/en" },
    { label: "Patek Philippe – Complications collection", url: "https://www.patek.com/en/collection/complications" },
  ],
  shop: [
    { label: "All watches", path: "/shop/watches" },
  ],
};
