import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "rolex-sky-dweller-vs-gmt-master-ii",
  title: "Rolex Sky-Dweller vs GMT-Master II: Which Traveller's Watch?",
  metaTitle: "Rolex Sky-Dweller vs GMT-Master II for Travellers",
  description: "Rolex Sky-Dweller or GMT-Master II? Dual time zones, the Sky-Dweller's annual calendar and Ring Command bezel, sizes, metals, how they wear and prices.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-02-26",
  keyword: "sky-dweller vs gmt-master ii",
  keywords: ["rolex sky-dweller", "rolex gmt-master ii", "best rolex for travel", "sky-dweller annual calendar", "rolex ring command bezel"],
  image: "watches_showcase",
  cover: "rolex-sky-dweller-326934-stainless-steel-white-dial-42-mm",
  picks: { brand: "rolex", query: "sky-dweller", sort: "price_asc", limit: 8 },
  intro: [
    "Both are Rolex's watches for people who live between time zones. The GMT-Master II is the pilot's classic; the Sky-Dweller is the most complicated watch Rolex makes.",
  ],
  sections: [
    {
      id: "compared",
      heading: "Side by side",
      blocks: [
        {
          table: {
            head: ["", "GMT-Master II", "Sky-Dweller"],
            rows: [
              ["Case", "40 mm", "42 mm"],
              ["Second time zone", "24-hour hand with rotating bezel; local hour hand jumps independently", "24-hour disc off-centre on the dial"],
              ["Calendar", "Date", "Annual calendar: date and month, corrected once a year"],
              ["Bezel", "Two-colour ceramic (Pepsi, Batman, Sprite…)", "Fluted Ring Command bezel used to set functions"],
              ["Character", "Sporty, iconic", "Dressy, sophisticated"],
            ],
          },
        },
      ],
    },
    {
      id: "gmt",
      heading: "Choose the GMT-Master II if…",
      blocks: [
        "You want an everyday sports watch with a second time zone, slimmer proportions and the famous two-tone bezels. Compare colours in [Pepsi vs Batman](/journal/rolex-gmt-pepsi-vs-batman).",
        { products: { brand: "rolex", query: "gmt", sort: "price_asc" }, title: "GMT-Master II available now" },
      ],
    },
    {
      id: "sky",
      heading: "Choose the Sky-Dweller if…",
      blocks: [
        "You want a watch that does more: a home time zone, an annual calendar and a clever bezel that sets everything through the crown. It's larger and dressier, and suits a suit as well as travel.",
        { products: { brand: "rolex", query: "sky-dweller", sort: "price_asc" }, title: "Sky-Dweller available now" },
      ],
    },
  ],
  faq: [
    { q: "What is the Sky-Dweller's Ring Command bezel?", a: "A rotating bezel that selects which function the crown adjusts: date, local time or reference time." },
    { q: "Can the GMT-Master II show three time zones?", a: "Yes. With the 24-hour hand and the rotating bezel, it can track a third time zone." },
    { q: "Which is better for travel?", a: "Both are excellent. The GMT-Master II is lighter and sportier; the Sky-Dweller adds an annual calendar." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
    { label: "COSC – Swiss Official Chronometer Testing Institute", url: "https://www.cosc.swiss/en" },
  ],
  shop: [
    { label: "Shop Rolex", path: "/shop/watches/rolex" },
  ],
};
