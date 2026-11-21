import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CoverImage } from "@/components/journal/CoverImage";
import { ProductCard } from "@/components/products/ProductCard";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { RichText, plainText } from "@/components/journal/RichText";
import { JsonLd } from "@/components/seo/JsonLd";
import { ListingFaq } from "@/components/shop/ListingFaq";
import { SITE_NAME } from "@/lib/constants";
import { DEFAULT_LOCALE, getDictionary, localePath, siteUrl } from "@/lib/i18n";
import { PAGES } from "@/lib/i18n/dictionaries/pages";
import { resolveLocale } from "@/lib/i18n/server";
import type { StoreProduct } from "@/lib/data/catalog";
import { getPost, publishedPosts, readingMinutes, relatedPosts } from "@/lib/journal";
import { loadPicks, postCovers } from "@/lib/journal/media";
import type { Block } from "@/lib/journal/types";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

// Rebuilt hourly so scheduled posts go live on their date without a deploy.
export const revalidate = 21600;

export function generateStaticParams() {
  return publishedPosts().map((post) => ({ slug: post.slug }));
}

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

type Props = PageProps<"/[locale]/journal/[slug]">;

// Articles are English-only: other locales show them with a canonical to the English page.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/journal/${post.slug}`;
  const cover = (await postCovers([post], locale))[post.slug];
  const meta = pageMetadata({
    locale: DEFAULT_LOCALE,
    path,
    title: post.metaTitle,
    description: post.description,
    image: cover.url,
    locales: [DEFAULT_LOCALE],
    type: "article",
  });
  return { ...meta, alternates: { ...meta.alternates, canonical: absoluteUrl(DEFAULT_LOCALE, path) } };
}

type Loc = Parameters<typeof RichText>[0]["locale"];

function ProductRow({ products, locale, title }: { products: StoreProduct[]; locale: Loc; title?: string }) {
  if (!products.length) return null;
  return (
    <div className="not-prose -mx-6 border-y border-border bg-[var(--ivory)]/50 px-6 py-6 sm:mx-0 sm:border sm:px-6">
      {title && <p className="mb-4 text-xs tracking-[0.15em] text-[var(--gold)] uppercase">{title}</p>}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function BlockView({ block, locale, products }: { block: Block; locale: Loc; products: Map<Block, StoreProduct[]> }) {
  if (typeof block === "object" && "products" in block) return <ProductRow products={products.get(block) ?? []} locale={locale} title={block.title} />;
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
  if ("image" in block)
    return (
      <figure className="not-prose">
        {/* eslint-disable-next-line @next/next/no-img-element -- our own photo, pre-compressed */}
        <img
          src={block.image.src}
          alt={block.image.alt}
          width={block.image.width}
          height={block.image.height}
          loading="lazy"
          decoding="async"
          className="mx-auto h-auto w-full max-w-md"
        />
        {block.image.caption && <figcaption className="mt-2 text-center text-xs text-muted-foreground">{block.image.caption}</figcaption>}
      </figure>
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
  // Links to articles that aren't live yet are held back until their date.
  const shopLinks = post.shop.filter((s) => !s.path.startsWith("/journal/") || getPost(s.path.slice("/journal/".length)));

  const t = getDictionary(locale);
  const { journal } = PAGES[locale];
  const related = relatedPosts(post);
  const productBlocks = post.sections.flatMap((s) => s.blocks).filter((b): b is Extract<Block, { products: unknown }> => typeof b === "object" && "products" in b);
  const [covers, picks, inline] = await Promise.all([
    postCovers([post, ...related], locale),
    post.picks ? loadPicks(post.picks, locale, post.picks.limit ?? 8) : Promise.resolve([]),
    Promise.all(productBlocks.map((b) => loadPicks(b.products, locale))),
  ]);
  const products = new Map<Block, StoreProduct[]>(productBlocks.map((b, i) => [b, inline[i]]));
  const cover = covers[post.slug];
  const url = absoluteUrl(DEFAULT_LOCALE, `/journal/${post.slug}`);
  const crumbs = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.journal, path: "/journal" },
    { name: post.title, path: `/journal/${post.slug}` },
  ];

  return (
    <article lang="en">
      {/* Light header: title left, the post's piece (or its gallery scene) right. */}
      <header className="bg-[var(--ivory)] pt-28 lg:pt-32">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 pb-10 lg:grid-cols-[3fr_2fr] lg:gap-16 lg:px-10 lg:pb-14">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-[var(--gold)] uppercase">{post.category}</p>
            <h1 className="mt-3 font-heading text-3xl font-extralight sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-xs tracking-[0.1em] text-muted-foreground uppercase">
              <time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time> · {readingMinutes(post)} min read
            </p>
          </div>
          <CoverImage
            cover={cover}
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className={cover.product ? "aspect-square max-h-[55vh] w-full lg:max-h-none" : "aspect-[4/3] w-full"}
          />
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
                <BlockView key={i} block={b} locale={locale} products={products} />
              ))}
            </div>
          </section>
        ))}

        {picks.length > 0 && (
          <section aria-label="Shop this guide" className="mt-16">
            <p className="text-xs tracking-[0.2em] text-[var(--gold)] uppercase">Shop this guide</p>
            <h2 className="mt-2 text-2xl sm:text-3xl">Available now at Montévane</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4">
              {picks.map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>
          </section>
        )}

        {shopLinks.length > 0 && (
          <section aria-label="Shop" className="mt-16 bg-[var(--ivory)] p-6 sm:p-8">
            <p className="text-xs tracking-[0.2em] text-[var(--gold)] uppercase">Shop the guide</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {shopLinks.map((s) => (
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
            <p className="mt-1 font-heading text-lg">{SITE_NAME}</p>
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
                  <CoverImage cover={covers[p.slug]} sizes="(max-width: 640px) 100vw, 33vw" className="aspect-[4/3] transition-transform duration-500 group-hover:scale-105" />
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
          image: `${siteUrl()}${cover.url}`,
          keywords: [post.keyword, ...post.keywords].join(", "),
          mainEntityOfPage: url,
          articleSection: post.category,
          wordCount: readingMinutes(post) * 220,
          author: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl(DEFAULT_LOCALE, "/about") },
          publisher: { "@id": `${siteUrl()}/#organization` },
          citation: post.sources.map((s) => s.url),
          abstract: plainText(post.intro[0]),
        }}
      />
    </article>
  );
}
