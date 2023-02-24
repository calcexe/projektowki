import { motion } from "framer-motion";
import React from "react";
import ActionButton from "./ActionButton";
import useDateContext from "@/context/DateContext/useDateContext";
import { useSkipUserPhaseAlert } from "@/api/userPhases/skipUserPhaseAlert";

const NoHours = () => {
  const { date } = useDateContext();
  const { mutate, isLoading } = useSkipUserPhaseAlert();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      exit={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ bounce: false }}
      layout
      className="text-sm w-full  bg-gradient-to-r from-orange-regular to-pink-regular flex text-white/90 items-center justify-center gap-4"
    >
      <div className="px-4 py-2 flex items-center justify-center gap-4">
        <span>
          Ej, dni mijają a Ty tu dalej nic nie wpisałeś. Zrób to od razu, bo
          znowu zapomnisz
        </span>
        <ActionButton
          loading={isLoading}
          className="bg-white/20 py-0 text-xs px-4 rounded-lg"
          onClick={() => mutate(date)}
        >
          SKIP
        </ActionButton>
      </div>
    </motion.div>
  );
};

export default NoHours;
