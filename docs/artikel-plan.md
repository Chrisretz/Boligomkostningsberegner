# Plan: Artikler under «Artikler»-fanen

Boligklarhed hjælper med **klarhed over boligøkonomi**. Artiklerne bør forklare de begreber og omkostninger, som beregneren bruger, samt give generel vejledning om boligkøb. Her er en prioriteret plan for oplagte artikler.

---

## Allerede på plads

| Slug | Titel | Status |
|------|--------|--------|
| `tinglysning` | Hvad er tinglysning? | ✅ Finnes |
| `ejerskifteforsikring` | Hvad er en ejerskifteforsikring? | ✅ Finnes |

---

## Fase 1: Kerneomkostninger (direkte i beregneren)

Disse emner matcher præcis det beregneren viser og styrker tillid + SEO.

| # | Foreslået slug | Foreslået titel | Kort formål |
|---|----------------|------------------|-------------|
| 1 | `skøde-og-tinglysning` | Hvad koster tinglysning af skøde? | Forklare den faste + variable afgift (1.850 kr + 0,6 %), hvornår man betaler, evt. link til beregneren. |
| 2 | `pant-og-pantebrev` | Hvad er pant og pantebrev? Hvad koster det? | Forklare tinglysning af pant (1.825 kr + 1,25 %), pantebrev, prioritet, hvorfor det hænger sammen med lånet. |
| 3 | `realkreditlån` | Realkreditlån: Sådan fungerer det | Kort om realkredit vs. banklån, annuitetslån, F1/F3/F5, bidrag – så tallene i beregneren giver mening. |
| 4 | `vedligehold-bolig` | Hvor meget skal jeg sætte af til vedligehold? | Forklare hus 1,5 % / lejlighed 1,0 % af købspris pr. år, hvad det dækker, og hvorfor det er med i beregneren. |

---

## Fase 2: Overblik og beslutninger

Brugeren har brug for at forstå det store billede og hvordan man bruger beregneren.

| # | Foreslået slug | Foreslået titel | Kort formål |
|---|----------------|------------------|-------------|
| 5 | `omkostninger-boligkoeb` | Alle omkostninger ved boligkøb: Overblik | Samlet liste: skøde, pant, ejerskifteforsikring, evt. mægler/målere, med link til beregner og til de enkelte artikler. |
| 6 | `rentestest` | Hvad er en rentestest – og hvorfor er den vigtig? | Forklare +1 % / +2 % rentestest, hvorfor den er med i beregneren, og hvordan man bruger den til at vurdere rådighed. |
| 7 | `hvad-skal-jeg-have-sparet` | Hvor meget skal jeg have sparet til boligkøb? | Udbetaling, omkostninger til tinglysning/pant, buffer – med reference til at beregneren viser de konkrete beløb. |

---

## Fase 3: Udvidelse (valgfri)

Ekstra artikler der styrker autoritet og søgeord.

| # | Foreslået slug | Foreslået titel | Kort formål |
|---|----------------|------------------|-------------|
| 8 | `ejerudgifter` | Ejerudgifter: Hvad betaler jeg som boligejer? | Grundskyld, ejendomsskat, forsikring, vand/varme – hvad beregneren evt. inkluderer vs. hvad man selv skal lægge oveni. |
| 9 | `realkredit-f1-f3-f5` | F1, F3 og F5 lån: Forskelle og hvad passer til dig | Kort sammenligning, risiko vs. forudsigelighed – supplerer realkredit-artiklen. |
| 10 | `boligkoeb-foerste-gang` | Boligkøb første gang: Sådan gør du | Checkliste og trin (sparing, søgning, beregning, advokat, forsikring) med link til beregner og artikler. |

---

## Anbefalet rækkefølge

1. **Fase 1** – så hver omkostningstype i beregneren har en tilhørende artikel.
2. **Fase 2** – overblik og rentestest gør det nemmere at bruge og stole på beregneren.
3. **Fase 3** – når du har tid og lyst, for dybde og flere søgeord.

---

## Teknisk påmindelse

Når du tilføjer nye artikler:

- Tilføj slug, titel og beskrivelse i `src/app/artikler/page.tsx` (array `articles`).
- Opret ny side under `src/app/artikler/[slug]/page.tsx` (eller én fil per slug som nu).
- Tilføj URL i `src/app/sitemap.ts` under artikler.

---

*Planen kan justeres efter feedback og hvad der giver mest trafik/tid.*
