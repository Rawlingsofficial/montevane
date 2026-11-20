import { SubscribeForm } from "@/components/common/SubscribeForm";
import { getDictionary, type Locale } from "@/lib/i18n";

export function Newsletter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="border-t border-border bg-[#f5f0e9]">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center lg:px-10 lg:py-28">
        <span aria-hidden="true" className="mb-8 block h-px w-12 bg-[var(--gold)]" />
        <div className="w-full max-w-md">
          <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{t.home.newsletterEyebrow}</p>
          <h2 className="mt-3 text-4xl">{t.home.newsletterTitle}</h2>
          <p className="mt-4 text-sm text-foreground/80">{t.home.newsletterBody}</p>
          <SubscribeForm labels={t.newsletter} className="mt-8" />
        </div>
      </div>
    </section>
  );
}
