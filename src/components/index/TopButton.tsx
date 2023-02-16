import clsx from "clsx";
import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

type TopButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active: boolean;
};

const TopButton: FunctionComponent<TopButtonProps> = ({
  children,
  className,
  active,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "text-xs transition-colors",
        active ? "text-white" : "text-white/60",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default TopButton;
