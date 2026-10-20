import { Gem, Headset, PackageCheck, ShieldCheck } from "lucide-react";

import { getDictionary, type Locale } from "@/lib/i18n";

const ICONS = [ShieldCheck, PackageCheck, Gem, Headset];

export function WhyShopWithUs({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="mb-14 text-center">
        <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">{t.home.whyEyebrow}</p>
        <h2 className="mt-3 text-4xl">{t.home.whyTitle}</h2>
      </div>

      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {t.why.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <div key={item.title} className="text-center">
              <Icon className="mx-auto size-6 text-[var(--gold)]" strokeWidth={1.25} />
              <h3 className="mt-5 text-sm font-medium tracking-wide uppercase">{item.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
