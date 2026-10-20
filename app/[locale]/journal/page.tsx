import Link from "next/link";
import type { Metadata } from "next";

import { AssetImage } from "@/components/common/AssetImage";
import { PageHero } from "@/components/common/PageHero";
import { JOURNAL_POSTS } from "@/lib/constants";
import { DEFAULT_LOCALE, getDictionary, localePath } from "@/lib/i18n";
import { PAGES } from "@/lib/i18n/dictionaries/pages";
import { resolveLocale } from "@/lib/i18n/server";
import { journalImage } from "@/lib/images";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-static";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

// Articles are English-only: other locales show them but point their
// canonical at the English page so search engines index one copy.
export async function generateMetadata({ params }: PageProps<"/[locale]/journal">): Promise<Metadata> {
  await resolveLocale(params);
  const t = getDictionary(DEFAULT_LOCALE).meta;
  const meta = pageMetadata({ locale: DEFAULT_LOCALE, path: "/journal", title: t.journalTitle, description: t.journalDescription, locales: [DEFAULT_LOCALE] });
  return { ...meta, alternates: { ...meta.alternates, canonical: absoluteUrl(DEFAULT_LOCALE, "/journal") } };
}

export default async function JournalPage({ params }: PageProps<"/[locale]/journal">) {
  const locale = await resolveLocale(params);
  const { journal } = PAGES[locale];

  return (
    <>
      <PageHero eyebrow={journal.eyebrow} title={journal.title} description={journal.description} image="editorial_setup" priority />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {journal.englishOnly && <p className="mb-10 text-sm text-muted-foreground">{journal.englishOnly}</p>}
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {JOURNAL_POSTS.map((post) => (
            <Link key={post.slug} href={localePath(locale, `/journal/${post.slug}`)} className="group block" hrefLang="en">
              <AssetImage
                base={journalImage(post.slug)}
                alt=""
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="aspect-[4/3] transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <p className="mt-5 text-xs font-medium tracking-[0.15em] text-[var(--gold)] uppercase">{post.category}</p>
              <h2 className="mt-2 font-heading text-xl font-light">{post.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
              <p className="mt-3 text-xs tracking-[0.1em] text-muted-foreground uppercase">{dateFormatter.format(new Date(post.date))}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
