"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  SITE_SEARCH_INDEX,
  type SiteSearchItem,
  type SiteSearchKind,
} from "@/lib/site-search-index";

const normalize = (val: string) =>
  val
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const KIND_LABEL: Record<SiteSearchKind, string> = {
  side: "Side",
  beregner: "Beregner",
  artikel: "Artikel",
  begreb: "Begreb",
};

const MAX_RESULTS = 12;

function rankItem(item: SiteSearchItem, q: string): number {
  const t = normalize(item.title);
  const d = normalize(item.description);
  const h = normalize(item.href);
  if (t.startsWith(q)) return 0;
  if (t.includes(q)) return 2;
  if (d.includes(q)) return 4;
  if (h.includes(q)) return 6;
  return 999;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

type SiteSearchProps = {
  className?: string;
  onNavigate?: () => void;
};

export function SiteSearch({ className = "", onNavigate }: SiteSearchProps) {
  const router = useRouter();
  const baseId = useId();
  const inputId = `${baseId}-input`;
  const listboxId = `${baseId}-listbox`;
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const normalizedQuery = useMemo(() => normalize(query.trim()), [query]);

  const results = useMemo(() => {
    if (normalizedQuery.length < 1) return [];

    return SITE_SEARCH_INDEX.map((item) => ({
      item,
      rank: rankItem(item, normalizedQuery),
    }))
      .filter(({ rank }) => rank < 999)
      .sort((a, b) => {
        if (a.rank !== b.rank) return a.rank - b.rank;
        return a.item.title.localeCompare(b.item.title, "da-DK");
      })
      .slice(0, MAX_RESULTS)
      .map(({ item }) => item);
  }, [normalizedQuery]);

  useEffect(() => {
    setActiveIndex(results.length > 0 ? 0 : -1);
  }, [results]);

  useEffect(() => {
    if (!open) return;

    function onMouseDown(e: MouseEvent) {
      const t = e.target as Node | null;
      if (containerRef.current && !containerRef.current.contains(t)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
      return;
    }

    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const href = results[activeIndex]?.href;
      if (href) {
        router.push(href);
        onNavigate?.();
        setOpen(false);
        setQuery("");
      }
    }
  }

  const showPanel = open && normalizedQuery.length >= 1;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        {"S\u00f8g p\u00e5 hele Boligklarhed"}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-text-muted">
          <SearchIcon />
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listboxId}
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (normalizedQuery.length >= 1) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={"S\u00f8g p\u00e5 hele sitet..."}
          className="site-search-input w-full min-w-0 pl-7 pr-3 py-1.5 text-small text-text-primary bg-white border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
        />
      </div>

      {showPanel && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={"S\u00f8geresultater"}
          className="absolute right-0 left-auto top-full z-[100] mt-1 w-[min(22rem,calc(100vw-2rem))] max-h-[min(70vh,420px)] overflow-y-auto rounded-md border border-border bg-brand-surface shadow-card py-1"
        >
          {results.length === 0 ? (
            <p className="px-3 py-3 text-small text-text-muted">
              Ingen resultater for &quot;{query.trim()}&quot;
            </p>
          ) : (
            results.map((item, index) => {
              const active = index === activeIndex;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  role="option"
                  aria-selected={active}
                  className={`flex flex-col gap-0.5 px-3 py-2.5 text-left transition-colors ${
                    active
                      ? "bg-brand-primary/10 text-text-primary"
                      : "hover:bg-border/50 text-text-primary"
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    onNavigate?.();
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  <span className="block text-body font-medium leading-snug line-clamp-2">
                    {item.title}
                  </span>
                  <span className="mt-0.5 flex items-start justify-between gap-2">
                    <span className="min-w-0 flex-1 text-small text-text-secondary line-clamp-2">
                      {item.description}
                    </span>
                    <span className="shrink-0 text-help uppercase tracking-wide text-text-muted">
                      {KIND_LABEL[item.kind]}
                    </span>
                  </span>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
