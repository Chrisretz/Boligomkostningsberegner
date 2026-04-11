"use client";

import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [shouldShow, setShouldShow] = useState(false);
  const [phase, setPhase] = useState<"hidden" | "visible" | "exiting">("hidden");

  useEffect(() => {
    function onScroll() {
      // Hysterese så knappen ikke "flakker" omkring én tærskel.
      const y = window.scrollY;
      const ENTER_AT = 700;
      const EXIT_AT = 500;
      setShouldShow((prev) => (prev ? y > EXIT_AT : y > ENTER_AT));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const EXIT_DURATION_MS = 700;

    if (shouldShow) {
      setPhase("visible");
      return;
    }

    setPhase((prev) => (prev === "hidden" ? prev : "exiting"));
    const t = window.setTimeout(() => setPhase("hidden"), EXIT_DURATION_MS);

    return () => window.clearTimeout(t);
  }, [shouldShow]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Tilbage til toppen"
      className={[
        "fixed bottom-24 right-6 z-50 transition-opacity transition-transform md:bottom-6",
        "inline-flex h-12 w-12 items-center justify-center rounded-full shadow-soft touch-manipulation",
        "bg-brand-primary text-white border-2 border-white/90",
        "will-change-transform",
        "transition-transform duration-700 ease-out transition-opacity duration-200",
        phase === "visible"
          ? "opacity-100 translate-y-0 pointer-events-auto ease-out hover:-translate-y-0.5"
          : phase === "exiting"
            ? "opacity-100 translate-y-36 md:translate-y-24 pointer-events-none ease-in"
            : "opacity-0 translate-y-36 md:translate-y-24 pointer-events-none ease-in",
      ].join(" ")}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

