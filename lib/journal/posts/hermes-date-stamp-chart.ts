import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "hermes-date-stamp-chart",
  title: "Hermès Date Stamps: The Year Letter Chart",
  metaTitle: "Hermès Date Stamp Chart: Find the Year of Your Bag",
  description: "How to find and read the Hermès blind stamp: where it sits, what the circle and square mean, and the year letters from 1971 to today.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2026-11-21",
  image: "product_interior",
  intro: [
    "Every Hermès bag carries a small stamp that tells you when it was made. Knowing how to read it helps you check a listing's description, judge a fair price and spot inconsistencies.",
    "Here is where to find the stamp and how to read it, with the year letters from 1971 to today.",
  ],
  sections: [
    {
      id: "where",
      heading: "Where to find the stamp",
      blocks: [
        "On a Birkin or Kelly, the date stamp is usually on the back of one of the interior straps (the *sangles*), next to the artisan's mark. On other models it may be inside, near the pocket. It is a blind stamp – pressed into the leather without ink – so you may need good light to see it.",
      ],
    },
    {
      id: "chart",
      heading: "The year letters",
      blocks: [
        "Hermès uses a letter for each year, and the shape around the letter tells you which cycle it belongs to:",
        {
          table: {
            head: ["Cycle", "Shape", "Letters and years"],
            rows: [
              ["1971 – 1996", "Letter in a circle", "A (1971), B (1972) … Z (1996), in alphabetical order"],
              ["1997 – 2014", "Letter in a square", "A (1997), B (1998), C (1999), D (2000), E (2001), F (2002), G (2003), H (2004), I (2005), J (2006), K (2007), L (2008), M (2009), N (2010), O (2011), P (2012), Q (2013), R (2014)"],
              ["2015 – today", "Letter alone", "T (2015), X (2016), A (2017), C (2018), D (2019), Y (2020), Z (2021), U (2022), B (2023), W (2024)"],
            ],
          },
        },
        { note: "From 2015 the letters no longer follow alphabetical order, so it's worth checking the chart rather than counting. The stamp must also make sense with the bag's leather, colour and hardware – Hermès only offered certain combinations each year." },
      ],
    },
    {
      id: "why",
      heading: "Why the year matters",
      blocks: [
        {
          list: [
            "**Price** – newer bags in pristine condition generally command more than older ones in the same specification.",
            "**Accuracy** – a listing should state the year correctly; a mismatch is a reason to ask questions.",
            "**Authentication** – a date letter that doesn't fit the colour or leather is one of the first things specialists notice. See [how to authenticate a Hermès bag](/journal/how-to-authenticate-hermes).",
          ],
        },
      ],
    },
  ],
  faq: [
    { q: "What year is a Hermès bag stamped B?", a: "It depends on the shape: B in a circle is 1972, B in a square is 1998, and B alone is 2023." },
    { q: "What year is a Hermès stamp with a W?", a: "A W with no shape around it is 2024." },
    { q: "Do all Hermès bags have a date stamp?", a: "Yes, Hermès leather bags carry a year letter and an artisan mark. On some models they can be hard to see without good light." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Sotheby's – Handbags & Accessories department", url: "https://www.sothebys.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Hermès Birkin bags", path: "/shop/birkin-bags" },
    { label: "Shop Hermès Kelly bags", path: "/shop/kelly-bags" },
    { label: "Our authenticity guarantee", path: "/authenticity" },
  ],
};
