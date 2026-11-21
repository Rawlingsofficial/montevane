// Our own photos and films, taken in Miami (public/images/ours, public/videos).
// Already compressed WebP, served as-is: no Vercel image transformations.

export type OwnPhoto = { src: string; width: number; height: number; caption?: "kelly" | "birkin" | "rmGreen" | "rmBlue" | "cartier" };

/** Pieces from our stock, photographed in Miami during inspection. */
export const INSPECTION: OwnPhoto[] = [
  { src: "/images/ours/inspection-kelly-crocodile.webp", width: 743, height: 1080, caption: "kelly" },
  { src: "/images/ours/inspection-richard-mille-green.webp", width: 1080, height: 1080, caption: "rmGreen" },
  { src: "/images/ours/inspection-birkin-alligator.webp", width: 810, height: 1080, caption: "birkin" },
  { src: "/images/ours/inspection-cartier-panthere.webp", width: 924, height: 1080, caption: "cartier" },
  { src: "/images/ours/inspection-richard-mille-blue.webp", width: 961, height: 1080, caption: "rmBlue" },
];

/** Pieces in their boxes, as they leave us. */
export const DELIVERY: OwnPhoto[] = [
  { src: "/images/ours/delivery-kelly-orange.webp", width: 885, height: 948 },
  { src: "/images/ours/delivery-kelly-black.webp", width: 810, height: 1080 },
  { src: "/images/ours/delivery-kelly-cut.webp", width: 873, height: 1080 },
  { src: "/images/ours/delivery-kelly-danse.webp", width: 703, height: 1080 },
];

export const FILMS = [
  { src: "/videos/stockroom-birkin.mp4", poster: "/images/ours/stockroom-birkin-poster.webp", label: "videoBirkin" },
  { src: "/videos/stockroom-kelly.mp4", poster: "/images/ours/stockroom-kelly-poster.webp", label: "videoKelly" },
] as const;
