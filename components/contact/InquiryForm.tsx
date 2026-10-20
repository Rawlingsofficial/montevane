"use client";

import Link from "next/link";
import { useState } from "react";

import { submitInquiry } from "@/lib/actions/inquiries";
import { CONTACT_METHODS, PAYMENT_METHODS, type ContactMethod } from "@/lib/contact";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { cn } from "@/lib/utils";

const fieldClass =
  "mt-2 w-full border border-border bg-transparent px-3 py-3 text-sm focus:border-[var(--gold)] focus:outline-none";
const labelClass = "text-xs tracking-[0.1em] text-muted-foreground uppercase";

export function InquiryForm({
  product,
  labels: t,
  privacyHref,
}: {
  product?: { id: string; name: string };
  labels: Dictionary["form"];
  privacyHref: string;
}) {
  const [methods, setMethods] = useState<ContactMethod[]>(["whatsapp"]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function toggle(method: ContactMethod) {
    setMethods((m) => (m.includes(method) ? m.filter((x) => x !== method) : [...m, method]));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "");

    setPending(true);
    setError(null);
    const result = await submitInquiry({
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      country: get("country"),
      message: get("message"),
      payment_method: get("payment_method"),
      contact_methods: methods,
      product_id: product?.id ?? "",
      product_name: product?.name ?? "",
    });
    setPending(false);
    if (result.error) setError(result.error);
    else setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-border p-8">
        <p className="text-sm">{t.thanks}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>{t.name}</span>
          <input name="name" required autoComplete="name" className={fieldClass} suppressHydrationWarning />
        </label>
        <label className="block">
          <span className={labelClass}>{t.country}</span>
          <input name="country" autoComplete="country-name" className={fieldClass} suppressHydrationWarning />
        </label>
        <label className="block">
          <span className={labelClass}>{t.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" className={fieldClass} suppressHydrationWarning />
        </label>
        <label className="block">
          <span className={labelClass}>{t.email}</span>
          <input name="email" type="email" autoComplete="email" className={fieldClass} suppressHydrationWarning />
        </label>
      </div>

      <fieldset>
        <legend className={labelClass}>{t.methods}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {CONTACT_METHODS.map((m) => (
            <button
              key={m.value}
              type="button"
              aria-pressed={methods.includes(m.value)}
              onClick={() => toggle(m.value)}
              className={cn(
                "border px-3 py-2 text-xs tracking-[0.1em] uppercase transition-colors",
                methods.includes(m.value)
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground/70 hover:border-foreground"
              )}
            >
              {t.methodLabels[m.value] ?? m.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className={labelClass}>{t.payment}</span>
        <select name="payment_method" defaultValue="" className={fieldClass}>
          <option value="">{t.paymentLater}</option>
          {PAYMENT_METHODS.map((m) => (
            <option key={m.value} value={m.value}>
              {t.paymentLabels[m.value] ?? m.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelClass}>{t.message}</span>
        <textarea
          name="message"
          rows={4}
          defaultValue={product ? t.messageDefault.replace("{item}", product.name) : ""}
          className={fieldClass}
        />
      </label>

      <p className="text-xs text-muted-foreground">
        {t.consent}{" "}
        <Link href={privacyHref} className="underline underline-offset-2">
          {t.privacyLink}
        </Link>
        .
      </p>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="bg-primary px-10 py-4 text-xs font-medium tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--gold)] hover:text-primary disabled:opacity-50"
      >
        {pending ? t.sending : t.submit}
      </button>
    </form>
  );
}
