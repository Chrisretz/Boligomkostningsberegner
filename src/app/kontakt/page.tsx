import type { Metadata } from "next";
import Link from "next/link";
import { ArticleFeedbackForm } from "@/components/ArticleFeedbackForm";
import {
  COMPANY_CONTACT_EMAIL,
  COMPANY_CVR,
  PATH_KONTAKT,
  canonicalUrl,
} from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";

const title = "Kontakt os";
const description =
  "Kontakt Boligklarhed om boligomkostninger, beregnere og indhold. Skriv på e-mail eller via formularen. CVR og virksomhedsoplysninger. Vi svarer på henvendelser om webstedet og værktøjerne.";
const ogDescription =
  "Kontakt Boligklarhed om spørgsmål til boligomkostninger, beregnere og artikler – på e-mail eller via formularen.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl(PATH_KONTAKT) },
  ...socialMetadata({
    path: PATH_KONTAKT,
    title,
    description: ogDescription,
  }),
};

export default function KontaktPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-h1 text-text-primary mb-4">Kontakt os</h1>

        <div className="prose prose-lg max-w-none text-body text-text-secondary mb-10 space-y-6">
          <p>
            Har du spørgsmål om beregnerne, artiklerne eller noget andet på
            Boligklarhed? Skriv gerne til os på{" "}
            <a
              href={`mailto:${COMPANY_CONTACT_EMAIL}`}
              className="text-brand-primary underline hover:no-underline"
            >
              {COMPANY_CONTACT_EMAIL}
            </a>{" "}
            eller brug formularen herunder. Vi læser alle henvendelser og
            vender tilbage på e-mail, når vi har mulighed for det.
          </p>

          <h2 className="text-h2 font-semibold text-text-primary !mb-3 !mt-8">
            Hvem henvender Boligklarhed sig til?
          </h2>
          <p>
            Boligklarhed er til dig, der overvejer boligkøb eller vil forstå de
            reelle omkostninger ved køb og ejerskab. På sitet finder du gratis
            værktøjer til at beregne boligomkostninger og boliglån, se effekten
            af renteændringer og få overblik over typiske poster som tinglysning,
            skødeskifte og fællesudgifter. Artikler og boligbegreber supplerer
            beregnerne med forklaringer, der gør komplekst stof mere
            tilgængeligt, uden at erstatte dialog med din bank eller
            realkreditinstitut.
          </p>

          <h2 className="text-h2 font-semibold text-text-primary !mb-3 !mt-8">
            Hvad kan vi hjælpe med?
          </h2>
          <p>
            Når du kontakter os, kan vi blandt andet hjælpe med spørgsmål om,
            hvordan beregnerne bruges, forslag til nye emner eller forbedringer
            af indholdet, og fejlrapportering hvis tal, tekst eller funktioner
            ikke opfører sig som forventet. Vi svarer på almindelig dansk og
            henviser til de relevante sider, når det giver bedst mening.
          </p>
          <p>
            Vi leverer ikke personlig finansiel rådgivning, juridisk bistand
            eller vurderinger af konkrete boligkøb. Er du i tvivl om dit lån,
            dine kontrakter eller din kreditvurdering, bør du tale med dit
            pengeinstitut, en uafhængig rådgiver eller andre kvalificerede
            fagpersoner. Boligklarhed er et uafhængigt informations- og
            beregningsværktøj, som du bruger på eget ansvar som udgangspunkt for
            din egen research.
          </p>
          <p>
            Oplever du et teknisk problem, er det en stor hjælp, hvis du
            beskriver, hvilken side eller beregner du brugte, hvilken browser
            eller enhed du er på (for eksempel Chrome, Safari eller en bestemt
            telefon), og hvad der skete i stedet for det, du forventede. Jo mere
            konkret din besked er, jo lettere er det for os at finde og rette
            fejlen.
          </p>
          <p>
            Svartid kan variere i travle perioder, men vi bestræber os på at
            svare alle seriøse henvendelser. Du får som udgangspunkt svar på den
            e-mailadresse, du oplyser i formularen.
          </p>

          <h2 className="text-h2 font-semibold text-text-primary !mb-3 !mt-8">
            Oplysninger og privatliv
          </h2>
          <p>
            Når du bruger kontaktformularen, skal du oplyse navn, e-mail og en
            besked, så vi kan svare dig. Vi bruger kun oplysningerne til at
            behandle din henvendelse og forbedre webstedet, når du rapporterer
            fejl eller kommer med konkrete forslag. Vi sælger ikke dine data,
            og vi tilføjer dig ikke automatisk til et nyhedsbrev, fordi du
            skriver til os. Hvis du vil vide mere om cookies, logning og dine
            rettigheder, kan du læse vores{" "}
            <Link
              href="/privacy"
              className="text-brand-primary underline hover:no-underline"
            >
              privatlivspolitik
            </Link>
            . Generelle forbehold om brug af sitet og beregnere finder du under{" "}
            <Link
              href="/disclaimer"
              className="text-brand-primary underline hover:no-underline"
            >
              ansvarsfraskrivelse
            </Link>
            .
          </p>
          <p>
            Har du idéer til artikler om boligkøb, realkredit, budget eller
            ejerudgifter, må du gerne skrive emnet og gerne en kort vinkel. Vi
            kan ikke love, at alt bliver til indhold med det samme, men
            konkrete forslag fra læsere hjælper os med at prioritere, hvad der
            giver mest værdi for boligkøbere i Danmark.
          </p>
          <p>
            Boligklarhed er gratis at bruge i det omfang, der fremgår af sitet.
            Vi opdaterer løbende beregnere og artikler, når regler eller praksis
            ændrer sig, men resultater er vejledende. Brug dem som et
            udgangspunkt i din egen research, og få altid bekræftet tal og
            vilkår hos dit pengeinstitut, før du træffer beslutninger om køb
            eller finansiering.
          </p>

          <div className="not-prose rounded-lg border border-border bg-brand-surface/40 px-4 py-4 text-body text-text-secondary shadow-soft sm:px-5">
            <p className="mb-2 font-medium text-text-primary">Virksomhed</p>
            <p className="text-small leading-relaxed">
              Boligklarhed
              {COMPANY_CVR ? (
                <>
                  {" "}
                  – CVR:{" "}
                  <span className="tabular-nums font-medium text-text-primary">
                    {COMPANY_CVR}
                  </span>
                  .
                </>
              ) : null}
            </p>
          </div>

          <p>
            Måske finder du allerede svar på{" "}
            <Link
              href="/beregnere"
              className="text-brand-primary underline hover:no-underline"
            >
              siden med beregnere
            </Link>
            , i{" "}
            <Link
              href="/artikler"
              className="text-brand-primary underline hover:no-underline"
            >
              artiklerne om bolig og økonomi
            </Link>{" "}
            eller under{" "}
            <Link
              href="/boligbegreber"
              className="text-brand-primary underline hover:no-underline"
            >
              boligbegreber
            </Link>
            . Du er også velkommen til at læse mere under{" "}
            <Link
              href="/om-os"
              className="text-brand-primary underline hover:no-underline"
            >
              Om os
            </Link>
            .
          </p>
        </div>

        <ArticleFeedbackForm
          articlePath={PATH_KONTAKT}
          heading="Skriv til os"
          description="Udfyld formularen herunder – vi læser alle henvendelser og svarer på e-mail. Du kan også komme med forslag til webstedet eller spørgsmål om beregnerne."
        />

        <p className="mt-10">
          <Link href="/om-os" className="text-body text-brand-primary hover:underline">
            Om os
          </Link>
          {" · "}
          <Link href="/" className="text-body text-brand-primary hover:underline">
            Tilbage til forsiden
          </Link>
        </p>
      </div>
    </main>
  );
}
