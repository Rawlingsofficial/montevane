"use client";

import { useState } from "react";
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

import { Field, inputClass } from "@/components/admin/form-controls";
import { suggestKeywords } from "@/lib/actions/seo";
import { LOCALE_LABEL, LOCALES, type Locale } from "@/lib/i18n/config";
import { productSeo } from "@/lib/seo/product";
import { SEO_DESCRIPTION, SEO_TITLE_MAX, type ProductFormValues } from "@/lib/validation/product";
import { cn } from "@/lib/utils";


/**
 * Per-language search settings for one product: focus keyword (with
 * suggestions from the keyword research), title, description and — for
 * German/Uzbek — translated name and description. Empty fields fall back to
 * the generated text shown in the Google preview.
 */
export function ProductSeoFields({
  register,
  watch,
  setValue,
  brandName,
}: {
  register: UseFormRegister<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
  brandName: string;
}) {
  const [locale, setLocale] = useState<Locale>("en");
  const [suggestions, setSuggestions] = useState<Partial<Record<Locale, string[]>>>({});
  const [loading, setLoading] = useState(false);

  const values = watch();
  const local = values.i18n?.[locale] ?? {};
  const isEn = locale === "en";
  const name = (!isEn && local.name) || values.name || "";
  const titleValue = isEn ? values.meta_title ?? "" : local.metaTitle ?? "";
  const descriptionValue = isEn ? values.meta_description ?? "" : local.metaDescription ?? "";

  const preview = productSeo(
    {
      brand: brandName,
      name,
      title: values.show_brand ? `${brandName} ${name}` : name,
      color: values.color ?? "",
      condition: values.condition,
      metaTitle: titleValue || null,
      metaDescription: descriptionValue || null,
      seo: { focusKeyword: local.focusKeyword },
    },
    locale
  );

  async function loadSuggestions() {
    setLoading(true);
    const list = await suggestKeywords(brandName, values.name ?? "", locale);
    setSuggestions((s) => ({ ...s, [locale]: list }));
    setLoading(false);
  }

  const slug = values.slug || "your-product";
  const url = `${isEn ? "" : `/${locale}`}/products/${slug}`;

  return (
    <div>
      <div role="tablist" className="mb-5 flex gap-2">
        {LOCALES.map((l) => (
          <button
            key={l}
            type="button"
            role="tab"
            aria-selected={l === locale}
            onClick={() => setLocale(l)}
            className={cn(
              "border px-3 py-1.5 text-xs tracking-[0.1em] uppercase",
              l === locale ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
            )}
          >
            {LOCALE_LABEL[l]}
          </button>
        ))}
      </div>

      {/* key={locale} remounts inputs so each tab shows its own values */}
      <div key={locale} className="space-y-5">
        <Field label="Focus keyword — the search phrase this page should rank for">
          <div className="flex gap-2">
            <input {...register(`i18n.${locale}.focusKeyword`)} className={inputClass} placeholder="e.g. hermes birkin 25 gold hardware" />
            <button
              type="button"
              onClick={loadSuggestions}
              disabled={loading || !values.name}
              className="mt-2 shrink-0 border border-border px-4 text-xs tracking-[0.1em] uppercase hover:border-foreground disabled:opacity-50"
            >
              {loading ? "…" : "Suggest"}
            </button>
          </div>
        </Field>

        {suggestions[locale] && (
          <div className="flex flex-wrap gap-2">
            {suggestions[locale]!.length === 0 && <p className="text-xs text-muted-foreground">No matches in the keyword research for this name.</p>}
            {suggestions[locale]!.map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => setValue(`i18n.${locale}.focusKeyword`, kw, { shouldDirty: true })}
                className="border border-border px-2.5 py-1 text-xs hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                {kw}
              </button>
            ))}
          </div>
        )}

        {!isEn && (
          <>
            <Field label={`Name in ${LOCALE_LABEL[locale]} (optional — usually keep the model name)`}>
              <input {...register(`i18n.${locale}.name`)} className={inputClass} placeholder={values.name} />
            </Field>
            <Field label={`Description in ${LOCALE_LABEL[locale]} (shown on the page; English is used if empty)`}>
              <textarea rows={3} {...register(`i18n.${locale}.description`)} className={inputClass} />
            </Field>
          </>
        )}

        <Field label={`Search title (${titleValue.length}/${SEO_TITLE_MAX}) — leave empty to use the preview`}>
          <input
            {...register(isEn ? "meta_title" : `i18n.${locale}.metaTitle`)}
            className={cn(inputClass, titleValue.length > SEO_TITLE_MAX && "border-destructive")}
          />
        </Field>
        <Field label={`Search description (${descriptionValue.length}, aim ${SEO_DESCRIPTION.min}–${SEO_DESCRIPTION.max}) — leave empty to use the preview`}>
          <textarea
            rows={2}
            {...register(isEn ? "meta_description" : `i18n.${locale}.metaDescription`)}
            className={cn(inputClass, descriptionValue.length > 0 && (descriptionValue.length < SEO_DESCRIPTION.min || descriptionValue.length > SEO_DESCRIPTION.max) && "border-destructive")}
          />
        </Field>

        <div className="border border-border p-4">
          <p className="text-xs tracking-[0.1em] text-muted-foreground uppercase">Google preview</p>
          <p className="mt-2 truncate text-xs text-[#006621]">montevane.com{url}</p>
          <p className="truncate text-lg text-[#1a0dab]">{preview.title} | Montévane</p>
          <p className="line-clamp-2 text-sm text-[#545454]">{preview.description}</p>
        </div>
      </div>
    </div>
  );
}
