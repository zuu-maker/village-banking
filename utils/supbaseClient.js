import { createClient } from "@supabase/supabase-js";

// Use a custom domain as the supabase URL
const supabaseUrl = process.env.NEXT_PUBLIC_URL;
const supabaseKey = process.env.NEXT_PUBLIC_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
