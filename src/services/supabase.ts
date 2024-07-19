import { Database } from "../../database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseKey = import.meta.env.VITE_ANON_API_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
