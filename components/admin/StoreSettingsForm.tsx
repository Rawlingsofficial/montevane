"use client";

import { useState } from "react";

import { Field, Section, inputClass } from "@/components/admin/form-controls";
import { updateStoreSettings, type StoreSettingsInput } from "@/lib/actions/settings";

export function StoreSettingsForm({ initial }: { initial: StoreSettingsInput }) {
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setLine(i: number, key: "label" | "number", value: string) {
    setValues((v) => ({ ...v, whatsapp_numbers: v.whatsapp_numbers.map((l, j) => (j === i ? { ...l, [key]: value } : l)) }));
    setSaved(false);
  }
  function addLine() {
    setValues((v) => ({ ...v, whatsapp_numbers: [...v.whatsapp_numbers, { label: "", number: "" }] }));
  }
  function removeLine(i: number) {
    setValues((v) => ({ ...v, whatsapp_numbers: v.whatsapp_numbers.filter((_, j) => j !== i) }));
    setSaved(false);
  }

  function set<K extends Exclude<keyof StoreSettingsInput, "whatsapp_numbers">>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await updateStoreSettings(values);
    setSaving(false);
    if (result.error) setError(result.error);
    else setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <Section title="Customer Contact">
        <p className="-mt-1 mb-5 text-xs text-muted-foreground">
          Set once — these show as contact buttons on every product and the contact page, and the phone number, email and
          social profile links show in the footer. Leave a field empty to hide that channel. Phone numbers in international format, e.g. +1 555 000 0000.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone (calls & texts)">
            <input value={values.phone_number} onChange={(e) => set("phone_number", e.target.value)} placeholder="+1 555 000 0000" className={inputClass} />
          </Field>
          <Field label="Email">
            <input type="email" value={values.contact_email} onChange={(e) => set("contact_email", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Telegram Username">
            <input value={values.telegram_username} onChange={(e) => set("telegram_username", e.target.value)} placeholder="@montevane" className={inputClass} />
          </Field>
          <Field label="Signal Number">
            <input value={values.signal_number} onChange={(e) => set("signal_number", e.target.value)} placeholder="+1 555 000 0000" className={inputClass} />
          </Field>
          <Field label="TikTok Profile Link">
            <input value={values.tiktok_url} onChange={(e) => set("tiktok_url", e.target.value)} placeholder="https://www.tiktok.com/@montevane" className={inputClass} />
          </Field>
          <Field label="Instagram Profile Link">
            <input value={values.instagram_url} onChange={(e) => set("instagram_url", e.target.value)} placeholder="https://www.instagram.com/shop.montevane" className={inputClass} />
          </Field>
          <Field label="Facebook Page Link">
            <input value={values.facebook_url} onChange={(e) => set("facebook_url", e.target.value)} placeholder="https://www.facebook.com/montevane" className={inputClass} />
          </Field>
          <Field label="Pinterest Profile Link">
            <input value={values.pinterest_url} onChange={(e) => set("pinterest_url", e.target.value)} placeholder="https://www.pinterest.com/montevane" className={inputClass} />
          </Field>
        </div>
      </Section>

      <div className="h-10" />

      <Section title="WhatsApp">
        <p className="-mt-1 mb-5 text-xs text-muted-foreground">
          The first number is the main line: product enquiries, the floating chat button and the top bar use it. Add more
          (e.g. UK, US, Monaco) and visitors pick one from a short list. No numbers = every WhatsApp button is hidden.
        </p>
        <div className="space-y-3">
          {values.whatsapp_numbers.map((line, i) => (
            <div key={i} className="grid grid-cols-[8rem_1fr_auto] items-end gap-3">
              <Field label={i === 0 ? "Label (main)" : "Label"}>
                <input value={line.label} onChange={(e) => setLine(i, "label", e.target.value)} placeholder="UK" className={inputClass} />
              </Field>
              <Field label="Number">
                <input value={line.number} onChange={(e) => setLine(i, "number", e.target.value)} placeholder="+44 7700 900123" className={inputClass} />
              </Field>
              <button type="button" onClick={() => removeLine(i)} className="h-10 px-3 text-xs text-muted-foreground hover:text-red-700">
                Remove
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addLine} className="mt-4 border border-border px-4 py-2 text-xs tracking-[0.1em] uppercase hover:border-foreground">
          + Add WhatsApp number
        </button>
      </Section>

      <div className="h-10" />

      <Section title="About & Reviews">
        <p className="-mt-1 mb-5 text-xs text-muted-foreground">
          Your name shows on the About page. The review link (from your Google Business Profile → &ldquo;Ask for reviews&rdquo;) adds a
          &ldquo;Review us on Google&rdquo; button to the About and Contact pages.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Owner / Founder Name">
            <input value={values.owner_name} onChange={(e) => set("owner_name", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Title">
            <input value={values.owner_title} onChange={(e) => set("owner_title", e.target.value)} placeholder="Founder" className={inputClass} />
          </Field>
          <Field label="Google Review Link">
            <input value={values.google_review_url} onChange={(e) => set("google_review_url", e.target.value)} placeholder="https://g.page/r/…/review" className={inputClass} />
          </Field>
        </div>
      </Section>

      <div className="h-10" />

      <Section title="Store Configuration">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Store Name">
            <input value={values.store_name} onChange={(e) => set("store_name", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Store Email">
            <input
              type="email"
              value={values.store_email}
              onChange={(e) => set("store_email", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Support Email">
            <input
              type="email"
              value={values.support_email}
              onChange={(e) => set("support_email", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Newsletter Sender Email">
            <input
              type="email"
              value={values.newsletter_sender_email}
              onChange={(e) => set("newsletter_sender_email", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      {saved && !error && <p className="mt-4 text-sm text-[var(--gold)]">Settings saved.</p>}

      <button
        type="submit"
        disabled={saving}
        className="mt-6 bg-primary px-8 py-3 text-xs font-medium tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--gold)] hover:text-primary disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Settings"}
      </button>
    </form>
  );
}
