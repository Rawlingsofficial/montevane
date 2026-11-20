import manifest from "@/lib/catalog/gallery.json";

// Storefront banners composed from real products by scripts/compose-gallery.mjs:
// every piece in them is a real listing, cut from its own photo and set on a
// plinth. Each scene has a wide desktop file and a phone file (<id>_m).

type Scene = { slug: string; name: string }[];
const SCENES = manifest as Record<string, Scene>;

export type GalleryScene = { src: string; mobile: string; alt: string; pieces: Scene };

/** The scene's files and alt text (the real pieces shown), or null if it wasn't built. */
export function gallery(id: string): GalleryScene | null {
  const pieces = SCENES[id];
  if (!pieces?.length) return null;
  const src = `/images/gallery/${id}.webp`;
  return { src, mobile: id.startsWith("loupe-") ? src : `/images/gallery/${id}_m.webp`, alt: pieces.map((p) => p.name).join(", "), pieces };
}

/** First scene in the list that exists — lets pages fall back to a broader scene. */
export function galleryFirst(...ids: string[]): GalleryScene | null {
  for (const id of ids) {
    const scene = gallery(id);
    if (scene) return scene;
  }
  return null;
}
