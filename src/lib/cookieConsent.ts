export const COOKIE_CONSENT_KEY = "cookie_consent";
export const COOKIE_CONSENT_TIMESTAMP_KEY = "cookie_consent_timestamp";

export type CookieConsentValue = "accepted" | "rejected";

export function dispatchConsentChange(analytics: boolean) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("cookie-consent-changed", { detail: { analytics } })
  );
}

export function persistCookieConsent(value: CookieConsentValue) {
  const now = new Date().toISOString();
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
  localStorage.setItem(COOKIE_CONSENT_TIMESTAMP_KEY, now);
  dispatchConsentChange(value === "accepted");
}

export function readCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (stored === "accepted" || stored === "rejected") return stored;
  return null;
}

/** Antal dage før en afvisning udløber, og vi må spørge igen. */
export const CONSENT_REPROMPT_DAYS = 180;

/**
 * True hvis banneret skal vises: intet valg gemt, eller en afvisning
 * er ældre end CONSENT_REPROMPT_DAYS (accept genspørges ikke).
 */
export function shouldShowConsentBanner(): boolean {
  const stored = readCookieConsent();
  if (!stored) return true;
  if (stored === "accepted") return false;
  const ts = localStorage.getItem(COOKIE_CONSENT_TIMESTAMP_KEY);
  if (!ts) return false;
  const ageMs = Date.now() - new Date(ts).getTime();
  return ageMs > CONSENT_REPROMPT_DAYS * 24 * 60 * 60 * 1000;
}
