import { AnimatePresence, motion } from "framer-motion";
import React, { FunctionComponent, ReactNode } from "react";

type BaseDrawerProps = {
  setIsOpen: (_: boolean) => void;
  isOpen: boolean;
  children?: ReactNode;
};

const BaseDrawer: FunctionComponent<BaseDrawerProps> = ({
  isOpen,
  children,
  setIsOpen,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 right-0 bottom-0 left-0 bg-black/20 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="w-full h-full flex-1"
            onClick={() => setIsOpen(!isOpen)}
          />
          <motion.div
            className="h-full"
            initial={{ translateX: "100%" }}
            animate={{ translateX: "0%" }}
            exit={{ translateX: "100%" }}
            transition={{ bounce: false }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BaseDrawer;
