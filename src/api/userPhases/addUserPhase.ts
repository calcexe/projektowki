import getSupabase from "@/utils/Supabase";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_ID } from "./getUserPhases";
import { maybeSingle } from "@/utils/maybeSingle";

const addUserPhase = async (params: { phase_ids: number[]; date: Date }) => {
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

  await supabase.from("users_phases").upsert({
    id: maybeSingle(data)?.id,
    user_id: user!.id,
    created_at: maybeSingle(data)?.created_at ?? params.date.toDateString(),
    phase_ids: params.phase_ids,
  });
};

export const useAddUserPhase = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addUserPhase, {
    onSuccess: () => queryClient.invalidateQueries(QUERY_ID),
  });
  return mutation;
};

export type AddUserPhaseResponse = Awaited<ReturnType<typeof addUserPhase>>;
