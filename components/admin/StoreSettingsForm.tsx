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
      <Section title="Store Configuration">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Store Name">
            <input value={values.store_name} onChange={(e) => set("store_name", e.target.value)} className={inputClass} />
          </Field>
          <Field label="WhatsApp Number (E.164, global fallback)">
            <input
              value={values.whatsapp_number}
              onChange={(e) => set("whatsapp_number", e.target.value)}
              placeholder="+237600000000"
              className={inputClass}
            />
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
