import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getContactChannels, getProducts } from "@/lib/data/catalog";
import { fmt, getDictionary, localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";
import { MODELS, getModel } from "@/lib/seo/models";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return MODELS.map((m) => ({ model: m.slug }));
}

type Props = PageProps<"/[locale]/models/[model]">;

const HERO: Record<string, string> = { bags: "hero_2", watches: "hero_4", jewelry: "lifestyle_2" };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const model = getModel((await params).model);
  if (!model) return {};
  const copy = model.copy[locale];
  return pageMetadata({ locale, path: `/models/${model.slug}`, title: copy.metaTitle, description: copy.metaDescription });
}

export default async function ModelPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const model = getModel((await params).model);
  if (!model) notFound();

  const t = getDictionary(locale);
  const copy = model.copy[locale];
  const [products, channels] = await Promise.all([
    getProducts({ brand: model.brandSlug, nameMatches: model.match }, locale),
    getContactChannels(),
  ]);
  const siblings = MODELS.filter((m) => m.category === model.category && m.slug !== model.slug);
  const category = t.categories[model.category];
  const modelName = `${model.brand} ${model.model}`;

  return (
    <>
      <PageHero eyebrow={model.brand} title={copy.title} image={HERO[model.category]} priority />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t.nav.home, path: "/" },
            { name: category.name, path: `/shop/${model.category}` },
            { name: modelName, path: `/models/${model.slug}` },
          ]}
        />
        <p className="max-w-3xl text-base leading-relaxed text-foreground/80">{copy.intro}</p>

        <section className="mt-12">
          <h2 className="mb-6 text-2xl">{t.models.available}</h2>
          {products.length > 0 ? (
            <ProductGrid products={products} channels={channels} locale={locale} />
          ) : (
            <p className="max-w-2xl text-sm text-muted-foreground">{fmt(t.models.empty, { model: modelName })}</p>
          )}
        </section>

        <section className="mt-20 max-w-3xl">
          <h2 className="text-2xl">{t.listing.sourceTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t.product.inquireBody}</p>
          <div className="mt-8">
            <InquiryForm locale={locale} product={{ id: "", name: modelName }} labels={t.form} privacyHref={localePath(locale, "/privacy")} />
          </div>
        </section>

        {siblings.length > 0 && (
          <nav aria-label={category.name} className="mt-20 border-t border-border pt-10">
            <h2 className="mb-4 text-xs tracking-[0.1em] text-muted-foreground uppercase">{category.title}</h2>
            <ul className="flex flex-wrap gap-2">
              {siblings.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={localePath(locale, `/models/${m.slug}`)}
                    className="block border border-border px-3 py-2 text-xs tracking-[0.1em] uppercase transition-colors hover:border-foreground"
                  >
                    {m.brand} {m.model}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}
