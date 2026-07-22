"use client";

import { useEffect, useState } from "react";

/**
 * Bogstavnavigation i venstremargin på /boligbegreber.
 *
 * Samme idé som ArticleToc: en fast oversigt i den tomme margin, der viser
 * hvor på siden man er, og som man kan springe rundt i. Forskellen er
 * bredden. Begrebssiden bruger max-w-5xl mod artiklernes max-w-2xl, så der
 * er kun ca. 128 px margin ved xl. Derfor er den her udgave en smal
 * bogstavrække i stedet for en liste med overskrifter.
 *
 * Bogstaverne kommer som prop fra BegreberExplorer i stedet for at blive
 * læst fra DOM'en, fordi listen ændrer sig, når man søger.
 */

/** Under dette antal bogstaver gør en oversigt ikke nytte. */
const MIN_LETTERS = 4;
/** Skal matche scroll-mt på sektionerne, så aktivt bogstav rammer rigtigt. */
const SCROLL_MARGIN_PX = 96;

type Props = {
  letters: readonly string[];
  onSelect: (letter: string) => void;
};

export function BegreberToc({ letters, onSelect }: Props) {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  // Forælderen laver et nyt array ved hver render. Vi afhænger derfor af
  // indholdet, ikke referencen, så observeren kun kobles om når listen
  // faktisk ændrer sig (dvs. når man søger).
  const lettersKey = letters.join(",");

  useEffect(() => {
    if (letters.length < MIN_LETTERS) {
      setActiveLetter(null);
      return;
    }

    const nodes = letters
      .map((l) => document.getElementById(`begreb-${l}`))
      .filter((n): n is HTMLElement => n !== null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveLetter(visible[0].target.id.replace("begreb-", ""));
        }
      },
      { rootMargin: `-${SCROLL_MARGIN_PX}px 0px -65% 0px`, threshold: 0 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lettersKey]);

  if (letters.length < MIN_LETTERS) return null;

  return (
    <nav
      aria-label="Spring til bogstav"
      className="hidden xl:block fixed left-4 2xl:left-10 top-32 w-14 2xl:w-16 max-h-[calc(100vh-12rem)] overflow-y-auto"
    >
      <p className="text-small font-semibold uppercase tracking-[0.15em] text-brand-accent mb-3 text-center">
        A–Å
      </p>
      <ul className="flex flex-col items-stretch gap-0.5 border-l border-border pl-2">
        {letters.map((letter) => {
          const isActive = letter === activeLetter;
          return (
            <li key={letter}>
              <button
                type="button"
                onClick={() => onSelect(letter)}
                aria-current={isActive ? "true" : undefined}
                className={`w-full rounded py-1 text-center text-small font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                  isActive
                    ? "bg-brand-primary text-white"
                    : "text-text-secondary hover:bg-border/40 hover:text-brand-primary"
                }`}
              >
                {letter}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
