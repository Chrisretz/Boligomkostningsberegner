# Boligomkostningsberegner

MVP webprodukt der beregner den reelle totale boligomkostning for danske boligkøbere. Implementeret jf. PRD.

## Teknologi

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS** (design tokens fra Bolig UI Design Guide)
- **Zod** (validering)

## Kør projektet

```bash
npm install
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000).

## Struktur

- `/` – Landing page (funnel, hero, trust)
- `/beregn-dine-boligomkostninger` – Boligomkostningsberegner (formular og resultater; `/beregn` redirecter hertil)
- `/go/loan` – Affiliate redirect (302)
- `/privacy` – Privatlivspolitik
- `/cookies` – Cookie-information og indstillinger
- `/disclaimer` – Ansvarsfraskrivelse

## Artikel-feedback (e-mail fra artikler)

Nederst på alle undersider under `/artikler/…` vises et skema der sender til **<info@boligklarhed.dk>** via [Resend](https://resend.com).

1. Opret konto og API-nøgle hos Resend.
2. Verificer **boligklarhed.dk** og brug en afsender fra dit domæne, fx `Boligklarhed <kontakt@boligklarhed.dk>`.
3. Sæt i miljø (se `.env.example`):

   - `RESEND_API_KEY`
   - `ARTICLE_FEEDBACK_TO_EMAIL` (valgfri, standard er <info@boligklarhed.dk>)
   - `ARTICLE_FEEDBACK_FROM_EMAIL` (påkrævet i produktion med verificeret domæne)

Uden `RESEND_API_KEY` viser formularen en fejl ved afsendelse. Resends test-afsender `onboarding@resend.dev` kan kun levere til begrænsede modtagere – brug eget domæne til rigtig drift.

## Artikel- og begrebsdatoer (publiceret / opdateret)

Datoerne i artikel-layout og JSON-LD kommer fra `src/lib/article-dates.ts`.

- **Ny artikel:** `npm run article:new -- /artikler/din-slug` (sætter begge datoer til i dag kl. 12:00, Europe/Copenhagen).
- **Opdateret indhold:** `npm run article:touch -- /artikler/din-slug` (opdaterer kun `dateModified`).

## Miljøvariabler

Se `.env.example`. Sæt `AFFILIATE_BASE_URL` før produktionsdeploy.

## Beregningslogik (jf. PRD + udvidelser)

- **Skøde:** 1.850 kr + 0,6% af købspris (variabel del oprundes til nærmeste 100 kr)
- **Pant:** 1.825 kr + 1,25% af pantsikret beløb (2026-sats)
- **Vedligehold:** Hus 1,5%, lejlighed 1,0% af købspris pr. år
- **Lån:** Annuitetsformel
- **Bidrag (realkredit):** % pr. år af hovedstol (default 0,75%, kan justeres i formularen)
- **Ejendomsskat (2026-satser):** Ejendomsværdiskat 0,51% af 80% af købsprisen (1,4% over progressionsgrænsen 9.007.000 kr) + grundskyld med landsgennemsnitlig promille (7,4‰) af 80% af skønnet grundværdi (hus 25% / lejlighed 10% af købspris). Brugeren kan overskrive med eget beløb eller fravælge. Se `src/lib/propertyTax.ts`.
- **Lånerum → købspris:** maks. boliglån / 0,95 (80% realkredit + 15% banklån, mindst 5% udbetaling)

**Vigtigt:** Satser (tinglysning, ejendomsskat, elpris) ligger i `src/lib/constants.ts` og skal verificeres årligt – senest verificeret juli 2026.

## Tests

Beregningsmotoren er dækket af unit tests (Vitest):

```bash
npm test
```

## Design

- Farver: Finansblå (#1E3A5F), lys baggrund (#F4F7FA)
- Typografi: Inter, WCAG AA kontrast
