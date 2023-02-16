import { useProjects } from "@/api/projects/getProjects";
import BaseAnimation from "@/components/BaseAnimation";
import AddProjectDrawer from "@/components/Drawers/AddProjectDrawer";
import BaseDrawer from "@/components/Drawers/BaseDrawer";
import SupabaseImage from "@/components/SupabaseImage";
import useToggle from "@/hooks/useToggle";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useState } from "react";

const Projects = () => {
  const projects = useProjects();

  const [projectsPhases] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [addProjectVisible, toggleProjectVisibility, setAddProjectVisible] =
    useToggle(false);

  return (
    <BaseAnimation className="h-full bg-gray-100 flex justify-center pb-10">
      <BaseDrawer isOpen={addProjectVisible} setIsOpen={setAddProjectVisible}>
        <AddProjectDrawer setIsOpen={setAddProjectVisible} />
      </BaseDrawer>
      <div className="flex flex-col max-w-5xl min-w-96 mx-8 w-full">
        <div className="mt-8 z-10 gap-2 flex">
          <h1 className="font-semibold text-white/95 text-2xl ">Projekty</h1>
          <button className="" onClick={toggleProjectVisibility}>
            <PlusCircleIcon
              className="text-mint-regular w-5 h-5"
              strokeWidth={2}
            />
          </button>
        </div>

        <div role="table" className="max-w-7xl">
          <div role="rowgroup" className="sticky top-0 bg-gray-100 pt-10 pb-2">
            <div
              role="row"
              className="px-4 h-8 grid grid-cols-[2fr_1fr_1fr_1fr_0.7fr] w-full bg-gray-200 rounded-lg text-white/60 uppercase text-sm"
            >
              <div
                role="columnheader"
                className="col-span-1 flex items-center ml-14"
              >
                Projekt
              </div>
              <div
                role="columnheader"
                className="col-span-1 flex items-center justify-center"
              >
                Spalone
              </div>
              <div
                role="columnheader"
                className="col-span-1 flex items-center justify-center"
              >
                Dostępne
              </div>
              <div
                role="columnheader"
                className="col-span-1 flex items-center justify-center"
              >
                Wycena
              </div>
              <div
                role="columnheader"
                className="col-span-1 flex items-center justify-center"
              >
                Akcje
              </div>
            </div>
          </div>

          <div role="rowgroup">
            {projects.map((project, index) => (
              <a
                href={`/projects/${project.id}`}
                key={project.id}
                className="mb-2 bg-gray-200 w-full rounded-lg flex flex-col p-4 gap-2"
              >
                <div
                  role="row"
                  className=" grid grid-cols-[2fr_1fr_1fr_1fr_0.7fr] items-center text-white/95"
                >
                  <div role="cell" className="col-span-1 flex items-center">
                    <SupabaseImage
                      bucket="images"
                      src={project.image_url!}
                      alt=""
                      width={40}
                      height={40}
                      className="w-10 h-10 bg-white/10 rounded-xl"
                    />
                    <div className="flex-1 px-4">{project.name}</div>
                  </div>
                  <div role="cell" className="col-span-1 text-center ">
                    -
                  </div>
                  <div
                    role="cell"
                    className="col-span-1 text-center flex justify-center items-center gap-2"
                  >
                    -
                  </div>
                  <div role="cell" className="col-span-1 text-center">
                    -
                  </div>
                  <div role="cell" className="col-span-1 flex  justify-center">
                    <button className="bg-white/20 p-1 rounded-lg hover:scale-110">
                      <TrashIcon className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                </div>
                {Array(projectsPhases[index])
                  .fill(1)
                  .map((e, i) => i + 1)
                  .map((v, i) => (
                    <div
                      role="row"
                      key={`${project}-${v}`}
                      className=" grid grid-cols-[2fr_1fr_1fr_1fr_0.7fr] items-center rounded-xl text-white/60 hover:bg-gray-300 py-2"
                    >
                      <div className="col-span-1 pl-14">Development</div>
                      <div className="col-span-1 flex justify-center">20</div>
                      <div className="col-span-1 flex justify-center items-center gap-2">
                        <span
                          className={clsx(
                            i % 2 === 0
                              ? "text-green-700"
                              : "text-red-700 before:content-['-'] -ml-1"
                          )}
                        >
                          10
                        </span>
                        {i % 2 === 0 ? (
                          <ArrowTrendingUpIcon className="-mr-6 mb-0.5 w-4 h-4 text-green-700" />
                        ) : (
                          <ArrowTrendingDownIcon className="-mr-6 mt-0.5 w-4 h-4 text-red-700" />
                        )}
                      </div>
                      <div className="col-span-1 flex justify-center">30</div>
                      <div className="col-span-1 flex justify-center">
                        <button
                          className="bg-white/20 p-1 rounded-lg hover:scale-110"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <TrashIcon className="w-3 h-3 text-white/60" />
                        </button>
                      </div>
                    </div>
                  ))}
              </a>
            ))}
          </div>
        </div>
      </div>
    </BaseAnimation>
  );
};

export default Projects;
