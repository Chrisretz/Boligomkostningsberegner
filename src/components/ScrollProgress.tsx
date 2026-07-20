"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Læse-indikator: tynd bar der viser hvor langt man er nede på siden.
 *
 * Baren "klæber" under topbaren og glider med op i toppen af vinduet,
 * når topbaren skjules ved scroll. Det opnås ved at aflæse topbarens
 * nederste kant i viewport-koordinater (clamped til minimum 0), så
 * positionen automatisk følger topbarens transform-animation.
 *
 * Vises kun på indholdssider, hvor lineær læsning giver mening – ikke
 * på beregnerne, hvor scroll-position ikke er udtryk for fremdrift.
 */
const ENABLED_PREFIXES = ["/artikler/", "/boligbegreber"] as const;

function shouldShowOn(pathname: string | null): boolean {
  if (!pathname) return false;
  return ENABLED_PREFIXES.some((p) => pathname.startsWith(p));
}

export function ScrollProgress() {
  const pathname = usePathname();
  const enabled = shouldShowOn(pathname);

  const [progress, setProgress] = useState(0);
  const [top, setTop] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const update = () => {
      frameRef.current = null;

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));

      // Følg topbarens underkant; når den er kørt op, lander baren i toppen
      const header = document.getElementById("site-header");
      const bottom = header?.getBoundingClientRect().bottom ?? 0;
      setTop(Math.max(0, bottom));
    };

    const onScrollOrResize = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    // Topbaren skjules med en transition – følg med mens den animerer
    const interval = window.setInterval(update, 100);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.clearInterval(interval);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="fixed left-0 right-0 z-[54] h-1 bg-border/40 pointer-events-none"
      style={{ top }}
      role="progressbar"
      aria-label="Læsefremskridt"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-brand-accent"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
