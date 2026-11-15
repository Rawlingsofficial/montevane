import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "how-to-authenticate-hermes",
  title: "How to Authenticate a Hermès Birkin or Kelly",
  metaTitle: "How to Authenticate a Hermès Birkin or Kelly Bag",
  description: "The details specialists check on a Hermès bag: stamps and date letters, saddle stitching, hardware engravings, lock and keys, leather and packaging.",
  category: "Hermès Guides",
  cluster: "hermes",
  pillar: true,
  date: "2026-11-12",
  keyword: "how to authenticate a hermes bag",
  keywords: ["fake birkin", "hermes blind stamp", "real vs fake hermes"],
  image: "product_interior",
  cover: "hermes-birkin-25-craie-togo-gold-hardware",
  picks: { category: "birkin-bags", sort: "newest" },
  intro: [
    "High-grade replicas of Hermès bags are better than ever, and no single detail proves a bag is genuine. Authentication is the sum of many small checks, each of which has to agree with the others: the stamps with the leather, the leather with the colour, the hardware with the year.",
    "This guide walks through what our specialists look at. It will help you ask the right questions and spot obvious problems – but for a purchase of this size, always buy from a seller who stands behind authenticity with a refund.",
  ],
  sections: [
    {
      id: "stamps",
      heading: "1. The stamps",
      blocks: [
        "A Hermès bag carries several stamps, and each has to be right.",
        {
          list: [
            "**The Hermès Paris heat stamp** – below the turn-lock on the front. The lettering is crisp, evenly spaced and pressed cleanly into the leather, whether blind, gold or silver. Sloppy spacing, thick letters or a stamp that sits on top of the leather are warning signs.",
            "**The year letter and artisan mark** – usually on the back of a strap inside the bag. From 2015 the year letter stands alone (A for 2017, D for 2019, B for 2023…); before that it sat inside a shape. The letter must make sense for the leather, colour and hardware of the bag.",
            "**Exotic marks** – crocodile, alligator, ostrich and lizard bags carry an extra symbol beside the heat stamp that identifies the skin.",
          ],
        },
      ],
    },
    {
      id: "stitching",
      heading: "2. The stitching",
      blocks: [
        "Hermès bags are saddle-stitched by hand with two needles and a single waxed linen thread, which creates stitches that sit at a slight, consistent angle. Machine stitching is perfectly straight and identical; hand stitching is even but alive. Look closely at the handles, the sides of the flap and the strap ends.",
        "Thread colour matters too: it should be consistent with the bag's colour combination and the house's usual choices for that leather.",
      ],
    },
    {
      id: "hardware",
      heading: "3. Hardware, lock and keys",
      blocks: [
        {
          list: [
            "**Engravings** – \"Hermès\" and \"Paris\" engravings on the turn-lock, padlock and hardware should be fine, clean and correctly spaced, with no fuzzy edges.",
            "**Weight and finish** – genuine hardware is solid and heavy for its size, with an even plating and no bubbling or flaking.",
            "**Lock and keys** – the padlock has a number stamped on its underside that matches the number on the keys. The keys sit in the leather clochette.",
            "**Feet** – four metal feet on the base, matching the rest of the hardware.",
          ],
        },
      ],
    },
    {
      id: "leather",
      heading: "4. Leather, shape and smell",
      blocks: [
        "Hermès leathers each have a distinctive grain: Togo's soft, irregular pebble; Epsom's fine, regular emboss; Box calf's glassy shine. A bag described as Togo that has a flat, uniform grain is a problem. The edges (*tranches*) are painted and polished smoothly, and the bag stands with even, balanced proportions.",
        "Genuine leather smells of leather. A chemical or glue smell, or a plastic feel to the surface, deserves a closer look.",
      ],
    },
    {
      id: "packaging",
      heading: "5. Packaging and paperwork",
      blocks: [
        "An orange box, dust bag, rain cover and receipt add confidence and value, but they are also the easiest things to fake. Treat them as supporting evidence: they should match the bag, but they never prove it on their own. A receipt can be checked for consistency with the store, date and model.",
      ],
    },
    {
      id: "professional",
      heading: "Why professional authentication matters",
      blocks: [
        "The best replicas get most individual details close. What gives them away is inconsistency – a date letter from one year with hardware from another, a leather that wasn't offered in that colour, stitching tension that changes along a seam. Spotting those takes thousands of bags of experience.",
        "That is why every Hermès piece on Montévane is examined by our specialists before it is listed, and why we offer a full refund if a piece ever fails a third-party check. Read more about [our authenticity guarantee](/authenticity), or [send us photos](/contact) of a bag you are considering and we will tell you what we see.",
      ],
    },
  ],
  faq: [
    { q: "Where is the date stamp on a Hermès bag?", a: "On most Birkins and Kellys it is on the back of one of the interior straps, alongside the artisan mark. On some models it appears inside the bag near the pocket." },
    { q: "Does a receipt prove a Hermès bag is authentic?", a: "No. Receipts, boxes and dust bags support a bag's story but are easy to reproduce. The bag itself – stamps, stitching, hardware and leather – is what has to be checked." },
    { q: "Can a counterfeit Hermès bag have hand stitching?", a: "Some high-grade replicas imitate saddle stitching. That's why authenticators look at how all the details fit together rather than relying on any one check." },
    { q: "What happens if a bag I buy from Montévane fails an authentication check?", a: "You receive a full refund. Every piece is checked by our specialists before listing, and we stand behind it if an independent check ever disagrees." },
  ],
  sources: [
    { label: "Hermès – official site", url: "https://www.hermes.com/us/en/" },
    { label: "Christie's – Handbags & Accessories department", url: "https://www.christies.com/en/departments/handbags-and-accessories" },
    { label: "Sotheby's – Handbags & Accessories department", url: "https://www.sothebys.com/en/departments/handbags-and-accessories" },
  ],
  shop: [
    { label: "Our authenticity guarantee", path: "/authenticity" },
    { label: "Shop Hermès Birkin bags", path: "/shop/birkin-bags" },
    { label: "Shop Hermès Kelly bags", path: "/shop/kelly-bags" },
  ],
};
