/** Grovkornede intervaller til analytics og lagring (minimerer ikke nødvendigvis persondata alene). */
export function bucketAnnualIncome(annualDkk: number): string {
  if (annualDkk < 400_000) return "0-400k";
  if (annualDkk < 800_000) return "400-800k";
  if (annualDkk < 1_200_000) return "800k-1.2m";
  if (annualDkk < 2_000_000) return "1.2m-2m";
  return "2m+";
}

export function bucketExistingDebt(debtDkk: number): string {
  if (debtDkk <= 0) return "none";
  if (debtDkk < 250_000) return "1-250k";
  if (debtDkk < 500_000) return "250k-500k";
  return "500k+";
}
