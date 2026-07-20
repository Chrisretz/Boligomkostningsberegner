/**
 * E-mail til brugeren efter lead-submit på "Hvad kan jeg købe bolig for?".
 * Bruger samme visuelle stil som artikel-feedback-mailen.
 */

import { SITE_URL, PATH_BOLIGOMKOSTNINGER_BEREGNER } from "@/lib/site";
import { GEARING_DEFAULT, FINANCING_SHARE } from "@/lib/loanCapacityConstants";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function kr(n: number): string {
  return `${n.toLocaleString("da-DK")} kr`;
}

export interface LeadEmailData {
  firstName: string;
  annualIncomeDkk: number;
  existingDebtDkk: number;
  maxLoanDkk: number;
  estimatedPurchaseDkk: number;
}

export function buildLeadEmailSubject(): string {
  return "Din beregning fra Boligklarhed – dit vejledende lånerum";
}

export function buildLeadEmailText(d: LeadEmailData): string {
  return [
    `Hej ${d.firstName}`,
    "",
    "Tak fordi du brugte Boligklarhed. Her er din beregning:",
    "",
    `Bruttoindtægt: ${kr(d.annualIncomeDkk)} pr. år`,
    d.existingDebtDkk > 0 ? `Eksisterende gæld: ${kr(d.existingDebtDkk)}` : null,
    `Vejledende lånerum (gearing ${GEARING_DEFAULT}): ${kr(d.maxLoanDkk)}`,
    `Estimeret maksimal købspris: ${kr(d.estimatedPurchaseDkk)}`,
    "",
    "Beregningen er vejledende. Banken laver sin egen kreditvurdering, hvor",
    "rådighedsbeløb, jobsituation og øvrig økonomi indgår.",
    "",
    `Se hvad boligen koster om måneden: ${SITE_URL}${PATH_BOLIGOMKOSTNINGER_BEREGNER}`,
    "",
    "Venlig hilsen",
    "Boligklarhed",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildLeadEmailHtml(d: LeadEmailData): string {
  const name = escapeHtml(d.firstName);
  const calcUrl = `${SITE_URL}${PATH_BOLIGOMKOSTNINGER_BEREGNER}`;
  const downPct = Math.round((1 - FINANCING_SHARE) * 100);

  const row = (label: string, value: string, strong = false) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #E5E7EB;font-size:15px;color:#6B7280;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #E5E7EB;font-size:15px;text-align:right;color:#1F2933;${strong ? "font-weight:700;" : ""}">${escapeHtml(value)}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Din beregning fra Boligklarhed</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F7FA;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F4F7FA;padding:24px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#FFFFFF;border-radius:10px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
        <tr>
          <td style="background-color:#1E3A5F;color:#FFFFFF;padding:20px 24px;font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;font-size:18px;font-weight:700;letter-spacing:0.06em;">
            BOLIG<span style="color:#D4B26A;">KLARHED</span>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;font-size:16px;line-height:1.6;color:#1F2933;">
            <p style="margin:0 0 16px;">Hej ${name},</p>
            <p style="margin:0 0 20px;">
              Tak fordi du brugte Boligklarhed. Her er din beregning, så du har den ved hånden i dialogen med banken.
            </p>

            <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#6B7280;text-transform:uppercase;letter-spacing:0.08em;">Du kan ca. købe bolig for</p>
            <p style="margin:0 0 20px;font-size:32px;font-weight:700;color:#1E3A5F;line-height:1.15;">${escapeHtml(kr(d.estimatedPurchaseDkk))}</p>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 22px;border-top:1px solid #E5E7EB;">
              ${row("Bruttoindtægt pr. år", kr(d.annualIncomeDkk))}
              ${d.existingDebtDkk > 0 ? row("Eksisterende gæld", kr(d.existingDebtDkk)) : ""}
              ${row(`Vejledende lånerum (gearing ${GEARING_DEFAULT})`, kr(d.maxLoanDkk), true)}
            </table>

            <p style="margin:0 0 22px;font-size:14px;line-height:1.6;color:#6B7280;">
              Købsprisen antager ca. ${Math.round(FINANCING_SHARE * 100)} % finansiering (80 % realkredit + 15 % banklån) og mindst ${downPct} % i egen udbetaling.
            </p>

            <p style="margin:0 0 8px;font-weight:600;">Næste skridt</p>
            <p style="margin:0 0 18px;font-size:15px;line-height:1.6;">
              Lånerummet siger hvad du kan låne – ikke hvad boligen koster hver måned. Beregn din samlede månedlige udgift inkl. bidrag, ejendomsskat og vedligehold:
            </p>
            <p style="margin:0 0 24px;">
              <a href="${calcUrl}" style="display:inline-block;background-color:#1E3A5F;color:#FFFFFF;text-decoration:none;padding:13px 22px;border-radius:8px;font-size:15px;font-weight:600;">Beregn boligomkostninger</a>
            </p>

            <p style="margin:0;padding:14px 16px;background-color:#F4F7FA;border-left:4px solid #D4B26A;border-radius:0 8px 8px 0;font-size:13px;line-height:1.55;color:#6B7280;">
              Beregningen er vejledende og er ikke finansiel rådgivning. Banken foretager sin egen kreditvurdering, hvor bl.a. rådighedsbeløb og jobsituation indgår.
            </p>
          </td>
        </tr>
      </table>
      <p style="margin:16px 0 0;font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;font-size:12px;line-height:1.5;color:#9CA3AF;max-width:560px;">
        Du modtager denne mail, fordi du bad om at få din beregning tilsendt på boligklarhed.dk.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`;
}
