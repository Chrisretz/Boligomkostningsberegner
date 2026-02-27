"use client";

import { useState, useEffect } from "react";

const COOKIE_CONSENT_KEY = "cookie_consent";
const COOKIE_CONSENT_TIMESTAMP_KEY = "cookie_consent_timestamp";

function dispatchConsentChange(analytics: boolean) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("cookie-consent-changed", { detail: { analytics } })
  );
}

export function CookieSettings() {
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY) as
      | "accepted"
      | "rejected"
      | null;
    setConsent(stored);
  }, []);

  const handleSave = (value: "accepted" | "rejected") => {
    const now = new Date().toISOString();
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    localStorage.setItem(COOKIE_CONSENT_TIMESTAMP_KEY, now);
    setConsent(value);
    dispatchConsentChange(value === "accepted");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-brand-surface rounded-md border border-border p-spacing-card space-y-4">
      <p className="text-body text-text-secondary">
        {consent === "accepted"
          ? "Du har accepteret statistikcookies."
          : consent === "rejected"
            ? "Du har afvist statistikcookies."
            : "Du har endnu ikke valgt."}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => handleSave("accepted")}
          className="px-4 py-2 text-body font-medium text-white bg-brand-primary rounded-md hover:bg-brand-primaryHover"
        >
          Accepter statistik
        </button>
        <button
          type="button"
          onClick={() => handleSave("rejected")}
          className="px-4 py-2 text-body font-medium text-text-primary bg-border rounded-md hover:bg-border-strong"
        >
          Afvis statistik
        </button>
      </div>
      {saved && (
        <p className="text-small text-status-success">Dine indstillinger er gemt.</p>
      )}
    </div>
  );
}
