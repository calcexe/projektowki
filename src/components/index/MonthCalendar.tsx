import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
  addMonths,
  format,
  isAfter,
  isSameMonth,
  startOfMonth,
  subMonths,
} from "date-fns";
import React, { useState } from "react";
import DaysList from "./DaysList";
import { AnimatePresence, motion } from "framer-motion";
import useDateContext from "@/context/DateContext/useDateContext";
import useHoursContext from "@/context/HoursContext/useHoursContext";
import { formatMinutes } from "@/utils/formatMinutes";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
};

const MonthCalendar = () => {
  const [direction, setDirection] = useState(0);
  const { date, setDate } = useDateContext();
  const { hours, isLoading } = useHoursContext();
  const totalTime = hours.reduce(
    (prev, value) => prev + (value.minutes ?? 0),
    0
  );

  const onToday = () => {
    setDate(new Date());
    const dir = isAfter(new Date(), date) ? 1 : -1;
    setDirection(dir);
  };

  const onNextMonth = () => {
    const nextMonth = addMonths(date, 1);
    if (isSameMonth(nextMonth, new Date())) {
      setDate(new Date());
    } else {
      setDate(startOfMonth(nextMonth));
    }
    setDirection(1);
  };

  const onPreviousMonth = () => {
    const prevMonth = subMonths(date, 1);
    if (isSameMonth(prevMonth, new Date())) {
      setDate(new Date());
    } else {
      setDate(startOfMonth(prevMonth));
    }
    setDirection(-1);
  };

  return (
    <div
      className={clsx(
        "pt-3 flex flex-col w-full h-full overflow-hidden relative"
      )}
    >
      <div className="flex w-full gap-2 border-b border-b-gray-300 pb-4">
        <div className="flex ml-2 mt-1.5">
          <button className="w-3 h-3" onClick={onPreviousMonth}>
            <ChevronLeftIcon className="w-full h-full text-white/60 " />
          </button>
          <button className="w-3 h-3" onClick={onNextMonth}>
            <ChevronRightIcon className="w-full h-full text-white/60 " />
          </button>
        </div>

        <div className={clsx("flex flex-col flex-1 gap-1")}>
          <span className={clsx("text-base text-white/95 capitalize")}>
            {date.toLocaleString("pl-PL", { month: "long" })}
          </span>
          <button
            onClick={onToday}
            className={clsx(
              "w-fit flex px-2 py-1 gap-1 items-center text-white/60 rounded-md bg-gray-300 text-xs transition-transform",
              "hover:scale-105"
            )}
          >
            <CalendarIcon className="w-3 h-3 text-mint-regular" />
            Dzisiaj
          </button>
        </div>

        {!isLoading && (
          <span className="h-full mr-10 px-4 rounded-2xl text-white/95 bg-gray-300 text-2xl font-semibold flex items-center">
            {totalTime ? formatMinutes(totalTime) : "0:00"}
          </span>
        )}
      </div>

      <div className={clsx("relative w-full h-full overflow-hidden")}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            className={clsx("w-full h-full flex flex-col absolute")}
            key={format(date, "MM-yyyy")}
            custom={direction}
            transition={{
              x: { type: "just", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              bounce: false,
            }}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <DaysList />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MonthCalendar;
