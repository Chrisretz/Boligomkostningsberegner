/**
 * Canonical site URL – brug overalt for absolutte URL'er og canonical tags.
 * Hele sitet bruger www-varianten.
 */
export const SITE_URL = "https://www.boligklarhed.dk";

/** Kanonisk sti til boligomkostningsberegneren (beskrivende URL til SEO). */
export const PATH_BOLIGOMKOSTNINGER_BEREGNER =
  "/beregn-dine-boligomkostninger" as const;

/** Lånerums-beregneren «Hvad kan jeg købe bolig for?» (kort SEO-sti uden /beregnere). */
export const PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR =
  "/hvad-kan-jeg-koebe-bolig-for" as const;

export function canonicalUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
