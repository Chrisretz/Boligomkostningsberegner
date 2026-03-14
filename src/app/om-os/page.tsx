import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Om os",
  description:
    "Boligklarhed er en gratis boligomkostningsberegner til danske boligkøbere. Læs om formålet, hvem vi er til, og hvad du kan beregne.",
  alternates: { canonical: canonicalUrl("/om-os") },
  openGraph: {
    title: "Om os | Boligklarhed",
    description:
      "Gratis boligomkostningsberegner til danske boligkøbere. Få overblik over engangsomkostninger, månedlig ydelse og rentestest.",
    url: canonicalUrl("/om-os"),
  },
};

export default function OmOsPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-h1 text-text-primary mb-6">Om os</h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <section>
            <h2 className="text-h3 text-text-primary">Hvad er Boligklarhed?</h2>
            <p>
              Boligklarhed er et uafhængigt online værktøj til dig, der står over
              for et boligkøb og gerne vil forstå, hvad det reelt koster at købe
              og eje en bolig. Vi tilbyder en gratis{" "}
              <Link href="/beregn" className="text-brand-primary hover:underline">
                boligomkostningsberegner
              </Link>
              , der samler de vigtigste omkostninger ét sted: engangsudgifter ved
              køb, månedlige udgifter til lån og ejerudgifter samt en rentestest,
              så du kan vurdere din boligøkonomi – også hvis renten stiger.
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
              I beregneren kan du indtaste købspris, udbetaling, realkreditlån
              og evt. banklån, rente og løbetid. Du får derefter et skøn over
              engangsomkostninger (bl.a. tinglysning og pantafgift), den
              månedlige ydelse og en rentestest med +1 % og +2 % rente.
              Ejerudgifter, vedligehold og et valgfrit el-estimat (baseret på
              antal personer) kan også medtages, så du får et samlet billede af
              den reelle månedlige boligudgift. Du kan læse mere om begreberne i
              vores{" "}
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
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Vejledende tal</h2>
            <p>
              Alle tal i beregneren er vejledende. De bygger på officielle
              satser og typiske tommelfingerregler, men dine konkrete
              omkostninger afhænger af din situation, aftaler med bank og
              realkreditinstitut samt evt. særlige vilkår. Vi anbefaler derfor,
              at du bruger resultaterne som et beslutningsstøtteværktøj og
              supplerer med rådgivning fra bank, mægler eller advokat, når du
              skal træffe endelige valg. Læs mere i vores{" "}
              <Link href="/disclaimer" className="text-brand-primary hover:underline">
                ansvarsfraskrivelse
              </Link>
              .
            </p>
          </section>
        </div>

        <p className="mt-8">
          <Link
            href="/"
            className="text-body text-brand-primary hover:underline"
          >
            Tilbage til forsiden
          </Link>
          {" · "}
          <Link
            href="/beregn"
            className="text-body text-brand-primary hover:underline"
          >
            Gå til beregneren
          </Link>
        </p>
      </div>
    </main>
  );
}
