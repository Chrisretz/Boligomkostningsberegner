import type { Metadata } from "next";
import Link from "next/link";
import {
  fetchElspot,
  getElPriceHistory,
  elprisEstimatKr,
  ELPRIS_TILLAEG,
  AREA_LABELS,
  type AreaPrices,
  type PriceArea,
} from "@/lib/elpriser";
import { canonicalUrl, SITE_URL } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { ElpriserBarChart, type Bar } from "@/components/ElpriserBarChart";

const PAGE_PATH = "/elpriser";

/** Day-ahead-priser offentliggøres dagligt; én times cache er rigeligt. */
export const revalidate = 3600;

const title = "Elpriser i dag – aktuel spotpris pr. kWh (DK1 og DK2)";
const description =
  "Aktuelle elpriser i Danmark: spotpris pr. kWh for Vest- og Østdanmark, døgnets forløb og et vejledende skøn over den samlede pris inkl. transport, afgift og moms.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl(PAGE_PATH) },
  ...socialMetadata({ path: PAGE_PATH, title, description }),
};

function kr(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

/** ISO (dansk tid) → "23. juli 2026 kl. 14". */
function formatHour(iso: string): string {
  const m = iso.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})/);
  if (!m) return iso;
  const months = [
    "januar", "februar", "marts", "april", "maj", "juni",
    "juli", "august", "september", "oktober", "november", "december",
  ];
  const [, y, mo, d, h] = m;
  return `${Number(d)}. ${months[Number(mo) - 1]} ${y} kl. ${h}`;
}

/** Døgnets timepriser som søjler; billige timer (under snit) er grønne. */
function hourlyBars(a: AreaPrices): Bar[] {
  const labelHours = new Set([0, 6, 12, 18, 23]);
  return a.hourly.map((h) => ({
    key: h.hourDK,
    value: h.spotKr,
    color: h.spotKr < a.averageKr ? "#1D9E75" : "#1E3A5F",
    tooltip: `Kl. ${h.hour}:00 – ${kr(h.spotKr)} kr/kWh`,
    axisLabel: labelHours.has(h.hour) ? String(h.hour) : undefined,
  }));
}

