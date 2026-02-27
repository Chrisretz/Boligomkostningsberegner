"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-JMLETWTJ28";
const COOKIE_CONSENT_KEY = "cookie_consent";

function applyConsent(granted: boolean) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (granted) {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
    });
  } else {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}

export function GoogleAnalytics() {
  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored === "accepted") {
      applyConsent(true);
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ analytics: boolean }>;
      applyConsent(ev.detail.analytics);
    };
    window.addEventListener("cookie-consent-changed", handler);
    return () => window.removeEventListener("cookie-consent-changed", handler);
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
        `}
      </Script>
    </>
  );
}
