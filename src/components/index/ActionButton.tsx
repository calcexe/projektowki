import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { ButtonHTMLAttributes, FunctionComponent } from "react";
import Loader from "../Loader";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const ActionButton: FunctionComponent<ActionButtonProps> = ({
  children,
  className,
  loading,
  ...props
}) => {
  return (
    <button
      disabled={loading}
      className={clsx(
        className,
        "py-1 px-5 bg-gray-200 rounded-xl text-white/95 text-sm flex leading-6 items-center transition-all",
        "hover:scale-105",
        "disabled:cursor-not-allowed"
      )}
      {...props}
    >
      {children}
      <AnimatePresence>
        {loading && (
          <motion.div
            animate={{ opacity: 1, width: "auto", scale: 1 }}
            exit={{ opacity: 0, width: 0, scale: 0 }}
            initial={{ opacity: 0, width: 0, scale: 0 }}
            transition={{ bounce: false }}
          >
            <div className="w-full h-full ml-2">
              <Loader size="4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ActionButton;
