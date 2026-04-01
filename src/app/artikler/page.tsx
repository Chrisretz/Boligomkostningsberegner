import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { ArticlesSearch } from "@/components/ArticlesSearch";

const title = "Artikler";
const description =
  "Lær mere om boligkøb – tinglysning, realkreditlån, ejerskifteforsikring og andre vigtige emner.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl("/artikler") },
  ...socialMetadata({
    path: "/artikler",
    title,
    description,
  }),
};

export default function ArtiklerPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-h1 text-text-primary mb-2">Artikler</h1>
        <p className="text-body text-text-secondary mb-8">
          Vejledning og viden om boligkøb – fra tinglysning og realkreditlån til
          ejerskifteforsikring og mere. Officielle oplysninger om bolig, flytning
          og dine rettigheder som forbruger samler også{" "}
          <a
            href="https://www.borger.dk/bolig-og-flytning"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary underline hover:no-underline"
          >
            Borger.dk under bolig og flytning
          </a>
          .
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

        <ArticlesSearch />

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
