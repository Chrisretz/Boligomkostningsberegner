"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { articleCategories, articles, getArticlesBySlugs } from "@/lib/articles";

const normalize = (val: string) =>
  val
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function ArticlesSearch() {
  const [query, setQuery] = useState("");

  const normalizedQuery = useMemo(
    () => normalize(query.trim()),
    [query]
  );

  const matchedBySlug = useMemo(() => {
    if (!normalizedQuery) return null;

    const matched = new Set(
      articles
        .filter((a) => {
          const haystack = normalize(
            `${a.title} ${a.description} ${a.slug}`
          );
          return haystack.includes(normalizedQuery);
        })
        .map((a) => a.slug)
    );

    return matched;
  }, [normalizedQuery]);

  const resultsCount = useMemo(() => {
    if (!matchedBySlug) return articles.length;
    return matchedBySlug.size;
  }, [matchedBySlug]);

  return (
    <div className="space-y-6">
      <div className="bg-brand-surface rounded-md border border-border shadow-soft p-5">
        <div className="flex flex-col gap-1">
          <div className="min-w-0">
            <label
              htmlFor="artikel-search"
              className="block text-small text-text-secondary mb-1"
            >
              Søg i artikler
            </label>
            <div className="relative w-full md:w-[520px]">
              <input
                id="artikel-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Skriv fx tinglysning, realkreditlån eller ejerskifteforsikring…"
                className="w-full px-4 py-2.5 bg-white border border-border rounded-md pr-12 text-body text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              {query.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Ryd søgning"
                  className="absolute right-3 inset-y-0 my-auto flex items-center justify-center w-8 h-8 text-[18px] text-text-muted hover:text-text-primary rounded focus:outline-none focus:ring-2 focus:ring-brand-primary leading-none"
                >
                  ×
                </button>
              )}
            </div>

            <div className="mt-2 text-small text-text-muted text-left">
              {resultsCount} resultat{resultsCount === 1 ? "" : "er"}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4" role="list">
        {articleCategories.map((category) => {
          const categoryArticles = getArticlesBySlugs([...category.slugs]);
          const filteredArticles =
            matchedBySlug === null
              ? categoryArticles
              : categoryArticles.filter((a) => matchedBySlug.has(a.slug));

          const showCategory = filteredArticles.length > 0;
          if (!showCategory) return null;

          return (
            <details
              key={category.id}
              open={normalizedQuery.length > 0}
              className="group rounded-md border border-border bg-brand-surface shadow-soft overflow-hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-left hover:bg-border/30 transition-colors">
                <div>
                  <h2 className="text-h3 text-text-primary">{category.title}</h2>
                  <p className="mt-1 text-small text-text-secondary">
                    {category.description}
                  </p>
                </div>
                <span className="text-xl text-text-muted shrink-0 group-open:hidden">
                  +
                </span>
                <span className="text-xl text-text-muted shrink-0 hidden group-open:inline">
                  −
                </span>
              </summary>

              <ul className="border-t border-border px-4 pb-4 pt-2 space-y-3">
                {filteredArticles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/artikler/${article.slug}`}
                      className="block p-3 rounded-lg border border-border bg-brand-background hover:border-border-strong hover:bg-border/20 transition-colors group"
                    >
                      <h3 className="text-body font-semibold text-text-primary group-hover:text-brand-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="mt-1 text-small text-text-secondary">
                        {article.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>

      {normalizedQuery.length > 0 && resultsCount === 0 && (
        <div className="bg-brand-surface rounded-md border border-border shadow-soft p-6 text-center text-text-muted">
          Ingen artikler matcher din søgning.
        </div>
      )}
    </div>
  );
}

