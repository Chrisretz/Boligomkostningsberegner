import type { Metadata } from "next";
import Link from "next/link";
import {
  canonicalUrl,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
} from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { getArticleDates } from "@/lib/article-dates";
import { ENERGIMARKER_BOLIGOKONOMI_FAQ } from "@/lib/artikel-faq/energimaerker-og-boligokonomi";
import { getArticleSchema, getFaqPageSchema } from "@/lib/structured-data";
import { ArticleMeta } from "@/components/ArticleMeta";

const ARTICLE_PATH = "/artikler/energimaerker-og-boligokonomi";
const dates = getArticleDates(ARTICLE_PATH);
const faqSchema = getFaqPageSchema(ENERGIMARKER_BOLIGOKONOMI_FAQ);

const title = "Energimærker og boligbudget: A–G ved boligkøb";
const description =
  "Energimærke A–G: hvad det betyder for varme, el og månedlige omkostninger. Brug mærket i dit boligbudget sammen med boligomkostningsberegner og vedligehold.";

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

export default function EnergimaerkerOgBoligokonomiPage() {
  const articleSchema = getArticleSchema({
    title,
    description:
      "Energimærke A–G: hvad det betyder for varme, el og månedlige omkostninger. Brug mærket i dit boligbudget sammen med boligomkostningsberegner og vedligehold.",
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

        <h1 className="text-h1 text-text-primary mb-3">{title}</h1>
        <ArticleMeta {...dates} />

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            Når du køber bolig, følger der ofte et{" "}
            <strong className="text-text-primary">energimærke</strong> med –
            skalaen fra <strong className="text-text-primary">A</strong> til{" "}
            <strong className="text-text-primary">G</strong> viser bygningens
            energimæssige stand. For din{" "}
            <strong className="text-text-primary">boligøkonomi</strong> er
            pointen enkel: et dårligere mærke hænger typisk sammen med{" "}
            <strong className="text-text-primary">højere forbrug til opvarmning</strong>{" "}
            (og dermed højere løbende udgifter) end en tilsvarende bolig med
            bedre mærke. Her får du et overblik, du kan koble sammen med
            vores{" "}
            <Link
              href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
              className="text-brand-primary hover:underline font-medium"
            >
              boligomkostningsberegner
            </Link>{" "}
            og artikler om{" "}
            <Link
              href="/artikler/elforbrug-husstand"
              className="text-brand-primary hover:underline"
            >
              elforbrug i husstanden
            </Link>{" "}
            og{" "}
            <Link href="/artikler/vedligehold" className="text-brand-primary hover:underline">
              vedligehold
            </Link>
            .
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvad er et energimærke – i korte træk?
            </h2>
            <p>
              <strong className="text-text-primary">Energimærket</strong> er
              baseret på en energimærkningsrapport og opsummerer bl.a.
              bygningens isolering, varmeinstallation og det beregnede
              energiforbrug. Mærket er tænkt som et fælles sprog mellem køber,
              sælger og rådgivere – ikke som en garanti for dine konkrete
              regninger, men som et{" "}
              <strong className="text-text-primary">sammenligneligt pejlemærke</strong>{" "}
              på tværs af boliger.
            </p>
            <p>
              Ved boligkøb bør du altid se det{" "}
              <strong className="text-text-primary">gyldige</strong> mærke for
              netop den ejendom, du kigger på, og læse om eventuelle anbefalede
              forbedringer på rapporten.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Fra energimærke til månedlige boligomkostninger
            </h2>
            <p>
              Dit samlede budget består af lån,{" "}
              <Link
                href="/artikler/ejerudgifter"
                className="text-brand-primary hover:underline"
              >
                ejerudgifter
              </Link>
              , forsikring og forbrug. Her påvirker energimærket især:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong className="text-text-primary">Varme</strong> – jo
                dårligere isolering og ældre teknik, jo mere betaler du typisk
                for at holde boligen varm.
              </li>
              <li>
                <strong className="text-text-primary">El</strong> – særligt
                hvis varme og varmt vand trækker meget på el; se også vores
                gennemsnitstal for{" "}
                <Link
                  href="/artikler/elforbrug-husstand"
                  className="text-brand-primary hover:underline"
                >
                  elforbrug
                </Link>
                .
              </li>
              <li>
                <strong className="text-text-primary">Vedligehold</strong> – en
                bolig med dårligt mærke kan kræve mere{" "}
                <Link
                  href="/artikler/vedligehold"
                  className="text-brand-primary hover:underline"
                >
                  vedligehold og investeringer
                </Link>{" "}
                over tid (fx nye vinduer, efterisolering).
              </li>
            </ul>
            <p>
              Når du lægger tal ind i boligomkostningsberegneren, kan du
              justere dine forventede{" "}
              <strong className="text-text-primary">ejerudgifter</strong> og
              el ud fra, om mærket tyder på et højt eller lavt forbrug – så
              bliver sammenligningen mellem to boliger mere retfærdig end kun
              at kigge på købsprisen.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Energimærke og boligpris – hvad er linket?
            </h2>
            <p>
              Købere er forskellige: nogle accepterer et højere
              driftsbudget for en bolig med lavere købspris; andere betaler
              hellere mere for en bolig med lavt energiforbrug. Mærket er et
              af flere faktorer sammen med beliggenhed, stand og{" "}
              <Link
                href="/artikler/grundskyld-og-ejendomsskat"
                className="text-brand-primary hover:underline"
              >
                skatter og afgifter
              </Link>
              . Brug mærket til at stille skarpe spørgsmål til mægler og
              rådgiver – ikke som en enkelt sandhed.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Ekspertkilde: den officielle energimærkeordning
            </h2>
            <p>
              De regler og den dokumentation, der ligger bag energimærker,
              forvaltes af myndighederne. Du kan læse mere om ordningen og
              forbrugerinformation hos{" "}
              <a
                href="https://sparenergi.dk/privat/brug-dit-energimaerke-som-ny-husejer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                Sparenergi om at bruge energimærket som boligejer
              </a>
              – som supplement til din boligkøbsrådgivning og de konkrete
              tal på den energimærkningsrapport, du har fået udleveret.
            </p>
          </section>

          <section aria-labelledby="faq-energimaerker-heading">
            <h2
              id="faq-energimaerker-heading"
              className="text-h3 text-text-primary mb-4"
            >
              Ofte stillede spørgsmål om energimærker og boligøkonomi
            </h2>
            <div className="space-y-5">
              {ENERGIMARKER_BOLIGOKONOMI_FAQ.map((item) => (
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
              Energimærker (A–G) er et vigtigt redskab til at forstå den{" "}
              <strong className="text-text-primary">løbende boligøkonomi</strong>{" "}
              – særligt varme og energi – før du binder dig i en købsaftale.
              Kombinér mærket med realistiske tal for ejerudgifter, el og
              vedligehold i boligomkostningsberegneren, så du ser den samlede
              månedlige udgift, ikke kun købsprisen.
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
