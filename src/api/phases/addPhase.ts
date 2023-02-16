import getSupabase from "@/utils/Supabase";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_ID } from "./getPhases";

type AddPhaseData = {
  name: string;
  start: Date;
  projectId: number;
  end?: Date;
  estimate?: number;
  monthly?: boolean;
};

const addPhase = async (data: AddPhaseData) => {
  const supabase = getSupabase();
  const { name, projectId, start, end, monthly, estimate } = data;
  const { data: phaseData } = await supabase
    .from("phases")
    .insert({
      name,
      project_id: projectId,
      start: start.toDateString(),
      end: end ? end.toDateString() : undefined,
      is_monthly: monthly,
      estimate: estimate || undefined,
    })
    .select("*")
    .single();

  return phaseData;
};

export const useCreatePhase = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(addPhase, {
    onSuccess: () => queryClient.invalidateQueries(QUERY_ID),
  });
  return mutation;
};

export type AddPhaseResponse = Awaited<ReturnType<typeof addPhase>>;
