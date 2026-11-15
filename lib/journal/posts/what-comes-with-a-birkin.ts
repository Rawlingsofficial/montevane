import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "what-comes-with-a-birkin",
  title: "What Comes with a Birkin? The Full Set Explained",
  metaTitle: "What Comes with a Hermès Birkin? Full Set, Box & Accessories",
  description: "What a Hermès Birkin \"full set\" includes – box, dust bag, rain cover, clochette, lock and keys, receipt – what matters most for value, and what's fine to be missing.",
  category: "Hermès Guides",
  cluster: "hermes",
  date: "2027-01-25",
  keyword: "birkin full set",
  keywords: ["what comes with a birkin", "birkin box", "birkin clochette lock keys", "birkin rain cover", "birkin receipt"],
  image: "product_45deg",
  cover: "hermes-birkin-30-etoupe-togo-gold-hardware",
  picks: { category: "birkin-bags", sort: "newest", limit: 8 },
  intro: [
    "On the resale market you'll often see \"full set\" next to a Birkin's price. It means the bag comes with everything it left the boutique with – and it can make a real difference to value.",
    "Here's what a full set includes and which pieces matter most.",
  ],
  sections: [
    {
      id: "contents",
      heading: "What a full set includes",
      blocks: [
        {
          table: {
            head: ["Item", "What it is", "How much it matters"],
            rows: [
              ["Clochette", "Leather bell that holds the keys", "High – part of the bag's design"],
              ["Lock and two keys", "Padlock stamped with a number that matches the keys", "High – a missing lock is noticed"],
              ["Dust bag", "Cotton bag for storage", "Medium"],
              ["Box", "The orange box (size varies with the bag)", "Medium – valued by collectors, bulky to ship"],
              ["Rain cover", "Protective cover for wet weather", "Low to medium"],
              ["Receipt", "Original or copy of the boutique receipt", "Helpful for provenance"],
              ["Care booklet, ribbon", "Paperwork and packaging", "Low"],
            ],
          },
        },
      ],
    },
    {
      id: "value",
      heading: "How completeness affects price",
      blocks: [
        "A new or pristine bag with its full set commands the strongest price. Missing the clochette, lock or keys is the most noticeable gap, because they're part of how the bag looks. Missing the box or rain cover matters less to most buyers, though collectors prefer complete sets.",
        { note: "A receipt helps establish provenance, but it isn't proof of authenticity on its own – receipts can be forged. The bag itself is what gets authenticated." },
      ],
    },
    {
      id: "check",
      heading: "What to check when you buy",
      blocks: [
        {
          list: [
            "The **lock number** matches the number on the keys.",
            "The **hardware** on the lock and keys matches the bag (gold, palladium, rose gold…).",
            "The **date stamp** fits the colour, leather and hardware – see our [date stamp chart](/journal/hermes-date-stamp-chart).",
            "The listing states clearly what is **included** – and what isn't.",
          ],
        },
        "Before you buy from us, ask exactly what comes with the bag and we'll send photos of each accessory.",
      ],
    },
  ],
  faq: [
    { q: "What does \"full set\" mean for a Birkin?", a: "The bag comes with everything it originally had: clochette, lock and keys, dust bag, box, rain cover and, ideally, the receipt." },
    { q: "Does a missing box reduce a Birkin's value?", a: "A little. Missing the clochette, lock or keys matters more, because they're part of the bag's design." },
    { q: "Does a receipt prove a Birkin is real?", a: "No. It helps with provenance, but receipts can be forged. The bag itself must be authenticated." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Christie's – Handbags & Accessories department", url: "https://www.christies.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Shop Birkin bags", path: "/shop/birkin-bags" },
    { label: "Our authenticity guarantee", path: "/authenticity" },
  ],
};