export default async function ElpriserPage() {
  const data = await fetchElspot(24);
  const history = getElPriceHistory();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Forside", path: "/" },
    { name: "Data", path: "/data" },
    { name: "Elpriser", path: PAGE_PATH },
  ]);
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Aktuelle elspotpriser i Danmark (DK1 og DK2)",
    description,
    url: `${SITE_URL}${PAGE_PATH}`,
    creator: { "@type": "Organization", name: "Boligklarhed", url: SITE_URL },
    isAccessibleForFree: true,
    inLanguage: "da-DK",
    ...(data ? { dateModified: data.updatedAt } : {}),
    variableMeasured: "Elspotpris i kr/kWh pr. time og prisområde",
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
          /{" "}
          <Link href="/data" className="hover:text-brand-primary">
            Data
          </Link>{" "}
          / <span className="text-text-secondary">Elpriser</span>
        </nav>

        <header className="mb-8">
          <p className="text-small font-semibold uppercase tracking-[0.18em] text-brand-accent mb-2">
            Elpriser
          </p>
          <h1 className="text-h1 text-text-primary mb-3 break-words">
            Elpriser i dag
          </h1>
          <p className="text-body text-text-secondary leading-relaxed max-w-2xl">
            Aktuel spotpris på el pr. kWh for de to danske prisområder,
            opdateret dagligt. Spotprisen er råvareprisen på elmarkedet. Din
            samlede elregning er højere, fordi transport, afgift og moms lægges
            oveni. Vi viser begge dele, så du kan se forskellen.
          </p>
        </header>

        {data ? (
          <>
            <p className="mb-6 inline-flex flex-wrap items-center gap-2 text-small text-text-muted">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-brand-surface px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600" aria-hidden />
                Aktuelle priser
              </span>
              <span>Seneste time: {formatHour(data.updatedAt)}</span>
              <span aria-hidden>·</span>
              <span>Kilde: Energi Data Service</span>
            </p>

            <div className="grid gap-5 sm:grid-cols-2 mb-10">
              {(["DK1", "DK2"] as PriceArea[]).map((area) => (
                <AreaCard key={area} a={data.areas[area]} />
              ))}
            </div>

            <section aria-labelledby="doegn-heading" className="mb-10">
              <h2 id="doegn-heading" className="text-h2 text-text-primary mb-4">
                Døgnets priser time for time
              </h2>
              <p className="text-body text-text-secondary mb-5 leading-relaxed">
                Spotprisen svinger over døgnet. Grønne søjler er timer under
                gennemsnittet, altså de billigste at bruge strøm i. Priserne er
                spotpris ekskl. transport, afgift og moms.
              </p>
              <div className="space-y-6">
                {(["DK1", "DK2"] as PriceArea[]).map((area) => (
                  <figure key={area}>
                    <figcaption className="text-body font-medium text-text-primary mb-2">
                      {AREA_LABELS[area]}
                    </figcaption>
                    <ElpriserBarChart
                      bars={hourlyBars(data.areas[area])}
                      ariaLabel={`Elspotpris time for time i ${AREA_LABELS[area]}. Gennemsnit ${kr(data.areas[area].averageKr)} kr pr. kWh, billigst ${kr(data.areas[area].min.spotKr)} kr kl. ${data.areas[area].min.hour}, dyrest ${kr(data.areas[area].max.spotKr)} kr kl. ${data.areas[area].max.hour}.`}
                    />
                  </figure>
                ))}
              </div>
            </section>

            {history && history.length >= 2 && (
              <section aria-labelledby="historik-heading" className="mb-10">
                <h2
                  id="historik-heading"
                  className="text-h2 text-text-primary mb-4"
                >
                  Udvikling de seneste år
                </h2>
                <p className="text-body text-text-secondary mb-5 leading-relaxed">
                  Gennemsnitlig spotpris pr. måned for hele Danmark (snit af de
                  to prisområder). Elpriser svinger meget efter årstid, vejr og
                  gaspriser, så en enkelt måned siger ikke alt om niveauet, men
                  over år kan du se de større bevægelser.
                </p>
                <ElpriserBarChart
                  bars={history.map((m, i) => ({
                    key: m.month,
                    value: m.avgKr,
                    color: "#1E3A5F",
                    tooltip: `${m.label} – ${kr(m.avgKr)} kr/kWh i snit`,
                    axisLabel: m.month.endsWith("-01")
                      ? m.month.slice(0, 4)
                      : i === 0
                        ? m.label
                        : undefined,
                  }))}
                  ariaLabel={`Gennemsnitlig elspotpris pr. måned fra ${history[0].label} til ${history[history.length - 1].label}.`}
                />
                <p className="mt-2 text-small text-text-muted">
                  Månedligt gennemsnit af spotprisen, ekskl. transport, afgift
                  og moms. Kilde: Energi Data Service.
                </p>
              </section>
            )}

            <section aria-labelledby="regning-heading" className="mb-10 max-w-2xl">
              <h2 id="regning-heading" className="text-h2 text-text-primary mb-4">
                Fra spotpris til elregning
              </h2>
              <p className="text-body text-text-secondary mb-4 leading-relaxed">
                Spotprisen er kun en del af det, du betaler. Oveni kommer
                transport gennem elnettet, elafgift til staten og moms. Et groft
                regneeksempel på en typisk time:
              </p>
              <div className="overflow-x-auto rounded-md border border-border">
                <table className="w-full text-left text-small md:text-body">
                  <caption className="sr-only">
                    Vejledende opbygning af den samlede elpris pr. kWh.
                  </caption>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border">
                      <td className="py-2.5 px-3">
                        Spotpris (Vestdanmark, seneste time)
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums">
                        {kr(data.areas.DK1.latest.spotKr)} kr
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2.5 px-3">Transport og nettarif (typisk)</td>
                      <td className="py-2.5 px-3 text-right tabular-nums">
                        {kr(ELPRIS_TILLAEG.transportKr)} kr
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2.5 px-3">Elafgift til staten</td>
                      <td className="py-2.5 px-3 text-right tabular-nums">
                        {kr(ELPRIS_TILLAEG.elafgiftKr)} kr
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2.5 px-3">Moms (25 %)</td>
                      <td className="py-2.5 px-3 text-right tabular-nums">
                        {kr(
                          elprisEstimatKr(data.areas.DK1.latest.spotKr) -
                            (data.areas.DK1.latest.spotKr +
                              ELPRIS_TILLAEG.transportKr +
                              ELPRIS_TILLAEG.elafgiftKr)
                        )}{" "}
                        kr
                      </td>
                    </tr>
                    <tr className="bg-brand-surface font-semibold text-text-primary">
                      <td className="py-2.5 px-3">Anslået samlet pris</td>
                      <td className="py-2.5 px-3 text-right tabular-nums">
                        ca. {kr(elprisEstimatKr(data.areas.DK1.latest.spotKr))} kr
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-small text-text-muted leading-relaxed">
                Transport og elafgift er typiske niveauer kontrolleret{" "}
                {ELPRIS_TILLAEG.verified} og varierer betydeligt efter
                netselskab, leverandør og tidspunkt. Nettariffen er højere om
                aftenen. Brug tallet som størrelsesorden, ikke som en præcis
                pris. Din egen regning står på din elaftale.
              </p>
            </section>

            <section aria-labelledby="forbrug-heading" className="mb-10 max-w-2xl">
              <h2 id="forbrug-heading" className="text-h2 text-text-primary mb-4">
                Hvad betyder det for dit forbrug?
              </h2>
              <p className="text-body text-text-secondary leading-relaxed">
                En gennemsnitlig husstand bruger nogle tusinde kWh om året, og
                elregningen er en fast del af boligbudgettet. Vil du se typiske
                forbrugstal for din husstandsstørrelse, så læs vores gennemgang
                af{" "}
                <Link
                  href="/artikler/elforbrug-husstand"
                  className="text-brand-primary font-medium hover:underline"
                >
                  hvor meget strøm en familie bruger
                </Link>
                . Og skal du regne på hele boligøkonomien, samler{" "}
                <Link
                  href="/beregn-dine-boligomkostninger"
                  className="text-brand-primary font-medium hover:underline"
                >
                  boligomkostningsberegneren
                </Link>{" "}
                el, varme og de øvrige udgifter ét sted.
              </p>
            </section>
          </>
        ) : (
          <div className="rounded-md border border-dashed border-border bg-brand-background/50 p-6 text-body text-text-secondary leading-relaxed">
            <p>
              Elpriserne kunne ikke hentes lige nu. Prøv igen om lidt. Du kan i
              mellemtiden læse om typisk{" "}
              <Link
                href="/artikler/elforbrug-husstand"
                className="text-brand-primary font-medium hover:underline"
              >
                elforbrug i en husstand
              </Link>
              .
            </p>
          </div>
        )}

        <p className="mt-8">
          <Link href="/data" className="text-body text-brand-primary hover:underline">
            ← Al boligdata
          </Link>
        </p>
      </div>
      <ScrollToTopButton />
    </main>
  );
}

