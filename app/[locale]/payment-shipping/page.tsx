import type { Metadata } from "next";

import { PageHero } from "@/components/common/PageHero";
import { SourcingCta } from "@/components/common/SourcingCta";
import { getDictionary } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps<"/[locale]/payment-shipping">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).meta;
  return pageMetadata({ locale, path: "/payment-shipping", title: t.paymentTitle, description: t.paymentDescription });
}

export default async function PaymentShippingPage({ params }: PageProps<"/[locale]/payment-shipping">) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  return (
    <>
      <PageHero eyebrow={t.payment.eyebrow} title={t.payment.title} description={t.payment.note} image="feature_card_2" priority />

      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="space-y-12">
          {t.payment.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl">{section.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/80">{section.body}</p>
            </section>
          ))}
        </div>
        <SourcingCta locale={locale} />
      </div>
    </>
  );
}
