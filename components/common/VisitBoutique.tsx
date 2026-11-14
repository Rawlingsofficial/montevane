import { SITE_NAME, STORE_LOCATIONS, cityLine } from "@/lib/constants";
import type { StoreProfile } from "@/lib/data/catalog";
import { getDictionary, type Locale } from "@/lib/i18n";

/** Boutique addresses with directions, plus a Google review link once one is set in admin Settings. */
export function VisitBoutique({ locale, profile }: { locale: Locale; profile: StoreProfile }) {
  const t = getDictionary(locale).contact;

  return (
    <div>
      <h2 className="text-2xl">{t.visit}</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {STORE_LOCATIONS.map((l) => (
          <div key={l.city}>
            <address className="text-base leading-relaxed text-foreground/80 not-italic">
              <span className="text-foreground">
                {SITE_NAME} {l.city}
              </span>
              <br />
              {l.street}
              <br />
              {cityLine(l)}, {l.countryName}
            </address>
            <a
              href={l.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block border border-foreground px-5 py-2.5 text-xs font-medium tracking-[0.15em] uppercase transition-colors hover:bg-foreground hover:text-background"
            >
              {t.directions}
            </a>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
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
