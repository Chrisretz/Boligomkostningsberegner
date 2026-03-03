/**
 * Canonical site URL – brug overalt for absolutte URL'er og canonical tags.
 * Hele sitet bruger www-varianten.
 */
export const SITE_URL = "https://www.boligklarhed.dk";

export function canonicalUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
