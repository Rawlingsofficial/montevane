import Link from "next/link";
import type { Metadata } from "next";

import { AssetImage } from "@/components/common/AssetImage";
import { PageHero } from "@/components/common/PageHero";
import { JOURNAL_POSTS } from "@/lib/constants";
import { journalImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Journal — Montévane",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Stories From the House"
        description="Craftsmanship, heritage, and the art of the everyday bag."
        image="editorial_setup"
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {JOURNAL_POSTS.map((post) => (
            <Link key={post.slug} href={`/journal/${post.slug}`} className="group block">
              <AssetImage
                base={journalImage(post.slug)}
                alt={post.title}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="aspect-[4/3] transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <p className="mt-5 text-xs font-medium tracking-[0.15em] text-[var(--gold)] uppercase">{post.category}</p>
              <h2 className="mt-2 font-heading text-xl font-light">{post.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
              <p className="mt-3 text-xs tracking-[0.1em] text-muted-foreground/70 uppercase">
                {dateFormatter.format(new Date(post.date))}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
