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
  "H\u00e5ndv\u00e6rkertilbud: guide til boligk\u00f8b, renovering, budget og faldgruber";
const description =
  "Hvad betyder h\u00e5ndv\u00e6rkertilbud? F\u00e5 overblik over pris, renoveringsbudget, tjekliste f\u00f8r k\u00f8b, finansiering, buffer til uforudsete udgifter \u2013 og hvordan du indhenter tilbud fra h\u00e5ndv\u00e6rkere.";

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
          {"H\u00e5ndv\u00e6rkertilbud: guide til boligk\u00f8b, renovering, budget og faldgruber"}
        </h1>
        <ArticleMeta {...dates} />

        <article className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            <strong className="text-text-primary">
              {"H\u00e5ndv\u00e6rkertilbud"}
            </strong>{" "}
            kan betyde to ting i praksis: enten en bolig, der kr\u00e6ver
            renovering, eller et pristilbud fra en h\u00e5ndv\u00e6rker. I denne
            guide fokuserer vi prim\u00e6rt p\u00e5 h\u00e5ndv\u00e6rkertilbud som{" "}
            <strong className="text-text-primary">boligtype</strong> \u2013 men
            du f\u00e5r ogs\u00e5 en konkret metode til at indhente og sammenligne{" "}
            <strong className="text-text-primary">
              {"h\u00e5ndv\u00e6rkertilbud (tilbud fra fagfolk)"}
            </strong>
            , n\u00e5r du skal renovere.
          </p>

          <section aria-labelledby="featured-snippet">
            <h2
              id="featured-snippet"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              {"Kort svar: hvad er et h\u00e5ndv\u00e6rkertilbud?"}
            </h2>
            <p>
              Et h\u00e5ndv\u00e6rkertilbud er typisk en bolig, der s\u00e6lges
              billigere end en indflytningsklar bolig, fordi den kr\u00e6ver{" "}
              <strong className="text-text-primary">
                {"renovering, istands\u00e6ttelse eller modernisering"}
              </strong>
              . Prisen kan v\u00e6re attraktiv, men du b\u00f8r altid medregne
              renoveringsbudget, finansiering og en buffer til uforudsete
              udgifter, f\u00f8r du beslutter dig.
            </p>
          </section>

          <section aria-labelledby="hvad-betyder">
            <h2
              id="hvad-betyder"
              className="text-h2 text-text-primary scroll-mt-24"
            >
              {"Hvad betyder \u201ch\u00e5ndv\u00e6rkertilbud\u201d? (to betydninger)"}
            </h2>
            <h3 className="text-h3 text-text-primary pt-2">
              {"1) H\u00e5ndv\u00e6rkertilbud som bolig, du k\u00f8ber"}
            </h3>
            <p>
              {"I boligannoncer bruges \u201ch\u00e5ndv\u00e6rkertilbud\u201d ofte om et hus eller en lejlighed, der tr\u00e6nger til en k\u00e6rlig h\u00e5nd. Boligen kan fx have behov for nyt tag, opdateret el/VVS, energiforbedringer eller et nyt k\u00f8kken/bad."}
            </p>
            <p>
              {"EDC peger fx p\u00e5, at h\u00e5ndv\u00e6rkertilbud/d\u00f8dsbo i perioder kan v\u00e6re markant billigere pr. kvm end mere indflytningsklare huse \u2013 men at du skal unders\u00f8ge renoveringsbehov og risiko grundigt f\u00f8r k\u00f8b. Se "}
              <a
                href="https://www.edc.dk/nyhedsartikler/har-du-kig-paa-et-haandvaerkertilbud/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                {"EDC\u2019s guide til h\u00e5ndv\u00e6rkertilbud"}
              </a>
              .
            </p>

            <h3 className="text-h3 text-text-primary pt-4">
              {"2) H\u00e5ndv\u00e6rkertilbud som tilbud fra h\u00e5ndv\u00e6rkere"}
            </h3>
            <p>
              {"I h\u00e5ndv\u00e6rker-branchen betyder \u201ch\u00e5ndv\u00e6rkertilbud\u201d ofte bare et pristilbud p\u00e5 en opgave \u2013 fx maling, tag, k\u00f8kken, bad eller energirenovering. Hvis du k\u00f8ber en renoveringsbolig, ender du n\u00e6sten altid med at skulle indhente flere tilbud, s\u00e5 du kan sammenligne pris, materialer, tidsplan og forbehold."}
            </p>
          </section>

          <section aria-labelledby="budget">
            <h2 id="budget" className="text-h2 text-text-primary scroll-mt-24">
              {"\u00d8konomisk overblik: mere end bare k\u00f8bsprisen"}
            </h2>
            <p>
              {"Den st\u00f8rste fejl ved h\u00e5ndv\u00e6rkertilbud er at fokusere p\u00e5 den lave k\u00f8bspris \u2013 og undervurdere total\u00f8konomien."}
            </p>
            <p>
              {"Vil du regne p\u00e5 den samlede bolig\u00f8konomi, kan du bruge "}
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary underline hover:no-underline"
              >
                boligomkostningsberegneren
              </Link>{" "}
              {"og supplere med "}
              <Link
                href={PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR}
                className="text-brand-primary underline hover:no-underline"
              >
                {"\u201cHvad kan jeg k\u00f8be bolig for?\u201d"}
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="faq">
            <h2 id="faq" className="text-h2 text-text-primary scroll-mt-24">
              {"Ofte stillede sp\u00f8rgsm\u00e5l om h\u00e5ndv\u00e6rkertilbud"}
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

