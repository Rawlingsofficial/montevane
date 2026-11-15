import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "how-to-spot-a-fake-rolex",
  title: "How to Spot a Fake Rolex",
  metaTitle: "How to Spot a Fake Rolex: 9 Checks Before You Buy",
  description: "How to spot a fake Rolex: the Cyclops, rehaut engraving, serial and reference numbers, dial print, weight, movement, papers and the seller.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2026-12-28",
  keyword: "how to spot a fake rolex",
  keywords: ["fake rolex vs real", "rolex authentication", "rolex serial number"],
  image: "watch_1",
  cover: "rolex-day-date-36-118238-18k-yellow-gold-pink-index-dial-presidential-bracelet-36-mm",
  picks: { brand: "rolex", sort: "newest" },
  intro: [
    "Counterfeit Rolex watches have become remarkably convincing, and \"frankenwatches\" built from a mix of genuine and aftermarket parts are harder still to spot. No single check proves a watch is genuine – but several together will tell you whether to walk away.",
    "Here are the checks to run before you buy. For Rolex basics, see our [Rolex buying guide](/journal/rolex-buying-guide).",
  ],
  sections: [
    {
      id: "checks",
      heading: "Nine checks",
      blocks: [
        {
          list: [
            "**The Cyclops lens.** On a genuine Rolex it magnifies the date about 2.5 times, filling the window. A weak magnification is a classic warning sign.",
            "**The rehaut.** Modern Rolex watches have \"ROLEX\" engraved around the inner bezel ring, perfectly aligned with the minute markers, with the serial number at 6 o'clock.",
            "**Serial and reference numbers.** Engraved crisply between the lugs on older watches, and on the rehaut on modern ones. They should match the warranty card.",
            "**Dial printing.** Under a loupe, text should be sharp with clean edges. Fuzzy, uneven or misspelled printing points to a fake.",
            "**The crown at 6.** A tiny laser-etched crown in the crystal near 6 o'clock on modern models – very hard to see without magnification.",
            "**Weight and finishing.** A genuine Rolex feels dense. Bracelet links should be solid with no rattle, and the clasp should close precisely.",
            "**The sweep.** Rolex automatics move in a smooth, fast sweep, not a one-per-second tick.",
            "**Case back.** Most Rolex models have a plain, smooth case back. A clear display back on most models is a red flag.",
            "**The movement.** The decisive check: only a watchmaker opening the case can confirm the calibre is genuine and correct for the reference.",
          ],
        },
      ],
    },
    {
      id: "papers",
      heading: "Papers and the seller",
      blocks: [
        "Box and papers add confidence and value, but they can be faked too. Make sure the warranty card's serial matches the watch, and look at the seller's history, reviews and return policy. A price far below the market is the biggest warning sign of all.",
        "See current prices on our [Rolex page](/shop/watches/rolex).",
      ],
    },
    {
      id: "montevane",
      heading: "How we check",
      blocks: [
        { note: "Every watch on Montévane is inspected before it is offered: the movement, references, serials and finishing are checked against the brand's specification. Read [our authenticity guarantee](/authenticity)." },
      ],
    },
  ],
  faq: [
    { q: "Do fake Rolexes tick?", a: "Cheap fakes often use quartz movements that tick once per second. Better fakes use automatic movements that sweep, so a smooth sweep alone doesn't prove a watch is genuine." },
    { q: "Can a fake Rolex have a serial number?", a: "Yes. Counterfeiters copy real serial numbers. Check that the engraving is crisp and that it matches the papers – then have the movement inspected." },
    { q: "Does Rolex authenticate watches?", a: "An official Rolex service centre will refuse to service a watch that isn't genuine, and a full service confirms the movement." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
    { label: "COSC – Swiss Official Chronometer Testing Institute", url: "https://www.cosc.swiss/en" },
  ],
  shop: [
    { label: "Shop Rolex watches", path: "/shop/watches/rolex" },
    { label: "Our authenticity guarantee", path: "/authenticity" },
  ],
};
