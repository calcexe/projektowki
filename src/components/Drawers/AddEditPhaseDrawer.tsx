import React, { FunctionComponent } from "react";
import Input from "../Input";
import ActionButton from "../index/ActionButton";
import clsx from "clsx";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useCreatePhase } from "@/api/phases/addPhase";
import { GetProjectResponse } from "@/api/projects/getProject";
import DateInput from "../DateInput";
import Checkbox from "../Checkbox";
import { GetPhasesResponse } from "@/api/phases/getPhases";

export type AddPhaseInputs = {
  name: string;
  start: Date;
  end?: Date;
  estimate: number;
  monthly?: boolean;
};

type AddEditPhaseDrawerProps = {
  setIsOpen: (_: boolean) => void;
  project: GetProjectResponse;
  phase?: GetPhasesResponse[1];
};

const getDefaultValues = (phase?: GetPhasesResponse[0]) => ({
  start: phase?.start ? new Date(phase.start) : new Date(),
  name: phase?.name ?? "",
  end: phase?.end ? new Date(phase.end) : undefined,
  estimate: phase?.estimate ?? undefined,
  monthly: phase?.is_monthly ?? false,
});

const AddEditPhaseDrawer: FunctionComponent<AddEditPhaseDrawerProps> = ({
  setIsOpen,
  project,
  phase,
}) => {
  const methods = useForm<AddPhaseInputs>({
    defaultValues: getDefaultValues(phase),
  });

  const { handleSubmit, register } = methods;

  const { mutate } = useCreatePhase();

  const onSubmit: SubmitHandler<AddPhaseInputs> = async (inputs) => {
    mutate({ ...inputs, projectId: project.id });
  };

  return (
    <FormProvider {...methods}>
      <form
        className={clsx("flex flex-col w-96 text-white/95 h-full")}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1
          className={clsx(
            "bg-gray-200 h-14 text-base flex items-center justify-center border-b-2 border-b-gray-100"
          )}
        >
          Dodaj fazę
        </h1>
        <div className="flex-1 bg-gray-200 box-border h-full flex flex-col">
          <div className="flex flex-col flex-auto h-0 pt-10 px-12 overflow-y-auto gap-4">
            <Input placeholder="Nazwa fazy" {...register("name")} />
            <DateInput {...register("start")} id="start" placeholder="Start" />
            <DateInput
              {...register("end")}
              placeholder="Koniec"
              showDelete
              id="end"
            />
            <Input
              id="estimate"
              placeholder="Wycena"
              {...register("estimate")}
            />
            <Checkbox
              id="monthly"
              placeholder="Miesieczny"
              {...register("monthly")}
            />
          </div>

          <div className={clsx("flex gap-2 justify-center py-10")}>
            <ActionButton
              className="bg-gray-100 px-8"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Anuluj
            </ActionButton>
            <ActionButton className="bg-purple-dark px-8">Dodaj</ActionButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddEditPhaseDrawer;
