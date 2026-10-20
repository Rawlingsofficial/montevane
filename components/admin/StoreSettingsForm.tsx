"use client";

import { useState } from "react";

import { Field, Section, inputClass } from "@/components/admin/form-controls";
import { updateStoreSettings, type StoreSettingsInput } from "@/lib/actions/settings";

export function StoreSettingsForm({ initial }: { initial: StoreSettingsInput }) {
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof StoreSettingsInput>(key: K, value: string) {
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
          Set once — these show as contact buttons on every product and the contact page. Leave a field empty to hide
          that channel. Phone numbers in international format, e.g. +1 555 000 0000.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone (calls & texts)">
            <input value={values.phone_number} onChange={(e) => set("phone_number", e.target.value)} placeholder="+1 555 000 0000" className={inputClass} />
          </Field>
          <Field label="Email">
            <input type="email" value={values.contact_email} onChange={(e) => set("contact_email", e.target.value)} className={inputClass} />
          </Field>
          <Field label="WhatsApp Number">
            <input value={values.whatsapp_number} onChange={(e) => set("whatsapp_number", e.target.value)} placeholder="+1 555 000 0000" className={inputClass} />
          </Field>
          <Field label="Telegram Username">
            <input value={values.telegram_username} onChange={(e) => set("telegram_username", e.target.value)} placeholder="@montevane" className={inputClass} />
          </Field>
          <Field label="Signal Number">
            <input value={values.signal_number} onChange={(e) => set("signal_number", e.target.value)} placeholder="+1 555 000 0000" className={inputClass} />
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