function AreaCard({ a }: { a: AreaPrices }) {
  const est = elprisEstimatKr(a.latest.spotKr);
  return (
    <div className="rounded-xl border border-border bg-brand-surface shadow-soft p-6">
      <p className="text-small font-medium text-text-secondary mb-1">
        {AREA_LABELS[a.area]}
      </p>
      <p className="text-3xl md:text-4xl font-bold text-text-primary tabular-nums leading-tight">
        {kr(a.latest.spotKr)}{" "}
        <span className="text-body font-medium text-text-muted">kr/kWh</span>
      </p>
      <p className="text-small text-text-muted mt-1">
        Spotpris, seneste time ({a.latest.hour}:00)
      </p>
      <dl className="mt-4 space-y-1.5 text-small">
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">Gennemsnit i døgnet</dt>
          <dd className="tabular-nums text-text-primary">{kr(a.averageKr)} kr</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">Billigste time ({a.min.hour}:00)</dt>
          <dd className="tabular-nums text-text-primary">{kr(a.min.spotKr)} kr</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-text-secondary">Dyreste time ({a.max.hour}:00)</dt>
          <dd className="tabular-nums text-text-primary">{kr(a.max.spotKr)} kr</dd>
        </div>
        <div className="flex justify-between gap-3 border-t border-border pt-1.5 mt-1.5">
          <dt className="text-text-secondary">Anslået samlet pris nu</dt>
          <dd className="tabular-nums font-semibold text-text-primary">
            ca. {kr(est)} kr
          </dd>
        </div>
      </dl>
    </div>
  );
}
