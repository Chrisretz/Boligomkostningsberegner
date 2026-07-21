"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Indholdsfortegnelse i artiklernes venstremargin.
 *
 * Overskrifterne læses fra DOM'en efter mount i stedet for at blive
 * vedligeholdt manuelt i hver artikel. Det holder komponenten i sync med
 * indholdet uden at røre de 19 artikelfiler.
 *
 * Vises kun på brede skærme (xl+), hvor marginen alligevel står tom, og
 * kun på artikler med mindst 4 afsnit, hvor en oversigt gør nytte.
 */
const MIN_HEADINGS = 4;
/** Afstand fra toppen, så overskriften ikke gemmer sig bag topbaren. */
const SCROLL_MARGIN_PX = 96;

type Heading = { id: string; text: string };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function ArticleToc() {
  const pathname = usePathname();
  const isArticle = Boolean(pathname && pathname.startsWith("/artikler/"));

  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!isArticle) {
      setHeadings([]);
      return;
    }

    const nodes = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("main .prose h2")
    );
    if (nodes.length < MIN_HEADINGS) {
      setHeadings([]);
      return;
    }

    const used = new Set<string>();
    const found: Heading[] = nodes.map((node, i) => {
      const text = (node.textContent || "").trim();
      let id = node.id || slugify(text) || `afsnit-${i + 1}`;
      while (used.has(id)) id = `${id}-${i}`;
      used.add(id);
      node.id = id;
      node.style.scrollMarginTop = `${SCROLL_MARGIN_PX}px`;
      return { id, text };
    });
    setHeadings(found);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: `-${SCROLL_MARGIN_PX}px 0px -65% 0px`, threshold: 0 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [isArticle, pathname]);

  if (!isArticle || headings.length === 0) return null;

  return (
    <nav
      aria-label="Indhold på siden"
      className="hidden xl:block fixed left-4 2xl:left-10 top-32 w-52 2xl:w-60 max-h-[calc(100vh-12rem)] overflow-y-auto"
    >
      <p className="text-small font-semibold uppercase tracking-[0.15em] text-brand-accent mb-3">
        På denne side
      </p>
      <ul className="space-y-2 border-l border-border pl-3">
        {headings.map((h) => {
          const isActive = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block text-small leading-snug transition-colors hover:text-brand-primary ${
                  isActive
                    ? "text-brand-primary font-medium"
                    : "text-text-secondary"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
