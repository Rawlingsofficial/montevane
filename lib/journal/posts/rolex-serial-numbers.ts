import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "rolex-serial-numbers",
  title: "Rolex Serial Numbers: How to Date Your Rolex",
  metaTitle: "Rolex Serial Numbers: Where to Find Them & How to Date a Rolex",
  description: "Where to find the serial number on a Rolex, how letter serials from the late 1980s to 2010 date a watch, what random serials mean, and why papers matter more.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-05-24",
  keyword: "rolex serial number lookup",
  keywords: ["rolex year by serial", "random serial rolex", "where is rolex serial", "rolex rehaut", "rolex model number"],
  image: "gallery/cat-watches",
  cover: "rolex-datejust-36-16200-stainless-steel-silver-roman-dial-36-mm",
  picks: { brand: "rolex", sort: "price_asc", limit: 8 },
  intro: [
    "Every Rolex has a serial number, and on many watches it gives a good idea of when it was made. Here's where to find it and how to read it.",
  ],
  sections: [
    {
      id: "where",
      heading: "Where to find it",
      blocks: [
        {
          list: [
            "**On the rehaut** – the inner ring between the dial and the crystal, at 6 o'clock, on modern watches.",
            "**Between the lugs at 6 o'clock** – on older watches, hidden by the bracelet.",
            "**On the warranty card or papers** – which should match the watch exactly.",
          ],
        },
        "The **model (reference) number**, such as 126610LN, is separate; it is engraved between the lugs at 12 o'clock and identifies the model, not the individual watch.",
      ],
    },
    {
      id: "letters",
      heading: "Letter serials (approximate years)",
      blocks: [
        "From the late 1980s, Rolex serials began with a letter that roughly indicates the production period. Treat these as approximate – production and sale dates can differ.",
        {
          table: {
            head: ["Letter", "Approx. year", "Letter", "Approx. year"],
            rows: [
              ["R", "1987–1988", "A", "1998–1999"],
              ["L", "1988–1989", "P", "2000"],
              ["E", "1990–1991", "K", "2001"],
              ["X / N", "1991", "Y", "2002"],
              ["C", "1992", "F", "2003–2004"],
              ["S", "1993", "D", "2005"],
              ["W", "1994–1995", "Z", "2006"],
              ["T", "1996", "M", "2007–2008"],
              ["U", "1997–1998", "V / G", "2008–2010"],
            ],
          },
        },
      ],
    },
    {
      id: "random",
      heading: "Random serials",
      blocks: [
        "Since around 2010, Rolex uses random serial numbers that don't reveal the year. For these watches, the date on the warranty card is the reliable way to know when the watch was sold.",
        { note: "A serial number on its own doesn't prove a watch is genuine – serials are copied too. See [how to spot a fake Rolex](/journal/how-to-spot-a-fake-rolex)." },
      ],
    },
  ],
  faq: [
    { q: "How do I find the year of my Rolex?", a: "On letter-serial watches, the letter gives an approximate year. For random serials (from around 2010), use the date on the warranty card." },
    { q: "Where is the serial number on a modern Rolex?", a: "Engraved on the rehaut at 6 o'clock, visible through the crystal." },
    { q: "Can Rolex look up my serial number?", a: "A Rolex service centre can check a watch when it is serviced; there is no public online lookup." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
  ],
  shop: [
    { label: "Shop Rolex", path: "/shop/watches/rolex" },
    { label: "Rolex buying guide", path: "/journal/rolex-buying-guide" },
  ],
};
