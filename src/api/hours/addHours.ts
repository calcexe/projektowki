import getSupabase from "@/utils/Supabase";
import { maybeSingle } from "@/utils/maybeSingle";
import { toDate } from "@/utils/toDate";
import { isSameDay } from "date-fns";
import { useMutation, useQueryClient } from "react-query";
import { GET_USER_PHASES_QUERY_ID } from "../userPhases/getUserPhases";
import { GET_HOURS_ID } from "./getHours";

type AddHoursParams = {
  minutes: number;
  phaseId: number;
  notes: string;
  date: Date;
};

const addHours = async (params: AddHoursParams) => {
  const supabase = getSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user.id;

  if (!userId) return;

  const { date, minutes, notes, phaseId } = params;

  const { data: latestUserPhaseData } = await supabase
    .from("users_phases")
    .select("*")
    .lte("created_at", date.toDateString())
    .order("created_at", { ascending: false })
    .eq("user_id", userId)
    .limit(1);

  const latestUserPhase = maybeSingle(latestUserPhaseData);
  const latestUserPhaseDate = toDate(latestUserPhase?.created_at);
  if (
    !latestUserPhase ||
    !latestUserPhaseDate ||
    !isSameDay(date, latestUserPhaseDate)
  ) {
    await supabase.from("users_phases").insert({
      user_id: userId,
      phase_ids: latestUserPhase?.phase_ids ?? [phaseId],
      created_at: date.toDateString(),
    });
  }

  const { data } = await supabase
    .from("hours")
    .select("*")
    .eq("date", date.toDateString())
    .eq("phase_id", phaseId)
    .eq("user_id", userId)
    .limit(1);

  const currentHour = maybeSingle(data);

  await supabase.from("hours").upsert({
    date: currentHour?.date ?? date.toDateString(),
    phase_id: phaseId,
    user_id: userId,
    id: currentHour?.id ?? undefined,
    minutes: minutes,
    notes: notes,
  });
};

export const useAddHours = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addHours, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(GET_HOURS_ID);
      await queryClient.invalidateQueries(GET_USER_PHASES_QUERY_ID);
    },
  });
  return mutation;
};
