/**
 * Canonical site URL – brug overalt for absolutte URL'er og canonical tags.
 * Hele sitet bruger www-varianten.
 */
export const SITE_URL = "https://www.boligklarhed.dk";

/** Juridisk enhedsnavn til footer og copyright (enkeltmandsvirksomhed). */
export const COMPANY_LEGAL_NAME = "Boligklarhed" as const;

/** Årstal for stiftelse/start – vises i footeren. */
export const COMPANY_ESTABLISHED_YEAR = 2026 as const;

/** Generel kontakt-e-mail. */
export const COMPANY_CONTACT_EMAIL = "info@boligklarhed.dk" as const;

/** CVR (8 cifre). Tom streng skjuler CVR-linjen i footeren. */
export const COMPANY_CVR = "46385934";

/**
 * Officielle profiler til sociale medier (bruges i footer med ikoner).
 * Opdater URL'erne hvis jeres profiler har andre adresser.
 */
export const SOCIAL_LINKEDIN_URL =
  "https://www.linkedin.com/company/boligklarhed/" as const;
export const SOCIAL_FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61573361431441" as const;
export const SOCIAL_INSTAGRAM_URL =
  "https://www.instagram.com/boligklarhed" as const;

/** Kanonisk sti til boligomkostningsberegneren (beskrivende URL til SEO). */
export const PATH_BOLIGOMKOSTNINGER_BEREGNER =
  "/beregn-dine-boligomkostninger" as const;

/** Lånerums-beregneren «Hvad kan jeg købe bolig for?» (kort SEO-sti uden /beregnere). */
export const PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR =
  "/hvad-kan-jeg-koebe-bolig-for" as const;

/** SEO-landing for søgeordet «boliglån beregner» – guide + CTA til boligomkostningsberegneren. */
export const PATH_BOLIGLAAN_BEREGNER = "/boliglaan-beregner" as const;

export function canonicalUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
