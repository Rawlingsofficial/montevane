import { AssetImage } from "@/components/common/AssetImage";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Asset base name in public/images/web_optimized (without extension). */
  image: string;
  priority?: boolean;
};

export function PageHero({ eyebrow, title, description, image, priority = false }: PageHeroProps) {
  return (
    <section className="relative flex h-[50vh] min-h-[380px] w-full items-center justify-center overflow-hidden">
      <AssetImage base={image} alt="" priority={priority} sizes="100vw" className="absolute inset-0" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative flex flex-col items-center px-6 text-center">
        <p className="text-xs font-medium tracking-[0.3em] text-white/80 uppercase">{eyebrow}</p>
        <h1 className="mt-4 max-w-2xl font-heading text-4xl font-extralight text-white sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-md text-sm font-light text-white/70">{description}</p>}
      </div>
    </section>
  );
}
