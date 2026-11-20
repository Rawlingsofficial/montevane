import Image from "next/image";

import { GalleryImage } from "@/components/common/GalleryImage";
import { gallery } from "@/lib/catalog/gallery";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Gallery scene id (public/images/gallery, built by scripts/compose-gallery.mjs). */
  image: string;
  /**
   * A real product photo for this page (brand, model, jewelry type). When set,
   * the header shows that one piece — text left, the piece right — and
   * `image` is not used.
   */
  cover?: { url: string; alt: string } | null;
  priority?: boolean;
};

const eyebrowClass = "text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase";

/**
 * Light page header in the gallery style: real pieces on stone plinths with
 * the title on the empty wall (left on desktop; above the scene on phones).
 * Without a built scene it falls back to a plain ivory title block.
 */
export function PageHero({ eyebrow, title, description, image, cover, priority = false }: PageHeroProps) {
  if (cover) {
    return (
      <header className="bg-[var(--ivory)] pt-24 lg:pt-32">
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_7.5rem] items-center gap-5 px-6 pb-8 sm:grid-cols-[3fr_2fr] sm:gap-12 lg:px-10 lg:pb-12">
          <div>
            <p className={eyebrowClass}>{eyebrow}</p>
            <h1 className="mt-3 font-heading text-3xl font-extralight sm:text-5xl">{title}</h1>
            {description && <p className="mt-4 max-w-md text-sm font-light text-muted-foreground">{description}</p>}
          </div>
          <div className="relative aspect-square w-full overflow-hidden bg-white sm:max-h-[42vh]">
            <Image
              src={cover.url}
              alt={cover.alt}
              fill
              sizes="(max-width: 640px) 8rem, 40vw"
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              className="object-contain p-3 sm:p-8"
            />
          </div>
        </div>
      </header>
    );
  }

  const scene = gallery(image);
  const text = (
    <>
      <p className={eyebrowClass}>{eyebrow}</p>
      <h1 className="mt-3 font-heading text-3xl font-extralight sm:text-5xl">{title}</h1>
      {description && <p className="mt-4 max-w-md text-sm font-light text-muted-foreground">{description}</p>}
    </>
  );

  if (!scene) {
    return (
      <header className="bg-[var(--ivory)] pt-28 pb-12 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">{text}</div>
      </header>
    );
  }

  return (
    <header className="relative mt-16 bg-[#f5f0e9] lg:mt-[100px]">
      {/* Phones: title on the wall colour, then the scene. */}
      <div className="px-6 pt-8 lg:hidden">{text}</div>
      <GalleryImage
        scene={scene}
        priority={priority}
        className="aspect-[4/3] w-full lg:aspect-[5/2] lg:max-h-[62vh]"
        imgClassName="object-bottom lg:object-[100%_75%]"
      />
      {/* Desktop: title on the empty wall to the left of the pieces. */}
      <div className="absolute inset-0 hidden items-center lg:flex">
        <div className="mx-auto w-full max-w-7xl px-10">
          <div className="max-w-[40%]">{text}</div>
        </div>
      </div>
    </header>
  );
}
