import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { GET_USER_PHASES_QUERY_ID } from "./getUserPhases";
import getSupabase from "@/utils/Supabase";
import { maybeSingle } from "@/utils/maybeSingle";
import { isSameDay } from "date-fns";
import { toDate } from "@/utils/toDate";

export const skipUserPhaseAlert = async (date: Date) => {
  const supabase = getSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;

  if (!userId) return;

  const { data } = await supabase
    .from("users_phases")
    .select("*")
    .lte("created_at", date.toDateString())
    .order("created_at", { ascending: false })
    .eq("user_id", userId)
    .limit(1);

  const userPhase = maybeSingle(data);

  const sameDate = userPhase
    ? isSameDay(toDate(userPhase.created_at)!, date)
    : false;

  await supabase.from("users_phases").upsert({
    user_id: userPhase?.user_id ?? userId,
    created_at: sameDate ? userPhase?.created_at : date.toDateString(),
    alert_skipped: true,
    id: sameDate ? userPhase?.id : undefined,
    phase_ids: userPhase?.phase_ids ?? [],
  });
};

export const useSkipUserPhaseAlert = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(skipUserPhaseAlert, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(GET_USER_PHASES_QUERY_ID);
    },
  });
  return mutation;
};
