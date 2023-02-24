import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import React, { FunctionComponent } from "react";
import ActionButton from "./ActionButton";
import { motion } from "framer-motion";
import Loader from "../Loader";

type NoProjectsProps = {
  onAdd: () => void;
  isLoading: boolean;
};

const NoProjects: FunctionComponent<NoProjectsProps> = ({
  onAdd,
  isLoading,
}) => {
  return isLoading ? (
    <motion.div
      key="noHoursLoading"
      initial={{ opacity: 0, scale: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-40"
    >
      <Loader size="8" />
    </motion.div>
  ) : (
    <motion.div
      key="noHours"
      initial={{ opacity: 0, scale: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center flex flex-col w-96 p-12 bg-gray-200 items-center justify-center text-white/80 rounded-xl border border-dashed border-gray-400"
    >
      <span>Żeby dodać godziny, musisz mieć najpierw jakieś projekty</span>
      <ArrowDownCircleIcon className="w-8 h-8 mt-8 mb-4 text-mint-regular animate-bounce" />
      <ActionButton className="bg-purple-regular" onClick={onAdd}>
        Dodaj projekty
      </ActionButton>
    </motion.div>
  );
};

export default NoProjects;
