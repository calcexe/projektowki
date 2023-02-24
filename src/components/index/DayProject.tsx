import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  ChangeEvent,
  FocusEvent,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import SupabaseImage from "../SupabaseImage";
import { Phase } from "@/api/types/Phase";
import { Project } from "@/api/types/Project";
import Input from "../Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddHours } from "@/api/hours/addHours";
import useDateContext from "@/context/DateContext/useDateContext";
import useHoursContext from "@/context/HoursContext/useHoursContext";
import { formatMinutes } from "@/utils/formatMinutes";
import { findPhaseHour } from "@/utils/findPhaseHour";
import ActionButton from "./ActionButton";
import Loader from "../Loader";

export type DayProjectProps = {
  last: boolean;
  phase: Phase;
  project: Project;
  isDeleting?: boolean;
  onRemove: () => void;
};

type DayProjectInputs = {
  time: string;
  notes: string;
};

function normalizeTime(value: string): string {
  const normalized = value.replace(/\s+/g, "");
  let hours = normalized.split(":")[0];
  let minutes = normalized.split(":")[1];

  if (hours.length > 2) {
    minutes = hours.slice(2);
    hours = hours.slice(0, 2);
  }

  if (minutes?.length > 2) {
    minutes = minutes.slice(0, 2);
  }

  if (minutes && parseInt(minutes) > 59) {
    minutes = `0${minutes.slice(0, 1)}`;
  }

  if (hours.length == 2 && minutes) {
    return `${hours}:${minutes}`;
  }

  return normalized;
}

const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  // if (/^\d+:?\.?\d*$/.test(value) || value === "") {
  const normalized = normalizeTime(value);
  event.target.value = normalized;
};

const timeToMinutes = (time: string) => {
  const hours = time.split(":")[0];
  const minutes = time.split(":")[1];
  let total = parseInt(hours) * 60;

  if (minutes) total += parseInt(minutes);

  return total;
};

const DayProject: FunctionComponent<DayProjectProps> = ({
  phase,
  project,
  last,
  isDeleting,
  onRemove,
}) => {
  const [notesVisible, setNotesVisible] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  const { hours } = useHoursContext();
  const { mutateAsync, isLoading } = useAddHours();
  const { date } = useDateContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<DayProjectInputs>();

  const resetToDefaults = () => {
    const hour = findPhaseHour(hours, date, phase.id);
    const formattedTime = hour?.minutes ? formatMinutes(hour?.minutes) : "";
    reset({ notes: hour?.notes ?? "", time: formattedTime });
  };

  useEffect(() => {
    resetToDefaults();
  }, [date, hours, phase.id]);

  const onSubmit: SubmitHandler<DayProjectInputs> = async (inputs) => {
    await mutateAsync({
      date,
      minutes: timeToMinutes(inputs.time),
      notes: inputs.notes,
      phaseId: phase.id,
    });
    setNotesVisible(false);
    reset({ ...inputs });
  };

  const cancelEditing = () => {
    resetToDefaults();
    setNotesVisible(false);
  };

  return (
    <motion.form
      key={phase.id}
      initial={{ opacity: 0, height: 0, scaleY: 0 }}
      animate={{ opacity: 1, height: "auto", scaleY: 1 }}
      exit={{ opacity: 0, height: 0, scaleY: 0 }}
      transition={{ bounce: false }}
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        "flex flex-col relative transition-opacity origin-center",
        (isLoading || isDeleting) &&
          "opacity-50 pointer-events-none select-none"
      )}
      ref={ref}
      onBlur={(event) => {
        if (!ref.current?.contains(event.relatedTarget)) {
          setNotesVisible(false);
        }
      }}
    >
      <div className={clsx("flex gap-2")}>
        <button
          onClick={onRemove}
          className="p-0.5 self-start mt-5"
          type="button"
        >
          {isDeleting ? (
            <Loader size="3" />
          ) : (
            <XMarkIcon className="w-3 h-3 text-gray-600" />
          )}
        </button>
        <div className="flex flex-col">
          <div
            className={clsx(
              "w-80 p-3 bg-gray-200 rounded-2xl flex gap-4 items-center"
            )}
          >
            <SupabaseImage
              bucket="images"
              src={project.image_url}
              width={32}
              height={32}
              alt="Obraz projektu"
              className="w-8 h-8 bg-white rounded-xl"
            />
            <span className="text-sm text-white/80 font-medium flex-1">
              {phase.name}{" "}
              {phase.is_monthly &&
                `(${date.toLocaleString("pl-PL", { month: "long" })})`}
            </span>
            <Input
              placeholderPosition="inside"
              type="text"
              placeholder="00:00"
              onFocus={() => setNotesVisible(true)}
              className={clsx(
                isDirty && "border-mint-dark !border-2",
                "w-20 h-10 text-center"
              )}
              {...register("time", {
                onChange: (event) => {
                  if (event as ChangeEvent<HTMLInputElement>) {
                    const e = event as ChangeEvent<HTMLInputElement>;
                    handleTimeChange(e);
                  }
                },
                onBlur: (event: FocusEvent<HTMLInputElement, Element>) => {
                  const isChild =
                    event.relatedTarget instanceof HTMLTextAreaElement ||
                    event.relatedTarget instanceof HTMLButtonElement;
                  setNotesVisible(isChild);

                  const { value } = event.target;
                  if (value.endsWith(":")) {
                    event.target.value = `${value}00`;
                  } else if (value.length < 3 && value.length > 0) {
                    event.target.value = `${value}:00`;
                  }
                },
              })}
            />
          </div>
          <AnimatePresence>
            {notesVisible && (
              <motion.div
                className="flex flex-col h-20"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <textarea
                  className={clsx(
                    "font-mono text-xs px-2 py-1 caret-white text-white w-full h-20 mt-2 border border-mint-dark bg-mint-dark/20 rounded-xl resize-none",
                    "focus:ring-transparent focus:ring-0 focus-visible:outline-none focus:border-2 focus:border-mint-dark"
                  )}
                  {...register("notes", {
                    onBlur: (event: FocusEvent<HTMLTextAreaElement>) => {
                      if (!ref.current?.contains(event.relatedTarget)) {
                        setNotesVisible(false);
                      }
                    },
                  })}
                />
                <div className="flex self-end mt-2 gap-2">
                  <ActionButton type="button" onClick={() => cancelEditing()}>
                    Anuluj
                  </ActionButton>
                  <ActionButton
                    className="bg-mint-dark"
                    type="submit"
                    loading={isLoading}
                  >
                    Dodaj
                  </ActionButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {last && <div className="h-8 w-full" />}
    </motion.form>
  );
};

export default DayProject;
