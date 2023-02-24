import { isWeekendOrHoliday } from "poland-public-holidays";

export const isFreeDay = (date: Date) => {
  return isWeekendOrHoliday(date);
};
