import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/site";
import { getArticleSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Hvad er en indboforsikring? | Boligklarhed",
  description:
    "Få overblik over indboforsikring: hvad den dækker, hvorfor boligejere bør have den og hvordan den indgår i dine ejerudgifter og boligomkostninger.",
  alternates: { canonical: canonicalUrl("/artikler/indboforsikring") },
  openGraph: {
    title: "Hvad er en indboforsikring?",
    description:
      "Indboforsikring dækker indbo, brand, vandskade og mere. Læs hvad den koster og hvorfor den er en del af dine ejerudgifter.",
    url: canonicalUrl("/artikler/indboforsikring"),
  },
};

export default function IndboforsikringPage() {
  const articleSchema = getArticleSchema({
    title: "Hvad er en indboforsikring?",
    description:
      "Få overblik over indboforsikring: hvad den dækker, hvorfor boligejere bør have den og hvordan den indgår i dine ejerudgifter og boligomkostninger.",
    path: "/artikler/indboforsikring",
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
          Hvad er en indboforsikring?
        </h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6">
          <p>
            En <strong>indboforsikring</strong> er en forsikring der dækker dit
            <strong> indbo</strong> – møbler, elektronik, tøj, værdigenstande
            osv. – mod skader som brand, indbrud, tyveri, vandskade og
            visse naturkræfter. For boligejere er indboforsikring ofte
            kombineret med eller suppleret af husforsikring (for huse), så
            både indbo og bygning er dækket. Uanset om du bor i hus eller
            lejlighed er indboforsikring en central del af dine løbende
            ejerudgifter og bør medtages i din vurdering af, hvad boligen
            reelt koster hver måned.
          </p>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvad dækker en indboforsikring typisk?
            </h2>
            <p>
              En standard indboforsikring dækker bl.a.:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Brand og lyn</strong> – skader på indbo efter brand
                eller lynslag
              </li>
              <li>
                <strong>Vandskade</strong> – skader forårsaget af lækage,
                sprunget rør eller oversvømmelse (ofte med visse begrænsninger)
              </li>
              <li>
                <strong>Indbrud og tyveri</strong> – stjålne eller beskadigede
                ting ved indbrud
              </li>
              <li>
                <strong>Hærværk</strong> – skader forårsaget af tredjemand
              </li>
              <li>
                <strong>Visse naturkræfter</strong> – fx storm og pludselig
                vandskade (præcis dækning afhænger af policen)
              </li>
            </ul>
            <p>
              Præcis indhold og undtagelser varierer fra forsikringsselskab til
              forsikringsselskab. Det er derfor vigtigt at læse
              forsikringsbetingelserne og evt. tale med din mægler, så du ved
              hvad der er dækket – især ved dyre genstande eller særlige
              forhold i boligen.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Indboforsikring vs. husforsikring
            </h2>
            <p>
              I en <strong>ejerlejlighed</strong> dækker indboforsikringen
              typisk dit indbo og evt. ansvar mod naboer (fx ved vandskade).
              Bygningen selv (facade, tag, fællesarealer) er ofte dækket via
              ejendommens fælles forsikring, som du betaler gennem
              fællesudgifterne.
            </p>
            <p>
              I et <strong>hus</strong> ejer du selve bygningen, så mange
              vælger en <strong>husforsikring</strong> (eller en kombineret
              hus- og indboforsikring) der dækker både bygning og indbo mod
              brand, vandskade, storm osv. Uden husforsikring står du selv med
              regningen ved fx brand eller store vandskader – det kan løbe op
              i hundredtusindvis eller millioner.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Hvorfor indgår indboforsikring i boligomkostninger?
            </h2>
            <p>
              Som boligejer er forsikring en <strong>løbende udgift</strong> du
              betaler månedligt eller årligt. Den indgår derfor i dine
              ejerudgifter sammen med grundskyld, ejendomsskat, vand, varme og
              fællesudgifter. Når du beregner, hvad du har råd til at betale for
              en bolig, bør den samlede månedlige udgift inkludere forsikring –
              ellers får du et for optimistisk billede af dine reelle
              boligomkostninger.
            </p>
            <p>
              Præmien afhænger af boligens størrelse, beliggenhed, værdi af
              indbo og hvad du vælger at have med i dækningen. Du kan typisk
              få et tilbud fra et forsikringsselskab eller sammenligne priser
              online og bruge et gennemsnitligt beløb i din budgetberegning.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Læs mere hos eksperterne
            </h2>
            <p>
              Forsikringsguiden tilbyder uvildig sammenligning af forsikringer
              og har særlig vejledning om indboforsikring. Du kan læse mere og
              sammenligne tilbud her:{" "}
              <a
                href="https://forsikringsguiden.dk/indboforsikring"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline hover:no-underline"
              >
                Forsikringsguiden – Indboforsikring
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">
              Sådan får du overblik over alle ejerudgifter
            </h2>
            <p>
              Indboforsikring er én af flere poster under ejerudgifter. Du kan
              læse mere om de øvrige – grundskyld, ejendomsskat, vand, varme,
              fællesudgifter – i vores artikel om{" "}
              <Link href="/artikler/ejerudgifter" className="text-brand-primary hover:underline">
                hvad ejerudgifter er
              </Link>
              . I vores boligomkostningsberegner kan du indtaste dine
              forventede ejerudgifter pr. måned (herunder forsikring) og få
              den samlede månedlige boligudgift.
            </p>
            <p>
              <Link href="/beregn" className="text-brand-primary hover:underline font-medium">
                Brug vores beregner her
              </Link>{" "}
              for at se, hvordan ejerudgifter inkl. forsikring påvirker din
              samlede boligøkonomi.
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-text-primary">Opsummering</h2>
            <p>
              En indboforsikring dækker dit indbo mod brand, vandskade,
              indbrud, tyveri og visse andre skader. For boligejere er den en
              fast del af de løbende ejerudgifter og bør medtages i din
              vurdering af den reelle månedlige boligudgift. I hus bør du
              ofte supplere med husforsikring, så både bygning og indbo er
              dækket.
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
