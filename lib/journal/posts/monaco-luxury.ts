import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "monaco-luxury",
  title: "Monaco's Season of Watches, Yachts and Racing",
  metaTitle: "Monaco Luxury Season: Grand Prix, Yachts & Watches",
  description: "Monaco's luxury calendar – Monte-Carlo tennis, the Grand Prix and the Yacht Show – what watch collectors wear, and visiting our Monaco boutique.",
  category: "Buying Guides",
  cluster: "buying",
  date: "2027-05-12",
  keyword: "monaco luxury",
  keywords: ["monaco grand prix watch", "monaco yacht show", "monaco boutique", "monte carlo shopping", "monaco watches"],
  image: "lifestyle_2",
  cover: "richard-mille-transparent-dial-rm12-01-sapphire-blue-tourbillion-transparent-dial-50-mm",
  picks: { category: "watches", min: 50000, sort: "price_desc", limit: 8 },
  intro: [
    "Monaco is small, but between spring and autumn it hosts some of the world's most watched events. It's also where Montévane began.",
  ],
  sections: [
    {
      id: "calendar",
      heading: "The Monaco calendar",
      blocks: [
        {
          table: {
            head: ["When", "Event"],
            rows: [
              ["April", "Monte-Carlo tennis tournament at the Monte-Carlo Country Club"],
              ["May", "The Monaco Grand Prix on the streets of Monte-Carlo"],
              ["September", "The Monaco Yacht Show in Port Hercule"],
            ],
          },
        },
        "Dates change each year; check the organisers' official sites before you travel.",
      ],
    },
    {
      id: "watches",
      heading: "What collectors wear",
      blocks: [
        "Around the harbour you'll see the full spectrum: the Rolex Daytona and Submariner, Patek Philippe Nautilus and Aquanaut on rubber, Audemars Piguet Royal Oak Offshores and light, bold Richard Milles – the brand that made racing and tennis its natural home. See [Richard Mille models](/journal/richard-mille-models) and [Nautilus vs Royal Oak](/journal/nautilus-vs-royal-oak).",
      ],
    },
    {
      id: "visit",
      heading: "Visiting our Monaco boutique",
      blocks: [
        "We're in Monaco. If there's a particular watch or Hermès bag you'd like to see, contact us before your visit so we can have it ready. Travelling with a new piece? Read [travelling with a Birkin or Rolex](/journal/travelling-with-a-birkin-or-rolex).",
      ],
    },
  ],
  faq: [
    { q: "When is the Monaco Grand Prix?", a: "Traditionally in late May or early June; check the official Formula 1 calendar for the exact dates." },
    { q: "When is the Monaco Yacht Show?", a: "Usually in late September at Port Hercule." },
    { q: "Where is Montévane in Monaco?", a: "In Monte-Carlo. Contact us before your visit. We also have a boutique in Miami." },
  ],
  sources: [
    { label: "Visit Monaco – official tourism site", url: "https://www.visitmonaco.com/en" },
  ],
  shop: [
    { label: "Contact our boutiques", path: "/contact" },
    { label: "Shop watches", path: "/shop/watches" },
  ],
};
