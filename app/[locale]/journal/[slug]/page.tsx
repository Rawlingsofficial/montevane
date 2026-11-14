import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AssetImage } from "@/components/common/AssetImage";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { RichText, plainText } from "@/components/journal/RichText";
import { JsonLd } from "@/components/seo/JsonLd";
import { ListingFaq } from "@/components/shop/ListingFaq";
import { SITE_NAME } from "@/lib/constants";
import { DEFAULT_LOCALE, getDictionary, localePath, siteUrl } from "@/lib/i18n";
import { PAGES } from "@/lib/i18n/dictionaries/pages";
import { resolveLocale } from "@/lib/i18n/server";
import { asset } from "@/lib/images";
import { getPost, publishedPosts, readingMinutes, relatedPosts } from "@/lib/journal";
import type { Block } from "@/lib/journal/types";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

// Rebuilt hourly so scheduled posts go live on their date without a deploy.
export const revalidate = 3600;

export function generateStaticParams() {
  return publishedPosts().map((post) => ({ slug: post.slug }));
}

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

type Props = PageProps<"/[locale]/journal/[slug]">;

// Articles are English-only: other locales show them with a canonical to the English page.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await resolveLocale(params);
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/journal/${post.slug}`;
  const meta = pageMetadata({
    locale: DEFAULT_LOCALE,
    path,
    title: post.metaTitle,
    description: post.description,
    image: asset(post.image),
    locales: [DEFAULT_LOCALE],
    type: "article",
  });
  return { ...meta, alternates: { ...meta.alternates, canonical: absoluteUrl(DEFAULT_LOCALE, path) } };
}

function BlockView({ block, locale }: { block: Block; locale: Parameters<typeof RichText>[0]["locale"] }) {
  if (typeof block === "string")
    return (
      <p>
        <RichText text={block} locale={locale} />
      </p>
    );
  if ("list" in block)
    return (
      <ul className="list-disc space-y-2 pl-5 marker:text-[var(--gold)]">
        {block.list.map((item) => (
          <li key={item}>
            <RichText text={item} locale={locale} />
          </li>
        ))}
      </ul>
    );
  if ("table" in block)
    return (
      <div className="-mx-6 overflow-x-auto px-6">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-foreground">
              {block.table.head.map((h, i) => (
                <th key={i} className="py-3 pr-4 text-xs font-medium tracking-[0.1em] uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row, r) => (
              <tr key={r} className="border-b border-border align-top">
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? "py-3 pr-4 font-medium text-foreground" : "py-3 pr-4"}>
                    <RichText text={cell} locale={locale} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  return (
    <aside className="border-l-2 border-[var(--gold)] bg-[var(--ivory)] px-5 py-4 text-sm">
      <RichText text={block.note} locale={locale} />
    </aside>
  );
}

export default async function JournalPostPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const t = getDictionary(locale);
  const { journal } = PAGES[locale];
  const related = relatedPosts(post);
  const url = absoluteUrl(DEFAULT_LOCALE, `/journal/${post.slug}`);
  const crumbs = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.journal, path: "/journal" },
    { name: post.title, path: `/journal/${post.slug}` },
  ];

  return (
    <article lang="en">
      <header data-page-hero className="relative flex h-[42vh] min-h-[320px] w-full items-end overflow-hidden">
        <AssetImage base={post.image} alt="" priority sizes="100vw" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/20" />
        <div className="relative mx-auto w-full max-w-3xl px-6 pb-10">
          <p className="text-xs font-medium tracking-[0.2em] text-[var(--gold)] uppercase">{post.category}</p>
          <h1 className="mt-3 font-heading text-3xl font-extralight text-white sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-xs tracking-[0.1em] text-white/80 uppercase">
            <time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time> · {readingMinutes(post)} min read
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-8 lg:py-12">
        <Breadcrumbs locale={locale} items={crumbs} />

        <div className="mt-2 space-y-5 text-lg leading-relaxed text-foreground/85">
          {post.intro.map((p, i) => (
            <p key={i}>
              <RichText text={p} locale={locale} />
            </p>
          ))}
        </div>

        <nav aria-label="In this guide" className="mt-10 border-y border-border py-6">
          <p className="text-xs tracking-[0.15em] text-muted-foreground uppercase">In this guide</p>
          <ol className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
            {post.sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:text-[var(--gold)]">
                  <span className="mr-2 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {post.sections.map((s) => (
          <section key={s.id} id={s.id} className="mt-14 scroll-mt-28">
            <h2 className="text-2xl sm:text-3xl">{s.heading}</h2>
            <div className="mt-5 space-y-5 text-base leading-relaxed text-foreground/85">
              {s.blocks.map((b, i) => (
                <BlockView key={i} block={b} locale={locale} />
              ))}
            </div>
          </section>
        ))}

        {post.shop.length > 0 && (
          <section aria-label="Shop" className="mt-16 bg-[var(--ivory)] p-6 sm:p-8">
            <p className="text-xs tracking-[0.2em] text-[var(--gold)] uppercase">Shop the guide</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {post.shop.map((s) => (
                <li key={s.path}>
                  <Link href={localePath(locale, s.path)} className="inline-flex min-h-11 items-center border border-foreground px-5 text-xs tracking-[0.15em] uppercase transition-colors hover:bg-foreground hover:text-white">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <ListingFaq title="Frequently asked questions" items={post.faq} />

        {post.sources.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xs tracking-[0.15em] text-muted-foreground uppercase">Sources</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {post.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener" className="underline decoration-border underline-offset-4 hover:text-[var(--gold)]">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <aside className="mt-14 flex gap-5 border-t border-border pt-8">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-foreground font-heading text-xl text-white">M</div>
          <div>
            <p className="text-xs tracking-[0.15em] text-muted-foreground uppercase">Written by</p>
            <p className="mt-1 font-heading text-lg">{SITE_NAME} Specialists</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/75">
              Our team in Monaco and Miami authenticates and sources Hermès, rare watches and fine jewelry for clients worldwide. Every piece we sell is checked before it ships.{" "}
              <Link href={localePath(locale, "/about")} className="underline underline-offset-4 hover:text-[var(--gold)]">
                About us
              </Link>
            </p>
          </div>
        </aside>

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
                <div className="overflow-hidden">
                  <AssetImage base={p.image} alt="" sizes="(max-width: 640px) 100vw, 33vw" className="aspect-[4/3] transition-transform duration-500 group-hover:scale-105" />
                </div>
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
          "@id": `${url}#article`,
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          inLanguage: "en",
          image: `${siteUrl()}${asset(post.image)}`,
          mainEntityOfPage: url,
          articleSection: post.category,
          wordCount: readingMinutes(post) * 220,
          author: { "@type": "Organization", name: `${SITE_NAME} Specialists`, url: absoluteUrl(DEFAULT_LOCALE, "/about") },
          publisher: { "@id": `${siteUrl()}/#organization` },
          citation: post.sources.map((s) => s.url),
          abstract: plainText(post.intro[0]),
        }}
      />
    </article>
  );
}
