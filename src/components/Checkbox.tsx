import clsx from "clsx";
import React, { InputHTMLAttributes, forwardRef } from "react";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ placeholder, className, ...props }, ref) => {
    return (
      <div className="flex gap-2 items-center">
        <label
          className="text-white/60 text-xs cursor-pointer"
          htmlFor={props.id}
        >
          {placeholder}
        </label>
        <input
          ref={ref}
          type="checkbox"
          className={clsx(
            className,
            "accent-purple-regular w-4 h-4 cursor-pointer rounded-md text-black border-2 border-purple-regular !outline-none bg-transparent transition-all",
            "checked:!border-purple-regular checked:border-2 checked:bg-purple-regular",
            "focus:ring-offset-0 focus:!ring-0 focus:border-2",
            "hover:border-2"
          )}
          {...props}
        />
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export default Checkbox;
