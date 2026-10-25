"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Check, Plus, Trash2, X } from "lucide-react";

import { Field, Section, inputClass } from "@/components/admin/form-controls";
import { PhotoGallery } from "@/components/admin/PhotoGallery";
import { ProductSeoFields } from "@/components/admin/ProductSeoFields";
import { getFxRates, type FxRates } from "@/lib/actions/fx";
import { saveProduct } from "@/lib/actions/products";
import { facetsFor } from "@/lib/catalog/facets";
import { roundPrice } from "@/lib/catalog/pricing";
import { cn } from "@/lib/utils";
import {
  DESCRIPTION_WORDS,
  SHORT_DESCRIPTION_MAX,
  productSchema,
  publishChecklist,
  wordCount,
  type ProductFormValues,
} from "@/lib/validation/product";

type Option = { slug: string; name: string };

const TABS = [
  { id: "details", label: "Details" },
  { id: "photos", label: "Photos" },
  { id: "variants", label: "Variants & stock" },
  { id: "pricing", label: "Pricing" },
  { id: "specs", label: "Specs" },
  { id: "collections", label: "Collections" },
  { id: "seo", label: "SEO" },
  { id: "publish", label: "Publish" },
] as const;
type TabId = (typeof TABS)[number]["id"];

// Which tab each form field lives on, so validation errors can point there.
const FIELD_TAB: Record<keyof ProductFormValues, TabId> = {
  id: "details",
  brand_slug: "details",
  category_slug: "details",
  name: "details",
  slug: "details",
  short_description: "details",
  description: "details",
  modifications: "details",
  condition: "details",
  show_brand: "details",
  featured: "details",
  authenticity_notes: "details",
  main_image_url: "photos",
  main_image_alt: "photos",
  related_images: "photos",
  variants: "variants",
  availability_status: "variants",
  price: "pricing",
  price_gbp: "pricing",
  price_eur: "pricing",
  promo_price: "pricing",
  promo_starts_at: "pricing",
  promo_ends_at: "pricing",
  color: "specs",
  materials: "specs",
  dimensions: "specs",
  weight: "specs",
  facets: "specs",
  specs: "specs",
  collection_slugs: "collections",
  tags: "collections",
  meta_title: "seo",
  meta_description: "seo",
  i18n: "seo",
  status: "publish",
  scheduled_at: "publish",
};

// Empty number inputs become undefined instead of NaN.
const optionalNumber = { setValueAs: (v: unknown) => (v === "" || v == null ? undefined : Number(v)) };

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Nested errors (variants.2.sku, i18n.de.description) keep their message deeper down.
function firstMessage(err: unknown): string | undefined {
  if (!err || typeof err !== "object") return undefined;
  if ("message" in err && typeof err.message === "string" && err.message) return err.message;
  for (const value of Object.values(err)) {
    if (value && typeof value === "object" && !("nodeType" in value)) {
      const found = firstMessage(value);
      if (found) return found;
    }
  }
  return undefined;
}

function emptyProduct(brands: Option[], categories: Option[]): ProductFormValues {
  return {
    brand_slug: brands[0]?.slug ?? "",
    category_slug: categories[0]?.slug ?? "",
    name: "",
    slug: "",
    short_description: "",
    description: "",
    modifications: "",
    condition: "new",
    show_brand: true,
    featured: false,
    authenticity_notes: "",
    variants: [{ name: "Standard", sku: "", stock: 1, active: true }],
    availability_status: "in_stock",
    price: undefined as unknown as number,
    promo_starts_at: "",
    promo_ends_at: "",
    main_image_url: "",
    main_image_alt: "",
    related_images: [],
    color: "",
    materials: "",
    dimensions: "",
    weight: "",
    facets: {},
    specs: [],
    collection_slugs: [],
    tags: "",
    meta_title: "",
    meta_description: "",
    i18n: {},
    status: "draft",
    scheduled_at: "",
  };
}

