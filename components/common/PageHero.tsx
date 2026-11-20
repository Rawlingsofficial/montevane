import Image from "next/image";

import { AssetImage } from "@/components/common/AssetImage";
import { asset } from "@/lib/images";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Asset base name in public/images/web_optimized (without extension). */
  image: string;
  /**
   * A real product photo for this page (brand, model, jewelry type). When set,
   * the header becomes a light still life — text left, the piece right — like
   * the journal's product covers, and `image`/`video` are not used.
   */
  cover?: { url: string; alt: string } | null;
  /** Optional looping clip in public/videos, played over the image. */
  video?: string;
  priority?: boolean;
};

export function PageHero({ eyebrow, title, description, image, cover, video, priority = false }: PageHeroProps) {
  if (cover) {
    return (
      <header className="bg-[var(--ivory)] pt-24 lg:pt-32">
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_7.5rem] items-center gap-5 px-6 pb-8 sm:grid-cols-[3fr_2fr] sm:gap-12 lg:px-10 lg:pb-12">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-[var(--gold)] uppercase">{eyebrow}</p>
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

  return (
    <section data-page-hero className="relative flex h-[30vh] min-h-[220px] w-full sm:h-[50vh] sm:min-h-[380px] items-center justify-center overflow-hidden">
      <AssetImage base={image} alt="" priority={priority} sizes="100vw" className="absolute inset-0" />
      {video && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={asset(image)}
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative flex flex-col items-center px-6 pt-14 text-center sm:pt-0">
        <p className="text-xs font-medium tracking-[0.3em] text-white/80 uppercase">{eyebrow}</p>
        <h1 className="mt-3 max-w-2xl font-heading text-3xl sm:mt-4 sm:text-4xl font-extralight text-white sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-md text-sm font-light text-white/70">{description}</p>}
      </div>
    </section>
  );
}
