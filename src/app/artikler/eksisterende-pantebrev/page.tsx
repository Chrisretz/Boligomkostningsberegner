import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, PATH_BOLIGOMKOSTNINGER_BEREGNER } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { getArticleDates } from "@/lib/article-dates";
import { EKSISTERENDE_PANTEBREV_FAQ } from "@/lib/artikel-faq/eksisterende-pantebrev";
import { getArticleSchema, getFaqPageSchema } from "@/lib/structured-data";
import { ArticleMeta } from "@/components/ArticleMeta";

const ARTICLE_PATH = "/artikler/eksisterende-pantebrev";
const dates = getArticleDates(ARTICLE_PATH);
const faqSchema = getFaqPageSchema(EKSISTERENDE_PANTEBREV_FAQ);

const title = "Spar på tinglysning: Udnyt eksisterende pantebrev";
const description =
  "Spar på tinglysning: overtag eller genbrug eksisterende pantebrev ved boligkøb og refinansiering.";

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

export default function EksisterendePantebrevPage() {
  const articleSchema = getArticleSchema({
    title: "Spar på tinglysning: Udnyt eksisterende pantebrev",
    description:
      "Spar på tinglysning: overtag eller genbrug eksisterende pantebrev ved boligkøb og refinansiering.",
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
          Sådan sparer du på tinglysning ved at udnytte eksisterende pantebrev
        </h1>
        <ArticleMeta {...dates} />

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            Tinglysning af pant i forbindelse med realkreditlån koster penge: en
            fast afgift og en variabel afgift (procent af det pantsikrede
            beløb). Hvis der allerede ligger tinglyst pant på boligen – fx fra
            sælgers realkreditlån – kan du nogle gange udnytte eller overtage
            det eksisterende pantebrev i stedet for at tinglyse helt nyt pant.
            Det kan reducere dine engangsomkostninger ved boligkøb eller
            refinansiering. Her får du et overblik over hvordan det fungerer.
            Den officielle portal for tinglysning i Danmark er{" "}
            <a
              href="https://www.tinglysning.dk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary underline hover:no-underline"
            >
              tinglysning.dk
            </a>
            .
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvorfor koster tinglysning af pant?
            </h2>
            <p>
              Når du optager realkreditlån eller banklån med pant i boligen,
              skal panten tinglyses i Tingbogen. Det sikrer långiveren ret til
              at blive betalt ved salg af ejendommen. Tinglysningsafgiften ved
              oprettelse af pant består typisk af en fast del (fx 1.825 kr.) og
              en variabel del på 1,25 % af det beløb, der pantsættes. Jo højere
              beløb, jo højere afgift – derfor kan det give et pænt beløb at
              spare, hvis du kan undgå at tinglyse nyt pant for hele lånebeløbet.
            </p>
            <p>
              Læs mere om selve processen i vores artikel{" "}
              <Link href="/artikler/tinglysning" className="text-brand-primary hover:underline">
                Hvad er tinglysning?
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Overtagelse af pant ved boligkøb
            </h2>
            <p>
              Ved køb af bolig har sælger ofte et eller flere lån med tinglyst
              pant. I stedet for at du tager et helt nyt lån og tinglyser nyt
              pant for hele beløbet, kan du i mange tilfælde <strong>overtage
              sælgers realkreditlån</strong>. Når du overtager lånet, overtager
              du samtidig den pant, der allerede er tinglyst. Den del behøver
              ikke tinglyses igen – du sparer dermed tinglysningsafgift for det
              beløb, du overtager.
            </p>
            <p>
              Overtagelse er særligt relevant, hvis sælgers lån har en fornuftig
              rente og løbetid, og du alligevel skal låne omkring det samme
              beløb. Du betaler så typisk en mindre administrationsomkostning til
              realkreditinstituttet i stedet for fuld tinglysningsafgift. Hvis
              du skal låne mere end det, sælger har, bliver det ekstra beløb
              ofte finansieret med nyt lån og dermed evt. nyt pant – så du
              betaler tinglysning af pant kun af den <em>nye</em> del.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Refinansiering: Genbrug af samme prioritetsplads
            </h2>
            <p>
              Når du allerede har realkreditlån med tinglyst pant og ønsker at
              refinansiere – fx skifte til anden rente (F1, F3, F5) eller andet
              institut – behøver du ikke altid at tinglyse helt nyt pant.
              Realkreditinstitutter kan i visse tilfælde tillade, at det
              eksisterende pantebrev genbruges: den nye långiver overtager
              pantet i samme prioritetsplads (pantebrevsskift), så der ikke
              oprettes nyt pant i Tingbogen. Det medfører ofte lavere
              omkostninger end ved fuld ny tinglysning.
            </p>
            <p>
              Det afhænger af instituttet og den konkrete situation, om
              pantebrevsskift er muligt. Det er derfor værd at spørge din bank
              eller realkreditinstitut, om de kan udnytte det allerede tinglyste
              pant ved refinansiering, så I undgår unødvendig tinglysningsafgift.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvad kan du spare?
            </h2>
            <p>
              Den variable del af tinglysningsafgiften ved pant er 1,25 % af det
              pantsikrede beløb. Hvis du fx undgår at tinglyse nyt pant for
              2.000.000 kr., sparer du 1,25 % × 2.000.000 = 25.000 kr. i
              variabel afgift – plus du undgår eventuel ekstra fast afgift ved
              en ny tinglysning. Beløbet bliver hurtigt væsentligt ved store
              lån, så det kan betale sig at undersøge overtagelse eller
              pantebrevsskift.
            </p>
            <p>
              En boligomkostningsberegner viser typisk den fulde tinglysningsafgift
              ved nyt pant. Hvis du ved, at du kan overtage pant for en del af
              beløbet, kan du selv trække den tilsvarende andel fra i din
              vurdering af de reelle engangsomkostninger.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Når du ikke kan udnytte eksisterende pant
            </h2>
            <p>
              Overtagelse eller genbrug af pant er ikke altid muligt. Ved
              boligkøb afhænger det af, om sælgers lån kan overtages på
              fornuftige vilkår, og om beløbet matcher dit behov. Ved
              refinansiering bestemmer realkreditinstituttet, om de tilbyder
              pantebrevsskift. Hvis du skifter til et helt nyt lån med højere
              beløb eller anden struktur, kan det være nødvendigt at tinglyse
              nyt pant. Din bank eller rådgiver kan give svar på, hvad der
              gælder i din situation.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Sådan får du overblik over dine omkostninger
            </h2>
            <p>
              For at vurdere dine samlede engangsomkostninger ved boligkøb kan
              du bruge en beregner, der inkluderer tinglysning af skøde og pant.
              Hvis du har mulighed for at overtage pant eller genbruge
              eksisterende pantebrev, kan du justere tallene ned for den del,
              du sparer.
            </p>
            <p>
              <Link href={PATH_BOLIGOMKOSTNINGER_BEREGNER} className="text-brand-primary hover:underline font-medium">
                Beregn boligomkostninger
              </Link>{" "}
              til at se engangsomkostninger inkl. tinglysning – og brug
              derefter dialog med bank eller realkreditinstitut til at afklare,
              om du kan reducere omkostningerne ved at udnytte eksisterende pant.
            </p>
          </section>

          <section aria-labelledby="faq-eksisterende-pantebrev-heading">
            <h2
              id="faq-eksisterende-pantebrev-heading"
              className="text-h3 text-text-primary mb-4"
            >
              Ofte stillede spørgsmål om eksisterende pantebrev
            </h2>
            <div className="space-y-5">
              {EKSISTERENDE_PANTEBREV_FAQ.map((item) => (
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
              Du kan nogle gange reducere omkostningerne til tinglysning af pant
              ved at udnytte allerede tinglyste pantebreve. Ved boligkøb kan du
              overtage sælgers realkreditlån og dermed den tilhørende pant, så
              du undgår tinglysningsafgift for det beløb. Ved refinansiering kan
              pantebrevsskift eller genbrug af samme prioritetsplads give lavere
              omkostninger end fuld ny tinglysning. Spørg altid din bank eller
              realkreditinstitut, hvad der er muligt i din konkrete situation.
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
