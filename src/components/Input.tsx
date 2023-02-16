import clsx from "clsx";
import React, { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  active?: boolean;
  icon?: React.ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, active, icon, ...props }, ref) => {
    return (
      <div className={clsx("flex flex-col")}>
        <label className="text-white/60 text-xs leading-6" htmlFor={props.id}>
          {placeholder}
        </label>
        <div className="w-full relative">
          <input
            ref={ref}
            className={clsx(
              className,
              "w-full border rounded-xl h-12 bg-transparent transition-colors px-3 text-white/60 text-sm",
              "outline-none",
              active
                ? "border-white/80 text-white/80"
                : "border-gray-400 text-white/60",
              "focus-visible:border-white/80 focus-visible:text-white/80"
            )}
            {...props}
          />
          <div className="absolute top-0 h-fit my-auto bottom-0 right-1 bg-gray-200">
            {icon}
          </div>
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
