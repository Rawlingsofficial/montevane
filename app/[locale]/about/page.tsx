import type { Metadata } from "next";

import { AssetImage } from "@/components/common/AssetImage";
import { PageHero } from "@/components/common/PageHero";
import { WhyShopWithUs } from "@/components/home/WhyShopWithUs";
import { getDictionary } from "@/lib/i18n";
import { PAGES } from "@/lib/i18n/dictionaries/pages";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).meta;
  return pageMetadata({ locale, path: "/about", title: t.aboutTitle, description: t.aboutDescription });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = await resolveLocale(params);
  const { about } = PAGES[locale];
  const [house, craft, experience] = about.blocks;

  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.title} description={about.description} image="about_boutique" priority />

      <section className="grid lg:grid-cols-2">
        <div className="flex flex-col items-start justify-center px-8 py-20 sm:px-16 lg:py-28">
          <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{house.eyebrow}</p>
          <h2 className="mt-4 max-w-md text-3xl font-light sm:text-4xl">{house.title}</h2>
          <p className="mt-5 max-w-md text-sm text-foreground/80">{house.body}</p>
        </div>
        <AssetImage base="lifestyle_1" alt="" sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[4/3] lg:aspect-auto lg:h-full" />
      </section>

      <section className="grid lg:grid-cols-2">
        <AssetImage base="lifestyle_2" alt="" sizes="(max-width: 1024px) 100vw, 50vw" className="order-2 aspect-[4/3] lg:order-1 lg:aspect-auto lg:h-full" />
        <div className="order-1 flex flex-col items-start justify-center bg-[#111111] px-8 py-20 text-white sm:px-16 lg:order-2 lg:py-28">
          <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{craft.eyebrow}</p>
          <h2 className="mt-4 max-w-md text-3xl font-light sm:text-4xl">{craft.title}</h2>
          <p className="mt-5 max-w-md text-sm text-white/75">{craft.body}</p>
        </div>
      </section>

      <section className="flex flex-col items-start justify-center px-8 py-20 sm:px-16 lg:items-center lg:py-28 lg:text-center">
        <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{experience.eyebrow}</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-light sm:text-4xl">{experience.title}</h2>
        <p className="mt-5 max-w-xl text-sm text-foreground/80">{experience.body}</p>
      </section>

      <WhyShopWithUs locale={locale} />
    </>
  );
}
