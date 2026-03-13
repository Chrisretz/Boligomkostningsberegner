/**
 * Validering med Zod – jf. PRD fejltekster
 */

import { z } from "zod";

export const calcInputSchema = z
  .object({
    purchasePriceDKK: z
      .number()
      .min(50_000, "Indtast en købspris mellem 50.000 og 50.000.000 kr.")
      .max(50_000_000, "Indtast en købspris mellem 50.000 og 50.000.000 kr."),
    downPaymentDKK: z.number().min(0, "Udbetaling kan ikke være negativ."),
    interestRateAnnualPct: z
      .number()
      .min(0, "Renten skal være mellem 0 og 25%.")
      .max(25, "Renten skal være mellem 0 og 25%."),
    termYears: z
      .number()
      .int("Løbetid skal være et helt tal mellem 1 og 40 år.")
      .min(1, "Løbetid skal være et helt tal mellem 1 og 40 år.")
      .max(40, "Løbetid skal være et helt tal mellem 1 og 40 år."),
    propertyType: z.enum(["house", "apartment"]),
    householdSize: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).optional(),
    squareMeters: z.number().int().min(1).max(9999).optional(),
    ownerExpensesMonthlyDKK: z
      .number()
      .min(0, "Ejerudgifter skal være 0 kr eller derover.")
      .max(100_000, "Ejerudgifter skal være under 100.000 kr."),
    otherMonthlyDKK: z.number().min(0).max(100_000).optional().default(0),
    includeMortgageRegistrationFee: z.boolean(),
    mortgagePrincipalDKK: z
      .number()
      .min(0, "Pantsikret beløb skal være 0 kr eller derover.")
      .max(50_000_000)
      .optional(),
    otherUpfrontDKK: z.number().min(0).max(5_000_000).optional().default(0),
    interestOnly: z.boolean().optional().default(false),
    bankLoanAmountDKK: z.number().min(0).max(50_000_000).optional().default(0),
    bankLoanInterestRatePct: z.number().min(0).max(25).optional().default(0),
    bankLoanTermYears: z.number().int().min(1).max(40).optional(),
    bankLoanInterestOnly: z.boolean().optional().default(false),
    realkreditPrincipalDKK: z.number().min(0).max(50_000_000).optional(),
  })
  .refine(
    (data) => {
      const totalFinance = data.purchasePriceDKK - data.downPaymentDKK;
      const realkredit = data.realkreditPrincipalDKK ?? totalFinance;
      return realkredit <= totalFinance;
    },
    {
      message: "Realkreditlånet kan ikke overstige den samlede finansiering (købspris minus udbetaling).",
      path: ["realkreditPrincipalDKK"],
    }
  )
  .refine(
    (data) => {
      const realkredit = data.realkreditPrincipalDKK ?? (data.purchasePriceDKK - data.downPaymentDKK);
      const maxRealkredit = Math.round((data.purchasePriceDKK * 80) / 100);
      return data.purchasePriceDKK <= 0 || realkredit <= maxRealkredit;
    },
    {
      message: "Realkreditlånet må højst udgøre 80 % af købsprisen.",
      path: ["realkreditPrincipalDKK"],
    }
  )
  .refine(
    (data) => data.downPaymentDKK <= data.purchasePriceDKK,
    { message: "Udbetaling kan ikke være større end købsprisen.", path: ["downPaymentDKK"] }
  )
  .refine(
    (data) => data.purchasePriceDKK <= 0 || data.downPaymentDKK >= Math.round((data.purchasePriceDKK * 5) / 100),
    { message: "Udbetaling skal være mindst 5 % af købsprisen.", path: ["downPaymentDKK"] }
  );

export type CalcInputSchema = z.infer<typeof calcInputSchema>;

export type ValidationErrors = Partial<Record<string, string>>;

export function validateCalcInput(
  data: unknown
): { success: true; data: CalcInputSchema } | { success: false; errors: ValidationErrors } {
  const result = calcInputSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors: ValidationErrors = {};
  result.error.errors.forEach((err) => {
    const path = err.path.join(".");
    if (path && err.message) errors[path] = err.message;
  });
  return { success: false, errors };
}
