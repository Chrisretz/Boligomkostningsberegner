"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  persistCookieConsent,
  readCookieConsent,
} from "@/lib/cookieConsent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = readCookieConsent();
    if (!stored) setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setExpanded(false);
  }, []);

  const acceptAll = useCallback(() => {
    persistCookieConsent("accepted");
    close();
  }, [close]);

  const rejectAll = useCallback(() => {
    persistCookieConsent("rejected");
    close();
  }, [close]);

  const openDetails = useCallback(() => {
    const stored = readCookieConsent();
    setAnalyticsEnabled(stored === "accepted");
    setExpanded(true);
  }, []);

  const saveAndClose = useCallback(() => {
    persistCookieConsent(analyticsEnabled ? "accepted" : "rejected");
    close();
  }, [analyticsEnabled, close]);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col justify-end md:justify-center md:items-center md:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
    >
      <div
        className="absolute inset-0 bg-black/45 md:bg-black/40"
        aria-hidden
      />
      <div
        className="relative z-10 w-full max-w-lg md:max-w-xl bg-brand-surface rounded-t-xl md:rounded-xl border border-border shadow-card max-h-[min(88vh,720px)] flex flex-col md:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto overscroll-contain p-5 md:p-6 flex-1 min-h-0">
          <h2
            id="cookie-banner-title"
            className="text-h3 text-text-primary mb-3 pr-8"
          >
            Vi respekterer beskyttelse af personoplysninger
          </h2>

          {!expanded ? (
            <>
              <p className="text-body text-text-secondary leading-relaxed mb-5">
                Vi bruger teknisk nødvendige cookies, så siden fungerer. Hvis du
                siger ja, må vi også bruge statistikcookies til at forbedre
                beregnerne. Du kan altid ændre dit valg under{" "}
                <Link
                  href="/cookies"
                  className="text-brand-primary font-medium hover:underline"
                  onClick={() => setVisible(false)}
                >
                  Cookies
                </Link>{" "}
                eller i bunden af siden.
              </p>
              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={openDetails}
                  className="min-h-[48px] w-full sm:w-auto px-5 py-3 text-body font-semibold text-text-primary bg-white border-2 border-border rounded-md hover:bg-brand-background transition-colors touch-manipulation uppercase tracking-wide text-small sm:text-body"
                >
                  Flere muligheder
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="min-h-[48px] w-full sm:w-auto px-5 py-3 text-body font-semibold text-white bg-status-success rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 touch-manipulation"
                >
                  Acceptér alle
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="mb-3 text-small font-medium text-brand-primary hover:underline"
              >
                ← Tilbage
              </button>
              <p className="text-body text-text-secondary leading-relaxed mb-4">
                Vi bruger cookies til at få siden til at virke (nødvendige) og –
                hvis du tillader det – til anonymiseret statistik, så vi kan se,
                hvordan beregnerne bruges. Vi sælger ikke dine data og bruger
                ikke cookies til målrettet reklame.
              </p>

              <div className="flex flex-wrap items-center justify-end gap-4 mb-5 text-small font-semibold uppercase tracking-wide">
                <button
                  type="button"
                  onClick={rejectAll}
                  className="text-text-primary hover:text-brand-primary underline-offset-2 hover:underline"
                >
                  Afvis alle
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="text-text-primary hover:text-brand-primary underline-offset-2 hover:underline"
                >
                  Acceptér alle
                </button>
              </div>

              <ul className="space-y-4 mb-6 border-t border-border pt-4">
                <li className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-body font-semibold text-text-primary">
                      Nødvendige cookies
                    </p>
                    <p className="text-small text-text-secondary mt-1 leading-relaxed">
                      Kræves for fx at huske dit cookievalg og for grundlæggende
                      funktion. Kan ikke fravælges.
                    </p>
                  </div>
                  <span className="shrink-0 text-small font-medium text-text-muted uppercase tracking-wide">
                    Altid aktiv
                  </span>
                </li>
                <li className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 pb-1 border-b border-border">
                  <div className="min-w-0 flex-1">
                    <p className="text-body font-semibold text-text-primary">
                      Statistikcookies
                    </p>
                    <p className="text-small text-text-secondary mt-1 leading-relaxed">
                      Hjælper os med at forstå besøg og brug af beregnerne i
                      aggregeret form (fx Google Analytics med anonymisering).
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-small font-medium text-text-secondary w-8 tabular-nums">
                      {analyticsEnabled ? "Til" : "Fra"}
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={analyticsEnabled}
                      aria-label={
                        analyticsEnabled
                          ? "Statistikcookies slået til"
                          : "Statistikcookies slået fra"
                      }
                      onClick={() => setAnalyticsEnabled((v) => !v)}
                      className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 ${
                        analyticsEnabled ? "bg-status-success" : "bg-border"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                          analyticsEnabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </li>
              </ul>

              <p className="text-small text-text-muted mb-4">
                Læs mere i vores{" "}
                <Link
                  href="/privacy"
                  className="text-brand-primary hover:underline font-medium"
                  onClick={() => setVisible(false)}
                >
                  privatlivspolitik
                </Link>
                .
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                <Link
                  href="/cookies"
                  className="text-small text-brand-primary hover:underline font-medium order-2 sm:order-1"
                  onClick={() => setVisible(false)}
                >
                  Cookiepolitik
                </Link>
                <button
                  type="button"
                  onClick={saveAndClose}
                  className="order-1 sm:order-2 min-h-[48px] w-full sm:w-auto px-6 py-3 text-body font-semibold text-white bg-status-success rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 touch-manipulation"
                >
                  Gem &amp; luk
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
