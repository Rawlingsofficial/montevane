import { MAPS_URL, SITE_NAME, STORE_ADDRESS } from "@/lib/constants";
import type { StoreProfile } from "@/lib/data/catalog";
import { getDictionary, type Locale } from "@/lib/i18n";

/** The boutique address with directions, plus a Google review link once one is set in admin Settings. */
export function VisitBoutique({ locale, profile }: { locale: Locale; profile: StoreProfile }) {
  const t = getDictionary(locale).contact;

  return (
    <div>
      <h2 className="text-2xl">{t.visit}</h2>
      <address className="mt-4 text-base leading-relaxed text-foreground/80 not-italic">
        {SITE_NAME}
        <br />
        {STORE_ADDRESS.street}
        <br />
        {STORE_ADDRESS.postalCode} {STORE_ADDRESS.locality}, {STORE_ADDRESS.countryName}
      </address>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-foreground px-5 py-2.5 text-xs font-medium tracking-[0.15em] uppercase transition-colors hover:bg-foreground hover:text-background"
        >
          {t.directions}
        </a>
        {profile.googleReviewUrl && (
          <a
            href={profile.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border px-5 py-2.5 text-xs font-medium tracking-[0.15em] uppercase transition-colors hover:border-foreground"
          >
            {t.review}
          </a>
        )}
      </div>
    </div>
  );
}
