"use client";

import { useState, useEffect } from "react";
import { trackConsentUpdate } from "@/lib/track";

const STORAGE_KEY = "bolig_cookie_consent";

export function CookieSettings() {
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY) as
      | "accepted"
      | "rejected"
      | null;
    setConsent(stored);
  }, []);

  const handleSave = (value: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    trackConsentUpdate({ analytics: value === "accepted" });
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
