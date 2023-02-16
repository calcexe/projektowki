import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "database.types";

const supabase = createBrowserSupabaseClient<Database>();

const getSupabase = () => {
  return supabase;
};

export default getSupabase;
