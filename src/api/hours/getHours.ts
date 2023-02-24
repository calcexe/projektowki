import getSupabase from "@/utils/Supabase";
import { endOfMonth, startOfMonth } from "date-fns";
import { useQuery } from "react-query";
import { Hour } from "../types/Hour";

export const GET_HOURS_ID = "getHours";

export const getHours = async (from: Date, to: Date): Promise<Hour[]> => {
  const supabase = getSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  if (!userId) return [];

  const { data } = await supabase
    .from("hours")
    .select("*")
    .eq("user_id", userId)
    .gte("date", from.toDateString())
    .lte("date", to.toDateString());

  return data ?? [];
};

export const useGetHours = (date: Date) => {
  const query = useQuery(
    GET_HOURS_ID,
    async () => await getHours(startOfMonth(date), endOfMonth(date)),
    { refetchOnWindowFocus: false }
  );

  return query;
};
