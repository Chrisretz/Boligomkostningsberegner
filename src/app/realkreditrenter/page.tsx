import type { Metadata } from "next";
import Link from "next/link";
import { fetchLiveRates } from "@/lib/liveRates";
import { RATE_BY_LOAN_TYPE, RATE_SOURCE } from "@/lib/renter";
import { LOAN_TYPE_LABELS, calculateBidrag, type LoanType } from "@/lib/bidrag";
import { beregnForloeb } from "@/lib/laaneforloeb";
import { RATE_HISTORY, fastRateChangePp } from "@/lib/rate-history";
import {
  canonicalUrl,
  SITE_URL,
  PATH_BOLIGLAAN_BEREGNER,
} from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

const PAGE_PATH = "/realkreditrenter";

/** Kurserne opdateres få gange dagligt; ét døgn er rigeligt. */
export const revalidate = 86_400;

const title = "Realkreditrenter i dag – aktuelle niveauer pr. lånetype";
const description =
  "Aktuelle realkreditrenter pr. lånetype: fast rente, F3, F5 og F-kort, med kurs og hvad renten betyder for ydelsen på et lån på 1 mio. kr. Opdateres løbende.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl(PAGE_PATH) },
  ...socialMetadata({ path: PAGE_PATH, title, description }),
};

/** Rækkefølge: længst rentebinding først, F-kort sidst. */
const ORDER: LoanType[] = ["fast", "renteMaxF5F10", "f3f4", "f1f2", "fKort"];

function kr(n: number): string {
  return n.toLocaleString("da-DK");
}
function pct(n: number): string {
  return n.toFixed(2).replace(".", ",") + " %";
}

/** ISO-tidsstempel → "22. juli 2026". */
function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Månedlig ydelse år 1 på et lån på 1 mio. kr. med afdrag over 30 år. */
function monthlyPayment(loanType: LoanType, ratePct: number): number {
  const bidrag = calculateBidrag({
    loanDKK: 1_000_000,
    propertyValueDKK: 1_250_000,
    loanType,
    interestOnly: false,
  });
  const forloeb = beregnForloeb({
    ratePct,
    bidragPct: bidrag.ratePct,
    termYears: 30,
    interestOnlyYears: 0,
    principalDKK: 1_000_000,
  });
  return Math.round(forloeb.firstPaymentDKK);
}

