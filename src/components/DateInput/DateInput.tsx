import React, { InputHTMLAttributes, forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isSameDay } from "date-fns";
import { pl } from "date-fns/locale";
import Input from "../Input";
import DateHeader, { DateHeaderView } from "./DateHeader";
import clsx from "clsx";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useFormContext } from "react-hook-form";

type DateInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  showDelete?: boolean;
};

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ placeholder, showDelete, ...props }, ref) => {
    const [view, setView] = useState<DateHeaderView>("month");
    const [isOpen, setIsOpen] = useState(false);
    const { watch, setValue } = useFormContext();
    const value = watch(props.name!) as Date | undefined;

    return (
      <DatePicker
        onChange={(date) => {
          if (view === "month") setValue(props.name!, date || undefined);
          if (view === "years") setView("month");
        }}
        dateFormat="dd/MM/yyyy"
        value={value ? format(value, "dd/MM/yyyy") : undefined}
        locale={pl}
        calendarStartDay={1}
        onCalendarOpen={() => setIsOpen(true)}
        onCalendarClose={() => setIsOpen(false)}
        showYearPicker={view === "years"}
        calendarClassName="!bg-gray-200 !overflow-hidden !rounded-lg !border !border-white/60 mt-1"
        weekDayClassName={() => "!text-white/60"}
        popperClassName="!p-0 !m-0 !border-0 !rounded-0"
        showPopperArrow={false}
        shouldCloseOnSelect={view !== "years"}
        yearItemNumber={6}
        dayClassName={(day) =>
          clsx(
            "hover:!bg-gray-400 !rounded-full",
            value && isSameDay(day, value) ? "!bg-gray-500" : "!bg-transparent",
            isSameDay(day, new Date()) ? "!text-white/95" : "!text-white/60"
          )
        }
        renderCustomHeader={(props) => (
          <DateHeader view={view} changeView={setView} {...props} />
        )}
        placeholderText={placeholder}
        customInput={
          <Input
            ref={ref}
            active={isOpen}
            className="caret-transparent"
            icon={
              showDelete && (
                <button
                  type="button"
                  className="flex items-center justify-center p-2 mr-2"
                  onClick={() => setValue(props.name!, undefined)}
                >
                  <TrashIcon className="text-white w-4 h-4" />
                </button>
              )
            }
            {...props}
          />
        }
      />
    );
  }
);

DateInput.displayName = "DateInput";

export default DateInput;
