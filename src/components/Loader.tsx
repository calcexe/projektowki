import clsx from "clsx";
import React, { FunctionComponent } from "react";

type LoaderProps = {
  color?: "white";
  size?: "3" | "4" | "6" | "8";
};

const Loader: FunctionComponent<LoaderProps> = ({
  color = "white",
  size = "8",
}) => {
  return (
    <div
      className={clsx(
        "animate-spin rounded-full",
        size == "8" && "w-8 h-8 border-4",
        size == "6" && "w-6 h-6 border-2",
        size == "4" && "w-4 h-4 border-2",
        size == "3" && "w-3 h-3 border-2",
        color === "white" && "border-t-white"
      )}
    />
  );
};

export default Loader;
