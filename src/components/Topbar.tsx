"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { articleCategories, getArticlesBySlugs } from "@/lib/articles";
import { calculators } from "@/lib/calculators";
import { SiteSearch } from "@/components/SiteSearch";

const navLinks = [
  { href: "/", label: "Forside" },
  { href: "/om-os", label: "Om os" },
  { href: "/beregnere", label: "Beregnere" },
  { href: "/boligbegreber", label: "Boligbegreber" },
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

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

const topNavItemClass =
  "group relative inline-flex items-center px-2 py-2 rounded-md transition-colors transition-transform hover:-translate-y-0.5";
const mobileNavItemClass =
  "px-4 py-3 text-body font-medium text-text-primary hover:bg-border active:bg-border/80 rounded-md transition-colors transition-transform duration-150 active:scale-[0.985]";

export function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [artiklerOpen, setArtiklerOpen] = useState(false);
  const [beregnereOpen, setBeregnereOpen] = useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const [mobileBeregnereOpen, setMobileBeregnereOpen] = useState(false);
  const [mobileArtiklerOpen, setMobileArtiklerOpen] = useState(false);
  const [mobileExpandedCategoryId, setMobileExpandedCategoryId] = useState<string | null>(null);
  const artiklerRef = useRef<HTMLDivElement>(null);
  const beregnereRef = useRef<HTMLDivElement>(null);

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

  // Luk dropdowns ved klik udenfor (desktop)
  useEffect(() => {
    if (!artiklerOpen && !beregnereOpen) return;

    function onMouseDown(e: MouseEvent) {
      const target = e.target as Node | null;
      if (!target) return;

      if (artiklerOpen && artiklerRef.current && !artiklerRef.current.contains(target)) {
        setArtiklerOpen(false);
        setExpandedCategoryId(null);
      }
      if (
        beregnereOpen &&
        beregnereRef.current &&
        !beregnereRef.current.contains(target)
      ) {
        setBeregnereOpen(false);
      }
    }

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [artiklerOpen, beregnereOpen]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (artiklerOpen) {
        setArtiklerOpen(false);
        setExpandedCategoryId(null);
      }
      if (beregnereOpen) {
        setBeregnereOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [artiklerOpen, beregnereOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      setMobileBeregnereOpen(false);
      setMobileArtiklerOpen(false);
      setMobileExpandedCategoryId(null);
    }
  }, [menuOpen]);

  return (
    <header className="border-b border-border bg-brand-surface">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between gap-4 md:flex-row">
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="Boligklarhed – forsiden"
          >
            <Image
              src="/boligklarhed-logo.svg"
              alt="Boligklarhed logo"
              width={280}
              height={56}
              priority
              sizes="(min-width: 1024px) 280px, 200px"
              className="h-10 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop: nav + sitesøgning */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-6 min-w-0">
          <nav className="flex items-center gap-6 shrink-0">
            <Link
              href="/"
              className={`${topNavItemClass} text-body font-medium text-text-secondary hover:text-text-primary`}
            >
              <span className="relative z-10">Forside</span>
              <span className="pointer-events-none absolute left-2 right-2 bottom-1 h-0.5 bg-brand-primary origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
            <div
              className="relative"
              ref={beregnereRef}
            >
              <button
                type="button"
                onClick={() => {
                  setBeregnereOpen((prev) => !prev);
                  setArtiklerOpen(false);
                }}
                className={`${topNavItemClass} text-body font-medium text-text-secondary hover:text-text-primary cursor-pointer gap-2`}
                aria-haspopup="true"
                aria-expanded={beregnereOpen}
              >
                <span className="relative z-10 inline-flex items-center gap-1">
                  Beregnere
                  <ChevronDownIcon
                    className={`transition-transform ${beregnereOpen ? "rotate-180" : ""}`}
                  />
                </span>
                <span className="pointer-events-none absolute left-2 right-2 bottom-1 h-0.5 bg-brand-primary origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
              </button>
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
            <Link
              href="/boligbegreber"
              className={`${topNavItemClass} text-body font-medium text-text-secondary hover:text-text-primary`}
            >
              <span className="relative z-10">Boligbegreber</span>
              <span className="pointer-events-none absolute left-2 right-2 bottom-1 h-0.5 bg-brand-primary origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
            <div
              ref={artiklerRef}
              className="relative"
            >
              <button
                type="button"
                onClick={() => {
                  setArtiklerOpen((prev) => !prev);
                  setBeregnereOpen(false);
                  if (!artiklerOpen) setExpandedCategoryId(null);
                }}
                className={`${topNavItemClass} text-body font-medium text-text-secondary hover:text-text-primary cursor-pointer gap-2`}
                aria-haspopup="true"
                aria-expanded={artiklerOpen}
              >
                <span className="relative z-10 inline-flex items-center gap-1">
                  <span>Artikler</span>
                  <ChevronDownIcon
                    className={`transition-transform ${artiklerOpen ? "rotate-180" : ""}`}
                  />
                </span>
                <span className="pointer-events-none absolute left-2 right-2 bottom-1 h-0.5 bg-brand-primary origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
              </button>
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
              className={`${topNavItemClass} text-body font-medium text-text-secondary hover:text-text-primary`}
            >
              <span className="relative z-10">Om os</span>
              <span className="pointer-events-none absolute left-2 right-2 bottom-1 h-0.5 bg-brand-primary origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          </nav>
          <SiteSearch className="w-[min(100%,200px)] shrink-0" />
          </div>

          {/* Mobile/tablet: menu button */}
          <div className="flex items-center gap-2 lg:hidden">
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
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            aria-hidden
            onClick={() => setMenuOpen(false)}
          />
          <aside
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-brand-surface shadow-card z-50 lg:hidden flex flex-col"
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
            <div className="px-4 pb-4 border-b border-border">
              <SiteSearch
                className="w-full"
                onNavigate={() => setMenuOpen(false)}
              />
            </div>
            <nav className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col p-4 gap-1">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={mobileNavItemClass}
              >
                Forside
              </Link>
              <div className="rounded-md">
                <button
                  type="button"
                  onClick={() => {
                    setMobileBeregnereOpen((prev) => {
                      const next = !prev;
                      if (next) {
                        setMobileArtiklerOpen(false);
                        setMobileExpandedCategoryId(null);
                      }
                      return next;
                    });
                  }}
                  className={`${mobileNavItemClass} w-full flex items-center justify-between text-left`}
                  aria-expanded={mobileBeregnereOpen}
                >
                  <span>Beregnere</span>
                  <ChevronDownIcon
                    className={`transition-transform ${mobileBeregnereOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileBeregnereOpen && (
                  <div className="mt-1 ml-3 border-l-2 border-border pl-3 space-y-1">
                    <Link
                      href="/beregnere"
                      onClick={() => setMenuOpen(false)}
                      className="block py-1.5 text-small font-medium text-brand-primary hover:underline"
                    >
                      Alle beregnere →
                    </Link>
                    {calculators.map((calc) => (
                      <Link
                        key={calc.id}
                        href={calc.href}
                        onClick={() => setMenuOpen(false)}
                        className="block py-1.5 text-small text-text-secondary hover:text-brand-primary"
                      >
                        {calc.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href="/boligbegreber"
                onClick={() => setMenuOpen(false)}
                className={mobileNavItemClass}
              >
                Boligbegreber
              </Link>
              <div className="rounded-md">
                <button
                  type="button"
                  onClick={() => {
                    setMobileArtiklerOpen((prev) => {
                      const next = !prev;
                      if (next) {
                        setMobileBeregnereOpen(false);
                      } else {
                        setMobileExpandedCategoryId(null);
                      }
                      return next;
                    });
                  }}
                  className={`${mobileNavItemClass} w-full flex items-center justify-between text-left`}
                  aria-expanded={mobileArtiklerOpen}
                >
                  <span>Artikler</span>
                  <ChevronDownIcon
                    className={`transition-transform ${mobileArtiklerOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileArtiklerOpen && (
                  <div className="mt-1 ml-3 border-l-2 border-border pl-3 space-y-2">
                    <Link
                      href="/artikler"
                      onClick={() => setMenuOpen(false)}
                      className="block py-1.5 text-small font-medium text-brand-primary hover:underline"
                    >
                      Alle artikler →
                    </Link>
                    {articleCategories.map((category) => {
                      const isExpanded = mobileExpandedCategoryId === category.id;
                      const categoryArticles = getArticlesBySlugs([...category.slugs]);
                      return (
                        <div key={category.id}>
                          <button
                            type="button"
                            onClick={() =>
                              setMobileExpandedCategoryId(isExpanded ? null : category.id)
                            }
                            className="w-full flex items-center justify-between gap-2 py-1 text-left text-small font-medium text-text-primary"
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
                            <ul className="ml-2 mt-1 space-y-1 border-l border-border pl-2">
                              {categoryArticles.map((article) => (
                                <li key={article.slug}>
                                  <Link
                                    href={`/artikler/${article.slug}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="block py-1 text-small text-text-secondary hover:text-brand-primary"
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
                )}
              </div>
              <Link
                href="/om-os"
                onClick={() => setMenuOpen(false)}
                className={mobileNavItemClass}
              >
                Om os
              </Link>
            </nav>
          </aside>
        </>
      )}
    </header>
  );
}
