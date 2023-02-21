import getSupabase from "@/utils/Supabase";
import { useQuery } from "react-query";

export const QUERY_ID = "all_phases";

export const getAllPhases = async () => {
  const supabase = getSupabase();
  const { data } = await supabase.from("phases").select("*");
  return data ?? [];
};

export const useAllPhases = () => {
  const query = useQuery(QUERY_ID, getAllPhases);
  return query;
};

export type GetAllPhasesResponse = Awaited<ReturnType<typeof getAllPhases>>;
