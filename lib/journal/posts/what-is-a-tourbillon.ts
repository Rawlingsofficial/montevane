import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "what-is-a-tourbillon",
  title: "What Is a Tourbillon, and Is It Worth It?",
  metaTitle: "What Is a Tourbillon? How It Works & Whether It's Worth It",
  description: "What a tourbillon is: Breguet's 1801 invention, how the rotating cage works, flying tourbillons, why they cost so much and whether a tourbillon watch is worth it.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-05-17",
  keyword: "what is a tourbillon",
  keywords: ["tourbillon watch", "flying tourbillon", "breguet tourbillon", "tourbillon price", "tourbillon accuracy"],
  image: "watch_3",
  cover: "zenith-tourbillon-18-1260-4005-18k-rose-gold-silver-dial-45-mm",
  picks: { category: "watches", query: "tourbillon", sort: "price_asc", limit: 8 },
  intro: [
    "A tourbillon is a tiny rotating cage at the heart of a watch – and one of the most admired complications in watchmaking. Here's how it works and why people pay so much for it.",
  ],
  sections: [
    {
      id: "how",
      heading: "How it works",
      blocks: [
        "In a normal watch, gravity pulls slightly on the balance and escapement, and the effect changes depending on which way the watch is held. Abraham-Louis Breguet patented the tourbillon in 1801: he mounted the whole escapement in a cage that rotates, usually once a minute, so these errors average out.",
        "A **flying tourbillon** has no bridge over the top of the cage, so it appears to float – harder to make and even more striking to look at.",
      ],
    },
    {
      id: "worth",
      heading: "Is it worth it?",
      blocks: [
        "In a wristwatch, which moves constantly, the accuracy benefit is debated; modern regulation does most of the work. People buy tourbillons for the craftsmanship – hundreds of tiny parts, often hand-finished, turning in a cage that weighs less than a gram – and for the mesmerising view through the dial. Richard Mille's first watch, the RM 001, was a tourbillon; see [Richard Mille models](/journal/richard-mille-models). For other complications, read [watch complications explained](/journal/watch-complications-explained).",
      ],
    },
  ],
  faq: [
    { q: "Who invented the tourbillon?", a: "Abraham-Louis Breguet, who patented it in 1801." },
    { q: "Does a tourbillon make a watch more accurate?", a: "It was designed to reduce errors caused by gravity; in a wristwatch the gain is debated. Its appeal today is mostly craftsmanship." },
    { q: "Why are tourbillons so expensive?", a: "They are difficult to make, assemble and adjust by hand, and the cage must be extremely light and precise." },
  ],
  sources: [
    { label: "Patek Philippe – Complications", url: "https://www.patek.com/en/collection/complications" },
    { label: "Richard Mille – official site", url: "https://www.richardmille.com/" },
  ],
  shop: [
    { label: "Shop watches", path: "/shop/watches" },
  ],
};
