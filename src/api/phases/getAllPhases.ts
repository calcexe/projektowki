import getSupabase from "@/utils/Supabase";
import { useQuery } from "react-query";

export const GET_ALL_PHASES_QUERY_ID = "getAllPhases";

export const getAllPhases = async () => {
  const supabase = getSupabase();
  const { data } = await supabase.from("phases").select("*");
  return data ?? [];
};

export const useAllPhases = () => {
  const query = useQuery(GET_ALL_PHASES_QUERY_ID, getAllPhases, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
  return query;
};

export type GetAllPhasesResponse = Awaited<ReturnType<typeof getAllPhases>>;