export default async function RealkreditrenterPage() {
  const live = await fetchLiveRates();
  const isLive = live !== null;

  const medAfdrag: Record<LoanType, number> = {
    ...RATE_BY_LOAN_TYPE,
    ...(live?.medAfdrag ?? {}),
  };
  const afdragsfri: Record<LoanType, number> = {
    ...RATE_BY_LOAN_TYPE,
    ...(live?.afdragsfri ?? {}),
  };
  const kursFast = live?.kursFast.medAfdrag ?? null;
  const updatedLabel = live?.updatedAt
    ? formatDate(live.updatedAt)
    : RATE_SOURCE.updated;

  const leadRate = medAfdrag.fast;
  const changePp = fastRateChangePp();
  const hasTrend = RATE_HISTORY.length >= 2;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Forside", path: "/" },
    { name: "Realkreditrenter", path: PAGE_PATH },
  ]);

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Aktuelle realkreditrenter pr. lånetype",
    description,
    url: `${SITE_URL}${PAGE_PATH}`,
    creator: { "@type": "Organization", name: "Boligklarhed", url: SITE_URL },
    isAccessibleForFree: true,
    inLanguage: "da-DK",
    ...(live?.updatedAt ? { dateModified: live.updatedAt } : {}),
    variableMeasured: "Vejledende årlig rente og kurs pr. realkreditlånetype",
  };

  return (
    <main className="min-h-screen py-12 px-4 overflow-x-clip pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <div className="container mx-auto max-w-3xl min-w-0">
        <nav aria-label="Sti" className="mb-4 text-small text-text-muted">
          <Link href="/" className="hover:text-brand-primary">
            Forside
          </Link>{" "}
          / <span className="text-text-secondary">Realkreditrenter</span>
        </nav>

        <header className="mb-8">
          <p className="text-small font-semibold uppercase tracking-[0.18em] text-brand-accent mb-2">
            Rentebarometer
          </p>
          <h1 className="text-h1 text-text-primary mb-3 break-words">
            Realkreditrenter i dag
          </h1>
          <p className="text-body text-text-secondary leading-relaxed max-w-2xl">
            Aktuelle vejledende renteniveauer pr. lånetype, hentet fra
            obligationskurserne bag realkreditlånene. Se hvad renten er lige
            nu, og hvad den betyder for din månedlige ydelse. Tallene er
            niveauer til budgettering, ikke et lånetilbud.
          </p>
          <p className="mt-4 inline-flex flex-wrap items-center gap-2 text-small text-text-muted">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-brand-surface px-3 py-1">
              <span
                className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-green-600" : "bg-brand-accent"}`}
                aria-hidden
              />
              {isLive ? "Aktuelle kurser" : "Vejledende niveau"}
            </span>
            <span>Opdateret {updatedLabel}</span>
            <span aria-hidden>·</span>
            <span>Kilde: Totalkredits obligationsdata</span>
          </p>
        </header>

        <section
          aria-label="Toneangivende fast rente"
          className="rounded-xl border border-border bg-brand-primary text-white shadow-soft p-6 md:p-8 mb-8"
        >
          <p className="text-small font-medium text-white/80 mb-1">
            Toneangivende 30-årig fast rente (med afdrag)
          </p>
          <p className="text-4xl md:text-5xl font-bold tabular-nums leading-tight">
            {pct(leadRate)}
          </p>
          <p className="mt-3 text-small text-white/80">
            {kursFast != null
              ? `Kurs ${kursFast.toLocaleString("da-DK")} på den toneangivende obligation.`
              : "Fastforrentet lån med samme rente i hele løbetiden."}
            {changePp != null && changePp !== 0 && (
              <>
                {" "}
                {changePp > 0 ? "Op" : "Ned"} {pct(Math.abs(changePp))} siden
                sidste måned.
              </>
            )}
          </p>
        </section>

        <section aria-labelledby="tabel-heading" className="mb-10">
          <h2 id="tabel-heading" className="text-h2 text-text-primary mb-4">
            Renter pr. lånetype
          </h2>
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full text-left text-small md:text-body">
              <caption className="sr-only">
                Vejledende årlig realkreditrente pr. lånetype, med og uden
                afdrag.
              </caption>
              <thead>
                <tr className="border-b border-border bg-brand-surface">
                  <th scope="col" className="py-2.5 px-3 font-semibold text-text-primary">
                    Lånetype
                  </th>
                  <th scope="col" className="py-2.5 px-3 font-semibold text-text-primary text-right">
                    Med afdrag
                  </th>
                  <th scope="col" className="py-2.5 px-3 font-semibold text-text-primary text-right">
                    Afdragsfri
                  </th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                {ORDER.map((lt) => (
                  <tr key={lt} className="border-b border-border last:border-0">
                    <td className="py-2.5 px-3 text-text-primary">
                      {LOAN_TYPE_LABELS[lt]}
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums">
                      {pct(medAfdrag[lt])}
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums">
                      {pct(afdragsfri[lt])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-small text-text-muted leading-relaxed">
            Fast rente er den effektive rente på den toneangivende obligation.
            F3 og F5 er kontantrenter, og F-kort er dagens beregningsrente.
            F1-F2 udbydes ikke længere bredt og vises som vejledende niveau.
          </p>
        </section>

        <section aria-labelledby="ydelse-heading" className="mb-10">
          <h2 id="ydelse-heading" className="text-h2 text-text-primary mb-4">
            Hvad betyder renten for ydelsen?
          </h2>
          <p className="text-body text-text-secondary mb-4 leading-relaxed">
            Månedlig ydelse i år 1 på et lån på{" "}
            <strong className="text-text-primary">1 mio. kr.</strong> med afdrag
            over 30 år, inkl. bidrag ved 80 % belåning. Bidraget er størst på de
            variable lån, så den laveste rente giver ikke altid den laveste
            ydelse.
          </p>
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full text-left text-small md:text-body">
              <caption className="sr-only">
                Månedlig ydelse år 1 på 1 mio. kr. pr. lånetype.
              </caption>
              <thead>
                <tr className="border-b border-border bg-brand-surface">
                  <th scope="col" className="py-2.5 px-3 font-semibold text-text-primary">
                    Lånetype
                  </th>
                  <th scope="col" className="py-2.5 px-3 font-semibold text-text-primary text-right">
                    Rente
                  </th>
                  <th scope="col" className="py-2.5 px-3 font-semibold text-text-primary text-right">
                    Ydelse pr. måned
                  </th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                {ORDER.map((lt) => (
                  <tr key={lt} className="border-b border-border last:border-0">
                    <td className="py-2.5 px-3 text-text-primary">
                      {LOAN_TYPE_LABELS[lt]}
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums">
                      {pct(medAfdrag[lt])}
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums font-medium text-text-primary">
                      {kr(monthlyPayment(lt, medAfdrag[lt]))} kr
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-body text-text-secondary">
            <Link
              href={PATH_BOLIGLAAN_BEREGNER}
              className="text-brand-primary font-medium hover:underline"
            >
              Regn på dit eget lånebeløb i realkreditlån beregneren →
            </Link>
          </p>
        </section>

        <section aria-labelledby="udvikling-heading" className="mb-10">
          <h2 id="udvikling-heading" className="text-h2 text-text-primary mb-4">
            Udvikling i den faste rente
          </h2>
          {hasTrend ? (
            <RateTrend />
          ) : (
            <div className="rounded-md border border-dashed border-border bg-brand-background/50 p-5 text-body text-text-secondary leading-relaxed">
              <p>
                Vi begyndte at føre denne oversigt i {RATE_HISTORY[0].label}.
                Grafen over renteudviklingen vises her, så snart der er mindst
                to måneders data. Kom tilbage næste måned, eller brug tallene
                ovenfor til dit budget nu.
              </p>
            </div>
          )}
        </section>

        <section aria-labelledby="brug-heading" className="mb-10 max-w-2xl">
          <h2 id="brug-heading" className="text-h2 text-text-primary mb-4">
            Sådan bruger du tallene
          </h2>
          <div className="space-y-4 text-body text-text-secondary leading-relaxed">
            <p>
              Renten her er obligationsrenten bag lånet. Den effektive rente,
              du ender med, afhænger af kursen på handelsdagen, kursskæring og
              et eventuelt kurstab. Derfor er tallene til at danne overblik og
              budget, ikke et bindende tilbud.
            </p>
            <p>
              Vil du sammenligne lånetyperne på ydelse og risiko, kan du læse
              vores gennemgang af{" "}
              <Link
                href="/artikler/sammenligning-af-laanetyper"
                className="text-brand-primary font-medium hover:underline"
              >
                lånetyper ved boligkøb
              </Link>
              , og hvordan{" "}
              <Link
                href="/artikler/realkreditlan"
                className="text-brand-primary font-medium hover:underline"
              >
                realkreditlån fungerer
              </Link>
              .
            </p>
          </div>
        </section>

        <p className="mt-8">
          <Link href="/beregnere" className="text-body text-brand-primary hover:underline">
            ← Alle beregnere
          </Link>
        </p>
      </div>
      <ScrollToTopButton />
    </main>
  );
}

/** Simpel SVG-linje over den faste rente. Renderes kun ved ≥2 datapunkter. */
function RateTrend() {
  const W = 640;
  const H = 220;
  const PAD = { left: 40, right: 12, top: 16, bottom: 28 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const values = RATE_HISTORY.map((s) => s.fast);
  const min = Math.floor(Math.min(...values) * 2) / 2 - 0.25;
  const max = Math.ceil(Math.max(...values) * 2) / 2 + 0.25;
  const span = max - min || 1;

  const x = (i: number) =>
    PAD.left + (RATE_HISTORY.length === 1 ? plotW / 2 : (i / (RATE_HISTORY.length - 1)) * plotW);
  const y = (v: number) => PAD.top + plotH - ((v - min) / span) * plotH;

  const line = RATE_HISTORY.map((s, i) => `${x(i)},${y(s.fast)}`).join(" ");

  return (
    <figure>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label={`Udvikling i den toneangivende faste realkreditrente fra ${RATE_HISTORY[0].label} til ${RATE_HISTORY[RATE_HISTORY.length - 1].label}.`}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const val = min + span * t;
          const yy = y(val);
          return (
            <g key={t}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={yy}
                y2={yy}
                stroke="#E2E6EC"
                strokeWidth={1}
              />
              <text
                x={PAD.left - 6}
                y={yy + 3}
                textAnchor="end"
                className="fill-text-muted"
                style={{ fontSize: 11 }}
              >
                {val.toFixed(1).replace(".", ",")}
              </text>
            </g>
          );
        })}
        <polyline
          points={line}
          fill="none"
          stroke="#1E3A5F"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {RATE_HISTORY.map((s, i) => (
          <circle key={s.date} cx={x(i)} cy={y(s.fast)} r={3.5} fill="#1E3A5F" />
        ))}
        {RATE_HISTORY.map((s, i) => (
          <text
            key={`lbl-${s.date}`}
            x={x(i)}
            y={H - 8}
            textAnchor="middle"
            className="fill-text-muted"
            style={{ fontSize: 11 }}
          >
            {s.label}
          </text>
        ))}
      </svg>
      <figcaption className="mt-2 text-small text-text-muted">
        Toneangivende 30-årig fast rente med afdrag, pr. måned.
      </figcaption>
    </figure>
  );
}
