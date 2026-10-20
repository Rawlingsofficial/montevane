"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, Section, inputClass } from "@/components/admin/form-controls";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { ProductSeoFields } from "@/components/admin/ProductSeoFields";
import { saveProduct } from "@/lib/actions/products";
import { productSchema, type ProductFormValues } from "@/lib/validation/product";

type Brand = { slug: string; name: string };
type Collection = { slug: string; name: string };

// Most listings have three photos (main + two); up to five are supported.
const RELATED_LABELS = ["Photo 2", "Photo 3", "Photo 4", "Photo 5"] as const;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProductForm({
  brands,
  categories,
  collections,
  defaultValues,
}: {
  brands: Brand[];
  categories: Collection[];
  collections: Collection[];
  defaultValues?: Partial<ProductFormValues>;
}) {
  const router = useRouter();
  const [slugTouched, setSlugTouched] = useState(Boolean(defaultValues?.id));
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      brand_slug: brands[0]?.slug ?? "",
      category_slug: categories[0]?.slug ?? "",
      collection_slug: collections[0]?.slug ?? "",
      availability_status: "in_stock",
      condition: "new",
      status: "draft",
      related_images: [],
      i18n: {},
      ...defaultValues,
    },
  });

  const brandName = (slug: string) => brands.find((b) => b.slug === slug)?.name ?? slug;
  const relatedImages = watch("related_images");
  const status = watch("status");
  const mainImageUrl = watch("main_image_url");

  function setRelatedImage(index: number, label: string, url: string) {
    const next = [...relatedImages];
    if (url) {
      next[index] = { url, label, position: index };
    } else {
      next.splice(index, 1);
    }
    setValue("related_images", next.filter(Boolean));
  }

  async function onSubmit(values: ProductFormValues) {
    setSubmitError(null);
    const result = await saveProduct(values);
    if ("error" in result) {
      setSubmitError(result.error);
      return;
    }
    router.push("/admin/products");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-12">
      <input type="hidden" {...register("id")} />

      <Section title="Product Information">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Brand" error={errors.brand_slug?.message}>
            <select {...register("brand_slug")} className={inputClass}>
              {brands.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Category" error={errors.category_slug?.message}>
            <select {...register("category_slug")} className={inputClass}>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Collection" error={errors.collection_slug?.message}>
            <select {...register("collection_slug")} className={inputClass}>
              {collections.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Product Name" error={errors.name?.message}>
            <input
              {...register("name", {
                onChange: (e) => {
                  // Brand + name in the URL: /products/hermes-birkin-25-togo-etoupe
                  if (!slugTouched) setValue("slug", slugify(`${brandName(watch("brand_slug"))} ${e.target.value}`));
                },
              })}
              className={inputClass}
            />
          </Field>

          <Field label="Slug" error={errors.slug?.message}>
            <input
              {...register("slug", { onChange: () => setSlugTouched(true) })}
              className={inputClass}
            />
          </Field>

          <Field label="SKU" error={errors.sku?.message}>
            <input {...register("sku")} placeholder="BRAND-COLOR-SIZE-SERIAL" className={inputClass} />
          </Field>

          <Field label="Price (USD)" error={errors.price?.message}>
            <input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className={inputClass}
            />
          </Field>

          <Field label="Color" error={errors.color?.message}>
            <input {...register("color")} className={inputClass} />
          </Field>

          <Field label="Materials" error={errors.materials?.message}>
            <input {...register("materials")} className={inputClass} />
          </Field>

          <Field label="Dimensions (W × H × D)" error={errors.dimensions?.message}>
            <input {...register("dimensions")} placeholder="14 × 10 × 5 in" className={inputClass} />
          </Field>

          <Field label="Weight" error={errors.weight?.message}>
            <input {...register("weight")} placeholder="2.5 lbs" className={inputClass} />
          </Field>

          <Field label="Availability" error={errors.availability_status?.message}>
            <select {...register("availability_status")} className={inputClass}>
              <option value="in_stock">In Stock</option>
              <option value="pre_order">Pre-Order</option>
              <option value="sold_out">Sold Out</option>
              <option value="coming_soon">Coming Soon</option>
            </select>
          </Field>

          <Field label="Condition" error={errors.condition?.message}>
            <select {...register("condition")} className={inputClass}>
              <option value="new">New / Never Carried</option>
              <option value="like_new">Like New</option>
              <option value="excellent">Excellent</option>
              <option value="very_good">Very Good</option>
            </select>
          </Field>
        </div>

        <Field label="Description" error={errors.description?.message} className="mt-5">
          <textarea rows={4} {...register("description")} className={inputClass} />
        </Field>

        <Field label="Authenticity Notes (optional)" error={errors.authenticity_notes?.message} className="mt-5">
          <textarea rows={2} {...register("authenticity_notes")} className={inputClass} />
        </Field>
      </Section>

      <Section title="Main Product Photo">
        <ImageUploader
          label="Main Photo"
          value={mainImageUrl ?? ""}
          onChange={(url) => setValue("main_image_url", url, { shouldValidate: true })}
          className="max-w-xs"
        />
        {errors.main_image_url && <p className="mt-2 text-xs text-destructive">{errors.main_image_url.message}</p>}

        <Field label="Alt Text (optional)" error={errors.main_image_alt?.message} className="mt-5 max-w-xs">
          <input {...register("main_image_alt")} className={inputClass} />
        </Field>
      </Section>

      <Section title="More Photos (usually 2)">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {RELATED_LABELS.map((label, i) => (
            <ImageUploader
              key={label}
              label={label}
              value={relatedImages.find((img) => img.position === i)?.url ?? ""}
              onChange={(url) => setRelatedImage(i, label, url)}
            />
          ))}
        </div>
      </Section>

      <Section title="Search (SEO) & Languages">
        <ProductSeoFields register={register} watch={watch} setValue={setValue} brandName={brandName(watch("brand_slug"))} />
      </Section>

      <Section title="Publishing">
        <Field label="Tags (comma separated)" error={errors.tags?.message}>
          <input {...register("tags")} className={inputClass} />
        </Field>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Status" error={errors.status?.message}>
            <select {...register("status")} className={inputClass}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </Field>
          {status === "scheduled" && (
            <Field label="Scheduled Date" error={errors.scheduled_at?.message}>
              <input type="datetime-local" {...register("scheduled_at")} className={inputClass} />
            </Field>
          )}
        </div>
      </Section>

      {submitError && <p className="text-sm text-destructive">{submitError}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary px-10 py-4 text-xs font-medium tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--gold)] hover:text-primary disabled:opacity-50"
        >
          {isSubmitting ? "Saving…" : "Save Product"}
        </button>
      </div>
    </form>
  );
}

