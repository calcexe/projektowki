import { GetAllPhasesResponse, useAllPhases } from "@/api/phases/getAllPhases";
import clsx from "clsx";
import React, { FunctionComponent, useEffect, useState } from "react";
import ActionButton from "../index/ActionButton";
import Checkbox from "../Checkbox";
import { useAddUserPhase } from "@/api/userPhases/addUserPhase";
import useDateContext from "@/context/DateContext/useDateContext";
import { Phase } from "@/api/types/Phase";
import { useCurrentUserPhase } from "@/hooks/useCurrentUserPhase";

type EditUserPhasesProps = {
  setIsOpen: (_: boolean) => void;
};

const EditUserPhasesDrawer: FunctionComponent<EditUserPhasesProps> = ({
  setIsOpen,
}) => {
  const { data, isLoading } = useAllPhases();
  const { mutate } = useAddUserPhase();
  const { date } = useDateContext();
  const userPhase = useCurrentUserPhase();
  const [phases, setPhases] = useState(userPhase?.phase_ids ?? []);

  useEffect(() => {
    setPhases(userPhase?.phase_ids ?? []);
  }, [userPhase]);

  const isChecked = (phase: Phase) => phases.includes(phase.id);

  const setChecked = (phase: GetAllPhasesResponse[0]) => {
    if (isChecked(phase)) {
      const newPhases = phases.filter((p) => p !== phase.id);
      setPhases(newPhases);
    } else {
      const newPhases = phases.concat(phase.id);
      setPhases(newPhases);
    }
  };

  const onSubmit = () => {
    mutate({ date: date, phase_ids: phases });
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

      {!isLoading && (
        <div className="flex-1 bg-gray-200 box-border h-full flex flex-col">
          <div className="flex flex-col flex-auto h-0 pt-10 px-12 overflow-y-auto gap-4">
            {data?.map((phase) => (
              <div key={phase.id} className="flex gap-4">
                <Checkbox
                  checked={isChecked(phase)}
                  onChange={() => setChecked(phase)}
                />
                <span>
                  {phase.name} {isChecked(phase) && "+"}
                </span>
              </div>
            ))}
          </div>

          <div className={clsx("flex gap-2 justify-center py-10")}>
            <ActionButton
              className="bg-gray-100 px-8"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Anuluj
            </ActionButton>
            <ActionButton className="bg-purple-dark px-8" onClick={onSubmit}>
              Zapisz
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUserPhasesDrawer;
