"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { articleCategories, getArticlesBySlugs } from "@/lib/articles";
import { calculators } from "@/lib/calculators";

const navLinks = [
  { href: "/", label: "Forside" },
  { href: "/om-os", label: "Om os" },
  { href: "/beregnere", label: "Beregnere" },
] as const;

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [artiklerOpen, setArtiklerOpen] = useState(false);
  const [beregnereOpen, setBeregnereOpen] = useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const artiklerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [menuOpen]);

  return (
    <header className="border-b border-border bg-brand-surface">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between md:flex-row md:gap-4">
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="Boligklarhed – forsiden"
          >
            <img
              src="/boligklarhed-logo.svg"
              alt="Boligklarhed logo"
              className="h-10 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop: inline nav */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            <Link
              href="/"
              className="text-body font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Forside
            </Link>
            <div
              ref={artiklerRef}
              className="relative"
              onMouseEnter={() => setArtiklerOpen(true)}
              onMouseLeave={() => {
                setArtiklerOpen(false);
                setExpandedCategoryId(null);
              }}
            >
              <span
                className="text-body font-medium text-text-secondary hover:text-text-primary transition-colors cursor-default"
                aria-haspopup="true"
                aria-expanded={artiklerOpen}
              >
                Artikler
              </span>
              {artiklerOpen && (
                <div className="absolute left-0 top-full pt-2 z-50 min-w-[280px]">
                  <div className="bg-brand-surface border border-border rounded-md shadow-card py-2">
                    <Link
                      href="/artikler"
                      className="block px-4 py-2 text-body text-brand-primary hover:bg-border/50 font-medium"
                    >
                      Alle artikler →
                    </Link>
                    <div className="border-t border-border mt-2 pt-2">
                      {articleCategories.map((category) => {
                        const isExpanded = expandedCategoryId === category.id;
                        const categoryArticles = getArticlesBySlugs([...category.slugs]);
                        return (
                          <div key={category.id} className="px-2 pb-1 last:pb-0">
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedCategoryId(isExpanded ? null : category.id)
                              }
                              className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-body font-medium text-text-primary hover:bg-border/50 rounded-md"
                            >
                              <span>{category.title}</span>
                              <span
                                className="text-text-muted font-medium tabular-nums"
                                aria-hidden
                              >
                                {isExpanded ? "−" : "+"}
                              </span>
                            </button>
                            {isExpanded && (
                              <ul className="ml-3 mt-1 space-y-0.5 border-l-2 border-border pl-3">
                                {categoryArticles.map((article) => (
                                  <li key={article.slug}>
                                    <Link
                                      href={`/artikler/${article.slug}`}
                                      className="block py-1.5 text-small text-text-secondary hover:text-brand-primary"
                                    >
                                      {article.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/om-os"
              className="text-body font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Om os
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setBeregnereOpen(true)}
              onMouseLeave={() => setBeregnereOpen(false)}
            >
              <Link
                href="/beregnere"
                className="px-4 py-2 text-body font-medium text-white bg-brand-primary rounded-md hover:bg-brand-primaryHover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors inline-block"
                aria-haspopup="true"
                aria-expanded={beregnereOpen}
              >
                Beregnere
              </Link>
              {beregnereOpen && (
                <div className="absolute right-0 top-full pt-2 z-50 min-w-[260px]">
                  <div className="bg-brand-surface border border-border rounded-md shadow-card py-2">
                    <Link
                      href="/beregnere"
                      className="block px-4 py-2 text-body text-brand-primary hover:bg-border/50 font-medium"
                    >
                      Alle beregnere →
                    </Link>
                    <div className="border-t border-border mt-2 pt-2">
                      {calculators.map((calc) => (
                        <Link
                          key={calc.id}
                          href={calc.href}
                          className="block px-4 py-2 text-body text-text-primary hover:bg-border/50"
                        >
                          {calc.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile/tablet: menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex flex-col items-center gap-0.5 text-text-primary hover:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded p-2"
              aria-label="Åbn menu"
              aria-expanded={menuOpen}
            >
              <MenuIcon />
              <span className="text-small font-medium">Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/tablet: overlay menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            aria-hidden
            onClick={() => setMenuOpen(false)}
          />
          <aside
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-brand-surface shadow-card z-50 md:hidden flex flex-col"
            role="dialog"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="text-h3 text-text-primary font-semibold">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex flex-col items-center gap-0.5 text-text-primary hover:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded p-2"
                aria-label="Luk menu"
              >
                <CloseIcon />
                <span className="text-small font-medium">Luk</span>
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-1">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-body font-medium text-text-primary hover:bg-border rounded-md"
              >
                Forside
              </Link>
              <Link
                href="/artikler"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-body font-medium text-text-primary hover:bg-border rounded-md"
              >
                Artikler
              </Link>
              <Link
                href="/om-os"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-body font-medium text-text-primary hover:bg-border rounded-md"
              >
                Om os
              </Link>
              <Link
                href="/beregnere"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-body font-medium text-white bg-brand-primary rounded-md hover:bg-brand-primaryHover text-center"
              >
                Beregnere
              </Link>
            </nav>
          </aside>
        </>
      )}
    </header>
  );
}
