import { Hour } from "@/api/types/Hour";
import { toDate } from "./toDate";
import { isSameDay } from "date-fns";

export const getDayTime = (hours: Hour[], day: Date) =>
  hours.reduce(
    (time, hour) =>
      isSameDay(toDate(hour.date)!, day) ? time + (hour.minutes ?? 0) : time,
    0
  );
