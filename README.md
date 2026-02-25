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
- `/beregn` – Beregner med formular og resultater
- `/go/loan` – Affiliate redirect (302)
- `/privacy` – Privatlivspolitik
- `/cookies` – Cookie-information og indstillinger
- `/disclaimer` – Ansvarsfraskrivelse

## Miljøvariabler

Se `.env.example`. Sæt `AFFILIATE_BASE_URL` før produktionsdeploy.

## Beregningslogik (jf. PRD)

- **Skøde:** 1.850 kr + 0,6% af købspris (variabel del oprundes til nærmeste 100 kr)
- **Pant:** 1.825 kr + 1,25% af pantsikret beløb
- **Vedligehold:** Hus 1,5%, lejlighed 1,0% af købspris pr. år
- **Lån:** Annuitetsformel

## Design

- Farver: Finansblå (#1E3A5F), lys baggrund (#F4F7FA)
- Typografi: Inter, WCAG AA kontrast
