import type { Metadata } from "next";

import { PageHero } from "@/components/common/PageHero";
import { ContactButtons } from "@/components/contact/ContactButtons";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { VisitBoutique } from "@/components/common/VisitBoutique";
import { SITE_NAME, STORE_LOCATIONS, cityLine } from "@/lib/constants";
import { getContactChannels, getStoreProfile } from "@/lib/data/catalog";
import { getDictionary, localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).meta;
  return pageMetadata({ locale, path: "/contact", title: t.contactTitle, description: t.contactDescription });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const [channels, profile] = await Promise.all([getContactChannels(), getStoreProfile()]);

  return (
    <>
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} description={t.contact.body} image="contact" priority />

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 lg:grid-cols-[1fr_1.3fr] lg:px-10">
        <div>
          <h2 className="text-2xl">{t.contact.direct}</h2>
          <div className="mt-8">
            <ContactButtons channels={channels} message={t.contact.greeting} subject={t.contact.subject} labels={t.contact.channels} />
          </div>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{t.payment.note}</p>
          <div className="mt-12 border-t border-border pt-10">
            <VisitBoutique locale={locale} profile={profile} />
          </div>
        </div>

        <div>
          <h2 className="mb-8 text-2xl">{t.contact.form}</h2>
          <InquiryForm locale={locale} labels={t.form} privacyHref={localePath(locale, "/privacy")} continueHref={localePath(locale, "/")} />
        </div>
      </section>

      <section aria-label={t.contact.visit} className="mx-auto max-w-6xl px-6 pb-24 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {STORE_LOCATIONS.map((l) => (
            <div key={l.city} className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-[var(--ivory)]">
              <iframe
                src={l.embedUrl}
                title={`${SITE_NAME} ${l.city} — ${l.street}, ${cityLine(l)}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0 grayscale-[0.4]"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
