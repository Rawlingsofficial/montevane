import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AssetImage } from "@/components/common/AssetImage";
import { JOURNAL_POSTS } from "@/lib/constants";
import { journalImage } from "@/lib/images";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} — Montévane Journal`, description: post.excerpt };
}

export default async function JournalPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = JOURNAL_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article>
      <div className="relative flex h-[45vh] min-h-[340px] w-full items-end overflow-hidden">
        <AssetImage base={journalImage(post.slug)} alt="" priority sizes="100vw" className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto w-full max-w-3xl px-6 pb-12">
          <p className="text-xs font-medium tracking-[0.2em] text-[var(--gold)] uppercase">{post.category}</p>
          <h1 className="mt-3 font-heading text-3xl font-extralight text-white sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-xs tracking-[0.1em] text-white/60 uppercase">{dateFormatter.format(new Date(post.date))}</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-6 text-base leading-relaxed text-foreground/80">
          {post.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <Link
          href="/journal"
          className="mt-12 inline-block border-b border-foreground pb-1 text-xs font-medium tracking-[0.15em] uppercase hover:border-[var(--gold)] hover:text-[var(--gold)]"
        >
          Back to Journal
        </Link>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <h2 className="mb-8 text-2xl">More Stories</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} href={`/journal/${p.slug}`} className="group block">
                <AssetImage base={journalImage(p.slug)} alt={p.title} sizes="(max-width: 640px) 100vw, 33vw" className="aspect-[4/3] transition-transform duration-500 group-hover:scale-105" />
                <p className="mt-4 text-xs font-medium tracking-[0.15em] text-[var(--gold)] uppercase">{p.category}</p>
                <h3 className="mt-1 font-heading text-lg font-light">{p.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
