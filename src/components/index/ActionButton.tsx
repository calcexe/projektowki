import clsx from "clsx";
import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ActionButton: FunctionComponent<ActionButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        className,
        "py-1 px-5 bg-gray-200 rounded-xl text-white/95 text-sm flex leading-6 items-center transition-transform",
        "hover:scale-105"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;
