"use client";

import { trackGaEvent } from "@/lib/trackGaEvent";

/**
 * Kontekstuel partner-CTA til brug inde i artikler.
 * Skal placeres, hvor den er relevant for det, brugeren netop har læst –
 * ikke som en generisk banner. Kommissionsoplysning er indbygget.
 */
export function PartnerCta({
  partnerSlug,
  heading,
  body,
  buttonLabel,
  placement,
}: {
  partnerSlug: string;
  heading: string;
  body: string;
  buttonLabel: string;
  /** Fx "artikel-indboforsikring" – bruges i GA4 */
  placement: string;
}) {
  return (
    <aside className="not-prose my-8 rounded-xl border border-border bg-brand-background p-5 md:p-6">
      <p className="text-small font-semibold uppercase tracking-[0.15em] text-brand-accent mb-2">
        Annonce
      </p>
      <p className="text-h3 text-text-primary mb-2">{heading}</p>
      <p className="text-body text-text-secondary mb-4 leading-relaxed">
        {body}
      </p>
      <a
        href={`/go/${partnerSlug}`}
        target="_blank"
        rel="nofollow sponsored noopener"
        onClick={() =>
          trackGaEvent("affiliate_klik", {
            partner: partnerSlug,
            placering: placement,
          })
        }
        className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 text-body font-semibold text-white bg-brand-primary rounded-md shadow-soft hover:bg-brand-primaryHover transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
      >
        {buttonLabel}
      </a>
      <p className="text-small text-text-muted mt-3 leading-relaxed">
        Vi kan modtage kommission, hvis du klikker videre og gennemfører en
        henvendelse hos vores partner. Det koster ikke ekstra for dig, og det
        påvirker ikke vores beregninger eller anbefalinger.
      </p>
    </aside>
  );
}
