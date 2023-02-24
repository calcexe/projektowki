import useHoursContext from "@/context/HoursContext/useHoursContext";
import { formatMinutes } from "@/utils/formatMinutes";
import { getDayTime } from "@/utils/getDayTime";
import { useEffect, useState } from "react";

export const useFormatTime = (date: Date, suffix: boolean = true) => {
  const [time, setTime] = useState("");
  const { hours } = useHoursContext();
  useEffect(() => {
    const total = getDayTime(hours, date);
    const formatted = formatMinutes(total);
    if (suffix) {
      setTime(`${formatted}h`);
    } else {
      setTime(formatted);
    }
  }, [date, hours, suffix]);

  return time;
};
