import type { Metadata } from "next";
import Link from "next/link";
import {
  canonicalUrl,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
} from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { getArticleDates } from "@/lib/article-dates";
import { SAMMENLIGNING_LAANETYPER_FAQ } from "@/lib/artikel-faq/sammenligning-af-laanetyper";
import { getArticleSchema, getFaqPageSchema } from "@/lib/structured-data";
import { ArticleMeta } from "@/components/ArticleMeta";

const ARTICLE_PATH = "/artikler/sammenligning-af-laanetyper";
const dates = getArticleDates(ARTICLE_PATH);
const faqSchema = getFaqPageSchema(SAMMENLIGNING_LAANETYPER_FAQ);

const title =
  "Sammenligning af lånetyper: realkredit, banklån og afdragsfrihed";
const description =
  "Sammenlign realkreditlån, banklån og afdragsfrihed. Få overblik over renter, risiko og månedlig ydelse – og hvordan du tester scenarier i en boligberegner.";

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

export default function SammenligningAfLaanetyperPage() {
  const articleSchema = getArticleSchema({
    title: "Sammenligning af lånetyper: realkredit, banklån og afdragsfrihed",
    description:
      "Sammenlign realkreditlån, banklån og afdragsfrihed. Få overblik over renter, risiko og månedlig ydelse – og hvordan du tester scenarier i en boligberegner.",
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
          Sammenligning af lånetyper: realkredit, banklån og afdragsfrihed
        </h1>
        <ArticleMeta {...dates} />

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            Når du finansierer boligkøb i Danmark, står du typisk over for
            flere{" "}
            <strong className="text-text-primary">lånetyper</strong>:{" "}
            <strong className="text-text-primary">realkreditlån</strong>,{" "}
            <strong className="text-text-primary">banklån</strong> (ofte som
            tillægsfinansiering) og valg om{" "}
            <strong className="text-text-primary">afdragsfrihed</strong>,{" "}
            <strong className="text-text-primary">fast eller variabel rente</strong>.
            Denne artikel giver et overblik, du kan bruge sammen med vores{" "}
            <Link
              href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
              className="text-brand-primary hover:underline font-medium"
            >
              boligomkostningsberegner
            </Link>{" "}
            – så du kan sammenligne den{" "}
            <strong className="text-text-primary">månedlige ydelse</strong> og
            de vigtigste risici på tværs af scenarier.
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Realkreditlån vs. banklån til bolig
            </h2>
            <p>
              <strong className="text-text-primary">Realkreditlån</strong> er i
              praksis hovedfinansieringen for mange boligejere: lånet er
              pantsat i boligen og udbydes under særlige regler, typisk med
              lavere rente end et almindeligt banklån. Du betaler desuden{" "}
              <strong className="text-text-primary">bidrag</strong> til
              instituttet og skal tinglyse pant – se også vores artikel om{" "}
              <Link
                href="/artikler/realkreditlan"
                className="text-brand-primary hover:underline"
              >
                realkreditlån
              </Link>
              .
            </p>
            <p>
              <strong className="text-text-primary">Banklån</strong> (eller
              tilsvarende tillægslån) bruges ofte til den del af købesummen, der
              ligger over den realkreditmæssige belåningsgræns, eller når der er
              behov for en anden struktur. Renten er som udgangspunkt{" "}
              <strong className="text-text-primary">højere</strong> end
              realkreditrenten, fordi risikoen og finansieringsmodellen er en
              anden. I dit samlede budget betyder det, at en fordeling mellem
              realkredit og bank påvirker både{" "}
              <strong className="text-text-primary">ydelse</strong> og{" "}
              <strong className="text-text-primary">renteusikkerhed</strong>.
            </p>
            <p>
              For et mere præcist billede af, hvad banken kan sige ja til ud
              fra indtægt og gæld, supplerer du med artiklen om{" "}
              <Link
                href="/artikler/saadan-vurderer-banken-dit-boliglan"
                className="text-brand-primary hover:underline"
              >
                hvordan banken vurderer dit boliglån
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Fast rente, variabel rente og F1/F3/F5
            </h2>
            <p>
              Ved <strong className="text-text-primary">realkredit</strong>{" "}
              vælger du typisk mellem kort rente (fx{" "}
              <strong className="text-text-primary">F1</strong> – med
              refixing) og længere{" "}
              <strong className="text-text-primary">fast rente</strong> (fx{" "}
              <strong className="text-text-primary">F3</strong> eller{" "}
              <strong className="text-text-primary">F5</strong>). Kort binding
              giver ofte lavere startrente, men udsætter dig for større
              udsving i ydelsen, når lånet refixes. Længere fast rente giver
              mere forudsigelighed i en årrække til en højere startpris.
            </p>
            <p>
              Når du sammenligner lånetyper, er det derfor ikke kun
              &quot;hvor lav er renten i dag?&quot;, men også &quot;hvad sker
              der ved +1 % eller +2 %?&quot; – det kan du teste i{" "}
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary hover:underline font-medium"
              >
                boligomkostningsberegneren
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Afdragsfrihed: lavere ydelse nu, højere risiko senere
            </h2>
            <p>
              <strong className="text-text-primary">Afdragsfri realkredit</strong>{" "}
              betyder, at du i en periode kun betaler renter (og bidrag) – ikke
              afdrag på hovedstolen. Det sænker den{" "}
              <strong className="text-text-primary">nuværende månedlige ydelse</strong>,
              men du nedbringer ikke gælden i den periode, og du skal være
              klar til, at ydelsen stiger, når afdragsfriheden ophører, eller
              gælden skal refinansieres.
            </p>
            <p>
              I en sammenligning af lånetyper er afdragsfrihed derfor et
              vigtigt valg mellem{" "}
              <strong className="text-text-primary">likviditet i dag</strong>{" "}
              og <strong className="text-text-primary">langsigtet gæld</strong>
              . Det er et godt emne at gennemgå med din bank, når du
              kender købspris og belåning.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Tinglysning og pant – samme ejendom, forskellige poster
            </h2>
            <p>
              Uanset om du vælger realkredit, bank eller en kombination, skal
              pant i boligen tinglyses. Omkostninger til{" "}
              <strong className="text-text-primary">tinglysning af pant</strong>{" "}
              er en del af de samlede engangsomkostninger ved køb. Læs mere om{" "}
              <Link
                href="/artikler/eksisterende-pantebrev"
                className="text-brand-primary hover:underline"
              >
                udnyttelse af eksisterende pantebrev
              </Link>{" "}
              og om{" "}
              <Link href="/artikler/tinglysning" className="text-brand-primary hover:underline">
                tinglysning
              </Link>
              , hvis du vil spare hvor det er muligt.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Ekspertkilde: videre læsning om boliglån
            </h2>
            <p>
              For at supplere dine egne beregninger og bankens tilbud kan du
              følge den uvildige boligviden hos{" "}
              <a
                href="https://www.bolius.dk/boliglaan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                Bolius’ overblik over boliglån
              </a>
              , som gennemgår begreber og overvejelser i forbindelse med
              boligfinansiering. Det erstatter ikke personlig rådgivning, men
              giver et solidt udgangspunkt i samme &quot;sprog&quot; som mange
              boligkøbere møder i banken.
            </p>
          </section>

          <section aria-labelledby="faq-laanetyper-heading">
            <h2
              id="faq-laanetyper-heading"
              className="text-h3 text-text-primary mb-4"
            >
              Ofte stillede spørgsmål om sammenligning af lånetyper
            </h2>
            <div className="space-y-5">
              {SAMMENLIGNING_LAANETYPER_FAQ.map((item) => (
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
              En god sammenligning af lånetyper handler om mere end den
              aktuelle rente: du bør medregne realkredit vs. bank, fast vs.
              variabel rente, afdragsfrihed og dine engangsomkostninger til
              pant. Brug Boligklarheds boligomkostningsberegner til at
              oversætte valgene til konkrete tal – og spørg banken om det
              scenarie, der matcher din risikoprofil og dit boligkøb.
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
