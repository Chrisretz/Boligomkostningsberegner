import { readCookieConsent } from "@/lib/cookieConsent";

/** Sends a GA4 event only when analytics cookies are accepted and gtag is loaded. */
export function trackGaEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  if (readCookieConsent() !== "accepted") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params ?? {});
}
