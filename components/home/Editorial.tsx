import Link from "next/link";

import { AssetImage } from "@/components/common/AssetImage";

export function Editorial() {
  return (
    <section className="grid lg:grid-cols-2">
      <AssetImage
        base="editorial_setup"
        alt="Montévane editorial"
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="aspect-[4/3] lg:aspect-auto lg:h-full"
      />
      <div className="flex flex-col items-start justify-center bg-[#111111] px-8 py-20 text-white sm:px-16 lg:py-0">
        <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">The Journal</p>
        <h2 className="mt-4 max-w-md text-3xl font-light sm:text-4xl">
          Craftsmanship, heritage, and the art of the everyday bag
        </h2>
        <p className="mt-5 max-w-sm text-sm text-white/60">
          Step behind the scenes of the ateliers, archives, and stories that define
          modern luxury.
        </p>
        <Link
          href="/journal"
          className="mt-8 border-b border-[var(--gold)] pb-1 text-xs font-medium tracking-[0.15em] text-[var(--gold)] uppercase"
        >
          Read the Journal
        </Link>
      </div>
    </section>
  );
}
