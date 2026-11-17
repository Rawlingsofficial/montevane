import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { getDictionary, localePath } from "@/lib/i18n";
import { SELL } from "@/lib/i18n/dictionaries/sell";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps<"/[locale]/sell">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const s = SELL[locale];
  return pageMetadata({ locale, path: "/sell", title: s.metaTitle, description: s.metaDescription });
}

export default async function SellPage({ params }: PageProps<"/[locale]/sell">) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const s = SELL[locale];

  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} description={s.intro} image="product_interior" priority />

      <div className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t.nav.home, path: "/" },
            { name: s.nav, path: "/sell" },
          ]}
        />

        <section>
          <h2 className="text-2xl">{s.buyTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/80">
            {s.buy.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl">{s.stepsTitle}</h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {s.steps.map((step, i) => (
              <li key={step.title} className="border-t border-foreground pt-4">
                <span className="text-xs tracking-[0.2em] text-[var(--gold)]">0{i + 1}</span>
                <h3 className="mt-2 font-heading text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl">{s.helpTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/80">
            {s.help.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section id="sell-form" className="mt-16 scroll-mt-28">
          <h2 className="text-2xl">{s.formTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{s.formBody}</p>
          <div className="mt-8">
            <InquiryForm
              locale={locale}
              product={{ id: "", name: `Sell: ${s.nav}` }}
              labels={{ ...t.form, messageDefault: s.messageDefault }}
              privacyHref={localePath(locale, "/privacy")}
              noteOpen
              continueHref={localePath(locale, "/")}
            />
          </div>
        </section>
      </div>
    </>
  );
}
