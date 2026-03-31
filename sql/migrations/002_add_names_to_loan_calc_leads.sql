-- Kør én gang mod eksisterende database med loan_calc_leads uden fornavn/efternavn.

ALTER TABLE loan_calc_leads ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE loan_calc_leads ADD COLUMN IF NOT EXISTS last_name TEXT;

UPDATE loan_calc_leads
SET first_name = 'Ikke angivet'
WHERE first_name IS NULL;

UPDATE loan_calc_leads
SET last_name = 'Ikke angivet'
WHERE last_name IS NULL;

ALTER TABLE loan_calc_leads ALTER COLUMN first_name SET NOT NULL;
ALTER TABLE loan_calc_leads ALTER COLUMN last_name SET NOT NULL;
