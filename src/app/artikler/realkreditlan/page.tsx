import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Realkreditlån: Sådan fungerer det | Boligklarhed",
  description:
    "Få et overblik over realkreditlån i Danmark: annuitetslån, F1/F3/F5, bidrag og månedlig ydelse. Lær hvordan dit boliglån beregnes og brug vores beregner til at finde dine omkostninger.",
  alternates: { canonical: canonicalUrl("/artikler/realkreditlan") },
  openGraph: {
    title: "Realkreditlån: Sådan fungerer det",
    description:
      "Få et overblik over realkreditlån, annuitetslån og hvordan din månedlige ydelse beregnes. Brug vores beregner til at se dine reelle boligomkostninger.",
    url: canonicalUrl("/artikler/realkreditlan"),
  },
};

export default function RealkreditlanPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <p className="mb-4">
          <Link
            href="/artikler"
            className="text-body text-brand-primary hover:underline"
          >
            ← Tilbage til Artikler
          </Link>
        </p>

        <h1 className="text-h1 text-text-primary mb-8">
          Realkreditlån: Sådan fungerer det
        </h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            Et realkreditlån er det mest almindelige lån til boligkøb i Danmark.
            Lånet er sikret med pant i din bolig og udstedes gennem
            realkreditinstitutter, som refinansierer lånet ved at udstede
            obligationer på kapitalmarkedet. Her får du et overblik over hvordan
            realkreditlån fungerer, hvad den månedlige ydelse afhænger af, og
            hvordan du kan bruge en beregner til at få klarhed over dine reelle
            boligomkostninger.
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvad er et realkreditlån?
            </h2>
            <p>
              Realkreditlån er boliglån, der er sikret med pant i fast ejendom
              og som følger særlige regler under Realkreditloven. De udbydes af
              realkreditinstitutter (fx Totalkredit, Nykredit, RD og
              BRFkredit). Lånet er typisk opbygget som et annuitetslån, hvor du
              hver måned betaler en fast ydelse, der dækker både afdrag og
              renter. Over tid bliver renteandelen lavere og afdragsandelen
              højere.
            </p>
            <p>
              Fordelen ved realkredit er lavere rente end på et almindeligt
              banklån, fordi lånet er sikret i boligen og instituttet sælger
              obligationer til investorer. Du betaler derudover et bidrag til
              Realkreditforeningen, som dækker administration og misligholdelsesrisiko.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Annuitetslån: Sådan beregnes den månedlige ydelse
            </h2>
            <p>
              De fleste realkreditlån er annuitetslån. Det betyder, at den
              samlede ydelse (afdrag + renter) er den samme hver måned i hele
              lånets løbetid. I starten udgør renten den største del af ydelsen;
              med tiden bliver afdragene større og renten mindre, fordi
              gælden bliver lavere.
            </p>
            <p>
              Ydelsen afhænger af tre ting: lånebeløbet, renten og lånets
              løbetid (typisk 30 år). Jo lavere rente og jo længere løbetid, jo
              lavere er den månedlige ydelse – men jo længere løbetid, desto
              mere renter betaler du i alt. En boligomkostningsberegner kan vise
              dig den præcise månedlige ydelse ud fra din rente og din
              belåning.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              F1-, F3- og F5-lån: Rente fast eller variabel
            </h2>
            <p>
              Realkreditlån findes med forskellig rentebinding: F1 (kort rente,
              typisk justeret årligt), F3 (fast rente i 3 år), F5 (fast rente i
              5 år) og længere bindinger. F1 giver ofte den laveste startrente
              men større usikkerhed, når renten ændres. F3 og F5 giver
              forudsigelighed i en årrække til en lidt højere rente.
            </p>
            <p>
              Når du beregner dine boligomkostninger, bør du bruge den rente, du
              realistisk kan få (eller allerede har tilbudt), og evt. tage en
              rentestest med i overvejelserne – fx hvad der sker med ydelsen, hvis
              renten stiger med 1 eller 2 procentpoint. Det giver klarhed over,
              om du stadig har råd til boligen ved højere renter.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Bidrag og andre omkostninger ved realkredit
            </h2>
            <p>
              Ud over renten betaler du et bidrag til realkreditinstituttet. Det
              afhænger typisk af belåningsgraden: jo højere belåning (fx over 60
              % eller 80 % af vurderingen), jo højere bidrag. Bidraget er en
              årlig omkostning, der lægges oven i renten og indgår i den
              samlede finansieringsomkostning.
            </p>
            <p>
              Ved oprettelse af lånet betales der desuden tinglysningsafgift ved
              tinglysning af pant i ejendommen. Den består af en fast del og en
              variabel del (procent af det pantsikrede beløb) og bør medtages i
              din beregning af de samlede engangsomkostninger ved boligkøb.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Sådan får du klarhed over dine omkostninger
            </h2>
            <p>
              For at få et reelt billede af, hvad en bolig koster, bør du
              inkludere både den månedlige ydelse til realkreditlån og de
              engangsomkostninger ved køb – herunder tinglysning af skøde og
              pant, evt. ejerskifteforsikring – samt løbende ejerudgifter og
              vedligehold. En boligomkostningsberegner samler disse poster og
              kan vise både engangsbeløb, månedlige udgifter og en rentestest.
            </p>
            <p>
              <Link href="/beregn" className="text-brand-primary hover:underline font-medium">
                Brug vores beregner her
              </Link>{" "}
              til at indtaste købspris, belåning og rente – så får du et
              overblik over dine reelle boligomkostninger.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Opsummering</h2>
            <p>
              Realkreditlån er det mest almindelige boliglån i Danmark og er
              typisk annuitetslån med fast månedlig ydelse. Ydelsen afhænger af
              lånebeløb, rente og løbetid. Du kan vælge F1, F3 eller F5 (eller
              længere binding) afhængigt af behov for forudsigelighed. Husk
              bidrag og tinglysning af pant i dine samlede omkostninger, og brug
              en rentestest til at vurdere, om du har råd ved stigende renter.
            </p>
          </section>
        </div>

        <p className="mt-8">
          <Link
            href="/artikler"
            className="text-body text-brand-primary hover:underline"
          >
            Se alle artikler
          </Link>
        </p>
      </div>
    </main>
  );
}
