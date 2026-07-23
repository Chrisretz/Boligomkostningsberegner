"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";

/**
 * Lille, genbrugelig hover-tooltip til de CSS-baserede grafer.
 *
 * Brug: læg `containerRef` på et element med `position: relative`, spred
 * `bind(indhold)` på hvert element der skal kunne hoveres, og render
 * `tooltip` inde i containeren. Tooltipen følger musen, virker også med
 * tastatur-fokus (tilgængelighed), og har pointer-events slået fra, så den
 * ikke selv fanger musen og får den til at flimre.
 */

type TooltipState = { x: number; y: number; content: ReactNode } | null;

export function useChartTooltip() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tip, setTip] = useState<TooltipState>(null);

  const place = useCallback(
    (content: ReactNode, clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setTip({ x: clientX - rect.left, y: clientY - rect.top, content });
    },
    []
  );

  const hide = useCallback(() => setTip(null), []);

  const bind = useCallback(
    (content: ReactNode) => ({
      onMouseEnter: (e: React.MouseEvent) =>
        place(content, e.clientX, e.clientY),
      onMouseMove: (e: React.MouseEvent) => place(content, e.clientX, e.clientY),
      onMouseLeave: hide,
      onFocus: (e: React.FocusEvent) => {
        const r = e.currentTarget.getBoundingClientRect();
        place(content, r.left + r.width / 2, r.top + r.height / 2);
      },
      onBlur: hide,
      tabIndex: 0,
    }),
    [place, hide]
  );

  const tooltip = tip ? (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none absolute z-20 -translate-x-1/2 rounded-md px-3 py-1.5 text-small font-medium text-white shadow-soft whitespace-nowrap"
      style={{
        left: tip.x,
        top: tip.y,
        transform: "translate(-50%, calc(-100% - 12px))",
        backgroundColor: "#1E3A5F",
      }}
    >
      {tip.content}
    </div>
  ) : null;

  return { containerRef, bind, tooltip };
}
