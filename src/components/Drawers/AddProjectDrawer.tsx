import clsx from "clsx";
import React, { FunctionComponent, useCallback, useState } from "react";
import Input from "../Input";
import ActionButton from "../index/ActionButton";
import Dropzone from "../Dropzone";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { getIcon } from "@/utils/getRandomIcon";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateProject } from "@/api/projects/addProject";

type AddProjectDrawerProps = {
  setIsOpen: (_: boolean) => void;
};

type AddProjectInputs = {
  name: string;
  client: string;
  file: Blob | null;
};

const AddProjectDrawer: FunctionComponent<AddProjectDrawerProps> = ({
  setIsOpen,
}) => {
  const { register, handleSubmit, setValue } = useForm<AddProjectInputs>();

  const { mutate } = useCreateProject();

  const onSubmit: SubmitHandler<AddProjectInputs> = async (inputs) => {
    mutate({
      client: inputs.client,
      name: inputs.name,
      image: inputs.file!,
    });
  };

  const [icon, setIcon] = useState<Blob | null>(null);

  const randomIcon = useCallback(async () => {
    const icon = await getIcon();
    setIcon(icon);
    setValue("file", icon);
  }, [setValue]);

  return (
    <form
      className={clsx("flex flex-col w-96 text-white/95 h-full")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1
        className={clsx(
          "bg-gray-200 h-14 text-base flex items-center justify-center border-b-2 border-b-gray-100"
        )}
      >
        Dodaj projekt
      </h1>
      <div className="flex-1 bg-gray-200 box-border h-full flex flex-col">
        <div className="flex-col flex-auto h-0 pt-10 px-12 overflow-y-auto gap-4">
          <Input placeholder="Nazwa projektu" {...register("name")} />
          <Input placeholder="Klient" {...register("client")} />
          <div className="flex flex-wrap gap-4 mt-6">
            <Dropzone placeholder="Avatar" icon={icon} />
            <button
              type="button"
              className="bg-gray-300 w-8 h-8 aspect-square rounded-lg hover:scale-110 transition-transform mt-6"
              onClick={randomIcon}
            >
              <ArrowPathIcon className="text-mint-regular w-4 h-4 m-auto" />
            </button>
          </div>
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
  );
};

export default AddProjectDrawer;
