import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AUTHOR } from "@/lib/author";
import { canonicalUrl, PATH_KONTAKT } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { getPersonSchema, getBreadcrumbSchema } from "@/lib/structured-data";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

const title = `${AUTHOR.name} – ${AUTHOR.role}`;
const description = `${AUTHOR.name} står bag Boligklarheds beregnere, data og artikler. ${AUTHOR.bio[0]}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl(AUTHOR.path) },
  ...socialMetadata({ path: AUTHOR.path, title, description }),
};

export default function ForfatterPage() {
  const personSchema = getPersonSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Forside", path: "/" },
    { name: "Om os", path: "/om-os" },
    { name: AUTHOR.name, path: AUTHOR.path },
  ]);

  return (
    <main className="min-h-screen py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container mx-auto max-w-2xl">
        <nav aria-label="Sti" className="mb-4 text-small text-text-muted">
          <Link href="/" className="hover:text-brand-primary">
            Forside
          </Link>{" "}
          /{" "}
          <Link href="/om-os" className="hover:text-brand-primary">
            Om os
          </Link>{" "}
          / <span className="text-text-secondary">{AUTHOR.name}</span>
        </nav>

        <header className="mb-8 flex items-start gap-5">
          {AUTHOR.imageUrl ? (
            <Image
              src={AUTHOR.imageUrl}
              alt={`Portræt af ${AUTHOR.name}`}
              width={96}
              height={96}
              className="rounded-full shrink-0 border border-border"
            />
          ) : (
            <span
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white text-3xl font-semibold"
              aria-hidden
            >
              {AUTHOR.name.charAt(0)}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-small font-semibold uppercase tracking-[0.18em] text-brand-accent mb-1">
              Forfatter
            </p>
            <h1 className="text-h1 text-text-primary mb-1 break-words">
              {AUTHOR.name}
            </h1>
            <p className="text-body text-text-secondary">{AUTHOR.role}</p>
          </div>
        </header>

        <div className="prose prose-lg max-w-none text-body text-text-secondary space-y-4">
          {AUTHOR.bio.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>

        {AUTHOR.credentials.length > 0 && (
          <section className="mt-8" aria-labelledby="kvalifikationer">
            <h2
              id="kvalifikationer"
              className="text-h3 text-text-primary mb-3"
            >
              Baggrund
            </h2>
            <ul className="not-prose space-y-2">
              {AUTHOR.credentials.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2 text-body text-text-secondary"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" aria-hidden />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-8 rounded-md border border-border bg-brand-surface/70 p-5 md:p-6">
          <h2 className="text-h3 text-text-primary mb-2">Redaktionelt princip</h2>
          <p className="text-body text-text-secondary leading-relaxed">
            Indholdet på Boligklarhed bygger på officielle satser fra blandt
            andet Skattestyrelsen og aktuelle markedsdata fra realkredit- og
            energikilder. Tallene er vejledende og opdateres løbende.
            Boligklarhed er uafhængigt og giver ikke personlig finansiel
            rådgivning. Har du spørgsmål eller rettelser, så skriv til os via{" "}
            <Link
              href={PATH_KONTAKT}
              className="text-brand-primary font-medium hover:underline"
            >
              kontaktsiden
            </Link>
            .
          </p>
        </section>

        <p className="mt-8">
          <Link href="/artikler" className="text-body text-brand-primary hover:underline">
            ← Se alle artikler
          </Link>
        </p>
      </div>
      <ScrollToTopButton />
    </main>
  );
}
