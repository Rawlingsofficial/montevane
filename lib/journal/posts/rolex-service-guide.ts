import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "rolex-service-guide",
  title: "Rolex Servicing: When, Where and What Happens",
  metaTitle: "Rolex Service Guide: Intervals, What's Done & Polishing",
  description: "When to service a Rolex, signs it needs attention, what happens during a service, whether to allow polishing, and how service history affects resale value.",
  category: "Watch Guides",
  cluster: "watches",
  date: "2027-02-01",
  keyword: "rolex service",
  keywords: ["how often to service a rolex", "rolex service interval", "rolex polishing", "rolex service center", "rolex service history"],
  image: "watch_1",
  cover: "rolex-datejust-31-278274-stainless-steel-dark-grey-dial-jubilee-bracelet-31-mm",
  picks: { brand: "rolex", sort: "newest", limit: 4 },
  intro: [
    "A Rolex is built to run for generations, but not without care. A mechanical movement has hundreds of parts working against each other all day, and its oils age over time.",
    "Here's when to service yours, what actually happens, and the one decision that matters most for value: whether to let them polish the case.",
  ],
  sections: [
    {
      id: "when",
      heading: "How often?",
      blocks: [
        "When Rolex extended its warranty to five years in 2015, it was widely reported that the recommended service interval for modern watches became roughly ten years, depending on use. Older watches, and watches worn in demanding conditions, may need attention sooner.",
        {
          list: [
            "**Time-keeping drifts** noticeably beyond what it used to be.",
            "**The power reserve drops** – the watch stops sooner when taken off.",
            "**The crown feels gritty** or doesn't screw down cleanly.",
            "**Moisture or fogging** under the crystal – have it seen immediately.",
            "**The chronograph or date** doesn't change or reset crisply.",
          ],
        },
      ],
    },
    {
      id: "what",
      heading: "What happens during a service",
      blocks: [
        "The movement is fully dismantled, cleaned, inspected and reassembled with new lubrication; worn parts are replaced with genuine ones; gaskets are replaced and water resistance tested; the watch is regulated and tested for accuracy and power reserve. The case and bracelet are cleaned – and, unless you say otherwise, often refinished.",
      ],
    },
    {
      id: "polish",
      heading: "To polish or not to polish?",
      blocks: [
        "Polishing removes scratches but also removes metal. Repeated polishing softens the sharp edges and bevels of the case and lugs, which collectors value highly. For a modern daily watch, a light refinish is fine. For a collectable or vintage watch, ask for **no polishing** – most buyers prefer honest wear to a soft case.",
        { note: "Original parts matter on vintage Rolex. Ask for any replaced parts – especially dials and hands – to be returned to you." },
      ],
    },
    {
      id: "value",
      heading: "Service history and value",
      blocks: [
        "Service papers from Rolex or a qualified independent watchmaker reassure buyers and support a strong price. Keep every receipt with the box and papers. When buying, ask when the watch was last serviced – see our [Rolex buying guide](/journal/rolex-buying-guide).",
      ],
    },
  ],
  faq: [
    { q: "How often should a Rolex be serviced?", a: "For modern Rolex watches, roughly every ten years depending on use, or whenever accuracy, power reserve or water resistance is in doubt." },
    { q: "Should I let Rolex polish my watch?", a: "For a daily modern watch a light refinish is fine. For a collectable or vintage watch, ask for no polishing to preserve the case's original edges." },
    { q: "Does a service increase a Rolex's value?", a: "A recent service with papers makes a watch easier to sell and supports its price; an over-polished case can reduce it." },
  ],
  sources: [
    { label: "Rolex – official site", url: "https://www.rolex.com/" },
    { label: "COSC – Swiss Official Chronometer Testing Institute", url: "https://www.cosc.swiss/en" },
  ],
  shop: [
    { label: "Shop Rolex", path: "/shop/watches/rolex" },
    { label: "Our authenticity guarantee", path: "/authenticity" },
  ],
};
