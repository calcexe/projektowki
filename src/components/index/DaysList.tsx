import useDateContext from "@/context/DateContext/useDateContext";
import useHoursContext from "@/context/HoursContext/useHoursContext";
import { useCurrentUserPhase } from "@/hooks/useCurrentUserPhase";
import { useFormatTime } from "@/hooks/useFormatTime";
import { getDayTime } from "@/utils/getDayTime";
import { isFreeDay } from "@/utils/isFreeDay";
import {
  ChevronRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
  addDays,
  differenceInDays,
  format,
  getDate,
  getDaysInMonth,
  getWeek,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isMonday,
  isSameDay,
  isSunday,
  startOfMonth,
} from "date-fns";
import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  useEffect,
  useRef,
} from "react";

type DayButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  date: Date;
  selected: boolean;
};

const DayButton: FunctionComponent<DayButtonProps> = ({
  date,
  selected,
  ...props
}) => {
  const totalTime = useFormatTime(date);
  const { hours } = useHoursContext();
  const time = getDayTime(hours, date);
  const userPhase = useCurrentUserPhase(date);
  const isFree = isFreeDay(date);

  const warningVisible =
    !isFree &&
    userPhase &&
    time == 0 &&
    differenceInDays(date, new Date()) < 0 &&
    !userPhase.alert_skipped;

  return (
    <button
      className={clsx(
        "group mt-2 min-h-10 flex rounded-2xl pr-2 items-center gap-3 mx-1.5 text-sm transition-colors",
        isFree ? "text-white/40" : "text-white/80",
        "hover:bg-white/5",
        selected && "bg-white/5",
        warningVisible ? "pl-2" : "pl-9"
      )}
      {...props}
    >
      {warningVisible && (
        <ExclamationCircleIcon
          strokeWidth={2}
          className="h-4 w-4 text-red-500"
        />
      )}

      <span className={clsx("uppercase text-left")}>
        {date.toLocaleString("pl-PL", { weekday: "short" })}
      </span>
      <span className="flex-1 mr-8 text-end">{format(date, "dd.MM.yyyy")}</span>
      <span className="text-base w-14 text-end">{totalTime}</span>
      <div
        className={clsx(
          "w-5 h-5 rounded-2xl transition-all",
          "group-hover:opacity-100",
          selected ? "bg-gray-500 opacity-100" : "bg-purple-regular opacity-0"
        )}
      >
        <ChevronRightIcon className="w-full h-full text-white/80 py-0.5 px-1" />
      </div>
    </button>
  );
};

const DaysList: FunctionComponent = ({}) => {
  const daysRef = useRef<HTMLDivElement>(null);
  const { date: selectedDate, setDate } = useDateContext();

  const scrollToSelection = () => {
    const dayInMonth = getDate(selectedDate);
    const todayElement = daysRef.current?.children.item(dayInMonth - 1);
    setTimeout(() => {
      todayElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  useEffect(() => {
    scrollToSelection();
  }, [selectedDate]);

  useEffect(() => {
    scrollToSelection();
  }, []);

  return (
    <div
      className="flex flex-col pt-7 flex-auto overflow-auto h-0 gap-0"
      ref={daysRef}
    >
      {Array(getDaysInMonth(selectedDate))
        .fill(0)
        .map((v, index) => {
          const date = addDays(startOfMonth(selectedDate), index);
          const showWeekNumber = isMonday(date) || isFirstDayOfMonth(date);
          const showSeparator = isSunday(date) || isLastDayOfMonth(date);

          return (
            <div
              className="w-full flex flex-col"
              key={format(date, "dd-MM-yyyy")}
            >
              {showWeekNumber && (
                <span className="ml-10 text-xs text-white/60">
                  TYDZIEŃ {getWeek(date)}
                </span>
              )}
              <DayButton
                onClick={() => setDate(date)}
                date={date}
                selected={isSameDay(date, selectedDate)}
              />
              {showSeparator && (
                <div className="min-h-px ml-10 mr-10 bg-gray-300 my-5" />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default DaysList;
