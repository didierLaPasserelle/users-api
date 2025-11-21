-- Création de la table users dans Supabase
-- Exécute ce SQL dans l'éditeur SQL de Supabase :
-- 1. Va sur https://app.supabase.com
-- 2. Sélectionne ton projet
-- 3. Va dans SQL Editor
-- 4. Colle ce code et exécute-le

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  age INTEGER NOT NULL,
  city TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insère quelques données de test (optionnel)
INSERT INTO users ("firstName", age, city) VALUES
  ('Alice', 28, 'Paris'),
  ('Bruno', 34, 'Lyon'),
  ('Chloé', 22, 'Marseille')
ON CONFLICT DO NOTHING;

