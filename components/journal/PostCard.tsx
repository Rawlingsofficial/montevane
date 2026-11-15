import Link from "next/link";

import { CoverImage } from "@/components/journal/CoverImage";
import { localePath, type Locale } from "@/lib/i18n";
import { readingMinutes, type Post } from "@/lib/journal";
import type { Cover } from "@/lib/journal/media";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export function PostCard({ post, cover, locale, large = false }: { post: Post; cover: Cover; locale: Locale; large?: boolean }) {
  return (
    <Link href={localePath(locale, `/journal/${post.slug}`)} className="group block" hrefLang="en">
      <div className="overflow-hidden">
        <CoverImage
          cover={cover}
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

