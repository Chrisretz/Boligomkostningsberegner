"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { trackConsentUpdate } from "@/lib/track";

const STORAGE_KEY = "bolig_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    trackConsentUpdate({ analytics: true });
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    trackConsentUpdate({ analytics: false });
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
            Accepter
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
