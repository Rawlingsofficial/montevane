import Link from "next/link";
import type { Metadata } from "next";

import { PostCard as Card } from "@/components/journal/PostCard";
import { PageHero } from "@/components/common/PageHero";
import { DEFAULT_LOCALE, getDictionary, localePath } from "@/lib/i18n";
import { PAGES } from "@/lib/i18n/dictionaries/pages";
import { resolveLocale } from "@/lib/i18n/server";
import { publishedPosts, TOPICS as CLUSTERS } from "@/lib/journal";
import { postCovers } from "@/lib/journal/media";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

// Hourly, so scheduled posts appear on their date.
export const revalidate = 21600;



/** Cards per topic on the index; the rest are on the topic page. */
const PER_TOPIC = 6;

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
  const posts = publishedPosts();
  const [lead, ...rest] = posts;
  const shown = [...posts.slice(0, 1), ...CLUSTERS.flatMap(({ id }) => posts.filter((p) => p.cluster === id).slice(0, PER_TOPIC))];
  const covers = await postCovers([...new Set(shown)], locale);

  return (
    <>
      <PageHero eyebrow={journal.eyebrow} title={journal.title} description={journal.description} image="journal" priority />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        {journal.englishOnly && <p className="mb-10 text-sm text-muted-foreground">{journal.englishOnly}</p>}

        {lead && (
          <section className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-end">
            <Card post={lead} cover={covers[lead.slug]} locale={locale} large />
            <ul className="divide-y divide-border border-y border-border">
              {rest.slice(0, 4).map((p) => (
                <li key={p.slug}>
                  <Link href={localePath(locale, `/journal/${p.slug}`)} className="block py-5 hover:text-[var(--gold)]" hrefLang="en">
                    <p className="text-xs tracking-[0.15em] text-[var(--gold)] uppercase">{p.category}</p>
                    <p className="mt-1 font-heading text-lg font-light">{p.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {CLUSTERS.map(({ id, title }) => {
          const items = posts.filter((p) => p.cluster === id);
          if (!items.length) return null;
          return (
            <section key={id} className="mt-20">
              <div className="mb-8 flex items-end justify-between gap-6 border-b border-border pb-4">
                <h2 className="text-2xl sm:text-3xl">{title}</h2>
                {items.length > PER_TOPIC && (
                  <Link href={localePath(locale, `/journal/topic/${id}`)} className="shrink-0 text-xs tracking-[0.15em] uppercase hover:text-[var(--gold)]">
                    All {items.length} articles
                  </Link>
                )}
              </div>
              <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {items.slice(0, PER_TOPIC).map((p) => (
                  <Card key={p.slug} post={p} cover={covers[p.slug]} locale={locale} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
