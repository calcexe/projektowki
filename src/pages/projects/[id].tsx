import { usePhases } from "@/api/phases/getPhases";
import { GetProjectResponse, getProject } from "@/api/projects/getProject";
import AddEditPhaseDrawer from "@/components/Drawers/AddEditPhaseDrawer";
import BaseDrawer from "@/components/Drawers/BaseDrawer";
import Input from "@/components/Input";
import SupabaseImage from "@/components/SupabaseImage";
import useToggle from "@/hooks/useToggle";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "database.types";
import { format } from "date-fns";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import { GetPhasesResponse } from "@/api/phases/getPhases";
import Head from "next/head";

type SingleProjectProps = {
  project: GetProjectResponse;
};

const SingleProject: NextPage<SingleProjectProps> = ({ project }) => {
  const [addPhaseVisible, togglePhaseVisibility, setAddPhaseVisible] =
    useToggle(false);

  const phases = usePhases(project.id);
  const [editedPhase, setEditedPhase] = useState<
    GetPhasesResponse[0] | undefined
  >(undefined);

  const editPhase = (phase: GetPhasesResponse[0]) => {
    setEditedPhase(phase);
    togglePhaseVisibility();
  };

  useEffect(() => {
    if (!addPhaseVisible) setEditedPhase(undefined);
  }, [addPhaseVisible]);

  return (
    <>
      <Head>
        <title>Projektówki - {project.name}</title>
        <meta name="description" content={`Projektówki - ${project.name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full h-full">
        <BaseDrawer isOpen={addPhaseVisible} setIsOpen={setAddPhaseVisible}>
          <AddEditPhaseDrawer
            project={project}
            phase={editedPhase}
            setIsOpen={setAddPhaseVisible}
          />
        </BaseDrawer>
        <div className="w-96 bg-gray-200 flex flex-col border-r-2 border-r-gray-100">
          <div className="w-full bg-gray-200 text-white/95 text-sm font-medium h-14 border-b-2 border-b-gray-100 flex items-center justify-center">
            <span>Szczegóły projektu</span>
          </div>
          <div className="w-full h-0 flex-auto flex flex-col overflow-auto py-10 px-8 items-center">
            <SupabaseImage
              className="w-32 h-32 rounded-xl"
              width={128}
              height={128}
              src={project.image_url!}
              bucket="images"
              alt="Obraz projektu"
            />

            <form className="w-full flex flex-col mt-10 gap-4">
              <Input
                placeholder="Nazwa projektu"
                value={project.name}
                disabled
                className=""
              />
              <Input
                placeholder="Klient"
                value={project.client}
                disabled
                className=""
              />
            </form>
          </div>
        </div>
        <div className="flex-1 bg-gray-100 flex flex-col">
          <div className="bg-gray-200 h-14 border-b-2 border-b-gray-100"></div>
          <div className="h-0 flex-auto overflow-auto flex flex-col px-8">
            <div className="mt-8 z-10 gap-2 flex">
              <h1 className="font-semibold text-white/95 text-2xl ">Fazy</h1>
              <button className="" onClick={togglePhaseVisibility}>
                <PlusCircleIcon
                  className="text-mint-regular w-5 h-5"
                  strokeWidth={2}
                />
              </button>
            </div>
            <div role="table">
              <div
                role="rowgroup"
                className="sticky top-0 bg-gray-100 pt-10 pb-2"
              >
                <div
                  role="row"
                  className="px-4 h-8 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_0.5fr] w-full bg-gray-200 rounded-lg text-white/60 uppercase text-sm"
                >
                  <div role="columnheader" className="flex items-center">
                    Nazwa
                  </div>
                  <div
                    role="columnheader"
                    className="justify-center flex items-center"
                  >
                    Start
                  </div>
                  <div
                    role="columnheader"
                    className="flex justify-center items-center"
                  >
                    Koniec
                  </div>
                  <div
                    role="columnheader"
                    className="flex justify-center items-center"
                  >
                    Wycena
                  </div>
                  <div
                    role="columnheader"
                    className="flex justify-center items-center"
                  >
                    Spalone
                  </div>
                  <div
                    role="columnheader"
                    className="flex justify-center items-center"
                  >
                    Pozostało
                  </div>
                </div>
              </div>

              <div role="rowgroup">
                {phases.map((phase) => (
                  <div
                    key={phase.id}
                    role="row"
                    className="mb-2 last-of-type:mb-10 px-4 py-1 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_0.5fr] bg-gray-200 rounded-xl text-sm text-white/80"
                  >
                    <div role="cell" className="h-16 flex items-center">
                      {phase.name}
                    </div>
                    <div
                      role="cell"
                      className="flex items-center justify-center"
                    >
                      {phase.start
                        ? format(new Date(phase.start), "dd/MM/yyyy")
                        : "-"}
                    </div>
                    <div
                      role="cell"
                      className="flex items-center justify-center"
                    >
                      {phase.end
                        ? format(new Date(phase.end), "dd/MM/yyyy")
                        : "-"}
                    </div>
                    <div
                      role="cell"
                      className="flex items-center justify-center"
                    >
                      {phase.estimate ?? "-"}
                    </div>
                    <div
                      role="cell"
                      className="flex items-center justify-center"
                    >
                      0
                    </div>
                    <div
                      role="cell"
                      className="flex items-center justify-center"
                    >
                      -
                    </div>
                    <div role="cell" className="flex items-center justify-end">
                      <button
                        className="bg-white/20 p-1 rounded-lg hover:scale-110"
                        onClick={() => editPhase(phase)}
                      >
                        <PencilIcon className="w-4 h-4 text-white/60" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = createServerSupabaseClient<Database>(context);
  const id = Number(context.query.id);
  const project = await getProject(id, client);

  return {
    props: { project },
  };
};

export default SingleProject;
