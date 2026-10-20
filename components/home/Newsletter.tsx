import { AssetImage } from "@/components/common/AssetImage";
import { SubscribeForm } from "@/components/common/SubscribeForm";
import { getDictionary, type Locale } from "@/lib/i18n";

export function Newsletter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="relative overflow-hidden">
      <AssetImage base="newsletter_bg" alt="" sizes="100vw" className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-white/90" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start px-6 py-28 lg:items-end lg:px-10">
        <div className="w-full max-w-md lg:text-right">
          <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{t.home.newsletterEyebrow}</p>
          <h2 className="mt-3 text-4xl">{t.home.newsletterTitle}</h2>
          <p className="mt-4 text-sm text-foreground/80">{t.home.newsletterBody}</p>
          <SubscribeForm labels={t.newsletter} className="mt-8" />
        </div>
      </div>
    </section>
  );
}
