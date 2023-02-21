import useDateContext from "@/context/DateContext/useDateContext";
import {
  ChevronRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
  addDays,
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
  return (
    <button
      className={clsx(
        "group mt-2 min-h-10 flex rounded-2xl pr-2 items-center gap-3 mx-1.5 text-white/80 text-sm transition-colors",
        "hover:bg-white/5",
        selected && "bg-white/5",
        selected ? "pl-2" : "pl-9"
      )}
      {...props}
    >
      {selected && (
        <ExclamationCircleIcon
          strokeWidth={2}
          className="h-4 w-4 text-red-500"
        />
      )}

      <span className="uppercase text-left">
        {date.toLocaleString("pl-PL", { weekday: "short" })}
      </span>
      <span className="flex-1 mr-16 text-right">
        {format(date, "dd.MM.yyyy")}
      </span>
      <span className="text-base">0h</span>
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
    todayElement?.scrollIntoView({ behavior: "smooth", block: "center" });
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
