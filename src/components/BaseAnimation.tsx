import { HTMLMotionProps, motion } from "framer-motion";
import React, { FunctionComponent } from "react";

const BaseAnimation: FunctionComponent<HTMLMotionProps<"div">> = ({
  children,
  ...props
}) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default BaseAnimation;
