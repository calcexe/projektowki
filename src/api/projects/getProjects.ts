import getSupabase from "@/utils/Supabase";
import { useQuery } from "react-query";

export const QUERY_ID = "projects";

const getProjects = async () => {
  const supabase = getSupabase();
  const { data } = await supabase.from("projects").select("*");
  return data ?? [];
};

export const useProjects = () => {
  const { data } = useQuery(QUERY_ID, getProjects);
  return data ?? [];
};

export type GetProjectsResponse = Awaited<ReturnType<typeof getProjects>>;
