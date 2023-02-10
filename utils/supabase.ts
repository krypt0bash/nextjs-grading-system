import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseApi = process.env.SUPABASE_API!;

export const supabase = createClient(supabaseUrl, supabaseApi);
