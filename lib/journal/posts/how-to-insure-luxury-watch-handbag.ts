import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "how-to-insure-luxury-watch-handbag",
  title: "How to Insure a Rolex, Birkin or Fine Jewelry",
  metaTitle: "How to Insure a Rolex or Birkin: Cover, Valuations & Claims",
  description: "How to insure a luxury watch, Hermès bag or fine jewelry: home policy vs scheduled items, agreed value, worldwide cover, valuations, documents and making a claim.",
  category: "Buying Advice",
  cluster: "buying",
  date: "2027-01-13",
  keyword: "how to insure a rolex",
  keywords: ["insure birkin bag", "luxury watch insurance", "jewelry insurance", "agreed value insurance", "watch appraisal for insurance"],
  image: "gallery/journal",
  cover: "hermes-birkin-25-etoupe-togo-gold-hardware",
  intro: [
    "Many owners discover too late that their home insurance covers a Rolex or a Birkin only up to a small single-item limit – or not at all outside the house.",
    "Here's how to make sure your pieces are properly covered. This is general information; check the details with your insurer or broker.",
  ],
  sections: [
    {
      id: "options",
      heading: "Your options",
      blocks: [
        {
          table: {
            head: ["Option", "How it works", "Watch out for"],
            rows: [
              ["Home contents policy", "Valuables are covered as part of your contents", "Low single-item limits; may not cover loss outside the home"],
              ["Scheduled (listed) items", "Each piece is listed on your policy with its value", "You need valuations and must update them"],
              ["Specialist valuables policy", "A dedicated policy for watches, bags, jewelry and art", "Usually the broadest cover, often worldwide"],
            ],
          },
        },
      ],
    },
    {
      id: "value",
      heading: "Agreed value vs replacement",
      blocks: [
        "With **agreed value** cover, you and the insurer agree the value up front and that's what is paid after a total loss. With **replacement** cover, the insurer may replace the piece or pay what it would cost to replace – which, for a Birkin or a discontinued watch bought above retail, may not be the same thing. For pieces that trade above retail, ask specifically how the insurer will value a loss.",
      ],
    },
    {
      id: "documents",
      heading: "The documents you need",
      blocks: [
        {
          list: [
            "**Invoice** with a full description: model, reference, serial number or date stamp.",
            "**Valuation** from a qualified appraiser, updated every few years as markets move.",
            "**Photos** of each piece from every side, including serials, stamps and hallmarks.",
            "**Certificates** – box and papers, grading reports, CITES documents for exotics.",
          ],
        },
        "Keep copies in the cloud, not just in the safe next to the piece.",
      ],
    },
    {
      id: "questions",
      heading: "Questions to ask your insurer",
      blocks: [
        {
          list: [
            "Am I covered when travelling abroad, and for how long?",
            "Is mysterious disappearance (simply losing a piece) covered?",
            "Do I need a safe, or an alarm, for the policy to apply?",
            "Who chooses the repairer for a damaged piece?",
            "How are pairs and sets handled (earrings, a bag and its accessories)?",
          ],
        },
      ],
    },
    {
      id: "montevane",
      heading: "From the day it arrives",
      blocks: [
        "Every piece we ship travels fully insured until it is signed for. From that moment it's yours to insure, so arrange cover before delivery – and ask us for a detailed invoice describing the piece in full.",
      ],
    },
  ],
  faq: [
    { q: "Is my Rolex covered by home insurance?", a: "Possibly, but often only up to a single-item limit and sometimes only inside the home. Check your policy and consider listing the watch separately." },
    { q: "How often should I update a valuation?", a: "Every two to three years, or sooner if the market for your piece moves sharply." },
    { q: "What documents do I need to insure a Birkin?", a: "The invoice, a valuation, clear photos including the date stamp, and CITES documents for exotic leathers." },
  ],
  sources: [
    { label: "CITES – Convention on International Trade in Endangered Species", url: "https://cites.org/" },
  ],
  shop: [
    { label: "Payment & shipping", path: "/payment-shipping" },
    { label: "Our authenticity guarantee", path: "/authenticity" },
  ],
};
