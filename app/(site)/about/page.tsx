import type { Metadata } from "next";

import { AssetImage } from "@/components/common/AssetImage";
import { PageHero } from "@/components/common/PageHero";
import { WhyShopWithUs } from "@/components/home/WhyShopWithUs";

export const metadata: Metadata = {
  title: "About — Montévane",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Timeless Elegance, Curated for You"
        description="An independent luxury multi-brand boutique, not affiliated with any fashion house."
        image="about_boutique"
      />

      <section className="grid lg:grid-cols-2">
        <div className="flex flex-col items-start justify-center px-8 py-20 sm:px-16 lg:py-28">
          <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">The House</p>
          <h2 className="mt-4 max-w-md text-3xl font-light sm:text-4xl">
            Carefully curated, expertly authenticated
          </h2>
          <p className="mt-5 max-w-md text-sm text-muted-foreground">
            Montévane was founded on a simple belief: that a luxury handbag is not just an
            accessory, but an investment in craft that deserves to be treated with the same care
            it took to make. We source only from the world&apos;s most prestigious fashion houses,
            and every piece passes through independent authentication before it ever reaches you.
          </p>
        </div>
        <AssetImage base="lifestyle_1" alt="Montévane atelier" sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[4/3] lg:aspect-auto lg:h-full" />
      </section>

      <section className="grid lg:grid-cols-2">
        <AssetImage base="lifestyle_2" alt="Montévane craftsmanship" sizes="(max-width: 1024px) 100vw, 50vw" className="order-2 aspect-[4/3] lg:order-1 lg:aspect-auto lg:h-full" />
        <div className="order-1 flex flex-col items-start justify-center bg-[#111111] px-8 py-20 text-white sm:px-16 lg:order-2 lg:py-28">
          <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">Craftsmanship</p>
          <h2 className="mt-4 max-w-md text-3xl font-light sm:text-4xl">
            Every stitch tells the story of an atelier
          </h2>
          <p className="mt-5 max-w-md text-sm text-white/60">
            From saddle-stitched leather to hand-finished hardware, the pieces we carry represent
            decades — sometimes centuries — of refined technique. We believe in celebrating that
            craft, not obscuring it behind marketing.
          </p>
        </div>
      </section>

      <section className="flex flex-col items-start justify-center px-8 py-20 sm:px-16 lg:items-center lg:py-28 lg:text-center">
        <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">The Experience</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-light sm:text-4xl">
          Luxury is in the details, from inquiry to delivery
        </h2>
        <p className="mt-5 max-w-xl text-sm text-muted-foreground">
          A dedicated concierge, insured worldwide shipping, and packaging worthy of what&apos;s
          inside — every step of your experience with Montévane is considered.
        </p>
      </section>

      <WhyShopWithUs />
    </>
  );
}
