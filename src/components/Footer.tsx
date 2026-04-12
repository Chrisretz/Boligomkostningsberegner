import type { ReactNode } from "react";
import Link from "next/link";
import {
  COMPANY_CONTACT_EMAIL,
  COMPANY_CVR,
  COMPANY_LEGAL_NAME,
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_KONTAKT,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_LINKEDIN_URL,
} from "@/lib/site";

const copyrightYear = new Date().getFullYear();

const copyrightLine =
  COMPANY_LEGAL_NAME === "Boligklarhed"
    ? `© ${copyrightYear} Boligklarhed`
    : `© ${copyrightYear} Boligklarhed · ${COMPANY_LEGAL_NAME}`;

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/20 hover:ring-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-brand-primary text-white">
      <div className="container mx-auto py-14 px-4">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="text-small font-semibold text-white/90">
              Nyttige links
            </div>
            <nav className="space-y-2">
              <Link
                href="/privacy"
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Privatlivspolitik
              </Link>
              <Link
                href="/cookies"
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Cookies
              </Link>
              <Link
                href="/disclaimer"
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Ansvarsfraskrivelse
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <div className="text-small font-semibold text-white/90">
              Lær og forstå
            </div>
            <nav className="space-y-2">
              <Link
                href="/artikler"
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Artikler
              </Link>
              <Link
                href="/boligbegreber"
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Boligbegreber
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <div className="text-small font-semibold text-white/90">
              Beregn
            </div>
            <nav className="space-y-2">
              <Link
                href={PATH_BOLIGOMKOSTNINGER_BEREGNER}
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Boligomkostningsberegner
              </Link>
              <Link
                href="/beregnere"
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Alle beregnere
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <div className="text-small font-semibold text-white/90">Om</div>
            <nav className="space-y-2">
              <Link
                href="/om-os"
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Om os
              </Link>
              <Link
                href={PATH_KONTAKT}
                className="block text-body text-white/75 hover:text-white transition-colors"
              >
                Kontakt os
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="min-w-0 space-y-2 lg:max-w-2xl">
            <p className="text-small text-white/80 leading-relaxed">
              {copyrightLine}
              {COMPANY_CVR ? (
                <>
                  {" · "}
                  CVR: {COMPANY_CVR}
                </>
              ) : null}
              {" · "}
              <a
                href={`mailto:${COMPANY_CONTACT_EMAIL}`}
                className="text-white/90 underline decoration-white/35 underline-offset-2 transition-colors hover:text-white hover:decoration-white/55"
              >
                {COMPANY_CONTACT_EMAIL}
              </a>
            </p>
            <p className="text-help text-white/55">
              Vi kan modtage kommission fra partnere. Det koster ikke ekstra for
              dig.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end lg:shrink-0 lg:gap-8">
            <div className="flex items-center gap-3">
              <span className="text-small font-semibold text-white/90 whitespace-nowrap">
                Følg os
              </span>
              <div className="flex flex-wrap gap-2">
                <SocialIcon
                  href={SOCIAL_LINKEDIN_URL}
                  label="Boligklarhed på LinkedIn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </SocialIcon>
                <SocialIcon
                  href={SOCIAL_FACEBOOK_URL}
                  label="Boligklarhed på Facebook"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </SocialIcon>
                <SocialIcon
                  href={SOCIAL_INSTAGRAM_URL}
                  label="Boligklarhed på Instagram"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </SocialIcon>
              </div>
            </div>

            <nav
              aria-label="Juridiske links"
              className="flex flex-wrap gap-x-4 gap-y-1 text-small text-white/60"
            >
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privatliv
              </Link>
              <Link
                href="/cookies"
                className="hover:text-white transition-colors"
              >
                Cookies
              </Link>
              <Link
                href="/disclaimer"
                className="hover:text-white transition-colors"
              >
                Ansvarsfraskrivelse
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
