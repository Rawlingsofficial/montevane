import type { OwnPhoto } from "@/lib/catalog/ours";
import { cn } from "@/lib/utils";

/**
 * A titled row of our own photos (inspection in Miami, pieces in their boxes).
 * Swipes on phones, a grid from `sm` up.
 */
export function OwnPhotos({
  eyebrow,
  title,
  body,
  photos,
  captions,
  className,
}: {
  eyebrow: string;
  title: string;
  body: string;
  photos: OwnPhoto[];
  captions?: Record<NonNullable<OwnPhoto["caption"]>, string>;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24", className)}>
      <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{eyebrow}</p>
      <h2 className="mt-4 max-w-xl text-3xl font-light sm:text-4xl">{title}</h2>
      <p className="mt-4 max-w-xl text-sm text-foreground/75">{body}</p>
      <ul
        className={cn(
          "-mx-6 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 sm:mx-0 sm:grid sm:overflow-visible sm:px-0",
          photos.length === 5 ? "sm:grid-cols-5" : "sm:grid-cols-4"
        )}
      >
        {photos.map((p) => {
          const caption = p.caption && captions?.[p.caption];
          return (
            <li key={p.src} className="w-[62%] shrink-0 snap-start sm:w-auto">
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--ivory)]">
                {/* eslint-disable-next-line @next/next/no-img-element -- pre-compressed, served from the CDN as-is */}
                <img src={p.src} alt={caption ?? ""} width={p.width} height={p.height} loading="lazy" decoding="async" className="size-full object-cover" />
              </div>
              {caption && <p className="mt-3 text-xs tracking-[0.1em] text-muted-foreground uppercase">{caption}</p>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
