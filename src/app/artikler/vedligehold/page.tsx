import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { getArticleSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Vedligehold af bolig: Hvor meget skal jeg sætte af?",
  description:
    "Vedligehold af bolig: hvor meget sætte af om året? Reserve, typiske poster og boligomkostninger.",
  alternates: { canonical: canonicalUrl("/artikler/vedligehold") },
  openGraph: {
    title: "Vedligehold af bolig: Hvor meget skal jeg sætte af?",
    description:
      "Vedligehold af bolig: hvor meget sætte af om året? Reserve, typiske poster og boligomkostninger.",
    url: canonicalUrl("/artikler/vedligehold"),
  },
};

export default function VedligeholdPage() {
  const articleSchema = getArticleSchema({
    title: "Vedligehold af bolig: Hvor meget skal jeg sætte af?",
    description:
      "Vedligehold af bolig: hvor meget sætte af om året? Reserve, typiske poster og boligomkostninger.",
    path: "/artikler/vedligehold",
  });
  return (
    <main className="min-h-screen py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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

        <h1 className="text-h1 text-text-primary mb-8">
          Vedligehold af bolig: Hvor meget skal jeg sætte af?
        </h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            Når du køber bolig, kommer der ikke kun lån og engangsomkostninger –
            der er også løbende udgifter til vedligehold. Tag, vinduer, facader,
            varme og el falder ikke af sig selv, og uforudsete reparationer kan
            løbe op. Derfor er det vigtigt at have en realistisk vedligeholdelsesreserve
            med i din vurdering af, hvad boligen reelt koster. Her får du en
            tommelfingerregel og forklaring på, hvad den dækker. Mere om
            vedligehold af bolig (planlægning, typiske poster og budget) finder
            du hos{" "}
            <a
              href="https://www.bolius.dk/vedligehold/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary underline hover:no-underline"
            >
              Bolius om vedligehold
            </a>
            .
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Tommelfingerregel: Hvor meget pr. år?
            </h2>
            <p>
              En ofte brugt tommelfingerregel er at sætte af til vedligehold
              svarende til en vis procent af købsprisen hvert år. For{" "}
              <strong>ejerlejligheder</strong> bruges ofte omkring{" "}
              <strong>1,0 % af købsprisen</strong> pr. år. For{" "}
              <strong>huse</strong> er det typisk lidt højere: omkring{" "}
              <strong>1,5 % af købsprisen</strong> pr. år, fordi huset har mere
              ydre areal (tag, facader, have) og ofte flere installationer at
              vedligeholde.
            </p>
            <p>
              Eksempel: Køber du et hus til 4.000.000 kr., svarer 1,5 % til
              60.000 kr. om året – eller 5.000 kr. om måneden. Det er ikke
              nødvendigvis et beløb du betaler ud hver måned, men en reserve du
              bør have i baghovedet til reparationer, udskiftninger og
              vedligehold over tid.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvad dækker vedligeholdelsesreserven?
            </h2>
            <p>Pengene til vedligehold bør dække bl.a.:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Tag og tagrender</strong> – reparationer, udskiftning af
                tagbelægning eller tagpap over tid
              </li>
              <li>
                <strong>Vinduer og døre</strong> – utætheder, udskiftning,
                maling
              </li>
              <li>
                <strong>Facade og fuger</strong> – revner, fugeslag, maling
              </li>
              <li>
                <strong>Varme og vand</strong> – kedel, varmepumpe, rør,
                ventilation
              </li>
              <li>
                <strong>El og sikkerhed</strong> – elinstallationer, brandalarmer
              </li>
              <li>
                <strong>Gulve, køkken og badeværelse</strong> – slid, lækager,
                opdateringer
              </li>
            </ul>
            <p>
              Det er ikke et budget du bruger hver måned til det samme, men en
              pulje der akkumuleres og bruges når behovet opstår. Nogle år
              bruger du mindre, andre år mere – fx ved udskiftning af tag eller
              vinduer.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvorfor tælle vedligehold med i boligomkostningen?
            </h2>
            <p>
              Hvis du kun kigger på den månedlige ydelse til lån og de faste
              ejerudgifter, får du et for optimistisk billede af, hvad boligen
              koster. Vedligehold kommer før eller senere – og store poster som
              nyt tag eller nye vinduer kan løbe op i hundredtusindvis. Ved at
              lægge en årlig reserve ind i din beregning får du et mere reelt
              overblik over dine samlede boligomkostninger og undgår at blive
              overrasket.
            </p>
            <p>
              Mange boligomkostningsberegnere inkluderer derfor vedligehold som
              en fast årlig procent af købsprisen, så du kan sammenligne den
              samlede månedlige udgift med din økonomi.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Er 1 % og 1,5 % altid rigtige tal?
            </h2>
            <p>
              Tommelfingerreglerne er vejledende. Ældre boliger eller boliger
              med dårlig stand kan kræve mere. Nyere, velholdte boliger kan
              nogle år klare sig med mindre. Det vigtige er at tænke
              vedligehold ind som en del af den samlede økonomi – og ikke kun
              fokusere på låneydelse og faste omkostninger. Hvis du er i tvivl,
              er det ofte bedre at regne med lidt mere end for lidt, så du har
              buffer til uforudsete udgifter.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Sådan får du overblik over alle omkostninger
            </h2>
            <p>
              For at vurdere, om du har råd til en bolig, bør du have med både
              engangsomkostninger (tinglysning, pant, evt. ejerskifteforsikring),
              den månedlige ydelse til lån, ejerudgifter og vedligehold. En
              boligomkostningsberegner samler disse poster og viser dig den
              samlede månedlige udgift inkl. vedligehold.
            </p>
            <p>
              <Link href="/beregn" className="text-brand-primary hover:underline font-medium">
                Brug vores beregner her
              </Link>{" "}
              til at se dine reelle boligomkostninger – inkl. vedligehold – for
              hus eller lejlighed.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Opsummering</h2>
            <p>
              En realistisk vedligeholdelsesreserve er en vigtig del af dine
              boligomkostninger. Tommelfingerreglen er typisk 1,0 % af
              købsprisen pr. år for ejerlejlighed og 1,5 % for hus. Pengene
              dækker bl.a. tag, vinduer, facade, varme og el over tid. Ved at
              medregne vedligehold får du et mere ærligt billede af, hvad
              boligen koster, og undgår at blive overrasket af store
              reparationer.
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
