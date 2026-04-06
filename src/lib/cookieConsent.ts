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
