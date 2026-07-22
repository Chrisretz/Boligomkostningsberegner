import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, PATH_BOLIGOMKOSTNINGER_BEREGNER } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { getArticleDates } from "@/lib/article-dates";
import { VEDLIGEHOLDELSESPLAN_FAQ } from "@/lib/artikel-faq/vedligeholdelsesplan";
import { getArticleSchema, getFaqPageSchema } from "@/lib/structured-data";
import { ArticleMeta } from "@/components/ArticleMeta";

const ARTICLE_PATH = "/artikler/vedligeholdelsesplan";
const dates = getArticleDates(ARTICLE_PATH);
const faqSchema = getFaqPageSchema(VEDLIGEHOLDELSESPLAN_FAQ);

const title = "Vedligeholdelsesplan for hus: sådan laver du den selv";
const description =
  "Trin for trin til en vedligeholdelsesplan for parcelhus: gennemgå bygningsdelene, sæt tidshorisont og pris, og omsæt det til et årligt beløb.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl(ARTICLE_PATH) },
  ...socialMetadata({ path: ARTICLE_PATH, title, description }),
};

const STEPS = [
  {
    title: "1. Lav en liste over bygningsdelene",
    body: "Gå huset igennem udefra og ind: tag, tagrender, skorsten, facade, vinduer, døre, sokkel, terrasse. Derefter indvendigt: varmeanlæg, el, vand og afløb, badeværelse, køkken, gulve. Er der udhus, carport eller hegn, kommer de med. Du behøver ikke være fagmand for at lave listen, du skal bare være systematisk.",
  },
  {
    title: "2. Notér stand og alder",
    body: "For hver del skriver du, hvor gammel den er, og hvordan den ser ud. Er der revner, utætheder, afskalning eller råd? Ved du ikke alderen, så gæt ud fra husets byggeår og eventuelle ombygninger. Tilstandsrapporten fra dit boligkøb er guld værd her, for den har allerede beskrevet mange af delene.",
  },
  {
    title: "3. Vurdér hvornår delen skal skiftes",
    body: "Sammenhold alderen med den typiske levetid for den type bygningsdel. Er et betontag 35 år gammelt, og holder den slags typisk 40 til 60 år, er du i den sidste tredjedel. Sæt et årstal på, også selvom det er et skøn. Et skøn du kan justere er bedre end ingen plan.",
  },
  {
    title: "4. Sæt en pris på",
    body: "Indhent tilbud på de nære poster, og brug grove overslag på de fjerne. Priserne ændrer sig alligevel, inden du når dertil. Vær hellere lidt for konservativ end for optimistisk, og husk at større projekter ofte udløser følgearbejde. Skiftes taget, skal stilladset også betales.",
  },
  {
    title: "5. Regn det om til et årligt beløb",
    body: "For hver post deler du prisen med antal år, til den skal udføres. En tagudskiftning til 300.000 kr. om 15 år bliver til 20.000 kr. om året. Læg alle poster sammen, så har du dit årlige vedligeholdelsesbudget. Det er tallet, der skal med i din boligøkonomi.",
  },
  {
    title: "6. Prioritér og fordel over årene",
    body: "Nogle år hober posterne sig op. Se om noget kan rykkes et år eller to uden risiko, og om noget med fordel kan laves samtidig. Det, der forhindrer følgeskader, kommer først: utætte tage, defekte fuger og vandskader bliver hurtigt dyrere, hvis de får lov at stå.",
  },
];

