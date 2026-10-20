import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AssetImage } from "@/components/common/AssetImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { JOURNAL_POSTS } from "@/lib/constants";
import { DEFAULT_LOCALE, localePath, siteUrl } from "@/lib/i18n";
import { PAGES } from "@/lib/i18n/dictionaries/pages";
import { resolveLocale } from "@/lib/i18n/server";
import { asset, journalImage } from "@/lib/images";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return JOURNAL_POSTS.map((post) => ({ slug: post.slug }));
}

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

type Props = PageProps<"/[locale]/journal/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await resolveLocale(params);
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const path = `/journal/${post.slug}`;
  const meta = pageMetadata({
    locale: DEFAULT_LOCALE,
    path,
    title: post.title,
    description: post.excerpt,
    image: asset(journalImage(post.slug)),
    locales: [DEFAULT_LOCALE],
    type: "article",
  });
  return { ...meta, alternates: { ...meta.alternates, canonical: absoluteUrl(DEFAULT_LOCALE, path) } };
}

export default async function JournalPostPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const { journal } = PAGES[locale];
  const related = JOURNAL_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article lang="en">
      <div className="relative flex h-[45vh] min-h-[340px] w-full items-end overflow-hidden">
        <AssetImage base={journalImage(post.slug)} alt="" priority sizes="100vw" className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto w-full max-w-3xl px-6 pb-12">
          <p className="text-xs font-medium tracking-[0.2em] text-[var(--gold)] uppercase">{post.category}</p>
          <h1 className="mt-3 font-heading text-3xl font-extralight text-white sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-xs tracking-[0.1em] text-white/75 uppercase">
            <time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-6 text-base leading-relaxed text-foreground/85">
          {post.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <Link
          href={localePath(locale, "/journal")}
          className="mt-12 inline-block border-b border-foreground pb-1 text-xs font-medium tracking-[0.15em] uppercase hover:border-[var(--gold)] hover:text-[var(--gold)]"
        >
          {journal.back}
        </Link>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <h2 className="mb-8 text-2xl">{journal.more}</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} href={localePath(locale, `/journal/${p.slug}`)} className="group block">
                <AssetImage base={journalImage(p.slug)} alt="" sizes="(max-width: 640px) 100vw, 33vw" className="aspect-[4/3] transition-transform duration-500 group-hover:scale-105" />
                <p className="mt-4 text-xs font-medium tracking-[0.15em] text-[var(--gold)] uppercase">{p.category}</p>
                <h3 className="mt-1 font-heading text-lg font-light">{p.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          inLanguage: "en",
          image: `${siteUrl()}${asset(journalImage(post.slug))}`,
          mainEntityOfPage: absoluteUrl(DEFAULT_LOCALE, `/journal/${post.slug}`),
          author: { "@type": "Organization", name: "Montévane" },
          publisher: { "@id": `${siteUrl()}/#organization` },
        }}
      />
    </article>
  );
}
