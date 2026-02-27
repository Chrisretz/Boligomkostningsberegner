import { jsPDF } from "jspdf";
import type { CalcInput, CalcOutput } from "./types";

function formatKr(val: number): string {
  return val.toLocaleString("da-DK") + ",-";
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
  const inputLines = [
    { label: "Købspris", value: formatKr(input.purchasePriceDKK) },
    { label: "Udbetaling", value: formatKr(input.downPaymentDKK) },
    { label: "Realkreditlån", value: formatKr(output.loanPrincipalDKK) },
    { label: "Rente", value: `${input.interestRateAnnualPct} %` },
    { label: "Løbetid", value: `${input.termYears} år` },
    {
      label: "Boligtype",
      value: input.propertyType === "house" ? "Hus" : "Lejlighed",
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
  y = addSection(
    doc,
    y,
    "Månedlige udgifter",
    [
      { label: "Boliglån", value: formatKr(output.base.monthlyPaymentDKK) },
      {
        label: "Ejerudgifter",
        value: formatKr(
          output.breakdownMonthly.ownerExpensesMonthlyDKK
        ),
      },
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
