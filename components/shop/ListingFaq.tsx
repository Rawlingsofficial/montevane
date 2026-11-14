import { ChevronDown } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { faqLd } from "@/lib/seo/structured-data";

export function ListingFaq({ title, items }: { title: string; items: { q: string; a: string }[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-24 max-w-3xl">
      <h2 className="text-2xl">{title}</h2>
      <div className="mt-6 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-base">
              {item.q}
              <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="pb-5 text-base leading-relaxed text-foreground/80">{item.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqLd(items)} />
    </section>
  );
}
