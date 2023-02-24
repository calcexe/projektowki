import { GetAllPhasesResponse, useAllPhases } from "@/api/phases/getAllPhases";
import clsx from "clsx";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useAddUserPhase } from "@/api/userPhases/addUserPhase";
import useDateContext from "@/context/DateContext/useDateContext";
import { Phase } from "@/api/types/Phase";
import { useCurrentUserPhase } from "@/hooks/useCurrentUserPhase";
import ActionButton from "@/components/index/ActionButton";
import Input from "@/components/Input";
import PhaseButton from "./PhaseButton";
import { AnimatePresence, motion } from "framer-motion";
import { findPhaseHour } from "@/utils/findPhaseHour";
import useHoursContext from "@/context/HoursContext/useHoursContext";

type EditUserPhasesProps = {
  setIsOpen: (_: boolean) => void;
};

const EditUserPhasesDrawer: FunctionComponent<EditUserPhasesProps> = ({
  setIsOpen,
}) => {
  const { data, isLoading } = useAllPhases();
  const { mutateAsync, isLoading: isSubmitting } = useAddUserPhase();
  const { date } = useDateContext();
  const userPhase = useCurrentUserPhase(date);
  const [phases, setPhases] = useState(userPhase?.phase_ids ?? []);
  const [allPhases, setAllPhases] = useState(data);
  const { hours } = useHoursContext();
  const [showMinutesError, setShowMinutesError] = useState(false);

  useEffect(() => {
    setPhases(userPhase?.phase_ids ?? []);
  }, [userPhase]);

  useEffect(() => {
    setAllPhases(data);
  }, [data]);

  const isChecked = (phase: Phase) => phases.includes(phase.id);

  const setChecked = (phase: GetAllPhasesResponse[0]) => {
    let newPhases: number[];
    if (isChecked(phase)) {
      newPhases = phases.filter((p) => p !== phase.id);
    } else {
      newPhases = phases.concat(phase.id);
    }
    const isDeletingWithHours = userPhase?.phase_ids.find((id) => {
      const hour = findPhaseHour(hours, date, id);
      return hour?.minutes && !newPhases.includes(id);
    });
    setShowMinutesError(!!isDeletingWithHours);
    setPhases(newPhases);
  };

  const onSubmit = async () => {
    await mutateAsync({ date: date, phase_ids: phases });
    setIsOpen(false);
  };

  return (
    <div className={clsx("flex flex-col w-96 text-white/95 h-full")}>
      <h1
        className={clsx(
          "bg-gray-200 h-14 text-base flex items-center justify-center border-b-2 border-b-gray-100"
        )}
      >
        Edytuj listę projektów
      </h1>

      {isLoading ? (
        <div></div>
      ) : (
        <div className="flex-1 flex flex-col bg-gray-200">
          <div className="w-full flex-1">
            <div className="flex flex-col flex-1 h-full pt-10 px-12 gap-2">
              <Input
                className="bg-gray-100"
                onChange={(e) => {
                  const { value } = e.target;
                  const searchPhase = value.toLowerCase().replace(/\s/g, "");
                  const results = data?.filter((phase) =>
                    phase.name
                      .toLowerCase()
                      .replace(/\s/g, "")
                      .includes(searchPhase)
                  );
                  setAllPhases(results);
                }}
              />

              <div className="border w-full flex-1 flex flex-col border-gray-400 rounded-xl bg-gray-100 py-2">
                <div className="h-0 flex-auto overflow-auto flex flex-col px-1">
                  {allPhases?.map((phase) => (
                    <PhaseButton
                      onClick={() => setChecked(phase)}
                      checked={isChecked(phase)}
                      key={`phase-${phase.id}`}
                      phase={phase}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-12 mt-2 mb-8">
            <AnimatePresence>
              {showMinutesError && (
                <motion.div
                  transition={{ bounce: false }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  initial={{ opacity: 0, height: 0 }}
                  className="overflow-hidden rounded-xl bg-gradient-to-r from-orange-regular to-pink-regular w-full h-full text-sm flex items-center justify-center"
                >
                  <span className="p-4">
                    Usuwasz projekt, który ma wpisane godziny. Jesteś pewien, bo
                    je całkiem wywalimy?
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={clsx("flex gap-2 justify-center pb-10")}>
            <ActionButton
              className="bg-gray-100 px-8"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Anuluj
            </ActionButton>
            <ActionButton
              className="bg-purple-dark px-8"
              onClick={onSubmit}
              loading={isSubmitting}
            >
              Zapisz
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUserPhasesDrawer;
