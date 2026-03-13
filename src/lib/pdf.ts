import { jsPDF } from "jspdf";
import type { CalcInput, CalcOutput } from "./types";

function formatKr(val: number): string {
  return val.toLocaleString("da-DK");
}

function addSection(
  doc: jsPDF,
  y: number,
  title: string,
  lines: { label: string; value: string }[],
  options?: { total?: { label: string; value: string } }
): number {
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(title, 20, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  for (const { label, value } of lines) {
    doc.text(label, 20, y);
    doc.text(value, 180, y, { align: "right" });
    y += 6;
  }

  if (options?.total) {
    y += 2;
    doc.setFont("helvetica", "bold");
    doc.text(options.total.label, 20, y);
    doc.text(options.total.value, 180, y, { align: "right" });
    y += 10;
  } else {
    y += 6;
  }

  return y;
}

export function generateBeregningPdf(
  input: CalcInput,
  output: CalcOutput,
  filename = "boligomkostninger.pdf"
): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 20;

  const downPaymentDKK = Math.max(
    0,
    output.cashNeededAtCloseDKK - output.upfrontTotalDKK
  );

  // Header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Boligomkostningsberegning", 20, y);
  y += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Genereret ${new Date().toLocaleDateString("da-DK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`,
    20,
    y
  );
  y += 15;

  // Input-oversigt
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Udgangspunkt", 20, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const realkreditDKK = input.realkreditPrincipalDKK ?? output.loanPrincipalDKK;
  const bankLoanDKK = output.loanPrincipalDKK - realkreditDKK;
  const hasBankLoan = bankLoanDKK > 0;
  const fmt = (realkredit: string, bank: string) =>
    hasBankLoan ? `${realkredit} / ${bank}` : realkredit;
  const inputLines: { label: string; value: string }[] = [
    {
      label: "Boligtype",
      value: input.propertyType === "house" ? "Hus" : "Lejlighed",
    },
    ...(input.squareMeters != null && input.squareMeters > 0
      ? [{ label: "Antal kvadratmeter (m²)", value: String(input.squareMeters) }]
      : []),
    { label: "Købspris", value: formatKr(input.purchasePriceDKK) },
    { label: "Udbetaling", value: formatKr(input.downPaymentDKK) },
    {
      label: "Lånebeløb (realkredit / bank)",
      value: fmt(formatKr(realkreditDKK), hasBankLoan ? formatKr(bankLoanDKK) : "–"),
    },
    {
      label: "Rente (realkredit / bank)",
      value: fmt(
        `${input.interestRateAnnualPct} %`,
        hasBankLoan && input.bankLoanInterestRatePct != null
          ? `${input.bankLoanInterestRatePct} %`
          : "–"
      ),
    },
    {
      label: "Løbetid (realkredit / bank)",
      value: fmt(
        `${input.termYears} år`,
        hasBankLoan && input.bankLoanTermYears != null
          ? `${input.bankLoanTermYears} år`
          : "–"
      ),
    },
    {
      label: "Afdragsfrihed (realkredit / bank)",
      value: fmt(
        input.interestOnly ? "Ja" : "Nej",
        hasBankLoan && input.bankLoanInterestOnly != null
          ? input.bankLoanInterestOnly
            ? "Ja"
            : "Nej"
          : "–"
      ),
    },
  ];
  for (const { label, value } of inputLines) {
    doc.text(label, 20, y);
    doc.text(value, 180, y, { align: "right" });
    y += 6;
  }
  y += 10;

  // Etableringsomkostninger
  y = addSection(
    doc,
    y,
    "Etableringsomkostninger",
    [
      { label: "Udbetaling", value: formatKr(downPaymentDKK) },
      {
        label: "Tinglysningsafgift",
        value: formatKr(
          output.upfrontDeedFeeDKK + output.upfrontMortgageFeeDKK
        ),
      },
      { label: "Bank & gebyrer", value: formatKr(output.upfrontOtherDKK) },
    ],
    {
      total: {
        label: "Samlet kontantbehov ved køb",
        value: formatKr(output.cashNeededAtCloseDKK),
      },
    }
  );

  // Månedlige udgifter
  const monthlyLoanLines =
    output.breakdownMonthly.bankLoanMonthlyDKK > 0
      ? [
          {
            label: "Realkreditlån",
            value: formatKr(output.breakdownMonthly.realkreditMonthlyDKK),
          },
          {
            label: "Bolig- / banklån",
            value: formatKr(output.breakdownMonthly.bankLoanMonthlyDKK),
          },
        ]
      : [
          {
            label: "Boliglån",
            value: formatKr(output.base.monthlyPaymentDKK),
          },
        ];
  y = addSection(
    doc,
    y,
    "Månedlige udgifter",
    [
      ...monthlyLoanLines,
      {
        label: "Ejerudgifter",
        value: formatKr(
          output.breakdownMonthly.ownerExpensesMonthlyDKK
        ),
      },
      ...(output.breakdownMonthly.estimatedElMonthlyDKK > 0
        ? [
            {
              label: "Estimeret el",
              value: formatKr(output.breakdownMonthly.estimatedElMonthlyDKK),
            },
          ]
        : []),
      {
        label: "Vedligeholdelse",
        value: formatKr(output.breakdownMonthly.maintenanceMonthlyDKK),
      },
      ...(output.breakdownMonthly.otherMonthlyDKK > 0
        ? [
            {
              label: "Øvrige",
              value: formatKr(output.breakdownMonthly.otherMonthlyDKK),
            },
          ]
        : []),
    ],
    {
      total: {
        label: "Samlet pr. måned",
        value: formatKr(output.base.monthlyTotalDKK),
      },
    }
  );

  // Rentestest
  y = addSection(
    doc,
    y,
    "Rentestest",
    [
      {
        label: "+1% rente",
        value: `${formatKr(output.plus1.monthlyTotalDKK)} pr. md.`,
      },
      {
        label: "+2% rente",
        value: `${formatKr(output.plus2.monthlyTotalDKK)} pr. md.`,
      },
    ]
  );

  // Disclaimer
  y += 10;
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text(
    "Beregningerne er vejledende og indeholder ikke skat. Se boligomkostningsberegner.dk for mere info.",
    20,
    y
  );

  doc.save(filename);
}
