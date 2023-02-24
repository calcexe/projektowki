import getSupabase from "@/utils/Supabase";
import { useMutation, useQueryClient } from "react-query";
import { GET_USER_PHASES_QUERY_ID } from "./getUserPhases";
import { GET_HOURS_ID } from "../hours/getHours";
import { maybeSingle } from "@/utils/maybeSingle";
import { deleteHours } from "../hours/deleteHours";

export const addUserPhase = async (params: {
  phase_ids: number[];
  date: Date;
}) => {
  const supabase = getSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("users_phases")
    .select()
    .eq("created_at", params.date.toDateString())
    .eq("user_id", user!.id)
    .limit(1);

  if (error) return;

  const currentUserPhase = maybeSingle(data);

  if (currentUserPhase) {
    const removedPhases = currentUserPhase.phase_ids.filter(
      (id) => !params.phase_ids.includes(id)
    );

    const { error } = await deleteHours({
      date: params.date,
      phase_ids: removedPhases,
      userId: user!.id,
    });

    if (error) return;
  }

  await supabase.from("users_phases").upsert({
    id: currentUserPhase?.id,
    user_id: user!.id,
    created_at: currentUserPhase?.created_at ?? params.date.toDateString(),
    phase_ids: params.phase_ids,
  });
};

export const useAddUserPhase = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addUserPhase, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(GET_USER_PHASES_QUERY_ID);
      await queryClient.invalidateQueries(GET_HOURS_ID);
    },
  });
  return mutation;
};

export type AddUserPhaseResponse = Awaited<ReturnType<typeof addUserPhase>>;
