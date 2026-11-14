import { AssetImage } from "@/components/common/AssetImage";
import { asset } from "@/lib/images";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Asset base name in public/images/web_optimized (without extension). */
  image: string;
  /** Optional looping clip in public/videos, played over the image. */
  video?: string;
  priority?: boolean;
};

export function PageHero({ eyebrow, title, description, image, video, priority = false }: PageHeroProps) {
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
