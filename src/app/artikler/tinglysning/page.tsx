import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { getArticleDates } from "@/lib/article-dates";
import { TINGLYSNING_FAQ } from "@/lib/artikel-faq/tinglysning";
import { socialMetadata } from "@/lib/social-metadata";
import { getArticleSchema, getFaqPageSchema } from "@/lib/structured-data";
import { ArticleMeta } from "@/components/ArticleMeta";

const ARTICLE_PATH = "/artikler/tinglysning";
const dates = getArticleDates(ARTICLE_PATH);
const faqSchema = getFaqPageSchema(TINGLYSNING_FAQ);

const title = "Hvad er tinglysning?";
const description =
  "Tinglysning er den juridiske registrering af rettigheder over en fast ejendom. Læs mere om processen, afgifter og hvorfor det er vigtigt.";

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

export default function TinglysningPage() {
  const articleSchema = getArticleSchema({
    title: "Hvad er tinglysning?",
    description:
      "Tinglysning er den juridiske registrering af rettigheder over en fast ejendom. Læs mere om processen, afgifter og hvorfor det er vigtigt.",
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

        <h1 className="text-h1 text-text-primary mb-3">Hvad er tinglysning?</h1>
        <ArticleMeta {...dates} />

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            Tinglysning er den juridiske registrering af rettigheder over en fast
            ejendom. Når du køber bolig, bliver dit ejerskab først officielt og
            juridisk sikret, når skødet er tinglyst i Tingbogen. Tinglysning
            fungerer som en offentlig dokumentation for, hvem der ejer ejendommen,
            og hvilke lån eller rettigheder der er knyttet til den. Den
            officielle adgang til digital tinglysning og oplysninger om
            processen finder du på{" "}
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
            <h2 className="text-h3 text-text-primary">Hvad betyder det i praksis?</h2>
            <p>
              Når en bolighandel gennemføres, udarbejdes der et skøde. Skødet
              dokumenterer, at ejendommen overdrages fra sælger til køber. Først
              når skødet er tinglyst, har du som køber juridisk beskyttelse mod
              tredjemand. Tinglysningen foregår digitalt via Tinglysningsretten
              og registreres i den offentlige Tingbog. Her kan man også se
              eksisterende pant, servitutter og andre rettigheder på
              ejendommen.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Hvad koster tinglysning?</h2>
            <p>
              Ved tinglysning af skøde betales en afgift til staten. Afgiften
              består af:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>En fast afgift (typisk 1.850 kr.)</li>
              <li>
                En variabel afgift på 0,6 % af købesummen
              </li>
            </ul>
            <p>
              Eksempel: Hvis du køber en bolig til 4.000.000 kr., vil den
              variable afgift være 24.000 kr. (0,6 % af 4.000.000 kr.). Sammen
              med den faste afgift bliver den samlede tinglysningsafgift 25.850
              kr.
            </p>
            <p>
              Der skal desuden betales tinglysningsafgift ved oprettelse af
              realkreditlån og banklån, da der tinglyses pant i ejendommen.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Hvad tinglyses der ellers?</h2>
            <p>
              Ud over skøde kan følgende blive tinglyst:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Realkreditlån og banklån (pant)</li>
              <li>Servitutter (fx byggelinjer eller brugsrettigheder)</li>
              <li>Ægtepagter vedrørende fast ejendom</li>
            </ul>
            <p>
              Det betyder, at Tingbogen giver et samlet overblik over juridiske
              forhold knyttet til ejendommen.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Hvorfor er tinglysning vigtigt?</h2>
            <p>
              Tinglysning sikrer gennemsigtighed og retssikkerhed i
              boligmarkedet. Uden tinglysning ville det være uklart, hvem der
              ejer en ejendom, og hvilke lån eller rettigheder der er knyttet til
              den. Som boligkøber er tinglysning derfor en afgørende del af
              processen – både juridisk og økonomisk.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Tinglysning og dine samlede boligomkostninger
            </h2>
            <p>
              Tinglysningsafgifterne er en af de større engangsomkostninger ved
              boligkøb og kan let løbe op i titusindvis af kroner, især hvis der
              både skal tinglyses skøde og nye lån. I Boligklarheds
              boligomkostningsberegner indgår tinglysning som en del af
              engangsomkostningerne, så du kan se, hvordan afgifterne påvirker
              det samlede beløb, du skal have klar ved overtagelsen.
            </p>
            <p>
              Ved at indtaste købspris og pantsikret beløb i beregneren kan du
              hurtigt få et estimat af, hvad du skal betale i tinglysningsafgift
              til staten. Det gør det nemmere at planlægge din udbetaling og
              sikre, at du har sat penge nok af til både omkostninger ved
              tinglysning, omkostninger til lån og øvrige udgifter forbundet med
              boligkøbet.
            </p>
          </section>

          <section aria-labelledby="faq-tinglysning-heading">
            <h2
              id="faq-tinglysning-heading"
              className="text-h3 text-text-primary mb-4"
            >
              Ofte stillede spørgsmål om tinglysning
            </h2>
            <div className="space-y-5">
              {TINGLYSNING_FAQ.map((item) => (
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
              Tinglysning er den officielle registrering af ejerskab og
              rettigheder over en ejendom. Når du køber bolig, er det
              tinglysningen af skødet, der juridisk fastslår, at du er den nye
              ejer. Der betales en fast og en variabel afgift ved tinglysning, og
              processen foregår digitalt via Tinglysningsretten.
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
