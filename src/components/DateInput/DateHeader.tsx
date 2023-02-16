import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import React, { FunctionComponent } from "react";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";

export type DateHeaderView = "month" | "years";

type DateHeaderProps = ReactDatePickerCustomHeaderProps & {
  view: DateHeaderView;
  changeView: (_: DateHeaderView) => void;
};

const DateHeader: FunctionComponent<DateHeaderProps> = (props) => {
  return (
    <div className="flex p-4 bg-gray-200 border-b border-b-white/80 text-white/80 justify-between">
      <button
        onClick={() => {
          if (props.view === "month") {
            props.decreaseMonth();
          } else if (props.view === "years") {
            props.decreaseYear();
          }
        }}
        className={clsx(
          "bg-gray-200 p-1 rounded-lg border border-gray-400 text-white/60 transition-colors",
          "hover:text-white/95 hover:border-white/80",
          "focus-visible:text-white/95 focus-visible:border-white/80"
        )}
        type="button"
      >
        <ArrowSmallLeftIcon className=" w-4 h-4" />
      </button>

      {props.monthDate && (
        <button
          onClick={() => props.changeView("years")}
          type="button"
          className={clsx(
            "text-white/60 border px-4 rounded-lg border-gray-400",
            "hover:text-white/95 hover:border-white/80",
            "focus-visible:text-white/95 focus-visible:border-white/80"
          )}
        >
          {format(props.monthDate, "LLLL", {
            locale: pl,
          })}
        </button>
      )}

      <button
        onClick={() => {
          if (props.view === "month") {
            props.increaseMonth();
          } else if (props.view === "years") {
            props.increaseYear();
          }
        }}
        className="bg-gray-200 p-1 rounded-lg border border-gray-400"
        type="button"
      >
        <ArrowSmallRightIcon className="text-white/60 w-4 h-4" />
      </button>
    </div>
  );
};

export default DateHeader;
