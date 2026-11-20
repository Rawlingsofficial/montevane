import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";
import { PostCard } from "@/components/journal/PostCard";
import { DEFAULT_LOCALE, getDictionary } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { publishedPosts, TOPICS } from "@/lib/journal";
import { postCovers } from "@/lib/journal/media";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";

// Hourly, so scheduled posts appear on their date.
export const revalidate = 3600;

type Props = PageProps<"/[locale]/journal/topic/[topic]">;

export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.id }));
}

const topicOf = (id: string) => TOPICS.find((t) => t.id === id);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await resolveLocale(params);
  const topic = topicOf((await params).topic);
  if (!topic) return {};
  const path = `/journal/topic/${topic.id}`;
  const meta = pageMetadata({ locale: DEFAULT_LOCALE, path, title: `${topic.title} Journal`, description: topic.description, locales: [DEFAULT_LOCALE] });
  return { ...meta, alternates: { ...meta.alternates, canonical: absoluteUrl(DEFAULT_LOCALE, path) } };
}

export default async function JournalTopicPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const topic = topicOf((await params).topic);
  if (!topic) notFound();
  const t = getDictionary(locale);
  const posts = publishedPosts().filter((p) => p.cluster === topic.id);
  const covers = await postCovers(posts, locale);

  return (
    <>
      <PageHero eyebrow={t.nav.journal} title={topic.title} description={topic.description} image="journal" />
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t.nav.home, path: "/" },
            { name: t.nav.journal, path: "/journal" },
            { name: topic.title, path: `/journal/topic/${topic.id}` },
          ]}
        />
        <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} cover={covers[p.slug]} locale={locale} />
          ))}
        </div>
      </div>
    </>
  );
}
