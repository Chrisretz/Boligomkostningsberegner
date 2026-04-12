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
  "Kontakt Boligklarhed på e-mail eller via formularen. CVR og virksomhedsoplysninger. Vi svarer på henvendelser om beregnerne og webstedet.";
const ogDescription =
  "Skriv til Boligklarhed på e-mail eller brug kontaktformularen – vi læser alle henvendelser.";

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

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-6 mb-10">
          <p>
            Har du spørgsmål om beregnerne, artiklerne eller noget andet på
            Boligklarhed? Skriv gerne til os på{" "}
            <a
              href={`mailto:${COMPANY_CONTACT_EMAIL}`}
              className="text-brand-primary underline hover:no-underline"
            >
              {COMPANY_CONTACT_EMAIL}
            </a>{" "}
            eller brug formularen herunder – vi læser alle henvendelser og
            vender tilbage på e-mail, når vi kan.
          </p>

          <div className="not-prose rounded-lg border border-border bg-brand-surface/40 px-4 py-4 text-body text-text-secondary shadow-soft sm:px-5">
            <p className="font-medium text-text-primary mb-2">Virksomhed</p>
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
