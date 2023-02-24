import getSupabase from "@/utils/Supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "database.types";
import { useQuery } from "react-query";

export const GET_PROJECT_QUERY_ID = "getProject";

export const getProject = async (
  id: number,
  client?: SupabaseClient<Database>
) => {
  const supabase = client || getSupabase();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  return data!;
};

export const useProjects = (id: number) => {
  const { data } = useQuery(GET_PROJECT_QUERY_ID, () => getProject(id));
  return data ?? [];
};

export type GetProjectResponse = Awaited<ReturnType<typeof getProject>>;
