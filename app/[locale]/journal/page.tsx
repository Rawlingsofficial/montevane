import Link from "next/link";
import type { Metadata } from "next";

import { AssetImage } from "@/components/common/AssetImage";
import { PageHero } from "@/components/common/PageHero";
import { DEFAULT_LOCALE, getDictionary, localePath } from "@/lib/i18n";
import { PAGES } from "@/lib/i18n/dictionaries/pages";
import { resolveLocale } from "@/lib/i18n/server";
import { publishedPosts, readingMinutes, type Post } from "@/lib/journal";
import type { Cluster } from "@/lib/journal/types";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

// Hourly, so scheduled posts appear on their date.
export const revalidate = 3600;

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

const CLUSTERS: { id: Cluster; title: string }[] = [
  { id: "hermes", title: "Hermès" },
  { id: "watches", title: "Rare Watches" },
  { id: "jewelry", title: "Fine Jewelry" },
];

// Articles are English-only: other locales show them but point their
// canonical at the English page so search engines index one copy.
export async function generateMetadata({ params }: PageProps<"/[locale]/journal">): Promise<Metadata> {
  await resolveLocale(params);
  const t = getDictionary(DEFAULT_LOCALE).meta;
  const meta = pageMetadata({ locale: DEFAULT_LOCALE, path: "/journal", title: t.journalTitle, description: t.journalDescription, locales: [DEFAULT_LOCALE] });
  return { ...meta, alternates: { ...meta.alternates, canonical: absoluteUrl(DEFAULT_LOCALE, "/journal") } };
}

function Card({ post, locale, large = false }: { post: Post; locale: Parameters<typeof localePath>[0]; large?: boolean }) {
  return (
    <Link href={localePath(locale, `/journal/${post.slug}`)} className="group block" hrefLang="en">
      <div className="overflow-hidden">
        <AssetImage
          base={post.image}
          alt=""
          sizes={large ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          className={`${large ? "aspect-[16/10]" : "aspect-[4/3]"} transition-transform duration-500 ease-out group-hover:scale-105`}
        />
      </div>
      <p className="mt-5 text-xs font-medium tracking-[0.15em] text-[var(--gold)] uppercase">{post.category}</p>
      <h3 className={`mt-2 font-heading font-light ${large ? "text-2xl sm:text-3xl" : "text-xl"}`}>{post.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>
      <p className="mt-3 text-xs tracking-[0.1em] text-muted-foreground uppercase">
        {dateFormatter.format(new Date(post.date))} · {readingMinutes(post)} min read
      </p>
    </Link>
  );
}

export default async function JournalPage({ params }: PageProps<"/[locale]/journal">) {
  const locale = await resolveLocale(params);
  const { journal } = PAGES[locale];
  const posts = publishedPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero eyebrow={journal.eyebrow} title={journal.title} description={journal.description} image="editorial_setup" priority />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        {journal.englishOnly && <p className="mb-10 text-sm text-muted-foreground">{journal.englishOnly}</p>}

        {lead && (
          <section className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-end">
            <Card post={lead} locale={locale} large />
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
              <h2 className="mb-8 border-b border-border pb-4 text-2xl sm:text-3xl">{title}</h2>
              <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <Card key={p.slug} post={p} locale={locale} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
