import getSupabase from "@/utils/Supabase";
import { useQuery } from "react-query";

export const QUERY_ID = "get_phases";

export const getPhases = async (projectId: number) => {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("phases")
    .select("*")
    .eq("project_id", projectId);
  return data ?? [];
};

export const usePhases = (projectId: number) => {
  const { data } = useQuery(QUERY_ID, () => getPhases(projectId));
  return data ?? [];
};

export type GetPhasesResponse = Awaited<ReturnType<typeof getPhases>>;
