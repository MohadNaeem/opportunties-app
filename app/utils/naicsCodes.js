// pages/api/naicsCodes.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    const { data, error } = await supabase
    .from('opportunities')
    .select('naics_code', { count: 'exact', distinct: true })
    .limit(50);

  return data;
}
