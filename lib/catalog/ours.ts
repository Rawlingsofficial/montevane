// Our own photos and films (public/images/ours, public/videos). Already
// compressed WebP, served as-is: no Vercel image transformations.

export type Caption = "kelly" | "birkin" | "rmGreen" | "rmBlue" | "rmOrange" | "cartier" | "stamp" | "hardware";
export type OwnPhoto = { src: string; width: number; height: number; caption?: Caption };

/** Pieces from our stock, photographed in Miami during inspection. */
export const INSPECTION: OwnPhoto[] = [
  { src: "/images/ours/inspection-kelly-crocodile.webp", width: 743, height: 1080, caption: "kelly" },
  { src: "/images/ours/inspection-richard-mille-green.webp", width: 1080, height: 1080, caption: "rmGreen" },
  { src: "/images/ours/inspection-birkin-alligator.webp", width: 810, height: 1080, caption: "birkin" },
  { src: "/images/ours/inspection-cartier-panthere.webp", width: 924, height: 1080, caption: "cartier" },
  { src: "/images/ours/inspection-richard-mille-blue.webp", width: 961, height: 1080, caption: "rmBlue" },
  { src: "/images/ours/inspection-richard-mille-orange.webp", width: 864, height: 1080, caption: "rmOrange" },
  { src: "/images/ours/detail-hermes-stamp.webp", width: 864, height: 1080, caption: "stamp" },
  { src: "/images/ours/detail-kelly-hardware.webp", width: 864, height: 1080, caption: "hardware" },
];

/** Pieces in their boxes, as they leave us. */
export const DELIVERY: OwnPhoto[] = [
  { src: "/images/ours/delivery-kelly-orange.webp", width: 885, height: 948 },
  { src: "/images/ours/delivery-kelly-black.webp", width: 810, height: 1080 },
  { src: "/images/ours/delivery-kelly-cut.webp", width: 873, height: 1080 },
  { src: "/images/ours/delivery-kelly-danse.webp", width: 703, height: 1080 },
  { src: "/images/ours/delivery-pochettes.webp", width: 810, height: 1080 },
  { src: "/images/ours/delivery-herbag.webp", width: 864, height: 1080 },
  { src: "/images/ours/delivery-kelly-teddy.webp", width: 876, height: 1080 },
  { src: "/images/ours/delivery-kelly-pochette.webp", width: 933, height: 1080 },
];

/** Wrapped and gifted (contact page). */
export const GIFTING: OwnPhoto[] = [
  { src: "/images/ours/gift-wrapped.webp", width: 751, height: 1080 },
  { src: "/images/ours/gift-kelly-table.webp", width: 692, height: 1080 },
  { src: "/images/ours/gift-shopping-bags.webp", width: 810, height: 1080 },
  { src: "/images/ours/gift-bags-unpacked.webp", width: 864, height: 1080 },
  { src: "/images/ours/gift-car.webp", width: 864, height: 1080 },
];

/** Birkins carried and in our hands (Birkin page). */
export const BIRKIN_WORN: OwnPhoto[] = [
  { src: "/images/ours/worn-birkin-etoupe.webp", width: 1072, height: 1080 },
  { src: "/images/ours/worn-birkin-blue.webp", width: 878, height: 1080 },
  { src: "/images/ours/worn-birkin-black.webp", width: 954, height: 1080 },
  { src: "/images/ours/worn-birkin-gold.webp", width: 926, height: 1080 },
  { src: "/images/ours/birkin-balcony.webp", width: 915, height: 1080 },
  { src: "/images/ours/birkin-balcony-2.webp", width: 915, height: 1080 },
  { src: "/images/ours/birkin-orange.webp", width: 945, height: 1080 },
  { src: "/images/ours/birkin-on-box.webp", width: 914, height: 1080 },
];

/** Kellys carried (Kelly page). */
export const KELLY_WORN: OwnPhoto[] = [
  { src: "/images/ours/worn-kelly-sellier.webp", width: 669, height: 1080 },
  { src: "/images/ours/worn-kelly-orange.webp", width: 810, height: 1080 },
  { src: "/images/ours/worn-kelly-pochette.webp", width: 810, height: 1080 },
  { src: "/images/ours/worn-kelly-24-24.webp", width: 864, height: 1080 },
  { src: "/images/ours/kelly-on-boxes.webp", width: 914, height: 1080 },
];

/** Watches on the wrist (watches page). */
export const WATCHES_WORN: OwnPhoto[] = [
  { src: "/images/ours/hand-nautilus.webp", width: 864, height: 1080 },
  { src: "/images/ours/wrist-nautilus.webp", width: 864, height: 1080 },
  { src: "/images/ours/wrist-richard-mille.webp", width: 810, height: 1080 },
  { src: "/images/ours/wrist-royal-oak-rainbow.webp", width: 866, height: 1080 },
  { src: "/images/ours/wrist-royal-oak.webp", width: 864, height: 1080 },
  { src: "/images/ours/wrist-royal-oak-2.webp", width: 864, height: 1080 },
];

/** Hermès beyond the Birkin and Kelly (Hermès brand page). */
export const HERMES_WORN: OwnPhoto[] = [
  { src: "/images/ours/worn-constance.webp", width: 761, height: 1080 },
  { src: "/images/ours/worn-bolide.webp", width: 825, height: 1080 },
  { src: "/images/ours/worn-croc-bag.webp", width: 720, height: 1080 },
  { src: "/images/ours/worn-herbag.webp", width: 1080, height: 1003 },
  { src: "/images/ours/herbag-studio.webp", width: 941, height: 1080 },
  { src: "/images/ours/birkins-trio.webp", width: 664, height: 1080 },
  { src: "/images/ours/feather-bag-window.webp", width: 918, height: 1080 },
  { src: "/images/ours/birkin-table.webp", width: 851, height: 1080 },
];

export const FILMS = [
  { src: "/videos/stockroom-birkin.mp4", poster: "/images/ours/stockroom-birkin-poster.webp", label: "videoBirkin" },
  { src: "/videos/stockroom-kelly.mp4", poster: "/images/ours/stockroom-kelly-poster.webp", label: "videoKelly" },
] as const;
