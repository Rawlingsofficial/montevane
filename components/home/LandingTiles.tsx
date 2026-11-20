import Image from "next/image";
import Link from "next/link";

import { localePath, type Locale } from "@/lib/i18n";

export type LandingTile = {
  href: string;
  title: string;
  count: number;
  cover: { url: string; alt: string } | null;
  /** Small secondary links under the title (a watch house's New / Pre-Owned). */
  links?: { label: string; href: string }[];
};

/**
 * A row of large still-life tiles: one real piece per landing page on white,
 * the page name and piece count underneath. Swipes sideways on phones so the
 * home page stays short; a calm grid from tablet up.
 */
export function LandingTiles({
  locale,
  eyebrow,
  title,
  tiles,
  viewAll,
  pieces,
  columns,
  className,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  tiles: LandingTile[];
  viewAll: { label: string; href: string };
  pieces: (n: number) => string;
  columns: "four" | "six";
  className?: string;
}) {
  if (!tiles.length) return null;
  const grid = columns === "six" ? "sm:grid-cols-3 lg:grid-cols-6" : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="mb-8 flex items-end justify-between gap-6 lg:mb-12">
          <div>
            <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{eyebrow}</p>
            <h2 className="mt-3 text-3xl lg:text-4xl">{title}</h2>
          </div>
          <Link
            href={localePath(locale, viewAll.href)}
            className="hidden shrink-0 border-b border-foreground pb-0.5 text-xs tracking-[0.15em] uppercase sm:inline-block"
          >
            {viewAll.label}
          </Link>
        </div>

        <ul className={`-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 ${grid}`}>
          {tiles.map((tile) => (
            <li key={tile.href} className="w-[68%] shrink-0 snap-start sm:w-auto">
              <Link href={localePath(locale, tile.href)} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-white">
                  {tile.cover && (
                    <Image
                      src={tile.cover.url}
                      alt={tile.cover.alt}
                      fill
                      sizes="(max-width: 640px) 68vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <p className="mt-4 font-heading text-lg font-light transition-colors group-hover:text-[var(--gold)]">{tile.title}</p>
                <p className="mt-1 text-xs tracking-[0.1em] text-muted-foreground uppercase">{pieces(tile.count)}</p>
              </Link>
              {tile.links && tile.links.length > 0 && (
                <p className="mt-2 flex gap-4 text-xs tracking-[0.1em] uppercase">
                  {tile.links.map((l) => (
                    <Link key={l.href} href={localePath(locale, l.href)} className="text-foreground/70 underline-offset-4 hover:text-[var(--gold)] hover:underline">
                      {l.label}
                    </Link>
                  ))}
                </p>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-8 sm:hidden">
          <Link href={localePath(locale, viewAll.href)} className="inline-flex min-h-11 items-center border border-foreground px-6 text-xs tracking-[0.15em] uppercase">
            {viewAll.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
