import getSupabase from "@/utils/Supabase";
import { useMutation, useQueryClient } from "react-query";
import { GET_HOURS_ID } from "./getHours";

type DeleteHoursParams = {
  date: Date;
  userId: string;
  phase_ids: number[];
};

export const deleteHours = async (params: DeleteHoursParams) => {
  const supabase = getSupabase();
  const { date, phase_ids, userId } = params;

  return supabase
    .from("hours")
    .delete()
    .eq("date", date.toDateString())
    .eq("user_id", userId)
    .in("phase_id", phase_ids);
};

export const useDeleteHours = (invalidate?: boolean) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteHours, {
    onSuccess: async () => {
      if (invalidate) {
        await queryClient.invalidateQueries(GET_HOURS_ID);
      }
    },
  });
  return mutation;
};
