import Link from "next/link";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary, localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";
import { merchantReturnLd } from "@/lib/seo/structured-data";

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps<"/[locale]/authenticity">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).meta;
  return pageMetadata({ locale, path: "/authenticity", title: t.authenticityTitle, description: t.authenticityDescription });
}

export default async function AuthenticityPage({ params }: PageProps<"/[locale]/authenticity">) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const a = t.authenticity;

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} description={a.intro} image="product_interior" priority />

      <div className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t.nav.home, path: "/" },
            { name: a.title, path: "/authenticity" },
          ]}
        />
        <div className="space-y-12">
          {a.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl">{section.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/80">{section.body}</p>
            </section>
          ))}
        </div>
        <p className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-xs font-medium tracking-[0.15em] uppercase">
          <Link href={localePath(locale, "/contact")} className="underline-offset-4 hover:text-[var(--gold)] hover:underline">
            {t.nav.contact}
          </Link>
          <Link href={localePath(locale, "/payment-shipping")} className="underline-offset-4 hover:text-[var(--gold)] hover:underline">
            {t.nav.payment}
          </Link>
        </p>
      </div>

      <JsonLd data={merchantReturnLd()} />
    </>
  );
}
