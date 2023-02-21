import { useUser } from "@supabase/auth-helpers-react";
import getSupabase from "@/utils/Supabase";
import { addMonths, endOfMonth, startOfMonth, subMonths } from "date-fns";
import { useQuery } from "react-query";

export const QUERY_ID = "get_user_phases";

const getUserPhases = async (date: Date) => {
  const supabase = getSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const start = subMonths(startOfMonth(date), 1);
  const end = addMonths(endOfMonth(date), 1);
  const userId = session!.user.id;

  const { data: userPhases } = await supabase
    .from("users_phases")
    .select("*")
    .lte("created_at", end.toDateString())
    .gte("created_at", start.toDateString())
    .eq("user_id", userId);

  const phaseIds = new Set(userPhases?.flatMap((phase) => phase.phase_ids));

  const { data: phasesProjectsData } = await supabase
    .from("phases")
    .select("*, projects(*)")
    .in("id", Array.from(phaseIds));

  const phases = phasesProjectsData?.map((data) => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { projects, ...phase } = data;
    return phase;
  });

  const projects = phasesProjectsData?.flatMap((data) => data.projects!);

  return { phases, projects, userPhases };
};

export const useGetUserPhases = (date: Date) => {
  const query = useQuery(QUERY_ID, async () => await getUserPhases(date), {
    refetchOnWindowFocus: false,
  });
  return query;
};

export type GetUserPhasesResponse = Awaited<ReturnType<typeof getUserPhases>>;
