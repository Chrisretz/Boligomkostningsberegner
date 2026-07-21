"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  articleCategories,
  articles,
  getArticlesBySlugs,
  STARTER_SLUGS,
} from "@/lib/articles";
import { getReadingTime } from "@/lib/article-reading-time";

const normalize = (val: string) =>
  val
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

function ArticleCard({
  slug,
  title,
  description,
}: {
  slug: string;
  title: string;
  description: string;
}) {
  const minutes = getReadingTime(`/artikler/${slug}`);
  return (
    <Link
      href={`/artikler/${slug}`}
      className="card-lift flex h-full flex-col p-4 rounded-lg border border-border bg-white shadow-soft hover:border-brand-primary group"
    >
      <h3 className="text-body font-semibold text-text-primary group-hover:text-brand-primary transition-colors leading-snug break-words hyphens-auto">
        {title}
      </h3>
      <p className="mt-1.5 text-small text-text-secondary leading-relaxed flex-1 break-words hyphens-auto line-clamp-4">
        {description}
      </p>
      {minutes != null && (
        <p className="mt-3 text-small text-text-muted">
          {minutes} min. læsning
        </p>
      )}
    </Link>
  );
}

export function ArticlesSearch() {
  const [query, setQuery] = useState("");

  const normalizedQuery = useMemo(() => normalize(query.trim()), [query]);

  const matchedBySlug = useMemo(() => {
    if (!normalizedQuery) return null;
    return new Set(
      articles
        .filter((a) =>
          normalize(`${a.title} ${a.description} ${a.slug}`).includes(
            normalizedQuery
          )
        )
        .map((a) => a.slug)
    );
  }, [normalizedQuery]);

  const resultsCount = matchedBySlug ? matchedBySlug.size : articles.length;
  const isSearching = normalizedQuery.length > 0;
  const starters = getArticlesBySlugs([...STARTER_SLUGS]);

  return (
    <div className="space-y-10">
      <div className="bg-brand-surface rounded-md border border-border shadow-soft p-5">
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
        <p className="mt-2 text-small text-text-muted">
          {resultsCount} resultat{resultsCount === 1 ? "" : "er"}
        </p>
      </div>

      {/* Start her – kun når man ikke søger */}
      {!isSearching && (
        <section
          aria-labelledby="start-her-heading"
          className="rounded-xl border border-border bg-brand-background p-5 md:p-6"
        >
          <p className="text-small font-semibold uppercase tracking-[0.15em] text-brand-accent mb-1">
            Ny på Boligklarhed?
          </p>
          <h2
            id="start-her-heading"
            className="text-h3 text-text-primary mb-4"
          >
            Start her
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {starters.map((a) => (
              <ArticleCard key={a.slug} {...a} />
            ))}
          </div>
        </section>
      )}

      {articleCategories.map((category) => {
        const categoryArticles = getArticlesBySlugs([...category.slugs]);
        const filtered =
          matchedBySlug === null
            ? categoryArticles
            : categoryArticles.filter((a) => matchedBySlug.has(a.slug));
        if (filtered.length === 0) return null;

        return (
          <section key={category.id} aria-labelledby={`cat-${category.id}`}>
            <h2
              id={`cat-${category.id}`}
              className="text-h3 text-text-primary mb-1"
            >
              {category.title}
            </h2>
            <p className="text-small text-text-secondary mb-4">
              {category.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((a) => (
                <ArticleCard key={a.slug} {...a} />
              ))}
            </div>
          </section>
        );
      })}

      {isSearching && resultsCount === 0 && (
        <div className="bg-brand-surface rounded-md border border-border shadow-soft p-6 text-center text-text-muted">
          Ingen artikler matcher din søgning.
        </div>
      )}
    </div>
  );
}
