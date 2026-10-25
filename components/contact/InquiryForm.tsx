"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";

import { submitInquiry } from "@/lib/actions/inquiries";
import { CONTACT_METHODS, PAYMENT_METHODS, type ContactMethod } from "@/lib/contact";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { DIAL_CODES, countryList } from "@/lib/phone";
import { cn } from "@/lib/utils";

const fieldClass =
  "mt-2 w-full border border-border bg-transparent px-3 py-3 text-sm focus:border-[var(--gold)] focus:outline-none";
const labelClass = "text-xs tracking-[0.1em] text-muted-foreground uppercase";

// Store locales with an obvious home country; English guesses from the browser.
const LOCALE_COUNTRY: Record<string, string> = { de: "DE", uz: "UZ" };
// Italy, San Marino and the Vatican keep the leading 0 after the country code.
const KEEPS_ZERO = new Set(["IT", "SM", "VA"]);

const noSubscribe = () => () => {};
function browserRegion() {
  const region = new Intl.Locale(navigator.language).maximize().region ?? "";
  return DIAL_CODES[region] ? region : "";
}

/** "+44 07700 900123" or "0044…" pasted into the number box → [code country, rest]. */
function splitInternational(raw: string, current: string): [string, string] | null {
  const digits = raw.trim().replace(/^00/, "+");
  if (!digits.startsWith("+")) return null;
  const all = digits.replace(/\D/g, "");
  for (let len = 4; len >= 1; len--) {
    const code = all.slice(0, len);
    const iso = DIAL_CODES[current] === code ? current : Object.keys(DIAL_CODES).find((k) => DIAL_CODES[k] === code);
    if (iso) return [iso, all.slice(len)];
  }
  return null;
}

export function InquiryForm({
  locale,
  product,
  labels: t,
  privacyHref,
}: {
  locale: string;
  product?: { id: string; name: string };
  labels: Dictionary["form"];
  privacyHref: string;
}) {
  const [methods, setMethods] = useState<ContactMethod[]>(["whatsapp"]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const countries = useMemo(() => countryList(locale), [locale]);
  // Until the visitor picks, both selects follow a guess: the store locale's
  // country, or for English the browser region (en-GB → GB) once hydrated.
  const region = useSyncExternalStore(noSubscribe, browserRegion, () => "");
  const guess = LOCALE_COUNTRY[locale] ?? region;
  const [pickedCountry, setCountry] = useState<string | null>(null);
  const [pickedDial, setDialIso] = useState<string | null>(null);
  const country = pickedCountry ?? guess;
  const dialIso = pickedDial ?? country;
  const [dialTouched, setDialTouched] = useState(false);
  const [number, setNumber] = useState("");

  function chooseCountry(iso: string) {
    setCountry(iso);
    if (!dialTouched) setDialIso(iso || null);
  }

  function changeNumber(raw: string) {
    const split = splitInternational(raw, dialIso);
    if (split) {
      setDialIso(split[0]);
      setDialTouched(true);
      setNumber(split[1]);
    } else {
      setNumber(raw.replace(/[^\d\s()-]/g, ""));
    }
  }

  function fullPhone() {
    let local = number.replace(/\D/g, "");
    if (!KEEPS_ZERO.has(dialIso)) local = local.replace(/^0+/, "");
    return dialIso && local ? `+${DIAL_CODES[dialIso]} ${local}` : "";
  }

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
      phone: fullPhone(),
      country: countries.find((c) => c.iso === country)?.name ?? "",
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
          <select
            name="country"
            value={country}
            onChange={(e) => chooseCountry(e.target.value)}
            autoComplete="country"
            className={fieldClass}
          >
            <option value="">{t.countrySelect}</option>
            {countries.map((c) => (
              <option key={c.iso} value={c.iso}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </label>
        <div className="block">
          <span className={labelClass}>{t.phone}</span>
          <div className="flex gap-2">
            <select
              aria-label={t.phoneCode}
              required
              value={dialIso}
              onChange={(e) => {
                setDialIso(e.target.value);
                setDialTouched(true);
              }}
              autoComplete="tel-country-code"
              className={cn(fieldClass, "w-32 shrink-0")}
            >
              <option value="">{t.phoneCode}</option>
              {countries.map((c) => (
                <option key={c.iso} value={c.iso}>
                  {c.flag} +{c.dial} {c.name}
                </option>
              ))}
            </select>
            <input
              name="phone"
              type="tel"
              required
              aria-label={t.phoneNumber}
              inputMode="tel"
              autoComplete="tel-national"
              value={number}
              onChange={(e) => changeNumber(e.target.value)}
              placeholder={dialIso ? `+${DIAL_CODES[dialIso]} …` : "7700 900123"}
              pattern="[\d\s()\-]{4,}"
              className={fieldClass}
              suppressHydrationWarning
            />
          </div>
        </div>
        <label className="block">
          <span className={labelClass}>{t.email}</span>
          <input name="email" type="email" required autoComplete="email" className={fieldClass} suppressHydrationWarning />
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
