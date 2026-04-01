import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, PATH_BOLIGOMKOSTNINGER_BEREGNER } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { getArticleDates } from "@/lib/article-dates";
import { REALKREDITLAN_FAQ } from "@/lib/artikel-faq/realkreditlan";
import { getArticleSchema, getFaqPageSchema } from "@/lib/structured-data";
import { ArticleMeta } from "@/components/ArticleMeta";

const ARTICLE_PATH = "/artikler/realkreditlan";
const dates = getArticleDates(ARTICLE_PATH);
const faqSchema = getFaqPageSchema(REALKREDITLAN_FAQ);

const title = "Realkreditlån: Sådan fungerer det";
const description =
  "Realkreditlån: annuitet, F-kort, bidrag og ydelse. Beregn boliglån og boligomkostninger hos os.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl(ARTICLE_PATH) },
  ...socialMetadata({
    path: ARTICLE_PATH,
    title,
    description,
  }),
};

export default function RealkreditlanPage() {
  const articleSchema = getArticleSchema({
    title: "Realkreditlån: Sådan fungerer det",
    description:
      "Realkreditlån: annuitet, F-kort, bidrag og ydelse. Beregn boliglån og boligomkostninger hos os.",
    path: ARTICLE_PATH,
    datePublished: dates.datePublished,
    dateModified: dates.dateModified,
  });
  return (
    <main className="min-h-screen py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto max-w-2xl">
        <p className="mb-4">
          <Link
            href="/artikler"
            className="text-body text-brand-primary hover:underline"
          >
            ← Tilbage til Artikler
          </Link>
        </p>

        <h1 className="text-h1 text-text-primary mb-3">
          Realkreditlån: Sådan fungerer det
        </h1>
        <ArticleMeta {...dates} />

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
          <p>
            Vil du sammenligne realkredit med banklån, afdragsfrihed og rentetyper
            i ét overblik, kan du læse artiklen om{" "}
            <Link
              href="/artikler/sammenligning-af-laanetyper"
              className="text-brand-primary hover:underline font-medium"
            >
              sammenligning af lånetyper
            </Link>
            .
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvad er et realkreditlån?
            </h2>
            <p>
              Realkreditlån er boliglån, der er sikret med pant i fast ejendom
              og som følger særlige regler under{" "}
              <a
                href="https://www.retsinformation.dk/eli/lta/2025/571"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                realkreditloven
              </a>
              . De udbydes af{" "}
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
              <Link href={PATH_BOLIGOMKOSTNINGER_BEREGNER} className="text-brand-primary hover:underline font-medium">
                Beregn boligomkostninger
              </Link>{" "}
              til at indtaste købspris, belåning og rente – så får du et
              overblik over dine reelle boligomkostninger.
            </p>
          </section>

          <section aria-labelledby="faq-realkreditlan-heading">
            <h2
              id="faq-realkreditlan-heading"
              className="text-h3 text-text-primary mb-4"
            >
              Ofte stillede spørgsmål om realkreditlån
            </h2>
            <div className="space-y-5">
              {REALKREDITLAN_FAQ.map((item) => (
                <div key={item.question}>
                  <h3 className="text-body font-semibold text-text-primary mb-2">
                    {item.question}
                  </h3>
                  <p className="text-body text-text-secondary">{item.answer}</p>
                </div>
              ))}
            </div>
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
