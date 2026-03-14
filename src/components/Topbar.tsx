"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Forside" },
  { href: "/artikler", label: "Artikler" },
  { href: "/om-os", label: "Om os" },
  { href: "/beregn", label: "Beregn" },
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
            <Link
              href="/artikler"
              className="text-body font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Artikler
            </Link>
            <Link
              href="/om-os"
              className="text-body font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Om os
            </Link>
            <Link
              href="/beregn"
              className="px-4 py-2 text-body font-medium text-white bg-brand-primary rounded-md hover:bg-brand-primaryHover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
            >
              Beregn
            </Link>
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
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={
                    href === "/beregn"
                      ? "px-4 py-3 text-body font-medium text-white bg-brand-primary rounded-md hover:bg-brand-primaryHover text-center"
                      : "px-4 py-3 text-body font-medium text-text-primary hover:bg-border rounded-md"
                  }
                >
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
        </>
      )}
    </header>
  );
}
