"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";

import { submitInquiry } from "@/lib/actions/inquiries";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { DIAL_CODES, MAIN_MARKETS, TEXT_COUNTRIES, countryFlag } from "@/lib/phone";
import { cn } from "@/lib/utils";

const fieldClass =
  "mt-2 w-full border border-border bg-transparent px-3 py-3 text-sm focus:border-[var(--gold)] focus:outline-none";
const labelClass = "text-xs tracking-[0.1em] text-muted-foreground uppercase";
const chipClass = (on: boolean) =>
  cn(
    "min-h-10 border px-3.5 text-xs font-medium tracking-[0.1em] uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-35",
    on ? "border-foreground bg-foreground text-white" : "border-border enabled:hover:border-foreground"
  );

// Store locales with an obvious home country; English guesses from the browser.
const LOCALE_COUNTRY: Record<string, string> = { de: "DE", uz: "UZ" };
// Italy, San Marino and the Vatican keep the leading 0 after the country code.
const KEEPS_ZERO = new Set(["IT", "SM", "VA"]);
const OTHER = "OTHER";
const MAIN = new Set<string>(MAIN_MARKETS);

type Reach = "whatsapp" | "sms" | "imessage" | "telegram";
// +1 numbers (US, Canada, Puerto Rico) reach our texting line; everyone
// else picks the app our team messages them on.
const NORTH_AMERICA: Reach[] = ["sms", "whatsapp"];
const ELSEWHERE: Reach[] = ["whatsapp", "imessage", "telegram"];

const noSubscribe = () => () => {};
function browserRegion() {
  const region = new Intl.Locale(navigator.language).maximize().region ?? "";
  return DIAL_CODES[region] ? region : "";
}

/** A pasted "+44 7700…" / "0044…" → [listed country or OTHER, its code, the rest]. */
function splitInternational(raw: string, current: string): [string, string, string] | null {
  const digits = raw.trim().replace(/^00/, "+");
  if (!digits.startsWith("+")) return null;
  const all = digits.replace(/\D/g, "");
  for (let len = 4; len >= 1; len--) {
    const code = all.slice(0, len);
    if (current !== OTHER && DIAL_CODES[current] === code) return [current, code, all.slice(len)];
    const listed = MAIN_MARKETS.find((iso) => DIAL_CODES[iso] === code);
    if (listed) return [listed, code, all.slice(len)];
    if (Object.values(DIAL_CODES).includes(code)) return [OTHER, code, all.slice(len)];
  }
  return null;
}

