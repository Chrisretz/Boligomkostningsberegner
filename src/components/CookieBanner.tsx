"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "cookie_consent";
const COOKIE_CONSENT_TIMESTAMP_KEY = "cookie_consent_timestamp";

function dispatchConsentChange(analytics: boolean) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("cookie-consent-changed", { detail: { analytics } })
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  const handleAccept = () => {
    const now = new Date().toISOString();
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    localStorage.setItem(COOKIE_CONSENT_TIMESTAMP_KEY, now);
    dispatchConsentChange(true);
    setVisible(false);
  };

  const handleReject = () => {
    const now = new Date().toISOString();
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    localStorage.setItem(COOKIE_CONSENT_TIMESTAMP_KEY, now);
    dispatchConsentChange(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-surface border-t border-border shadow-card p-4 md:p-6">
      <div className="container mx-auto max-w-4xl">
        <h3 className="text-h3 text-text-primary mb-2">
          Cookies og statistik
        </h3>
        <p className="text-body text-text-secondary mb-4">
          Vi bruger teknisk nødvendige cookies for at siden fungerer. Med dit
          samtykke bruger vi også statistik til at forbedre beregneren. Du kan
          til enhver tid ændre dit valg.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleReject}
            className="px-4 py-2 text-body font-medium text-text-primary bg-border rounded-md hover:bg-border-strong"
          >
            Afvis
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-4 py-2 text-body font-medium text-white bg-brand-primary rounded-md hover:bg-brand-primaryHover"
          >
            Acceptér statistik
          </button>
          <Link
            href="/cookies"
            className="px-4 py-2 text-body font-medium text-text-secondary hover:text-text-primary"
          >
            Indstillinger
          </Link>
        </div>
      </div>
    </div>
  );
}
