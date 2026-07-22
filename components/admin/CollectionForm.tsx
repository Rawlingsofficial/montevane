"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, Section, inputClass } from "@/components/admin/form-controls";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { saveCollection } from "@/lib/actions/collections";
import { collectionSchema, type CollectionFormValues } from "@/lib/validation/collection";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function CollectionForm({ defaultValues }: { defaultValues?: Partial<CollectionFormValues> }) {
  const router = useRouter();
  const [slugTouched, setSlugTouched] = useState(Boolean(defaultValues?.id));
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionSchema),
    defaultValues: { featured: false, ...defaultValues },
  });

  const coverImageUrl = watch("cover_image_url");

  async function onSubmit(values: CollectionFormValues) {
    setSubmitError(null);
    const result = await saveCollection(values);
    if ("error" in result) {
      setSubmitError(result.error);
      return;
    }
    router.push("/admin/collections");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-12">
      <input type="hidden" {...register("id")} />

      <Section title="Collection Details">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" error={errors.name?.message}>
            <input
              {...register("name", {
                onChange: (e) => {
                  if (!slugTouched) setValue("slug", slugify(e.target.value));
                },
              })}
              className={inputClass}
            />
          </Field>

          <Field label="Slug" error={errors.slug?.message}>
            <input {...register("slug", { onChange: () => setSlugTouched(true) })} className={inputClass} />
          </Field>
        </div>

        <Field label="Description (optional)" error={errors.description?.message} className="mt-5">
          <textarea rows={3} {...register("description")} className={inputClass} />
        </Field>

        <label className="mt-5 flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("featured")} className="size-4" />
          Feature on homepage
        </label>
      </Section>

      <Section title="Cover Image">
        <ImageUploader
          label="Cover Photo"
          value={coverImageUrl ?? ""}
          onChange={(url) => setValue("cover_image_url", url)}
          bucket="editorial"
          className="max-w-xs"
        />
      </Section>

      {submitError && <p className="text-sm text-destructive">{submitError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary px-10 py-4 text-xs font-medium tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--gold)] hover:text-primary disabled:opacity-50"
      >
        {isSubmitting ? "Saving…" : "Save Collection"}
      </button>
    </form>
  );
}
