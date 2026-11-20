import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "watch-complications-explained",
  title: "Watch Complications Explained, from Chronograph to Minute Repeater",
  metaTitle: "Watch Complications Explained: Perpetual Calendar, Tourbillon…",
  description: "Every major watch complication explained in plain English: chronograph, GMT, annual and perpetual calendar, moon phase, tourbillon, minute repeater and more.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-01-18",
  keyword: "watch complications explained",
  keywords: ["perpetual calendar", "annual calendar watch", "tourbillon", "minute repeater", "grand complication"],
  image: "gallery/cat-watches",
  cover: "patek-philippe-grand-complications-5496p-014-perpetual-calendar-platinum-honey-index-dial",
  picks: { brand: "patek-philippe", query: "perpetual", sort: "price_asc", limit: 8 },
  intro: [
    "In watchmaking, a complication is anything a watch does beyond telling the hours, minutes and seconds. Complications are what separate a good watch from a masterpiece – and they explain most of the price differences you'll see.",
  ],
  sections: [
    {
      id: "everyday",
      heading: "Everyday complications",
      blocks: [
        {
          table: {
            head: ["Complication", "What it does", "Examples"],
            rows: [
              ["Date", "Shows the day of the month", "Rolex Datejust"],
              ["Chronograph", "A stopwatch, started and stopped with pushers", "Rolex Daytona, Omega Speedmaster"],
              ["GMT", "Shows a second time zone", "Rolex GMT-Master II"],
              ["World time", "Shows the time in all 24 time zones", "Patek Philippe World Time"],
              ["Power reserve", "Shows how much energy is left in the mainspring", "F.P. Journe, many dress watches"],
            ],
          },
        },
      ],
    },
    {
      id: "calendars",
      heading: "Calendars",
      blocks: [
        {
          list: [
            "**Annual calendar** – knows the difference between 30- and 31-day months; needs correcting once a year, at the end of February. Patek Philippe introduced the first in a wristwatch in 1996.",
            "**Perpetual calendar** – also accounts for February and leap years; correct until 2100.",
            "**Moon phase** – shows the phase of the moon through a window on the dial.",
          ],
        },
        { products: { brand: "patek-philippe", query: "annual calendar", sort: "price_asc" }, title: "Annual calendars available now" },
      ],
    },
    {
      id: "grand",
      heading: "High complications",
      blocks: [
        {
          list: [
            "**Tourbillon** – the regulating organ sits in a rotating cage to average out the effects of gravity. Patented by Breguet in 1801, today a showcase of skill.",
            "**Split-seconds (rattrapante) chronograph** – two seconds hands to time two events at once.",
            "**Minute repeater** – chimes the time on demand with tiny hammers and gongs; among the hardest complications to make.",
            "**Grand complication** – a watch combining several high complications, typically a perpetual calendar, a chronograph and a minute repeater.",
          ],
        },
        { products: { category: "watches", query: "tourbillon", sort: "price_asc" }, title: "Tourbillons available now" },
      ],
    },
    {
      id: "buy",
      heading: "Buying a complicated watch",
      blocks: [
        "More complication means more parts, more servicing and higher service costs. Ask for the service history, and buy from a specialist who can tell you when the watch was last serviced. See our [Patek Philippe buying guide](/journal/patek-philippe-buying-guide).",
      ],
    },
  ],
  faq: [
    { q: "What counts as a complication in a watch?", a: "Any function beyond hours, minutes and seconds – from a date or chronograph to a perpetual calendar or minute repeater." },
    { q: "What is the difference between an annual and a perpetual calendar?", a: "An annual calendar needs correcting once a year, at the end of February. A perpetual calendar also accounts for leap years and needs no correction until 2100." },
    { q: "Why are tourbillons so expensive?", a: "They require exceptional skill to make and adjust. Today they are mostly a demonstration of fine watchmaking." },
  ],
  sources: [
    { label: "Patek Philippe – Complications collection", url: "https://www.patek.com/en/collection/complications" },
    { label: "COSC – Swiss Official Chronometer Testing Institute", url: "https://www.cosc.swiss/en" },
  ],
  shop: [
    { label: "Shop Patek Philippe", path: "/shop/watches/patek-philippe" },
    { label: "All watches", path: "/shop/watches" },
  ],
};
