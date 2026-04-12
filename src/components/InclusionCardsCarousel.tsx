"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

const SLIDE_COUNT = 6;

const SLIDE_TITLES = [
  "Finansiering og månedlig ydelse",
  "Rentestest",
  "Ejerudgifter",
  "El, varme og vand",
  "Vedligehold",
  "Tinglysning",
] as const;

const slideClass =
  "min-w-0 w-1/6 shrink-0 px-6 py-8 sm:px-8 sm:py-9 text-left";

const SWIPE_MIN_DX = 56;

export function InclusionCardsCarousel() {
  const [index, setIndex] = useState(0);
  const regionId = useId();
  const announceId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [isInView, setIsInView] = useState(false);

  const go = useCallback((delta: -1 | 1) => {
    setIndex((i) => (i + delta + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  const goTo = useCallback((i: number) => {
    setIndex(((i % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.12, rootMargin: "0px" }
    );

    obs.observe(root);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      if (
        el.closest(
          'input, textarea, select, [contenteditable="true"], [role="slider"]'
        )
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(SLIDE_COUNT - 1);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isInView, go, goTo]);

  const pctPerSlide = 100 / SLIDE_COUNT;

  const prevTitle =
    SLIDE_TITLES[(index - 1 + SLIDE_COUNT) % SLIDE_COUNT];
  const nextTitle = SLIDE_TITLES[(index + 1) % SLIDE_COUNT];

  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }

  function onTouchEnd(e: React.TouchEvent) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;

    if (Math.abs(dx) < SWIPE_MIN_DX) return;
    if (Math.abs(dx) < Math.abs(dy)) return;

    if (dx > 0) go(-1);
    else go(1);
  }

  return (
    <div ref={containerRef} className="mx-auto max-w-2xl">
      <p
        id={announceId}
        role="status"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        Emne {index + 1} af {SLIDE_COUNT}: {SLIDE_TITLES[index]}
      </p>

      <div className="flex items-stretch gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-controls={regionId}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full border border-border bg-brand-surface text-brand-primary shadow-soft transition-colors hover:border-brand-primary hover:bg-brand-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          aria-label={`Forrige: ${prevTitle}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div
          id={regionId}
          role="region"
          aria-roledescription="Karrusel"
          aria-label="Hvad boligomkostningsberegneren inkluderer"
          className="min-h-[20rem] min-w-0 flex-1 overflow-hidden rounded-md border border-border bg-brand-surface/50 shadow-soft sm:min-h-[19rem] touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{
              width: `${SLIDE_COUNT * 100}%`,
              transform: `translateX(-${index * pctPerSlide}%)`,
            }}
          >
            <div
              className={slideClass}
              inert={index !== 0}
              aria-hidden={index !== 0}
            >
              <h3 className="text-h3 text-text-primary mb-4">
                Finansiering og månedlig ydelse
              </h3>
              <p className="text-body text-text-secondary leading-relaxed">
                Beregneren opgør den månedlige boligydelse ud fra realkreditlån,
                evt. bolig- eller banklån, rente og løbetid – med mulighed for
                afdragsfrihed og bidrag. I vores{" "}
                <Link
                  href="/artikler/realkreditlan"
                  className="text-brand-primary underline underline-offset-2 hover:no-underline"
                >
                  artikel om realkreditlån
                </Link>{" "}
                får du overblik over typiske lånestrukturer og ydelse ved boligkøb; du kan også læse om{" "}
                <Link
                  href="/artikler/sammenligning-af-laanetyper"
                  className="text-brand-primary underline underline-offset-2 hover:no-underline"
                >
                  sammenligning af lånetyper
                </Link>
                .
              </p>
            </div>

            <div
              className={slideClass}
              inert={index !== 1}
              aria-hidden={index !== 1}
            >
              <h3 className="text-h3 text-text-primary mb-4">Rentestest</h3>
              <p className="text-body text-text-secondary leading-relaxed">
                Resultatet viser en rentestest ved +1 % og +2 % rente, så du ser
                den samlede boligudgift, hvis renten stiger – nyttigt til
                budgettet ved kort eller variabel rente. Læs vores{" "}
                <Link
                  href="/artikler/realkreditlan-beregner"
                  className="text-brand-primary underline underline-offset-2 hover:no-underline"
                >
                  guide til boligomkostningsberegner og rentestresstest
                </Link>
                , som forklarer, hvordan scenarierne bruges i praksis.
              </p>
            </div>

            <div
              className={slideClass}
              inert={index !== 2}
              aria-hidden={index !== 2}
            >
              <h3 className="text-h3 text-text-primary mb-4">Ejerudgifter</h3>
              <p className="text-body text-text-secondary leading-relaxed">
                Ejerudgifter som skat, forsikring og andre faste poster samles
                i én månedlig oversigt, så du ser den samlede boligudgift ud
                over lånet og får overblik over faste omkostninger. Læs vores{" "}
                <Link
                  href="/artikler/ejerudgifter"
                  className="text-brand-primary underline underline-offset-2 hover:no-underline"
                >
                  guide til ejerudgifter for boligejere
                </Link>
                , og tilpas beløbene i beregneren, så du tester et realistisk
                boligbudget ud fra din bolig og dine forventninger.
              </p>
            </div>

            <div
              className={slideClass}
              inert={index !== 3}
              aria-hidden={index !== 3}
            >
              <h3 className="text-h3 text-text-primary mb-4">
                El, varme og vand
              </h3>
              <p className="text-body text-text-secondary leading-relaxed">
                I beregneren samler vi el, varme og vand i ét overblik: du kan
                få et vejledende el-estimat ud fra boligtype og husstand og
                selv indtaste varme, vand og øvrige faste poster. Læs vores{" "}
                <Link
                  href="/artikler/elforbrug-husstand"
                  className="text-brand-primary underline underline-offset-2 hover:no-underline"
                >
                  artikel om elforbrug i husstande
                </Link>{" "}
                for baggrund om forbrugstal; om energimærke og varme kan du
                også se vores{" "}
                <Link
                  href="/artikler/energimaerker-og-boligokonomi"
                  className="text-brand-primary underline underline-offset-2 hover:no-underline"
                >
                  guide til energimærker og boligøkonomi
                </Link>
                .
              </p>
            </div>

            <div
              className={slideClass}
              inert={index !== 4}
              aria-hidden={index !== 4}
            >
              <h3 className="text-h3 text-text-primary mb-4">Vedligehold</h3>
              <p className="text-body text-text-secondary leading-relaxed">
                Vedligehold og vedligeholdelsesreserve estimeres ud fra
                boligtype (typisk højere for hus end ejerlejlighed), så du kan
                budgettere med løbende udgifter til boligen. I vores{" "}
                <Link
                  href="/artikler/vedligehold"
                  className="text-brand-primary underline underline-offset-2 hover:no-underline"
                >
                  artikel om vedligehold af bolig
                </Link>{" "}
                går vi i dybden med reserve, typiske poster og hvordan det
                påvirker dine samlede boligomkostninger.
              </p>
            </div>

            <div
              className={slideClass}
              inert={index !== 5}
              aria-hidden={index !== 5}
            >
              <h3 className="text-h3 text-text-primary mb-4">Tinglysning</h3>
              <p className="text-body text-text-secondary leading-relaxed">
                Boligomkostningsberegneren medregner tinglysningsafgift for
                skøde og pant efter gældende satser, så engangsomkostningerne
                ved boligkøb bliver tydelige. Læs vores{" "}
                <Link
                  href="/artikler/tinglysning"
                  className="text-brand-primary underline underline-offset-2 hover:no-underline"
                >
                  guide til tinglysning og tinglysningsafgift
                </Link>
                ; aktuelle satser og officielle oplysninger finder du hos{" "}
                <a
                  href="https://skat.dk/erhverv/afgifter-paa-varer-og-ydelser-punktafgifter/nyhedsbrev-afgifter/tinglysningsafgift-ny-afgiftssats-pr-1-januar-2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary underline underline-offset-2 hover:no-underline"
                >
                  Skattestyrelsen
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-controls={regionId}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full border border-border bg-brand-surface text-brand-primary shadow-soft transition-colors hover:border-brand-primary hover:bg-brand-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          aria-label={`Næste: ${nextTitle}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <p
        className="mt-4 text-center text-help text-text-secondary tabular-nums"
        aria-hidden="true"
      >
        {index + 1} / {SLIDE_COUNT}{" "}
        <span className="text-text-muted">·</span>{" "}
        <span className="text-text-secondary">{SLIDE_TITLES[index]}</span>
      </p>

      <div className="mt-4 flex flex-col items-center gap-3">
        <label
          htmlFor={`${regionId}-slider`}
          className="text-help text-text-secondary sr-only"
        >
          Vælg emne ({index + 1} af {SLIDE_COUNT})
        </label>
        <input
          id={`${regionId}-slider`}
          type="range"
          min={0}
          max={SLIDE_COUNT - 1}
          step={1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          className="inclusion-carousel-slider h-2 w-full max-w-xs cursor-pointer rounded-full sm:max-w-sm"
          aria-valuetext={`${SLIDE_TITLES[index]}, emne ${index + 1} af ${SLIDE_COUNT}`}
        />
        <nav className="flex flex-wrap justify-center gap-1.5" aria-label="Vælg emne">
          {Array.from({ length: SLIDE_COUNT }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-current={index === i ? "true" : undefined}
              aria-label={`Gå til ${SLIDE_TITLES[i]}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 ${
                index === i
                  ? "bg-brand-primary"
                  : "bg-border-strong hover:bg-text-muted"
              }`}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
