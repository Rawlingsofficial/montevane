import Image, { getImageProps } from "next/image";

import { cn } from "@/lib/utils";
import type { GalleryScene } from "@/lib/catalog/gallery";

// Desktop scenes are 2400×960 (hero 2400×1350); phone scenes 1080×810 (hero 1080×1700).
const SIZE = {
  banner: { desktop: [2400, 960], mobile: [1080, 810] },
  hero: { desktop: [2400, 1350], mobile: [1080, 1700] },
} as const;

/**
 * A gallery scene with art direction: the wide file (pieces right, text room
 * left) from `lg` up, the phone file (pieces low, text room on top) below.
 * Fills its box (object-cover) — the box sets the shape.
 */
export function GalleryImage({
  scene,
  kind = "banner",
  priority = false,
  className,
  imgClassName,
}: {
  scene: GalleryScene;
  kind?: keyof typeof SIZE;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const s = SIZE[kind];
  const common = { alt: scene.alt, sizes: "100vw", priority };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: scene.src, width: s.desktop[0], height: s.desktop[1] });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: scene.mobile, width: s.mobile[0], height: s.mobile[1] });

  return (
    <picture className={cn("block", className)}>
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <source srcSet={mobile} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img {...rest} className={cn("size-full object-cover", imgClassName)} />
    </picture>
  );
}

/**
 * A gallery scene or loupe close-up filling its box (cards, split sections).
 * Uses the 4:3 phone file of a scene — the pieces span its whole width.
 */
export function SceneFill({
  scene,
  sizes = "(max-width: 640px) 100vw, 50vw",
  className,
}: {
  scene: GalleryScene;
  sizes?: string;
  className?: string;
}) {
  return <Image src={scene.mobile} alt={scene.alt} fill sizes={sizes} className={cn("object-cover object-bottom", className)} />;
}