// Unsaved form contents are mirrored to this browser so a reload loses nothing.
const DRAFT_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
const draftKey = (id?: string) => `admin:product-draft:${id ?? "new"}`;
type LocalDraft = { values: ProductFormValues; at: number };

function readDraft(id?: string): LocalDraft | null {
  try {
    const draft = JSON.parse(localStorage.getItem(draftKey(id)) ?? "null") as LocalDraft | null;
    return draft && Date.now() - draft.at < DRAFT_MAX_AGE ? draft : null;
  } catch {
    return null;
  }
}

function writeDraft(id: string | undefined, values: ProductFormValues | null) {
  try {
    if (values) localStorage.setItem(draftKey(id), JSON.stringify({ values, at: Date.now() }));
    else localStorage.removeItem(draftKey(id));
  } catch {
    // Storage full or blocked: autosave is a convenience, saving still works.
  }
}

const counterClass =(bad: boolean) => cn("normal-case tracking-normal", bad ? "text-destructive" : "text-muted-foreground/70");

export function ProductForm({
  brands,
  categories,
  collections,
  defaultValues,
}: {
  brands: Option[];
  categories: Option[];
  collections: Option[];
  defaultValues?: Partial<ProductFormValues>;
}) {
  const router = useRouter();
  const isEdit = Boolean(defaultValues?.id);
  const [tab, setTab] = useState<TabId>("details");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  // Converted prices follow the USD price until edited by hand.
  const [fxTouched, setFxTouched] = useState({ GBP: Boolean(defaultValues?.price_gbp), EUR: Boolean(defaultValues?.price_eur) });
  const [rates, setRates] = useState<FxRates | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [notice, setNotice] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [restoredAt, setRestoredAt] = useState<number | null>(null);
  const [continuing, setContinuing] = useState(false);
  const addAnother = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const initialValues = { ...emptyProduct(brands, categories), ...defaultValues };
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues,
  });
  // What the server last saved; matching local copies are dropped, not kept.
  const lastSaved = useRef(JSON.stringify(initialValues));
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = form;
  const variants = useFieldArray({ control, name: "variants" });
  const specs = useFieldArray({ control, name: "specs" });

  const values = watch();
  const brandName = brands.find((b) => b.slug === values.brand_slug)?.name ?? values.brand_slug;
  const checklist = publishChecklist(values);
  const words = wordCount(values.description);
  const totalStock = values.variants.filter((v) => v.active).reduce((sum, v) => sum + (Number(v.stock) || 0), 0);
  const images = [values.main_image_url, ...[...values.related_images].sort((a, b) => a.position - b.position).map((i) => i.url)].filter(Boolean);
  const errorTabs = new Set(Object.keys(errors).map((k) => FIELD_TAB[k as keyof ProductFormValues]));

  useEffect(() => {
    void getFxRates().then(setRates);
  }, []);

  // Bring back what was typed before a reload, then keep mirroring changes.
  useEffect(() => {
    const draft = readDraft(defaultValues?.id);
    if (draft && JSON.stringify(draft.values) !== lastSaved.current) {
      reset(draft.values, { keepDefaultValues: true });
      setSlugTouched(true);
      setRestoredAt(draft.at);
    } else if (draft) {
      writeDraft(defaultValues?.id, null);
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const sub = watch(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const current = getValues();
        writeDraft(current.id, JSON.stringify(current) === lastSaved.current ? null : current);
      }, 400);
    });
    return () => {
      clearTimeout(timer);
      sub.unsubscribe();
    };
    // Runs once per mounted product.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function markSaved(values: ProductFormValues, previousId?: string) {
    lastSaved.current = JSON.stringify(values);
    writeDraft(previousId, null);
    writeDraft(values.id, null);
    setRestoredAt(null);
  }

  function discardRestored() {
    writeDraft(getValues("id"), null);
    reset(initialValues);
    setSlugTouched(isEdit);
    setRestoredAt(null);
  }

  // Cmd/Ctrl+S saves from any tab; leaving with unsaved changes asks first.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    }
    function onUnload(e: BeforeUnloadEvent) {
      if (isDirty) e.preventDefault();
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("beforeunload", onUnload);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [isDirty]);

  function updateSlug(name: string, brandSlug: string, showBrand: boolean) {
    if (slugTouched) return;
    const brand = brands.find((b) => b.slug === brandSlug)?.name ?? "";
    // Brand + name in the URL: /products/hermes-birkin-25-togo-etoupe
    setValue("slug", slugify(showBrand ? `${brand} ${name}` : name));
  }

  function fillConverted(usd: number | undefined, force = false) {
    if (!rates || !usd) return;
    for (const currency of ["GBP", "EUR"] as const) {
      if (force || !fxTouched[currency]) {
        setValue(currency === "GBP" ? "price_gbp" : "price_eur", roundPrice(usd * rates[currency]), { shouldDirty: true });
      }
    }
    if (force) setFxTouched({ GBP: false, EUR: false });
  }

  function setImages(list: string[]) {
    setValue("main_image_url", list[0] ?? "", { shouldDirty: true, shouldValidate: true });
    setValue(
      "related_images",
      list.slice(1).map((url, i) => ({ url, label: `Photo ${i + 2}`, position: i })),
      { shouldDirty: true }
    );
  }

  function toggleCollection(slug: string) {
    const current = getValues("collection_slugs");
    setValue("collection_slugs", current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug], {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  async function onSubmit(data: ProductFormValues) {
    setNotice(null);
    if (data.status !== "draft") {
      const missing = publishChecklist(data).find((c) => !c.ok);
      if (missing) {
        setTab(missing.tab as TabId);
        setNotice({ kind: "error", text: `Can't publish yet — ${missing.label}. Fix it or save as Draft.` });
        return;
      }
      if (!confirmed) {
        setTab("publish");
        setNotice({ kind: "error", text: "Tick “Price and stock double-checked” before publishing." });
        return;
      }
    }

    const result = await saveProduct(data);
    if ("error" in result) {
      setNotice({ kind: "error", text: result.error });
      return;
    }
    markSaved({ ...data, id: result.id }, data.id);

    if (addAnother.current) {
      addAnother.current = false;
      // data.id is also set once "Save & continue" has stored a new product.
      if (data.id) {
        router.push("/admin/products/new");
        return;
      }
      const blank = emptyProduct(brands, categories);
      lastSaved.current = JSON.stringify(blank);
      reset(blank);
      setSlugTouched(false);
      setFxTouched({ GBP: false, EUR: false });
      setConfirmed(false);
      setTab("details");
      setNotice({ kind: "ok", text: `Saved “${data.name}”. Ready for the next one.` });
      window.scrollTo({ top: 0 });
      return;
    }

    reset({ ...data, id: result.id });
    setNotice({ kind: "ok", text: `Saved${data.status === "published" ? " and live" : ""}.` });
    if (!data.id) router.replace(`/admin/products/${result.id}/edit`);
  }

  // Per-tab save: to the shop when the product is complete enough to store,
  // otherwise it stays on this device (autosave) until it is.
  async function saveAndContinue() {
    const next = TABS[TABS.findIndex((t) => t.id === tab) + 1]?.id ?? tab;
    const data = getValues();
    const parsed = productSchema.safeParse(data);
    setNotice(null);

    if (!parsed.success) {
      const missing = [...new Set(parsed.error.issues.map((i) => i.message))].join(" · ");
      setTab(next);
      setNotice({ kind: "ok", text: `Kept on this device — safe to reload. It saves to the shop once these are filled: ${missing}` });
      return;
    }
    if (data.status !== "draft" && (!confirmed || publishChecklist(parsed.data).some((c) => !c.ok))) {
      setTab(next);
      setNotice({ kind: "ok", text: "Kept on this device — safe to reload. Use Save on the Publish tab to update the live listing." });
      return;
    }

    setContinuing(true);
    const result = await saveProduct(parsed.data);
    setContinuing(false);
    if ("error" in result) {
      setNotice({ kind: "error", text: result.error });
      return;
    }
    const saved = { ...data, id: result.id };
    markSaved(saved, data.id);
    reset(saved);
    // Stay mounted on this tab; just give the page its permanent edit URL.
    if (!data.id) window.history.replaceState(null, "", `/admin/products/${result.id}/edit`);
    setTab(next);
    setNotice({ kind: "ok", text: `Saved${data.status === "draft" ? " as draft" : ""}.` });
  }

  function onInvalid(errs: FieldErrors<ProductFormValues>) {
    const first = TABS.find((t) => Object.keys(errs).some((k) => FIELD_TAB[k as keyof ProductFormValues] === t.id));
    if (first) setTab(first.id);
    // Name every problem, including ones on fields without an error slot.
    const problems = (Object.keys(errs) as (keyof ProductFormValues)[]).map((k) => {
      const tabLabel = TABS.find((t) => t.id === FIELD_TAB[k])?.label ?? "";
      return `${tabLabel} → ${k.replace(/_/g, " ")}: ${firstMessage(errs[k]) ?? "invalid"}`;
    });
    setNotice({ kind: "error", text: `Fix before saving: ${problems.join(" · ")}` });
  }

  const tabPanel = (id: TabId) => ({ hidden: tab !== id, role: "tabpanel" as const, className: "space-y-10" });

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit, onInvalid)} className="max-w-4xl">

      {/* Sticky bar: tabs + save, so saving never needs a scroll. */}
      <div className="sticky top-0 z-20 -mx-4 -mt-8 mb-8 border-b border-border bg-background/95 px-4 pt-4 sm:-mx-10 sm:px-10 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
          <p className="truncate text-sm text-muted-foreground">
            {values.name ? `${values.show_brand ? `${brandName} ` : ""}${values.name}` : "Untitled product"}
            <span className="ml-2 border border-border px-1.5 py-0.5 text-[10px] tracking-[0.1em] uppercase">{values.status}</span>
            {isDirty && <span className="ml-2 text-xs text-[var(--gold)]">● unsaved</span>}
          </p>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => (addAnother.current = true)}
              className="border border-border px-4 py-2.5 text-xs tracking-[0.15em] uppercase hover:border-foreground disabled:opacity-50"
            >
              Save & add another
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => (addAnother.current = false)}
              className="bg-primary px-6 py-2.5 text-xs font-medium tracking-[0.15em] text-primary-foreground uppercase transition-colors hover:bg-[var(--gold)] hover:text-primary disabled:opacity-50"
            >
              {isSubmitting ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
        <div role="tablist" className="-mb-px flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative shrink-0 border-b-2 px-3 py-2.5 text-xs tracking-[0.1em] whitespace-nowrap uppercase",
                tab === t.id ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
              {errorTabs.has(t.id) && <span className="absolute top-1.5 right-0.5 size-1.5 rounded-full bg-destructive" />}
            </button>
          ))}
        </div>
      </div>

      {restoredAt && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border border-[var(--gold)] px-4 py-3 text-sm">
          <span>
            Restored your unsaved changes from{" "}
            {new Date(restoredAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}.
          </span>
          <button type="button" onClick={discardRestored} className="text-xs tracking-[0.1em] uppercase underline">
            Discard them
          </button>
        </div>
      )}

      {notice && (
        <div
          className={cn(
            "mb-8 flex items-start justify-between gap-3 border px-4 py-3 text-sm",
            notice.kind === "ok" ? "border-[var(--gold)] text-foreground" : "border-destructive text-destructive"
          )}
        >
          <span>{notice.text}</span>
          <button type="button" aria-label="Dismiss" onClick={() => setNotice(null)}>
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* ── Details ─────────────────────────────────────────── */}
      <div {...tabPanel("details")}>
        <Section title="Details">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Category" error={errors.category_slug?.message}>
              <select {...register("category_slug")} className={inputClass}>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Brand" error={errors.brand_slug?.message}>
              <select
                {...register("brand_slug", { onChange: (e) => updateSlug(values.name, e.target.value, values.show_brand) })}
                className={inputClass}
              >
                {brands.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Name *" error={errors.name?.message} className="sm:col-span-2">
              <input
                {...register("name", { onChange: (e) => updateSlug(e.target.value, values.brand_slug, values.show_brand) })}
                placeholder="Birkin 25 Togo Etoupe"
                className={inputClass}
                autoFocus={!isEdit}
              />
            </Field>
            <Field label="Slug * (auto from brand + name)" error={errors.slug?.message} className="sm:col-span-2">
              <div className="flex gap-2">
                <input {...register("slug", { onChange: () => setSlugTouched(true) })} className={inputClass} />
                {slugTouched && (
                  <button
                    type="button"
                    onClick={() => {
                      setSlugTouched(false);
                      const brand = brands.find((b) => b.slug === values.brand_slug)?.name ?? "";
                      setValue("slug", slugify(values.show_brand ? `${brand} ${values.name}` : values.name), { shouldDirty: true });
                    }}
                    className="mt-2 shrink-0 border border-border px-3 text-xs tracking-[0.1em] uppercase hover:border-foreground"
                  >
                    Auto
                  </button>
                )}
              </div>
            </Field>
            <Field label="Condition" error={errors.condition?.message}>
              <select {...register("condition")} className={inputClass}>
                <option value="new">New</option>
                <option value="pre_owned">Pre-owned</option>
              </select>
            </Field>
            <div className="flex flex-col justify-end gap-3 pb-1">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  {...register("show_brand", { onChange: (e) => updateSlug(values.name, values.brand_slug, e.target.checked) })}
                  className="size-4 accent-[var(--gold)]"
                />
                Brand label — only for genuine branded pieces
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register("featured")} className="size-4 accent-[var(--gold)]" />
                Featured
              </label>
            </div>
          </div>

          <Field
            label={
                <>
                  Short description *{" "}
                  <span className={counterClass(values.short_description.length > SHORT_DESCRIPTION_MAX)}>
                    ({values.short_description.length}/{SHORT_DESCRIPTION_MAX})
                  </span>
                </>
            }
            error={errors.short_description?.message}
            className="mt-5"
          >
            <textarea rows={2} {...register("short_description")} placeholder="One or two lines shown next to the price." className={inputClass} />
          </Field>

          <Field
            label={
                <>
                  Description — verified facts only{" "}
                  <span className={counterClass(words > 0 && (words < DESCRIPTION_WORDS.min || words > DESCRIPTION_WORDS.max))}>
                    ({words} words, aim {DESCRIPTION_WORDS.min}–{DESCRIPTION_WORDS.max})
                  </span>
                </>
            }
            error={errors.description?.message}
            className="mt-5"
          >
            <textarea rows={8} {...register("description")} className={inputClass} />
          </Field>

          <Field label="Modifications & components (optional)" error={errors.modifications?.message} className="mt-5">
            <textarea
              rows={3}
              {...register("modifications")}
              placeholder="e.g. Aftermarket diamond bezel; replaced strap; comes with box, papers, dust bag."
              className={inputClass}
            />
          </Field>

          <Field label="Authenticity notes (optional)" error={errors.authenticity_notes?.message} className="mt-5">
            <textarea rows={2} {...register("authenticity_notes")} className={inputClass} />
          </Field>
        </Section>
      </div>

      {/* ── Photos ─────────────────────────────────────────── */}
      <div {...tabPanel("photos")}>
        <Section title={`Photos (${images.length})`}>
          <PhotoGallery images={images} onChange={setImages} />
          {errors.main_image_url && <p className="mt-2 text-xs text-destructive">{errors.main_image_url.message}</p>}
          <Field label="Main photo alt text (optional — describes the photo for Google)" className="mt-6 max-w-lg">
            <input {...register("main_image_alt")} placeholder={`${brandName} ${values.name}`} className={inputClass} />
          </Field>
        </Section>
      </div>

      {/* ── Variants & stock ─────────────────────────────────────────── */}
      <div {...tabPanel("variants")}>
        <Section title={`Variants & stock — ${totalStock} in stock`}>
          {errors.variants?.root?.message && <p className="mb-3 text-xs text-destructive">{errors.variants.root.message}</p>}
          <div className="space-y-3">
            <div className="hidden grid-cols-[1.4fr_1.4fr_0.6fr_auto_auto] gap-3 text-xs tracking-[0.1em] text-muted-foreground uppercase sm:grid">
              <span>Variant name</span>
              <span>SKU</span>
              <span>Stock</span>
              <span>Active</span>
              <span className="w-8" />
            </div>
            {variants.fields.map((f, i) => {
              const err = errors.variants?.[i];
              return (
                <div key={f.id} className="grid grid-cols-2 items-start gap-3 border-b border-border pb-3 sm:grid-cols-[1.4fr_1.4fr_0.6fr_auto_auto] sm:border-0 sm:pb-0">
                  <div>
                    <input {...register(`variants.${i}.name`)} placeholder="Standard" className={cn(inputClass, "mt-0")} />
                    {err?.name && <p className="mt-1 text-xs text-destructive">{err.name.message}</p>}
                  </div>
                  <div>
                    <input {...register(`variants.${i}.sku`)} placeholder="BRAND-MODEL-COLOR-01" className={cn(inputClass, "mt-0")} />
                    {err?.sku && <p className="mt-1 text-xs text-destructive">{err.sku.message}</p>}
                  </div>
                  <div>
                    <input
                      type="number"
                      min={0}
                      step={1}
                      {...register(`variants.${i}.stock`, { setValueAs: (v) => (v === "" ? 0 : Number(v)) })}
                      className={cn(inputClass, "mt-0")}
                    />
                    {err?.stock && <p className="mt-1 text-xs text-destructive">{err.stock.message}</p>}
                  </div>
                  <label className="flex h-10 items-center gap-2 text-sm">
                    <input type="checkbox" {...register(`variants.${i}.active`)} className="size-4 accent-[var(--gold)]" />
                    <span className="sm:hidden">Active</span>
                  </label>
                  <button
                    type="button"
                    aria-label="Remove variant"
                    disabled={variants.fields.length === 1}
                    onClick={() => variants.remove(i)}
                    className="flex h-10 w-8 items-center justify-center text-muted-foreground hover:text-destructive disabled:opacity-30"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => variants.append({ name: "", sku: "", stock: 1, active: true })}
            className="mt-4 flex items-center gap-2 border border-border px-4 py-2 text-xs tracking-[0.1em] uppercase hover:border-foreground"
          >
            <Plus className="size-3.5" /> Add variant
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            One version? Keep a single “Standard” row. The first SKU is the product SKU. Stock 0 marks it Sold out automatically.
          </p>

          <Field label="Availability" error={errors.availability_status?.message} className="mt-6 max-w-xs">
            <select {...register("availability_status")} className={inputClass}>
              <option value="in_stock">In stock</option>
              <option value="pre_order">Pre-order</option>
              <option value="sold_out">Sold out</option>
              <option value="coming_soon">Coming soon</option>
            </select>
          </Field>
        </Section>
      </div>

      {/* ── Pricing ─────────────────────────────────────────── */}
      <div {...tabPanel("pricing")}>
        <Section title="Pricing">
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="USD price * (base)" error={errors.price?.message}>
              <input
                type="number"
                step="1"
                min={0}
                {...register("price", { ...optionalNumber, onChange: (e) => fillConverted(Number(e.target.value)) })}
                placeholder="12500"
                className={inputClass}
              />
            </Field>
            <Field label={`GBP price${fxTouched.GBP ? " (edited)" : " (auto)"}`} error={errors.price_gbp?.message}>
              <input
                type="number"
                step="1"
                min={0}
                {...register("price_gbp", { ...optionalNumber, onChange: () => setFxTouched((t) => ({ ...t, GBP: true })) })}
                className={inputClass}
              />
            </Field>
            <Field label={`EUR price${fxTouched.EUR ? " (edited)" : " (auto)"}`} error={errors.price_eur?.message}>
              <input
                type="number"
                step="1"
                min={0}
                {...register("price_eur", { ...optionalNumber, onChange: () => setFxTouched((t) => ({ ...t, EUR: true })) })}
                className={inputClass}
              />
            </Field>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span>
              {rates
                ? `1 USD = £${rates.GBP.toFixed(3)} · €${rates.EUR.toFixed(3)}${rates.date ? ` (ECB, ${rates.date})` : " (offline estimate)"} — rounded up to the nearest 10.`
                : "Loading exchange rates…"}
            </span>
            <button
              type="button"
              disabled={!rates || !values.price}
              onClick={() => fillConverted(values.price, true)}
              className="border border-border px-3 py-1 tracking-[0.1em] uppercase hover:border-foreground disabled:opacity-40"
            >
              Recalculate from USD
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            The German store shows the EUR price; English and Uzbek show USD. Leave EUR empty to show USD there too.
          </p>
        </Section>

        <Section title="Promo (optional)">
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Promo price (USD)" error={errors.promo_price?.message}>
              <input type="number" step="1" min={0} {...register("promo_price", optionalNumber)} className={inputClass} />
            </Field>
            <Field label="Starts" error={errors.promo_starts_at?.message}>
              <input type="datetime-local" {...register("promo_starts_at")} className={inputClass} />
            </Field>
            <Field label="Ends" error={errors.promo_ends_at?.message}>
              <input type="datetime-local" {...register("promo_ends_at")} className={inputClass} />
            </Field>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Shown as a sale price with the original struck through. Empty dates = starts now / no end. EUR follows the same % discount.
          </p>
        </Section>
      </div>

      {/* ── Specs & facets ─────────────────────────────────────────── */}
      <div {...tabPanel("specs")}>
        <Section title="Basics (optional)">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={values.category_slug === "watches" ? "Colour (case / strap)" : "Colour"}>
              <input {...register("color")} className={inputClass} />
            </Field>
            <Field label="Materials">
              <input {...register("materials")} className={inputClass} />
            </Field>
            <Field label="Dimensions">
              <input
                {...register("dimensions")}
                placeholder={values.category_slug === "bags" ? "25 × 20 × 13 cm" : values.category_slug === "watches" ? "41 mm case, 12 mm thick" : "17 cm length"}
                className={inputClass}
              />
            </Field>
            <Field label="Weight">
              <input {...register("weight")} className={inputClass} />
            </Field>
          </div>
        </Section>

        {facetsFor(values.category_slug).length > 0 && (
          <Section title={`${categories.find((c) => c.slug === values.category_slug)?.name ?? ""} facets`}>
            <div className="grid gap-5 sm:grid-cols-2">
              {facetsFor(values.category_slug).map((facet) => (
                <Field key={`${values.category_slug}-${facet.id}`} label={facet.label}>
                  <input {...register(`facets.${facet.id}`)} list={`facet-${facet.id}`} className={inputClass} />
                  <datalist id={`facet-${facet.id}`}>
                    {facet.options.map((o) => (
                      <option key={o} value={o} />
                    ))}
                  </datalist>
                </Field>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Pick a suggestion or type your own. Leave empty if it doesn&apos;t apply.</p>
          </Section>
        )}

        <Section title="Spec rows — verified only">
          <div className="space-y-3">
            {specs.fields.map((f, i) => {
              const row = values.specs[i];
              const water = /water|waterproof|\bwr\b|\batm\b|bar\b/i.test(`${row?.label ?? ""} ${row?.value ?? ""}`);
              return (
                <div key={f.id}>
                  <div className="grid grid-cols-[1fr_1.5fr_auto] gap-3">
                    <input {...register(`specs.${i}.label`)} placeholder="Label (e.g. Reference)" className={cn(inputClass, "mt-0")} />
                    <input {...register(`specs.${i}.value`)} placeholder="Value (e.g. 126610LN)" className={cn(inputClass, "mt-0")} />
                    <button
                      type="button"
                      aria-label="Remove row"
                      onClick={() => specs.remove(i)}
                      className="flex w-8 items-center justify-center text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  {water && (
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--gold)]">
                      <AlertTriangle className="size-3.5" /> Only list water resistance if this piece was pressure-tested.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => specs.append({ label: "", value: "" })}
            className="mt-4 flex items-center gap-2 border border-border px-4 py-2 text-xs tracking-[0.1em] uppercase hover:border-foreground"
          >
            <Plus className="size-3.5" /> Add spec row
          </button>
        </Section>
      </div>

      {/* ── Collections ─────────────────────────────────────────── */}
      <div {...tabPanel("collections")}>
        <Section title="Collections">
          {errors.collection_slugs?.message && <p className="mb-3 text-xs text-destructive">{errors.collection_slugs.message}</p>}
          <div className="flex flex-wrap gap-2">
            {collections.map((c) => {
              const position = values.collection_slugs.indexOf(c.slug);
              return (
                <button
                  key={c.slug}
                  type="button"
                  aria-pressed={position >= 0}
                  onClick={() => toggleCollection(c.slug)}
                  className={cn(
                    "flex items-center gap-1.5 border px-3 py-2 text-sm",
                    position >= 0 ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
                  )}
                >
                  {position >= 0 && <Check className="size-3.5" />}
                  {c.name}
                  {position === 0 && values.collection_slugs.length > 1 && <span className="text-[10px] opacity-70">(main)</span>}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Add it to every collection that fits. The first one picked is used in breadcrumbs.</p>
          <Field label="Tags (comma separated)" error={errors.tags?.message} className="mt-6">
            <input {...register("tags")} placeholder="gift, limited, everyday" className={inputClass} />
          </Field>
        </Section>
      </div>

      {/* ── SEO ─────────────────────────────────────────── */}
      <div {...tabPanel("seo")}>
        <Section title="Search (SEO) & languages">
          <ProductSeoFields register={register} watch={watch} setValue={setValue} brandName={brandName} />
        </Section>
      </div>

      {/* ── Publish ─────────────────────────────────────────── */}
      <div {...tabPanel("publish")}>
        <Section title="Before you hit Publish">
          <ul className="space-y-2">
            {checklist.map((c) => (
              <li key={c.label}>
                <button type="button" onClick={() => setTab(c.tab as TabId)} className="flex items-center gap-2 text-left text-sm hover:underline">
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full",
                      c.ok ? "bg-[var(--gold)] text-black" : "border border-destructive text-destructive"
                    )}
                  >
                    {c.ok ? <Check className="size-3" /> : <X className="size-3" />}
                  </span>
                  {c.label}
                </button>
              </li>
            ))}
            <li>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="size-5 accent-[var(--gold)]" />
                Price and stock double-checked ({values.price ? `$${values.price.toLocaleString("en-US")}` : "no price"} · {totalStock} in stock)
              </label>
            </li>
          </ul>
        </Section>

        <Section title="Status">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Status" error={errors.status?.message}>
              <select {...register("status")} className={inputClass}>
                <option value="draft">Draft (hidden)</option>
                <option value="published">Published (live)</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </Field>
            {values.status === "scheduled" && (
              <Field label="Scheduled date" error={errors.scheduled_at?.message}>
                <input type="datetime-local" {...register("scheduled_at")} className={inputClass} />
              </Field>
            )}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Drafts save with anything filled in. Publishing needs every item above ticked. Tip: ⌘S / Ctrl+S saves.</p>
        </Section>
      </div>

      {tab !== "publish" && (
        <div className="mt-10 flex justify-end border-t border-border pt-6">
          <button
            type="button"
            disabled={continuing || isSubmitting}
            onClick={saveAndContinue}
            className="bg-primary px-6 py-2.5 text-xs font-medium tracking-[0.15em] text-primary-foreground uppercase transition-colors hover:bg-[var(--gold)] hover:text-primary disabled:opacity-50"
          >
            {continuing ? "Saving…" : "Save & continue →"}
          </button>
        </div>
      )}
    </form>
  );
}
