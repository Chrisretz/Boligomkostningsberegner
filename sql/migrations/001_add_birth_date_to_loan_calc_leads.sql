-- Kør én gang mod eksisterende database der allerede har loan_calc_leads uden birth_date.
-- Eksisterende rækker får en pladsholder-dato; ret manuelt i Neon hvis nødvendigt.

ALTER TABLE loan_calc_leads ADD COLUMN IF NOT EXISTS birth_date DATE;

UPDATE loan_calc_leads
SET birth_date = '1990-01-01'::date
WHERE birth_date IS NULL;

ALTER TABLE loan_calc_leads ALTER COLUMN birth_date SET NOT NULL;
