import { createClient } from "@supabase/supabase-js";

// Récupère les variables d'environnement
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Vérifie que les variables sont définies
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file."
  );
}

// Crée et exporte le client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