export function InquiryForm({
  locale,
  product,
  labels: t,
  privacyHref,
  noteOpen = false,
  purchase = false,
  continueHref,
}: {
  locale: string;
  product?: { id: string; name: string };
  labels: Dictionary["form"];
  privacyHref: string;
  /** Show the note box from the start (e.g. selling, where the note is the point). */
  noteOpen?: boolean;
  /** A purchase request: shows the "no payment now" line above the button. */
  purchase?: boolean;
  /** Where "Keep browsing" goes after sending; inside the Buy now panel it just closes the panel. */
  continueHref?: string;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thanks, setThanks] = useState<string | null>(null);
  const hydrated = useSyncExternalStore(noSubscribe, () => true, () => false);

  // Country names in the visitor's language once hydrated (server and
  // browser ICU data differ, so the server render shows ISO codes).
  const names = useMemo(
    () => (hydrated ? new Intl.DisplayNames([locale, "en"], { type: "region" }) : null),
    [hydrated, locale]
  );
  const countryName = (iso: string) => names?.of(iso) ?? iso;

  // Until the visitor picks, the code follows a guess: the store locale's
  // country, or for English the browser region (en-GB → GB) once hydrated.
  const region = useSyncExternalStore(noSubscribe, browserRegion, () => "");
  const guess = LOCALE_COUNTRY[locale] ?? region;
  const [picked, setPicked] = useState<string | null>(null);
  const [customCode, setCustomCode] = useState<string | null>(null);
  const dialIso = picked ?? (MAIN.has(guess) ? guess : guess ? OTHER : "");
  const code = dialIso === OTHER ? (customCode ?? (guess ? DIAL_CODES[guess] : "")) : (DIAL_CODES[dialIso] ?? "");
  const [number, setNumber] = useState("");

  const [title, setTitle] = useState("");
  // Email is always taken; on top, a personal line whose choices follow the
  // phone's country. The first choice is the default.
  const options = TEXT_COUNTRIES.has(dialIso) ? NORTH_AMERICA : ELSEWHERE;
  const [chosen, setReach] = useState<Reach | null>(null);
  const reach: Reach = chosen && options.includes(chosen) ? chosen : options[0];
  const [showNote, setShowNote] = useState(noteOpen);

  function changeNumber(raw: string) {
    const split = splitInternational(raw, dialIso);
    if (split) {
      setPicked(split[0]);
      setCustomCode(split[1]);
      setNumber(split[2]);
    } else {
      setNumber(raw.replace(/[^\d\s()-]/g, ""));
    }
  }

  function fullPhone() {
    let local = number.replace(/\D/g, "");
    if (!KEEPS_ZERO.has(dialIso)) local = local.replace(/^0+/, "");
    const c = code.replace(/\D/g, "");
    return c && local ? `+${c} ${local}` : "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();
    const name = get("name");
    const countryIso = dialIso === OTHER ? (guess && DIAL_CODES[guess] === code ? guess : "") : dialIso;

    setPending(true);
    setError(null);
    const result = await submitInquiry({
      name: title ? `${title} ${name}` : name,
      email: get("email"),
      phone: fullPhone(),
      country: countryIso ? countryName(countryIso) : "",
      message: get("message"),
      contact_methods: [reach, "email"],
      product_id: product?.id ?? "",
      product_name: product?.name ?? "",
    });
    setPending(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    // "Mrs Smith" with a title, otherwise the first name.
    const parts = name.split(/\s+/);
    const greet = title ? `${title} ${parts.length > 1 ? parts[parts.length - 1] : parts[0]}` : parts[0];
    const via = t.viaLabels[reach];
    setThanks((greet ? t.thanksNamed.replace("{name}", greet) : t.thanks).replace("{via}", via));
  }

  if (thanks) {
    const keepClass =
      "mt-6 inline-flex min-h-11 items-center border border-foreground px-6 text-xs font-medium tracking-[0.15em] uppercase transition-colors hover:bg-foreground hover:text-white";
    return (
      <div className="border border-border p-6 sm:p-8" role="status">
        <p className="font-heading text-xl leading-snug font-light">{thanks}</p>
        {continueHref ? (
          <Link href={continueHref} className={keepClass}>
            {t.keepBrowsing}
          </Link>
        ) : (
          <button type="button" onClick={(e) => e.currentTarget.closest("dialog")?.close()} className={keepClass}>
            {t.keepBrowsing}
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div role="radiogroup" aria-label={t.titleLabel} className="flex flex-wrap gap-2">
        {t.titles.map((x) => (
          <button
            key={x}
            type="button"
            role="radio"
            aria-checked={title === x}
            onClick={() => setTitle(title === x ? "" : x)}
            className={chipClass(title === x)}
          >
            {x}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>{t.name}</span>
          <input name="name" required autoComplete="name" className={fieldClass} suppressHydrationWarning />
        </label>
        <label className="block">
          <span className={labelClass}>{t.email}</span>
          <input name="email" type="email" required autoComplete="email" className={fieldClass} suppressHydrationWarning />
        </label>
      </div>

      <div>
        <span className={labelClass}>{t.reach}</span>
        <div role="radiogroup" aria-label={t.reach} className="mt-2 flex flex-wrap gap-2">
          {options.map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={reach === m}
              onClick={() => setReach(m)}
              className={chipClass(reach === m)}
            >
              {t.reachLabels[m]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className={labelClass}>{t.phone} *</span>
        <div className="flex gap-2">
          {/* Closed, the picker shows just flag + code; open, the full names. */}
          <div className={cn(fieldClass, "relative flex w-24 shrink-0 items-center justify-between gap-1 focus-within:border-[var(--gold)]")}>
            <span aria-hidden="true" className="truncate">
              {dialIso && dialIso !== OTHER ? `${countryFlag(dialIso)} +${DIAL_CODES[dialIso]}` : dialIso === OTHER ? "🌐" : "+"}
            </span>
            <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
            <select
              aria-label={t.phoneCode}
              required
              value={dialIso}
              onChange={(e) => {
                setPicked(e.target.value);
                if (e.target.value === OTHER) setCustomCode("");
              }}
              autoComplete="tel-country-code"
              className="absolute inset-0 cursor-pointer opacity-0"
            >
              <option value="">{t.phoneCode}</option>
              {MAIN_MARKETS.map((iso) => (
                <option key={iso} value={iso}>
                  {countryFlag(iso)} +{DIAL_CODES[iso]} {countryName(iso)}
                </option>
              ))}
              <option value={OTHER}>{t.otherCountry}</option>
            </select>
          </div>
          {dialIso === OTHER && (
            <input
              aria-label={t.phoneCode}
              required
              inputMode="numeric"
              autoComplete="tel-country-code"
              value={code ? `+${code}` : ""}
              onChange={(e) => setCustomCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="+…"
              className={cn(fieldClass, "w-20 shrink-0")}
            />
          )}
          <input
            name="phone"
            type="tel"
            required
            aria-label={t.phoneNumber}
            inputMode="tel"
            autoComplete="tel-national"
            value={number}
            onChange={(e) => changeNumber(e.target.value)}
            placeholder={code ? `+${code} …` : "7700 900123"}
            pattern="[\d\s()\-]{4,}"
            className={fieldClass}
            suppressHydrationWarning
          />
        </div>
      </div>

      {showNote ? (
        <label className="block">
          <span className={labelClass}>{t.message}</span>
          <textarea
            name="message"
            rows={3}
            defaultValue={noteOpen && product ? t.messageDefault.replace("{item}", product.name) : ""}
            className={fieldClass}
          />
        </label>
      ) : (
        <button type="button" onClick={() => setShowNote(true)} className="text-sm underline-offset-4 hover:underline">
          {t.addNote}
        </button>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="space-y-3">
        {purchase && <p className="text-sm">{t.noPayment}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-primary px-10 py-4 text-xs font-medium tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-[var(--gold)] hover:text-primary disabled:opacity-50 sm:w-auto"
        >
          {pending ? t.sending : t.submit}
        </button>
        <p className="text-xs text-muted-foreground">
          {t.consent}{" "}
          <Link href={privacyHref} className="underline underline-offset-2">
            {t.privacyLink}
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
