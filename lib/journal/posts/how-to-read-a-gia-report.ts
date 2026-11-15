import type { Post } from "@/lib/journal/types";

export const post: Post = {
  slug: "how-to-read-a-gia-report",
  title: "How to Read a GIA Diamond Grading Report",
  metaTitle: "How to Read a GIA Diamond Report, Section by Section",
  description: "A GIA diamond report explained section by section: report number, shape, measurements, the 4Cs, proportions, clarity plot, fluorescence and inscription.",
  category: "Jewelry Guides",
  cluster: "jewelry",
  date: "2026-12-14",
  keyword: "how to read a gia report",
  keywords: ["gia certificate", "gia report check", "diamond grading report"],
  image: "jewelry_1",
  cover: "radiant-and-trapezoid-cut-diamond-engagement-ring-14k-white-gold-radiant-and-trapezoid",
  picks: { category: "jewelry", piece: "Ring", sort: "price_asc" },
  intro: [
    "A grading report is the closest thing a diamond has to a passport. It records exactly what the stone is, so you can compare diamonds fairly and make sure the one you receive is the one you paid for.",
    "Here's what each part of a GIA report means. For the basics of the 4Cs, see our [diamond buying guide](/journal/diamond-buying-guide).",
  ],
  sections: [
    {
      id: "sections",
      heading: "The report, section by section",
      blocks: [
        {
          list: [
            "**Report number and date** – the unique number you use to verify the report with GIA.",
            "**Shape and cutting style** – for example \"Round Brilliant\" or \"Cushion Modified Brilliant\".",
            "**Measurements** – length, width and depth in millimetres. Useful for checking the stone in the setting.",
            "**Carat weight** – to two decimal places.",
            "**Colour grade** – D to Z for white diamonds, or a fancy colour description for coloured stones.",
            "**Clarity grade** – from Flawless to I3.",
            "**Cut grade** – for round brilliants, from Excellent to Poor.",
            "**Polish and symmetry** – the finish and precision of the facets.",
            "**Fluorescence** – how the diamond reacts to ultraviolet light, from None to Very Strong.",
            "**Clarity characteristics and plot** – a diagram marking where inclusions sit.",
            "**Inscription** – if present, the report number laser-inscribed on the girdle.",
            "**Comments** – any additional information, such as features not shown on the plot.",
          ],
        },
      ],
    },
    {
      id: "what-matters",
      heading: "What to pay attention to",
      blocks: [
        {
          list: [
            "**Match the stone to the report.** The measurements and, where present, the girdle inscription should agree with the diamond.",
            "**Read the plot, not just the grade.** Two SI1 diamonds can look very different depending on where the inclusions are.",
            "**Consider fluorescence.** Faint or medium fluorescence rarely affects appearance; very strong fluorescence can occasionally make a stone look hazy.",
            "**Check whether the diamond is natural or laboratory-grown.** GIA issues distinct reports for each.",
          ],
        },
      ],
    },
    {
      id: "montevane",
      heading: "Certificates on Montévane",
      blocks: [
        "Where a piece on Montévane is certified, the certificate is listed with the piece. [Ask us](/contact) for the report number before you buy and verify it yourself with GIA. Browse our [diamond rings](/shop/jewelry/rings) and [necklaces](/shop/jewelry/necklaces).",
      ],
    },
  ],
  faq: [
    { q: "How do I verify a GIA report?", a: "Enter the report number in GIA's online Report Check on gia.edu. It should return the same grades and measurements as your paper or digital report." },
    { q: "Is a GIA report the same as an appraisal?", a: "No. A GIA report describes the diamond's characteristics; it does not state a monetary value. An appraisal estimates value, usually for insurance." },
    { q: "Does every diamond have a laser inscription?", a: "Not every one, but many GIA-graded diamonds carry the report number inscribed on the girdle, visible under magnification." },
  ],
  sources: [
    { label: "GIA – Diamond quality factors", url: "https://www.gia.edu/diamond-quality-factor" },
    { label: "GIA – About the Gemological Institute of America", url: "https://www.gia.edu/gia-about" },
  ],
  shop: [
    { label: "Shop fine jewelry", path: "/shop/jewelry" },
    { label: "Diamond rings", path: "/shop/jewelry/rings" },
  ],
};
