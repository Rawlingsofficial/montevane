import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "rolex-gmt-pepsi-vs-batman",
  title: "Rolex GMT-Master II: Pepsi vs Batman vs Sprite",
  metaTitle: "Rolex GMT-Master II Pepsi vs Batman vs Sprite Compared",
  description: "The Rolex GMT-Master II colourways explained – Pepsi, Batman, Sprite and more – with references, how the GMT function works and current market prices.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2026-11-27",
  keyword: "rolex pepsi vs batman",
  keywords: ["gmt-master ii 126710blro", "gmt-master ii 126710blnr", "rolex gmt"],
  image: "watch_1",
  cover: "rolex-gmt-master-ii-126710blnr-batman-stainless-steel-black-index-dial-jubilee-bracelet",
  picks: { query: "gmt", brand: "rolex", sort: "newest" },
  intro: [
    "Few watches have as many nicknames as the Rolex GMT-Master II. The colours of its two-tone bezel – red and blue, blue and black, green and black – have become shorthand among collectors, and each has its own following and its own price.",
    "This guide explains the references, how the GMT function works and what each colourway costs today. For Rolex basics – reference numbers, papers and condition – start with our [Rolex buying guide](/journal/rolex-buying-guide).",
  ],
  sections: [
    {
      id: "gmt",
      heading: "What a GMT watch does",
      blocks: [
        "The original GMT-Master of 1955 was developed for airline pilots crossing time zones. A fourth hand makes one turn every 24 hours and points to a 24-hour scale on the bezel, showing a second time zone. Rotating the bezel lets you read a third. The two-tone bezel was practical too: one colour for daytime hours, the other for night.",
        "Current GMT-Master II models use Rolex's calibre 3285 and a ceramic (Cerachrom) bezel insert, which keeps its colour indefinitely.",
      ],
    },
    {
      id: "colourways",
      heading: "The colourways",
      blocks: [
        {
          table: {
            head: ["Nickname", "Reference", "Bezel", "On Montévane (Nov 2026)"],
            rows: [
              ["Pepsi", "126710BLRO", "Blue and red", "$27,600 – $34,000"],
              ["Batman / Batgirl", "126710BLNR", "Blue and black", "$17,100 – $22,000"],
              ["Batman (previous generation)", "116710BLNR", "Blue and black", "from $15,400"],
              ["Sprite", "126720VTNR", "Green and black, crown on the left", "$17,500 – $18,500"],
              ["Grey and black", "126710GRNR", "Grey and black", "$23,000 – $25,000"],
            ],
          },
        },
        "The \"Batgirl\" nickname is often used for the 126710BLNR on the Jubilee bracelet, to tell it apart from the earlier Batman on the Oyster bracelet.",
      ],
    },
    {
      id: "which",
      heading: "Which one to choose",
      blocks: [
        {
          list: [
            "**Pepsi** – the heritage colours of the 1955 original and the most in-demand GMT. It carries the highest premium.",
            "**Batman** – understated and versatile; blue and black work with everything from denim to a suit.",
            "**Sprite** – the left-handed GMT, with the crown and date at 9 o'clock. Comfortable on the right wrist and distinctive for collectors who want something different.",
            "**Grey and black** – the newest and most discreet colourway, for those who prefer monochrome.",
          ],
        },
        "All share the same movement and case size; the choice is about colour and how often you'll want to look at it. Browse current pieces on our [Rolex page](/shop/watches/rolex).",
      ],
    },
  ],
  faq: [
    { q: "Why is the Rolex Pepsi more expensive than the Batman?", a: "Demand. The red-and-blue bezel echoes the original 1955 GMT-Master and is the most sought-after colourway, so it trades at a higher premium on the market." },
    { q: "What does BLRO mean in a Rolex reference?", a: "Bleu et rouge – blue and red, the Pepsi bezel. BLNR means blue and black (bleu et noir), and VTNR green and black (vert et noir)." },
    { q: "Is the Sprite only for left-handed people?", a: "It is designed for wearing on the right wrist, but many right-handed collectors buy it simply because it looks different." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
    { label: "COSC – Swiss Official Chronometer Testing Institute", url: "https://www.cosc.swiss/en" },
  ],
  shop: [
    { label: "Shop Rolex watches", path: "/shop/watches/rolex" },
    { label: "Read the Rolex buying guide", path: "/journal/rolex-buying-guide" },
  ],
};
