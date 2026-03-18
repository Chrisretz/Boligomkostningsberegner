"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BEGREBER } from "@/lib/begreber";
import type { Begreb } from "@/lib/begreber";
import { getArticlesBySlugs } from "@/lib/articles";

// Dansk alfabet: A-Z efterfulgt af Æ Ø Å
const LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "Æ",
  "Ø",
  "Å",
] as const;

const LETTER_SET = new Set<string>(LETTERS as unknown as string[]);

function normalizeForSearch(val: string): string {
  return val
    .toLowerCase()
    .normalize("NFD")
    // Remove diacritics so "gældsfaktor" matches "gaeldsfaktor"
    .replace(/[\u0300-\u036f]/g, "");
}

function getFirstLetter(term: string): string {
  const first = term.trim().charAt(0).toUpperCase();
  return first && LETTER_SET.has(first) ? first : "";
}

export function BegreberExplorer() {
  const [query, setQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const filtered = useMemo(() => {
    const q = normalizeForSearch(query.trim());
    if (!q) return BEGREBER;

    return BEGREBER.filter((b) => {
      const haystack = normalizeForSearch(
        `${b.term} ${b.kortForklaring} ${b.laengereForklaring}`
      );
      return haystack.includes(q);
    });
  }, [query]);

  const termsByLetter = useMemo(() => {
    const map: Record<string, Begreb[]> = {};
    for (const letter of LETTERS) map[letter] = [];

    for (const b of filtered) {
      const letter = getFirstLetter(b.term);
      if (!letter) continue;
      map[letter].push(b);
    }

    for (const letter of LETTERS) {
      map[letter].sort((a, b) => a.term.localeCompare(b.term, "da-DK"));
    }

    return map;
  }, [filtered]);

  const resultsCount = filtered.length;
  const availableLetters = LETTERS.filter(
    (letter) => termsByLetter[letter]?.length > 0
  );

  useEffect(() => {
    function onScroll() {
      // Vis knappen når man er godt nede på siden
      setShowScrollTop(window.scrollY > 700);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToLetter(letter: string) {
    const el = document.getElementById(`begreb-${letter}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Tilbage til toppen"
        className={[
          "fixed bottom-24 right-6 z-50 transition-opacity transition-transform md:bottom-6",
          "px-3 py-2 rounded-md shadow-soft touch-manipulation",
          "bg-brand-primary text-white border-2 border-white/90",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <span className="flex items-center gap-2">
          <span className="text-small font-semibold">Til toppen</span>
          <span aria-hidden className="text-base leading-none">
            ↑
          </span>
        </span>
      </button>

      <div className="bg-brand-surface rounded-md border border-border shadow-soft p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="min-w-0">
            <label
              htmlFor="begreber-search"
              className="block text-small text-text-secondary mb-1"
            >
              Søg i begreber
            </label>
            <input
              id="begreber-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Skriv fx gældsfaktor, realkreditlån eller tinglysning…"
              className="w-full md:w-[520px] px-4 py-2.5 bg-white border border-border rounded-md text-body text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          <div className="text-small text-text-muted whitespace-nowrap">
            {resultsCount} resultater
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {availableLetters.map((letter) => (
            <button
              key={letter}
              type="button"
              onClick={() => scrollToLetter(letter)}
              className="px-3 py-1.5 rounded-md text-small border border-border bg-brand-background hover:border-border-strong hover:bg-border/20 text-text-primary transition-colors"
              aria-label={`Hop til ${letter}`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-7">
        {LETTERS.map((letter) => {
          const items = termsByLetter[letter];
          if (items.length === 0) return null;

          return (
            <section key={letter} id={`begreb-${letter}`}>
              <h2 className="text-h2 text-text-primary mb-4">{letter}</h2>

              <div className="space-y-4">
                {items.map((b) => {
                  const related = b.relatedArticleSlugs
                    ? getArticlesBySlugs([...b.relatedArticleSlugs])
                    : [];

                  return (
                    <details
                      key={b.id}
                      className="group rounded-md border border-border bg-brand-surface shadow-soft overflow-hidden"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-left hover:bg-border/30 transition-colors">
                        <span className="text-h3 text-text-primary">
                          {b.term}
                        </span>
                        <span className="text-xl text-text-muted font-medium tabular-nums group-open:hidden">
                          +
                        </span>
                        <span className="text-xl text-text-muted font-medium tabular-nums hidden group-open:inline">
                          −
                        </span>
                      </summary>

                      <div className="px-4 pb-4 pt-2 space-y-3">
                        <p className="text-body text-text-secondary">
                          {b.kortForklaring}
                        </p>

                        {related.length > 0 && (
                          <div className="text-small text-text-muted">
                            Relaterede artikler:
                            <ul className="mt-2 space-y-1 list-none">
                              {related.map((article) => (
                                <li key={article.slug}>
                                  <Link
                                    href={`/artikler/${article.slug}`}
                                    className="text-brand-primary hover:underline"
                                  >
                                    {article.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <details className="group rounded-md border border-border bg-brand-background overflow-hidden">
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 text-left hover:bg-border/20 transition-colors">
                            <span className="text-small font-medium text-text-primary">
                              Den lange forklaring
                            </span>
                            <span className="text-text-muted font-medium tabular-nums group-open:hidden">
                              +
                            </span>
                            <span className="text-text-muted font-medium tabular-nums hidden group-open:inline">
                              −
                            </span>
                          </summary>
                          <div className="px-3 pb-3 pt-1.5">
                            <p className="text-small text-text-secondary">
                              {b.laengereForklaring}
                            </p>
                          </div>
                        </details>
                      </div>
                    </details>
                  );
                })}
              </div>
            </section>
          );
        })}

        {resultsCount === 0 && (
          <div className="bg-brand-surface rounded-md border border-border shadow-soft p-6 text-center text-text-muted">
            Ingen begreber matcher din søgning.
          </div>
        )}
      </div>
    </div>
  );
}

