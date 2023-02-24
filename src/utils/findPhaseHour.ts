import { Hour } from "@/api/types/Hour";
import { isSameDay } from "date-fns";
import { toDate } from "./toDate";

export const findPhaseHour = (hours: Hour[], day: Date, phaseId: number) =>
  hours.find(
    ({ date, phase_id }) =>
      phaseId === phase_id && isSameDay(toDate(date)!, day)
  );