export default function VedligeholdelsesplanPage() {
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
            ← Tilbage til Artikler
          </Link>
        </p>

        <h1 className="text-h1 text-text-primary mb-3">
          Vedligeholdelsesplan for hus: sådan laver du den selv
        </h1>
        <ArticleMeta {...dates} path={ARTICLE_PATH} />

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            De fleste husejere vedligeholder reaktivt. Noget går i stykker, og
            så bliver det ordnet. Problemet er, at de store poster kommer med
            års mellemrum og i uheldige klumper, og at udskudt vedligehold
            bliver dyrere, ikke billigere. En vedligeholdelsesplan flytter dig
            fra at reagere til at planlægge.
          </p>
          <p>
            Planen er i bund og grund en liste over husets dele, hvornår de skal
            ordnes, og hvad det koster. Ud af den falder ét tal, du kan bruge:
            hvor meget du bør lægge til side om året.
          </p>

          <section aria-labelledby="hvorfor-heading">
            <h2 id="hvorfor-heading" className="text-h3 text-text-primary">
              Hvorfor det betaler sig
            </h2>
            <p>
              Uden en plan risikerer du tre ting. Du bliver overrasket af
              regninger, du ikke har sparet op til. Du træffer beslutninger
              under tidspres, hvor du tager det første tilbud i stedet for det
              bedste. Og du lader småting udvikle sig til skader, fordi ingen
              holdt øje.
            </p>
            <p>
              En plan giver dig også et bedre grundlag, hvis du skal sælge. Kan
              du dokumentere, hvad der er lavet hvornår, står du stærkere i
              forhandlingen, og køberen får færre undskyldninger for at trykke
              prisen.
            </p>
          </section>

          <section aria-labelledby="trin-heading">
            <h2 id="trin-heading" className="text-h3 text-text-primary">
              Seks trin til din egen plan
            </h2>
            <ol className="not-prose space-y-4 list-none pl-0">
              {STEPS.map((step) => (
                <li
                  key={step.title}
                  className="rounded-md border border-border bg-brand-surface p-4 shadow-soft"
                >
                  <p className="text-body font-semibold text-text-primary mb-1">
                    {step.title}
                  </p>
                  <p className="text-body text-text-secondary leading-relaxed">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="levetid-heading">
            <h2 id="levetid-heading" className="text-h3 text-text-primary">
              Brug levetiderne som udgangspunkt
            </h2>
            <p>
              Trin tre står og falder med, at du har et bud på, hvor længe
              tingene holder. Vi har samlet typiske levetider for tag, vinduer,
              facade, varmeanlæg, vådrum og installationer i artiklen om{" "}
              <Link
                href="/artikler/vedligehold"
                className="text-brand-primary hover:underline font-medium"
              >
                vedligehold af hus og bolig
              </Link>
              , hvor du også finder tommelfingerreglen på 1,5 % for hus og 1,0 %
              for lejlighed.
            </p>
            <p>
              Ligger dit levetidsbaserede budget markant over procentreglen, er
              det ikke nødvendigvis en fejl i beregningen. Det er ofte et tegn
              på, at huset har et efterslæb, eller at flere store dele tilfældigt
              rammer enden af deres levetid samtidig.
            </p>
          </section>

          <section aria-labelledby="ejerforening-heading">
            <h2 id="ejerforening-heading" className="text-h3 text-text-primary">
              Bor du i ejerlejlighed?
            </h2>
            <p>
              Så er billedet delt i to. Foreningen står for klimaskærm, tag,
              facade, trapper og fælles installationer, og de fleste foreninger
              har eller bør have en samlet vedligeholdelsesplan. Din egen plan
              dækker det indvendige: køkken, bad, gulve, hvidevarer og den
              indvendige side af vinduerne.
            </p>
            <p>
              Bed om at se foreningens plan og seneste regnskab, før du køber.
              Er der store poster på vej uden opsparing bag, ender de som
              stigende fællesudgifter eller en ekstraregning til dig. Læs mere om,
              hvad{" "}
              <Link
                href="/artikler/ejerudgifter"
                className="text-brand-primary hover:underline"
              >
                ejerudgifter dækker
              </Link>
              , og hvad du bør undersøge i en{" "}
              <Link
                href="/artikler/ejerlejlighed"
                className="text-brand-primary hover:underline"
              >
                ejerlejlighed
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="selv-eller-fagmand-heading">
            <h2
              id="selv-eller-fagmand-heading"
              className="text-h3 text-text-primary"
            >
              Selv eller professionel?
            </h2>
            <p>
              Til et almindeligt parcelhus i rimelig stand kommer du langt selv.
              Du har tilstandsrapporten, du kan se huset, og levetiderne er
              offentligt tilgængelige. Det tager en weekend at lave første
              udgave.
            </p>
            <p>
              Få en byggesagkyndig eller rådgivende ingeniør ind, hvis huset er
              gammelt, hvis der er tegn på fugt eller sætningsskader, eller hvis
              du står over for en større renovering, hvor rækkefølgen betyder
              noget. Bed om at se et eksempel på en færdig plan, inden du
              bestiller, og indhent tilbud fra to til tre rådgivere.
            </p>
          </section>

          <section aria-labelledby="oekonomi-heading">
            <h2 id="oekonomi-heading" className="text-h3 text-text-primary">
              Få planen ind i boligbudgettet
            </h2>
            <p>
              Det årlige beløb fra din plan hører hjemme i din samlede
              boligøkonomi ved siden af ydelse, ejerudgifter og forbrug. Ellers
              ser boligen billigere ud, end den er.
            </p>
            <p>
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="text-brand-primary hover:underline font-medium"
              >
                Beregn dine samlede boligomkostninger
              </Link>{" "}
              og indsæt dit eget vedligeholdelsestal, hvis du har lavet planen.
              Har du ikke, bruger beregneren automatisk 1,5 % for hus og 1,0 %
              for lejlighed.
            </p>
          </section>

          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-h3 text-text-primary mb-4">
              Ofte stillede spørgsmål om vedligeholdelsesplaner
            </h2>
            <div className="space-y-5">
              {VEDLIGEHOLDELSESPLAN_FAQ.map((item) => (
                <div key={item.question}>
                  <h3 className="text-body font-semibold text-text-primary mb-2">
                    {item.question}
                  </h3>
                  <p className="text-body text-text-secondary">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="opsummering-heading">
            <h2 id="opsummering-heading" className="text-h3 text-text-primary">
              Opsummering
            </h2>
            <p>
              En vedligeholdelsesplan er en liste over husets bygningsdele med
              stand, tidshorisont og pris, omsat til ét årligt beløb. Du laver
              den ved at gennemgå huset systematisk, sammenholde alder med
              typisk levetid, sætte priser på og dele med antal år. Opdatér den
              en gang om året. Det vigtigste er ikke, at tallene er præcise,
              men at de store poster ikke kommer bag på dig.
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
