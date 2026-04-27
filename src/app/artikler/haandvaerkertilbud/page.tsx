import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, PATH_BOLIGOMKOSTNINGER_BEREGNER, PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR } from "@/lib/site";
import { getArticleDates } from "@/lib/article-dates";
import { HAANDVAERKERTILBUD_FAQ } from "@/lib/artikel-faq/haandvaerkertilbud";
import { socialMetadata } from "@/lib/social-metadata";
import { getArticleSchema, getFaqPageSchema } from "@/lib/structured-data";
import { ArticleMeta } from "@/components/ArticleMeta";

const ARTICLE_PATH = "/artikler/haandvaerkertilbud";
const dates = getArticleDates(ARTICLE_PATH);
const faqSchema = getFaqPageSchema(HAANDVAERKERTILBUD_FAQ);

const title = "H�ndv�rkertilbud: guide til boligk�b, renovering, budget og faldgruber";
const description =
  "Hvad betyder h�ndv�rkertilbud? F� overblik over pris, renoveringsbudget, tjekliste f�r k�b, finansiering, buffer til uforudsete udgifter � og hvordan du indhenter tilbud fra h�ndv�rkere.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl(ARTICLE_PATH) },
  ...socialMetadata({ path: ARTICLE_PATH, title, description }),
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
          <Link href="/artikler" className="text-body text-brand-primary hover:underline">
            {"\u2190"} Tilbage til Artikler
          </Link>
        </p>

        <h1 className="text-h1 text-text-primary mb-3">
          H�ndv�rkertilbud: guide til boligk�b, renovering, budget og faldgruber
        </h1>
        <ArticleMeta {...dates} />

        <article className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            <strong className="text-text-primary">H�ndv�rkertilbud</strong> kan betyde to
            ting i praksis: enten en bolig, der kr�ver renovering, eller et
            pristilbud fra en h�ndv�rker. I denne guide fokuserer vi prim�rt p�
            h�ndv�rkertilbud som <strong className="text-text-primary">boligtype</strong>{" "}
            � men du f�r ogs� en konkret metode til at indhente og sammenligne{" "}
            <strong className="text-text-primary">tilbud fra fagfolk</strong>, n�r du
            skal renovere.
          </p>

          <section aria-labelledby="kort-svar">
            <h2 id="kort-svar" className="text-h2 text-text-primary scroll-mt-24">
              Kort svar: hvad er et h�ndv�rkertilbud?
            </h2>
            <p>
              Et h�ndv�rkertilbud er typisk en bolig, der s�lges billigere end en
              indflytningsklar bolig, fordi den kr�ver{" "}
              <strong className="text-text-primary">
                renovering, istands�ttelse eller modernisering
              </strong>
              . Den lave pris kan v�re fristende � men du b�r altid regne p�
              total�konomien, f�r du k�ber.
            </p>
          </section>

          <section aria-labelledby="to-betydninger">
            <h2 id="to-betydninger" className="text-h2 text-text-primary scroll-mt-24">
              Hvad betyder �h�ndv�rkertilbud�? (to betydninger)
            </h2>

            <h3 className="text-h3 text-text-primary pt-2">
              1) H�ndv�rkertilbud som bolig, du k�ber
            </h3>
            <p>
              I boligannoncer bruges �h�ndv�rkertilbud� ofte om et hus eller en
              lejlighed, der tr�nger til en k�rlig h�nd. Det kan d�kke alt fra
              kosmetiske opdateringer til st�rre ting som tag, el/VVS og
              energiforbedringer.
            </p>
            <p>
              Til inspiration kan du l�se{" "}
              <a
                href="https://www.edc.dk/nyhedsartikler/har-du-kig-paa-et-haandvaerkertilbud/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                EDC�s gennemgang af, hvad du b�r unders�ge
              </a>
              .
            </p>

            <h3 className="text-h3 text-text-primary pt-4">
              2) H�ndv�rkertilbud som tilbud fra h�ndv�rkere
            </h3>
            <p>
              I h�ndv�rker-branchen betyder �h�ndv�rkertilbud� ofte et pristilbud
              p� en opgave. N�r du k�ber en renoveringsbolig, er det ofte disse
              tilbud, der afg�r om dit budget holder.
            </p>
          </section>

          <section aria-labelledby="oekonomi">
            <h2 id="oekonomi" className="text-h2 text-text-primary scroll-mt-24">
              �konomi: s�dan regner du p� totalbudgettet
            </h2>
            <p>
              Den st�rste fejl ved et h�ndv�rkertilbud er at kigge p� k�bsprisen
              alene. T�nk i stedet:
            </p>
            <div className="rounded-md border border-border bg-brand-background/50 p-4 not-prose">
              <p className="m-0 text-text-secondary">
                <strong className="text-text-primary">
                  K�bspris + renovering + buffer + handelsomkostninger
                </strong>{" "}
                = samlet investering.
              </p>
            </div>
            <p>
              Vil du have overblik over engangsudgifter og l�bende m�nedlige
              udgifter, kan du bruge{" "}
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary underline hover:no-underline"
              >
                boligomkostningsberegneren
              </Link>{" "}
              og stress-teste renterne. Og hvis du er i startfasen, kan{" "}
              <Link
                href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
                className="text-brand-primary underline hover:no-underline"
              >
                �Hvad kan jeg k�be bolig for?�
              </Link>{" "}
              give en indikation af dit l�nerum.
            </p>
          </section>

          <section aria-labelledby="tjekliste">
            <h2 id="tjekliste" className="text-h2 text-text-primary scroll-mt-24">
              Tjekliste f�r du k�ber et h�ndv�rkertilbud
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Gennemg� tilstandsrapport og elinstallationsrapport.</li>
              <li>
                Tjek{" "}
                <Link
                  href="/artikler/energimaerker-og-boligokonomi"
                  className="text-brand-primary underline hover:no-underline"
                >
                  energim�rket
                </Link>{" "}
                og medregn energiforbedringer.
              </li>
              <li>F� en byggesagkyndig med, hvis det er et st�rre projekt.</li>
              <li>Indhent 2�3 tilbud p� de st�rste poster og l�g buffer p�.</li>
              <li>Tal med banken om finansiering f�r du byder.</li>
            </ol>
          </section>

          <section aria-labelledby="tilbud">
            <h2 id="tilbud" className="text-h2 text-text-primary scroll-mt-24">
              S�dan indhenter du tilbud fra h�ndv�rkere (kort metode)
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Beskriv opgaven konkret og vedh�ft billeder/tegninger.</li>
              <li>Indhent mindst 2�3 skriftlige tilbud med tydelige forbehold.</li>
              <li>Sammenlign pris, materialer, tidsplan og garanti � ikke kun bel�b.</li>
            </ol>
            <p>
              Hvis du vil indhente flere tilbud hurtigt, kan du fx bruge{" "}
              <a
                href="https://www.3byggetilbud.dk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                3byggetilbud.dk
              </a>{" "}
              eller{" "}
              <a
                href="https://www.haandvaerker.dk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                h�ndvaerker.dk
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
                  <h3 className="text-h3 text-text-primary mb-2">{item.question}</h3>
                  <p className="text-body text-text-secondary leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <p className="mt-8">
          <Link href="/artikler" className="text-body text-brand-primary hover:underline">
            Se alle artikler
          </Link>
        </p>
      </div>
    </main>
  );
}

