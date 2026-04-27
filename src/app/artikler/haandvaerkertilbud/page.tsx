import type { Metadata } from "next";
import Link from "next/link";
import {
  canonicalUrl,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
} from "@/lib/site";
import { getArticleDates } from "@/lib/article-dates";
import { HAANDVAERKERTILBUD_FAQ } from "@/lib/artikel-faq/haandvaerkertilbud";
import { socialMetadata } from "@/lib/social-metadata";
import { getArticleSchema, getFaqPageSchema } from "@/lib/structured-data";
import { ArticleMeta } from "@/components/ArticleMeta";

const ARTICLE_PATH = "/artikler/haandvaerkertilbud";
const dates = getArticleDates(ARTICLE_PATH);
const faqSchema = getFaqPageSchema(HAANDVAERKERTILBUD_FAQ);

const title =
  "H�ndv�rkertilbud: guide til boligk�b, renovering, budget og faldgruber";
const description =
  "Hvad betyder h�ndv�rkertilbud? F� overblik over pris, renoveringsbudget, tjekliste f�r k�b, finansiering, buffer til uforudsete udgifter � og hvordan du indhenter tilbud fra h�ndv�rkere.";

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

export default function HaandvaerkertilbudPage() {
  const articleSchema = getArticleSchema({
    title,
    description,
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
            {"\u2190"} Tilbage til Artikler
          </Link>
        </p>

        <h1 className="text-h1 text-text-primary mb-3">
          H�ndv�rkertilbud: guide til boligk�b, renovering, budget og faldgruber
        </h1>
        <ArticleMeta {...dates} />

        <article className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            <strong className="text-text-primary">H�ndv�rkertilbud</strong> kan
            betyde to ting i praksis: enten en bolig, der kr�ver renovering,
            eller et pristilbud fra en h�ndv�rker. I denne guide fokuserer vi
            prim�rt p� h�ndv�rkertilbud som{" "}
            <strong className="text-text-primary">boligtype</strong> � men du
            f�r ogs� en konkret metode til at indhente og sammenligne{" "}
            <strong className="text-text-primary">
              h�ndv�rkertilbud (tilbud fra fagfolk)
            </strong>
            , n�r du skal renovere.
          </p>

          <section aria-labelledby="featured-snippet">
            <h2
              id="featured-snippet"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Kort svar: hvad er et h�ndv�rkertilbud?
            </h2>
            <p>
              Et h�ndv�rkertilbud er typisk en bolig, der s�lges billigere end
              en indflytningsklar bolig, fordi den kr�ver{" "}
              <strong className="text-text-primary">
                renovering, istands�ttelse eller modernisering
              </strong>
              . Prisen kan v�re attraktiv, men du b�r altid medregne
              renoveringsbudget, finansiering og en buffer til uforudsete
              udgifter, f�r du beslutter dig.
            </p>
          </section>

          <section aria-labelledby="hvad-betyder">
            <h2
              id="hvad-betyder"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Hvad betyder �h�ndv�rkertilbud�? (to betydninger)
            </h2>
            <h3 className="text-h3 text-text-primary pt-2">
              1) H�ndv�rkertilbud som bolig, du k�ber
            </h3>
            <p>
              I boligannoncer bruges �h�ndv�rkertilbud� ofte om et hus eller en
              lejlighed, der tr�nger til en k�rlig h�nd. Boligen kan fx have
              behov for nyt tag, opdateret el/VVS, energiforbedringer eller et
              nyt k�kken/bad.
            </p>
            <p>
              EDC peger fx p�, at h�ndv�rkertilbud/d�dsbo i perioder kan v�re
              markant billigere pr. kvm end mere indflytningsklare huse � men at
              du skal unders�ge renoveringsbehov og risiko grundigt f�r k�b. Se{" "}
              <a
                href="https://www.edc.dk/nyhedsartikler/har-du-kig-paa-et-haandvaerkertilbud/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                EDC�s guide til h�ndv�rkertilbud
              </a>
              .
            </p>

            <h3 className="text-h3 text-text-primary pt-4">
              2) H�ndv�rkertilbud som tilbud fra h�ndv�rkere
            </h3>
            <p>
              I h�ndv�rker-branchen betyder �h�ndv�rkertilbud� ofte bare et
              pristilbud p� en opgave � fx maling, tag, k�kken, bad eller
              energirenovering. Hvis du k�ber en renoveringsbolig, ender du
              n�sten altid med at skulle indhente flere tilbud, s� du kan
              sammenligne pris, materialer, tidsplan og forbehold.
            </p>
          </section>

          <section aria-labelledby="fordele-ulemper">
            <h2
              id="fordele-ulemper"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Fordele og ulemper ved at k�be et h�ndv�rkertilbud
            </h2>

            <h3 className="text-h3 text-text-primary pt-2">Fordele</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">Lavere k�bspris:</strong>{" "}
                Ofte billigere end indflytningsklar bolig, fordi stand og
                renoveringsbehov tr�kker prisen ned.
              </li>
              <li>
                <strong className="text-text-primary">
                  Mulighed for at s�tte dit pr�g:
                </strong>{" "}
                Du kan renovere efter dine behov og prioriteter.
              </li>
              <li>
                <strong className="text-text-primary">
                  Potentiale for v�rdistigning:
                </strong>{" "}
                En velplanlagt renovering kan �ge v�rdien, hvis totalbudgettet
                holder.
              </li>
              <li>
                <strong className="text-text-primary">
                  Bedre beliggenhed for pengene:
                </strong>{" "}
                Nogle kan k�be i et dyrere omr�de ved at acceptere, at boligen
                kr�ver arbejde.
              </li>
            </ul>

            <h3 className="text-h3 text-text-primary pt-4">Ulemper</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-text-primary">
                  Uforudsete udgifter:
                </strong>{" "}
                Skjulte fejl (fugt, r�d, el/VVS, asbest) kan dukke op undervejs.
              </li>
              <li>
                <strong className="text-text-primary">Tidsforbrug:</strong>{" "}
                Renovering tager ofte l�ngere end man forventer.
              </li>
              <li>
                <strong className="text-text-primary">
                  Sv�rere finansiering:
                </strong>{" "}
                Banken vil ofte se renoveringsbudget og samlet �konomi tidligt.
              </li>
              <li>
                <strong className="text-text-primary">Stress i hverdagen:</strong>{" "}
                St�v, st�j og midlertidige l�sninger (eller midlertidig bolig).
              </li>
            </ul>
          </section>

          <section aria-labelledby="budget">
            <h2
              id="budget"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              �konomisk overblik: mere end bare k�bsprisen
            </h2>
            <p>
              Den st�rste fejl ved h�ndv�rkertilbud er at fokusere p� den lave
              k�bspris � og undervurdere total�konomien. En enkel m�de at t�nke
              det p� er:
            </p>
            <div className="rounded-md border border-border bg-brand-background/50 p-4 not-prose">
              <p className="m-0 text-text-secondary">
                <strong className="text-text-primary">
                  K�bspris + renovering + buffer + handelsomkostninger
                </strong>{" "}
                = din samlede investering.
              </p>
            </div>

            <h3 className="text-h3 text-text-primary pt-4">
              Eksempel p� et simpelt renoveringsbudget
            </h3>
            <div className="overflow-x-auto rounded-md border border-border my-4 not-prose">
              <table className="w-full text-left text-small md:text-body">
                <caption className="sr-only">
                  Eksempelbudget for k�b og renovering af h�ndv�rkertilbud
                </caption>
                <thead>
                  <tr className="border-b border-border bg-brand-surface">
                    <th className="py-2 px-3 font-semibold text-text-primary">
                      Post
                    </th>
                    <th className="py-2 px-3 font-semibold text-text-primary">
                      Eksempel
                    </th>
                    <th className="py-2 px-3 font-semibold text-text-primary">
                      Noter
                    </th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">K�bspris</td>
                    <td className="py-2 px-3">2.500.000 kr.</td>
                    <td className="py-2 px-3">Forhandlet pris</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Renovering</td>
                    <td className="py-2 px-3">750.000 kr.</td>
                    <td className="py-2 px-3">Tilbud + materialer</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Buffer (15 %)</td>
                    <td className="py-2 px-3">112.500 kr.</td>
                    <td className="py-2 px-3">Til uforudsete udgifter</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3">Handelsomkostninger</td>
                    <td className="py-2 px-3">50.000�100.000 kr.</td>
                    <td className="py-2 px-3">
                      Fx{" "}
                      <Link
                        href="/artikler/tinglysning"
                        className="text-brand-primary underline hover:no-underline"
                      >
                        tinglysning
                      </Link>{" "}
                      og gebyrer
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-text-primary">
                      Samlet investering
                    </td>
                    <td className="py-2 px-3 font-semibold text-text-primary">
                      ca. 3,4 mio. kr.
                    </td>
                    <td className="py-2 px-3">F�r drift og vedligehold</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Vil du se, hvordan{" "}
              <strong className="text-text-primary">
                engangsudgifter og m�nedlige udgifter
              </strong>{" "}
              h�nger sammen i praksis? Brug{" "}
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary underline hover:no-underline"
              >
                boligomkostningsberegneren
              </Link>{" "}
              og stress-test renterne. Og hvis du er i startfasen, kan{" "}
              <Link
                href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
                className="text-brand-primary underline hover:no-underline"
              >
                �Hvad kan jeg k�be bolig for?�
              </Link>{" "}
              give en hurtig indikation af dit l�nerum (husk at t�nke renovering
              ind i totalbudgettet).
            </p>
          </section>

          <section aria-labelledby="tjekliste">
            <h2
              id="tjekliste"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Tjekliste f�r du k�ber et h�ndv�rkertilbud
            </h2>
            <p>
              Jo bedre du unders�ger boligen, jo nemmere er det at holde budget
              og undg� de store overraskelser. Brug denne tjekliste som udgangspunkt:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                L�s tilstandsrapport og elinstallationsrapport grundigt (og f�
                hj�lp hvis du er i tvivl).
              </li>
              <li>
                Tjek{" "}
                <Link
                  href="/artikler/energimaerker-og-boligokonomi"
                  className="text-brand-primary underline hover:no-underline"
                >
                  energim�rket
                </Link>{" "}
                og overvej energiforbedringer som en del af renoveringen.
              </li>
              <li>
                F� en byggesagkyndig med p� fremvisning, is�r ved k�lder, tag og
                fugtproblemer.
              </li>
              <li>
                Unders�g servitutter og lokalplan (kan begr�nse ombygning og
                tilbygning). Officiel vejledning findes bl.a. p�{" "}
                <a
                  href="https://www.borger.dk/bolig-og-flytning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary underline hover:no-underline"
                >
                  Borger.dk
                </a>
                .
              </li>
              <li>
                Indhent 2�3 konkrete h�ndv�rkertilbud p� de store poster (tag,
                bad, el/VVS) og l�g en buffer p� 10�20 %.
              </li>
              <li>
                Tal med banken om finansiering og{" "}
                <Link
                  href="/artikler/saadan-vurderer-banken-dit-boliglan"
                  className="text-brand-primary underline hover:no-underline"
                >
                  kreditvurdering
                </Link>{" "}
                f�r du byder.
              </li>
              <li>
                Husk l�bende udgifter som{" "}
                <Link
                  href="/artikler/ejerudgifter"
                  className="text-brand-primary underline hover:no-underline"
                >
                  ejerudgifter
                </Link>{" "}
                og{" "}
                <Link
                  href="/artikler/vedligehold"
                  className="text-brand-primary underline hover:no-underline"
                >
                  vedligehold
                </Link>{" "}
                (ofte overset i renoveringscases).
              </li>
            </ol>
          </section>

          <section aria-labelledby="kan-det-betale-sig">
            <h2
              id="kan-det-betale-sig"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              Kan et h�ndv�rkertilbud betale sig?
            </h2>
            <p>
              Det kan det � men kun hvis totalbudget og risiko er under kontrol.
              En enkel tommelfingerregel er at sammenholde samlet investering
              med forventet markedsv�rdi efter renovering:
            </p>
            <div className="rounded-md border border-border bg-brand-background/50 p-4 not-prose">
              <p className="m-0 text-text-secondary">
                <strong className="text-text-primary">
                  Forventet v�rdi efter renovering � samlet investering
                </strong>{" "}
                = potentiel gevinst/tab (f�r salgsomkostninger og skat).
              </p>
            </div>
            <p>
              Overvej ogs�, hvad det koster at bo i boligen undervejs: ekstra
              leje, dobbelt boligudgift, h�jere forbrug i en d�rlig isoleret
              bolig, og tiden du selv l�gger i projektet.
            </p>
          </section>

          <section aria-labelledby="diy">
            <h2 id="diy" className="text-h2 text-text-primary scroll-mt-24">
              Hvad kan du selv lave � og hvad b�r fagfolk st� for?
            </h2>
            <h3 className="text-h3 text-text-primary pt-2">
              Opgaver mange selv kan klare
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maling, spartling og lettere overfladearbejde</li>
              <li>Nedrivning af ikke-b�rende elementer (med omtanke)</li>
              <li>Montering af k�kkenmoduler (uden autorisationskrav)</li>
              <li>Gulvarbejde (afh�nger af erfaring og underlag)</li>
            </ul>
            <h3 className="text-h3 text-text-primary pt-4">
              Opgaver du typisk b�r overlade til fagfolk
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>El-arbejde og tavle (kr�ver autorisation)</li>
              <li>VVS og v�drum (stor risiko ved fejl)</li>
              <li>Tag og b�rende konstruktioner</li>
              <li>Fugt, skimmel og k�lderproblemer</li>
            </ul>
          </section>

          <section aria-labelledby="haandvaerker-tilbud">
            <h2
              id="haandvaerker-tilbud"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              S�dan indhenter og sammenligner du tilbud fra h�ndv�rkere
            </h2>
            <p>
              N�r du skal renovere, er det ofte de store poster (bad, tag, el,
              VVS), der afg�r om budgettet holder. Brug denne proces:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Beskriv opgaven konkret (m�l, materialer, standard, deadlines).
              </li>
              <li>
                Tag billeder og vedh�ft plantegning/tegninger hvis du har dem.
              </li>
              <li>
                Indhent mindst 2�3 skriftlige tilbud og sammenlign forbehold.
              </li>
              <li>
                Sammenlign ikke kun pris: tjek materialer, tidsplan, garanti og
                oprydning/affald.
              </li>
              <li>
                V�lg ikke automatisk det billigste � det dyreste er ofte
                forsinkelser og fejl.
              </li>
            </ol>
            <p>
              Vil du hurtigt indhente flere tilbud, kan du fx bruge tjenester
              som{" "}
              <a
                href="https://www.3byggetilbud.dk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                3byggetilbud.dk
              </a>{" "}
              og{" "}
              <a
                href="https://www.haandvaerker.dk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                h�ndvaerker.dk
              </a>
              . Til inspiration om selve boligtypen kan du ogs� l�se{" "}
              <a
                href="https://boligzonen.dk/viden/haandvaerkertilbud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                BoligZonens forklaring af h�ndv�rkertilbud
              </a>{" "}
              og{" "}
              <a
                href="https://www.boligsiden.dk/inspiration/haandvaerkertilbud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                Boligsidens inspirationsside
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="faq">
            <h2 id="faq" className="text-h2 text-text-primary scroll-mt-24">
              Ofte stillede sp�rgsm�l om h�ndv�rkertilbud
            </h2>
            <div className="space-y-6 not-prose">
              {HAANDVAERKERTILBUD_FAQ.map((item) => (
                <div key={item.question}>
                  <h3 className="text-h3 text-text-primary mb-2">
                    {item.question}
                  </h3>
                  <p className="text-body text-text-secondary leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-md border border-border bg-brand-background/50 p-4 text-small text-text-muted">
            <p className="m-0">
              Artiklen er vejledende og udg�r ikke juridisk eller finansiel
              r�dgivning. S�g altid professionel r�dgivning hos byggesagkyndig,
              advokat, h�ndv�rkere og bank ved konkret k�b/renovering.
            </p>
          </section>
        </article>

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

