"use client";

import { useState, useEffect } from "react";
import {
  persistCookieConsent,
  readCookieConsent,
  type CookieConsentValue,
} from "@/lib/cookieConsent";

export function CookieSettings() {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConsent(readCookieConsent());
  }, []);

  const handleSave = (value: CookieConsentValue) => {
    persistCookieConsent(value);
    setConsent(value);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-brand-surface rounded-md border border-border p-spacing-card space-y-4">
      <p className="text-body text-text-secondary">
        {consent === "accepted"
          ? "Du har accepteret alle cookies (herunder statistik)."
          : consent === "rejected"
            ? "Du har kun tilladt nødvendige cookies."
            : "Du har endnu ikke valgt."}
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleSave("rejected")}
          className="px-4 py-2 text-body font-medium text-text-primary bg-border rounded-md hover:bg-border-strong"
        >
          Afvis alle
        </button>
        <button
          type="button"
          onClick={() => handleSave("accepted")}
          className="px-4 py-2 text-body font-medium text-white bg-status-success rounded-md hover:opacity-90"
        >
          Acceptér alle
        </button>
      </div>
      {saved && (
        <p className="text-small text-status-success">Dine indstillinger er gemt.</p>
      )}
    </div>
  );
}
