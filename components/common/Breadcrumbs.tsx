import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { localePath, type Locale } from "@/lib/i18n/config";
import { breadcrumbLd } from "@/lib/seo/structured-data";

/** Visible breadcrumb trail plus its BreadcrumbList structured data. */
export function Breadcrumbs({ locale, items }: { locale: Locale; items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-xs tracking-[0.1em] text-muted-foreground uppercase">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.path} className={i === items.length - 1 ? "flex min-w-0 items-center gap-2" : "flex items-center gap-2"}>
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="truncate text-foreground max-lg:max-w-[60vw]">
                {item.name}
              </span>
            ) : (
              <Link href={localePath(locale, item.path)} className="hover:text-foreground">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbLd(locale, items)} />
    </nav>
  );
}
