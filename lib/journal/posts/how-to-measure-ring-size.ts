import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "how-to-measure-ring-size",
  title: "How to Measure Ring Size at Home (Even Secretly)",
  metaTitle: "How to Measure Ring Size at Home – Even as a Surprise",
  description: "How to measure ring size at home with a string or an existing ring, a US ring size chart in mm, finding her size secretly, and resizing.",
  category: "Jewelry Guides",
  cluster: "jewelry",
  date: "2027-04-05",
  keyword: "how to measure ring size",
  keywords: ["ring size chart", "find ring size secretly", "resize a ring", "ring size in mm", "engagement ring size"],
  image: "gallery/cat-jewelry",
  cover: "round-cut-diamond-engagement-ring-14k-white-gold-round-cut-diamond-engagement-ring-c-8-14",
  picks: { category: "jewelry", piece: "Ring", sort: "price_asc", limit: 8 },
  intro: [
    "A ring that fits is one she'll wear every day. Here is how to measure ring size at home in a few minutes – and how to find it out without spoiling a surprise.",
  ],
  sections: [
    {
      id: "existing-ring",
      heading: "Method 1: measure a ring that already fits",
      blocks: [
        "This is the most accurate home method. Take a ring that fits the right finger and measure its inside diameter in millimetres, edge to edge across the middle. Then match it to the chart below.",
      ],
    },
    {
      id: "string",
      heading: "Method 2: string or paper strip",
      blocks: [
        {
          list: [
            "Wrap a strip of paper or non-stretch string around the base of the finger, snug but not tight.",
            "Mark where it overlaps and measure the length in millimetres – that is the circumference.",
            "Make sure it will pass over the knuckle; if the knuckle is larger, go half a size up.",
            "Measure at the end of the day, when fingers are slightly larger, and not when cold.",
          ],
        },
      ],
    },
    {
      id: "chart",
      heading: "Ring size chart (US)",
      blocks: [
        {
          table: {
            head: ["US size", "Inside diameter", "Circumference"],
            rows: [
              ["4", "14.9 mm", "46.8 mm"],
              ["5", "15.7 mm", "49.3 mm"],
              ["6", "16.5 mm", "51.9 mm"],
              ["7", "17.3 mm", "54.4 mm"],
              ["8", "18.1 mm", "57.0 mm"],
              ["9", "18.9 mm", "59.5 mm"],
              ["10", "19.8 mm", "62.1 mm"],
            ],
          },
        },
        { note: "Wider bands fit more snugly than thin ones. For a band wider than about 6 mm, consider going a quarter to half size up." },
      ],
    },
    {
      id: "secretly",
      heading: "Finding her size secretly",
      blocks: [
        {
          list: [
            "**Borrow a ring** she wears on that finger – and check it's the same hand; fingers differ.",
            "**Trace it:** draw around the inside of the ring on paper, or press it into a bar of soap.",
            "**Ask a friend or family member** who might know, or who can find out casually.",
            "**When in doubt, size up slightly.** Making a ring smaller is usually easier than making it larger.",
          ],
        },
      ],
    },
    {
      id: "resize",
      heading: "Can a ring be resized?",
      blocks: [
        "Most solitaire and plain-band rings in gold or platinum can be resized by a size or two. Eternity bands and rings set with stones all the way round are much harder or impossible to resize, so get the size right for those. Ready to choose? Start with our [engagement ring buying guide](/journal/engagement-ring-buying-guide).",
      ],
    },
  ],
  faq: [
    { q: "What is the average ring size for women?", a: "In the US, sizes 6 to 7 are the most common for women, but fingers vary widely – always measure." },
    { q: "Should a ring be tight or loose?", a: "It should slide over the knuckle with slight resistance and not spin freely or slip off when you shake your hand." },
    { q: "Can an eternity ring be resized?", a: "Usually not, because the stones go all the way around the band. Measure carefully before buying one." },
  ],
  sources: [
    { label: "GIA – Gem Encyclopedia", url: "https://www.gia.edu/gem-encyclopedia" },
  ],
  shop: [
    { label: "Shop rings", path: "/shop/jewelry/rings" },
    { label: "Engagement ring guide", path: "/journal/engagement-ring-buying-guide" },
  ],
};
