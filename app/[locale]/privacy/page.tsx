import type { Metadata } from "next";

import { getDictionary } from "@/lib/i18n";
import { PAGES } from "@/lib/i18n/dictionaries/pages";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).meta;
  return pageMetadata({ locale, path: "/privacy", title: t.privacyTitle, description: t.privacyDescription });
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const locale = await resolveLocale(params);
  const { privacy } = PAGES[locale];

  return (
    <div className="mx-auto max-w-3xl px-6 pt-32 pb-20">
      <h1 className="font-heading text-4xl font-light">{privacy.title}</h1>
      <p className="mt-3 text-xs tracking-[0.1em] text-muted-foreground uppercase">{privacy.updated}</p>
      <div className="mt-12 space-y-10">
        {privacy.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl">{section.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/80">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
