import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Artikler",
  description:
    "Lær mere om boligkøb – tinglysning, realkreditlån, ejerskifteforsikring og andre vigtige emner.",
  alternates: { canonical: canonicalUrl("/artikler") },
};

const articles = [
  {
    slug: "tinglysning",
    title: "Hvad er tinglysning?",
    description: "Lær hvordan tinglysning sikrer dit ejerskab og hvilke afgifter der betales ved køb af bolig.",
  },
  {
    slug: "ejerskifteforsikring",
    title: "Hvad er en ejerskifteforsikring?",
    description: "Få overblik over hvad ejerskifteforsikring dækker, hvad den koster og om den er nødvendig for dig.",
  },
  {
    slug: "realkreditlan",
    title: "Realkreditlån: Sådan fungerer det",
    description: "Få overblik over realkreditlån, annuitetslån, F1/F3/F5 og hvordan din månedlige ydelse beregnes.",
  },
  {
    slug: "vedligehold",
    title: "Vedligehold af bolig: Hvor meget skal jeg sætte af?",
    description: "Lær tommelfingerreglen for vedligehold (1 % lejlighed, 1,5 % hus) og hvad pengene dækker over tid.",
  },
  {
    slug: "eksisterende-pantebrev",
    title: "Spar på tinglysning: Udnyt eksisterende pantebrev",
    description: "Lær hvordan du reducerer omkostningerne til tinglysning af pant ved at overtage eller genbruge allerede tinglyste pantebreve.",
  },
] as const;

/** Kategorier til artikler – SEO-venlige overskrifter med tilhørende artikel-slugs */
const categories = [
  {
    id: "engangsomkostninger",
    title: "Engangsomkostninger ved boligkøb",
    description: "Tinglysning, pant, forsikring og andre omkostninger ved overtagelse.",
    slugs: ["tinglysning", "ejerskifteforsikring", "eksisterende-pantebrev"] as const,
  },
  {
    id: "finansiering",
    title: "Finansiering og lån",
    description: "Realkreditlån, banklån og hvordan din boligydelse beregnes.",
    slugs: ["realkreditlan"] as const,
  },
  {
    id: "loebende",
    title: "Løbende omkostninger",
    description: "Vedligehold, ejerudgifter og månedlige boligomkostninger.",
    slugs: ["vedligehold"] as const,
  },
] as const;

function getArticlesBySlugs(slugs: readonly string[]) {
  return articles.filter((a) => slugs.includes(a.slug));
}

export default function ArtiklerPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-h1 text-text-primary mb-2">Artikler</h1>
        <p className="text-body text-text-secondary mb-8">
          Vejledning og viden om boligkøb – fra tinglysning og realkreditlån til
          ejerskifteforsikring og mere.
        </p>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-4 mb-10">
          <p>
            Artiklerne her på siden uddyber de vigtigste begreber, som du møder
            i boligomkostningsberegneren. Når du forstår, hvad tinglysning,
            pant, vedligeholdelse og forskellige lånetyper betyder i praksis,
            bliver det nemmere at vurdere, om tallene i beregningen passer til
            netop din situation – og om du er komfortabel med den samlede
            boligøkonomi.
          </p>
          <p>
            Du kan bruge artiklerne som et opslagsværk både før og efter, du
            laver en beregning. Hvis du f.eks. er i tvivl om, hvorfor der
            indgår en bestemt omkostning, eller hvad en ejerskifteforsikring
            dækker, kan du læse mere her og derefter gå tilbage til beregneren
            og justere dine tal. Målet er at gøre det lettere at træffe beslutning
            om boligkøb på et oplyst grundlag – uden at du skal være ekspert i
            jura eller finans.
          </p>
        </div>

        <div className="space-y-4" role="list">
          {categories.map((category) => {
            const categoryArticles = getArticlesBySlugs(category.slugs);
            return (
              <details
                key={category.id}
                className="group rounded-md border border-border bg-brand-surface shadow-soft overflow-hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-left hover:bg-border/30 transition-colors">
                  <div>
                    <h2 className="text-h3 text-text-primary">
                      {category.title}
                    </h2>
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
                  {categoryArticles.map((article) => (
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

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-4 mt-10">
          <h2 className="text-h3 text-text-primary">
            Sådan bruger du artiklerne sammen med beregneren
          </h2>
          <p>
            Hvis du er helt i starten af din boligrejse, kan du med fordel læse
            om tinglysning, pant og vedligehold, inden du laver din første
            beregning. Det giver dig en fornemmelse af, hvilke typer
            omkostninger der typisk opstår ved boligkøb, og hvorfor de kan fylde
            en del i budgettet – især første gang du køber bolig.
          </p>
          <p>
            Når du har prøvet beregneren af, kan du gå tilbage til artiklerne
            for at dykke ned i de områder, hvor du er mest i tvivl. Overvejer du
            f.eks. et realkreditlån med afdragsfrihed, kan du læse mere om
            realkreditlån og se, hvordan rente, løbetid og afdragsfrihed påvirker
            din risiko og dine samlede boligomkostninger. På den måde bliver
            artiklerne og boligomkostningsberegneren et samlet værktøj til at
            forstå både tal og begreber bag din boligøkonomi.
          </p>
        </div>

        <p className="mt-8">
          <Link
            href="/"
            className="text-body text-brand-primary hover:underline"
          >
            Tilbage til forsiden
          </Link>
        </p>
      </div>
    </main>
  );
}
