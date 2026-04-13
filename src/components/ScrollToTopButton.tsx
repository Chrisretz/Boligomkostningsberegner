"use client";

import { useEffect, useRef, useState } from "react";

const SITE_CONTENT_BOUNCE_ROOT_ID = "site-content-bounce-root";

function getBounceRoot(): HTMLElement | null {
  return document.getElementById(SITE_CONTENT_BOUNCE_ROOT_ID);
}

function clearBounceTransform() {
  const el = getBounceRoot();
  if (el) el.style.transform = "";
}

export function ScrollToTopButton() {
  const [shouldShow, setShouldShow] = useState(false);
  const [phase, setPhase] = useState<"hidden" | "visible" | "exiting">("hidden");
  const motionRunIdRef = useRef(0);

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

  useEffect(() => {
    return () => {
      motionRunIdRef.current += 1;
      clearBounceTransform();
    };
  }, []);

  function scrollToTop() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clearBounceTransform();
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const runId = ++motionRunIdRef.current;
    const startY = window.scrollY;
    const bounceRoot = getBounceRoot();
    const finish = () => {
      if (runId !== motionRunIdRef.current) return;
      clearBounceTransform();
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    /** Én tidslinje: scroll med ease-in-out (ingen accelerationsspids mod slutningen) + diskret overshoot kun i den langsomme hale. */
    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function runCombinedScrollAndOvershoot() {
      const totalMs = Math.min(1100, 520 + startY * 0.4);
      const pOvershootStart = 0.82;
      const amplitudePx = 5;
      const t0 = performance.now();

      function frame(now: number) {
        if (runId !== motionRunIdRef.current) return;

        const p = Math.min(1, (now - t0) / totalMs);
        const eased = easeInOutCubic(p);
        const scrollY = startY * (1 - eased);
        window.scrollTo(0, scrollY);

        let ty = 0;
        if (p > pOvershootStart) {
          const v = (p - pOvershootStart) / (1 - pOvershootStart);
          ty = -amplitudePx * Math.sin(Math.PI * v);
        }
        if (bounceRoot) {
          bounceRoot.style.transform =
            ty !== 0 ? `translate3d(0, ${ty}px, 0)` : "";
        }

        if (p < 1) {
          requestAnimationFrame(frame);
        } else {
          finish();
        }
      }

      requestAnimationFrame(frame);
    }

    /** Allerede i toppen: blød, lille overshoot. */
    function runOvershootOnly() {
      const totalMs = 400;
      const amplitudePx = 5;
      const t0 = performance.now();

      function frame(now: number) {
        if (runId !== motionRunIdRef.current) return;

        const p = Math.min(1, (now - t0) / totalMs);
        const w = easeInOutCubic(p);
        window.scrollTo(0, 0);
        const ty = -amplitudePx * Math.sin(Math.PI * w);
        const root = getBounceRoot();
        if (root) {
          root.style.transform = `translate3d(0, ${ty}px, 0)`;
        }

        if (p < 1) {
          requestAnimationFrame(frame);
        } else {
          finish();
        }
      }

      requestAnimationFrame(frame);
    }

    if (startY <= 2) {
      runOvershootOnly();
      return;
    }

    runCombinedScrollAndOvershoot();
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
        className="h-6 w-6 shrink-0 origin-center scale-125"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 15l6-6 6 6" />
      </svg>
    </button>
  );
}
