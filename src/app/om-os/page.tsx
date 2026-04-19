import type { Metadata } from "next";
import Link from "next/link";
import {
  canonicalUrl,
  COMPANY_CVR,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
  PATH_KONTAKT,
} from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";

const title = "Om os";
const description =
  "Boligklarhed er en gratis boligomkostningsberegner til danske boligkøbere. Læs om formålet, hvem vi er til, og hvad du kan beregne.";
const ogDescription =
  "Gratis boligomkostningsberegner til danske boligkøbere. Få overblik over engangsomkostninger, månedlig ydelse og rentestest.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl("/om-os") },
  ...socialMetadata({
    path: "/om-os",
    title,
    description: ogDescription,
  }),
};

export default function OmOsPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-h1 text-text-primary mb-6">Om os</h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <section>
            <h2 className="text-h3 text-text-primary">Hvad er Boligklarhed?</h2>
            <p>
              Boligklarhed er et uafhængigt online værktøj til dig, der står over
              for et boligkøb og gerne vil forstå, hvad det reelt koster at købe
              og eje en bolig. Vi tilbyder to gratis beregnere: en{" "}
              <Link href={PATH_BOLIGOMKOSTNINGER_BEREGNER} className="text-brand-primary hover:underline">
                boligomkostningsberegner
              </Link>
              , der samler engangsudgifter, månedlig ydelse og rentestest for en
              given bolig – og en beregner{" "}
              <Link href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR} className="text-brand-primary hover:underline">
                Hvad kan jeg købe bolig for?
              </Link>
              , der ud fra din indtægt og gæld giver et vejledende lånerum og
              skøn over maksimal købspris. Begge værktøjer er beregnet til at
              give dig et bedre udgangspunkt, når du taler med bank eller mægler
              – ikke som erstatning for personlig rådgivning.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Hvem er det til?</h2>
            <p>
              Boligklarhed er til alle, der overvejer at købe bolig i Danmark –
              uanset om det er første gang eller du skifter til noget nyt. Vi
              har bygget beregneren og artiklerne, så du hurtigt kan få et
              overblik uden at skulle være ekspert i realkredit eller
              tinglysning. Målet er at gøre det lettere at træffe beslutninger på
              et oplyst grundlag og at sammenligne forskellige scenarier (fx
              købspris, udbetaling og rente) inden du taler med bank eller
              mægler.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Hvad kan du beregne?</h2>
            <p>
              I <strong>boligomkostningsberegneren</strong> indtaster du købspris,
              udbetaling, realkreditlån og evt. banklån, rente og løbetid. Du
              får engangsomkostninger (bl.a. tinglysning og pantafgift), den
              månedlige ydelse og en rentestest med +1 % og +2 % rente.
              Ejerudgifter, vedligehold og et valgfrit el-estimat kan medtages.
              I beregneren <strong>Hvad kan jeg købe bolig for?</strong> indtaster
              du din bruttoindtægt og evt. eksisterende gæld og får et
              vejledende lånerum og et skøn over maksimal købspris ved forskellig
              gearing. Du kan læse mere om begreberne i vores{" "}
              <Link href="/artikler" className="text-brand-primary hover:underline">
                artikler
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Uafhængighed og finansiering</h2>
            <p>
              Boligklarhed er et uafhængigt værktøj. Beregneren er gratis at
              bruge, og vi sælger ikke dine data. Vi kan modtage kommission fra
              partnere (fx ved henvisning til lån eller andre produkter). Det
              påvirker ikke de beregninger, du laver, og det koster ikke ekstra
              for dig. Vores formål er at give dig et gennemsigtigt overblik –
              ikke at sælge dig et bestemt lån eller produkt.
            </p>
            <p>
              For generel forbrugerinformation om lån og finansielle produkter
              kan du også se{" "}
              <a
                href="https://www.finanstilsynet.dk/finansielle-temaer/forbruger-og-investorinformation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                Finanstilsynets forbruger- og investorinformation
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Vejledende tal – ikke finansiel rådgivning</h2>
            <p>
              Alle tal i vores beregnere er <strong>vejledende</strong>. De
              bygger på officielle satser og typiske tommelfingerregler, men dine
              konkrete omkostninger og dit reelle lånerum afhænger af din
              situation, aftaler med bank og realkreditinstitut samt evt. særlige
              vilkår. Boligklarhed er ikke en bank eller en rådgiver – vi giver
              dig et værktøj til at blive klogere, så du kan indgå dialogen med
              de rigtige spørgsmål. Brug resultaterne som beslutningsstøtte og
              suppler med rådgivning fra bank, mægler eller advokat, når du
              træffer endelige valg. Læs mere i vores{" "}
              <Link href="/disclaimer" className="text-brand-primary hover:underline">
                ansvarsfraskrivelse
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Virksomhed</h2>
            <p>
              Boligklarhed
              {COMPANY_CVR ? (
                <>
                  {" "}
                  – CVR:{" "}
                  <span className="tabular-nums font-medium text-text-primary">
                    {COMPANY_CVR}
                  </span>
                </>
              ) : null}
              . Har du spørgsmål eller feedback?{" "}
              <Link href={PATH_KONTAKT} className="text-brand-primary hover:underline">
                Kontakt os
              </Link>
              .
            </p>
          </section>
        </div>

        <p className="mt-8">
          <Link
            href={PATH_KONTAKT}
            className="text-body text-brand-primary hover:underline"
          >
            Kontakt os
          </Link>
          {" · "}
          <Link
            href="/"
            className="text-body text-brand-primary hover:underline"
          >
            Tilbage til forsiden
          </Link>
          {" · "}
          <Link
            href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
            className="text-body text-brand-primary hover:underline"
          >
            Boligomkostningsberegner
          </Link>
          {" · "}
          <Link
            href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
            className="text-body text-brand-primary hover:underline"
          >
            Hvad kan jeg købe bolig for?
          </Link>
        </p>
      </div>
    </main>
  );
}
