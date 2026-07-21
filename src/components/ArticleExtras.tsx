"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  articleCategories,
  getArticlesBySlugs,
} from "@/lib/articles";
import { PATH_BOLIGOMKOSTNINGER_BEREGNER } from "@/lib/site";

/**
 * Fælles ekstra-indhold under alle artikler (via artikler/layout.tsx):
 * en beregner-CTA og relaterede artikler fra samme kategori.
 * Vises ikke på /artikler-oversigten.
 */
export function ArticleExtras() {
  const pathname = usePathname();
  const slug = pathname?.split("/")[2];
  if (!slug) return null;

  const category = articleCategories.find((c) =>
    (c.slugs as readonly string[]).includes(slug)
  );
  const related = category
    ? getArticlesBySlugs(
        (category.slugs as readonly string[]).filter((s) => s !== slug)
      ).slice(0, 3)
    : [];

  return (
    <div className="px-4 pb-4">
      <div className="container mx-auto max-w-2xl space-y-10">
        {/* Beregner-CTA */}
        <section
          className="rounded-xl bg-brand-primary text-white p-6 md:p-8 shadow-card"
          aria-label="Prøv boligomkostningsberegneren"
        >
          <p className="text-small font-semibold uppercase tracking-[0.15em] text-brand-accentLight mb-2">
            Fra teori til tal
          </p>
          <h2 className="text-h3 text-white mb-2">
            Hvad betyder det for din boligøkonomi?
          </h2>
          <p className="text-body text-white/80 mb-5 leading-relaxed">
            Beregn din samlede månedlige boligudgift – lån, bidrag,
            ejendomsskat, vedligehold og rentestest – på under et minut.
          </p>
          <Link
            href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
            className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 text-body font-semibold text-brand-primary bg-white rounded-md shadow-soft hover:bg-brand-background transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-primary"
          >
            Prøv beregneren →
          </Link>
        </section>

        {/* Relaterede artikler */}
        {related.length > 0 && (
          <section aria-label="Relaterede artikler">
            <h2 className="text-h3 text-text-primary mb-4">Læs også</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/artikler/${a.slug}`}
                  className="card-lift block p-4 rounded-lg border border-border bg-white shadow-soft hover:border-brand-primary group"
                >
                  <p className="text-body font-semibold text-text-primary group-hover:text-brand-primary leading-snug mb-1.5 break-words hyphens-auto">
                    {a.title}
                  </p>
                  <p className="text-small text-text-secondary leading-relaxed line-clamp-3 break-words hyphens-auto">
                    {a.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
