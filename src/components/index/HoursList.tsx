import { AnimatePresence, motion } from "framer-motion";
import React, { FunctionComponent, useMemo, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import SortableDayProject from "./SortableDayProject";
import DayProject from "./DayProject";
import ActionButton from "./ActionButton";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { isToday, format, isAfter } from "date-fns";
import useDateContext from "@/context/DateContext/useDateContext";
import BaseDrawer from "../Drawers/BaseDrawer";
import EditUserPhasesDrawer from "../Drawers/EditUserPhasesDrawer";
import { useCurrentUserPhase } from "@/hooks/useCurrentUserPhase";
import { findPhases } from "@/utils/findPhases";
import useProjectsContext from "@/context/ProjectsContext/useProjectsContext";
import { Phase } from "@/api/types/Phase";
import { findProject } from "@/utils/findProject";
import { useFormatTime } from "@/hooks/useFormatTime";
import { useAddUserPhase } from "@/api/userPhases/addUserPhase";
import NoProjects from "./NoProjects";
import BaseAnimation from "../BaseAnimation";
import NoHours from "./NoHours";
import { getDayTime } from "@/utils/getDayTime";
import useHoursContext from "@/context/HoursContext/useHoursContext";

const HoursList: FunctionComponent = () => {
  const [editPhasesVisible, setEditPhasesVisible] = useState(false);
  const [dragPhase, setDragPhase] = useState<Phase | null>();
  const { date } = useDateContext();
  const {
    phases: allPhases,
    projects,
    isLoading: projectsLoading,
  } = useProjectsContext();
  const currentUserPhase = useCurrentUserPhase(date);
  const phases = findPhases(currentUserPhase, allPhases);
  const totalTime = useFormatTime(date, false);
  const { mutateAsync, isLoading, variables } = useAddUserPhase();
  const { hours, isLoading: hoursLoading } = useHoursContext();

  const showNoHours = useMemo(() => {
    if (isAfter(date, new Date())) return false;
    if (hoursLoading || projectsLoading) return false;
    if (!currentUserPhase) return false;
    if (currentUserPhase.alert_skipped) return false;
    const dayTime = getDayTime(hours, date);
    return dayTime === 0;
  }, [currentUserPhase, date, hours, hoursLoading, projectsLoading]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const onItemRemove = async (phase: Phase) => {
    const phaseIds = phases
      ?.filter((p) => p.id !== phase.id)
      .map(({ id }) => id);

    if (phaseIds) {
      await mutateAsync({ phase_ids: phaseIds, date });
    }
  };

  const handleDragEnd = (_event: DragEndEvent) => {
    // const { active, over } = event;
    // if (active.id !== over!.id) {
    //   setItems((items) => {
    //     const oldIndex = items?.findIndex(
    //       (item) => item.id.toString() == over!.id.toString()
    //     );
    //     const newIndex = items?.findIndex(
    //       (item) => item.id.toString() == over!.id.toString()
    //     );
    //     return arrayMove(items, oldIndex, newIndex);
    //   });
    // }
    setDragPhase(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const id = Number(event.active.id);
    setDragPhase(phases?.find((phase) => phase?.id === id));
  };

  return (
    <>
      <BaseDrawer isOpen={editPhasesVisible} setIsOpen={setEditPhasesVisible}>
        <EditUserPhasesDrawer setIsOpen={setEditPhasesVisible} />
      </BaseDrawer>
      <motion.div
        key="hours"
        className="w-full bg-gray-100 flex flex-col items-center gap-2 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AnimatePresence>{showNoHours && <NoHours />}</AnimatePresence>

        <h1 className="mt-16 text-sm font-semibold text-white/95">
          {isToday(date)
            ? "Tyle dziś pracowałeś:"
            : `Tyle pracowałeś ${format(date, "dd-MM-yyyy")}:`}
        </h1>

        <span className="bg-purple-dark rounded-2xl px-5 py-3 text-3xl font-semibold text-white/95 mt-4 mb-8">
          {totalTime}/8
        </span>

        <AnimatePresence>
          {!!phases?.length ? (
            <BaseAnimation className="flex flex-col items-center justify-center">
              <div className="flex gap-2">
                <ActionButton onClick={() => setEditPhasesVisible(true)}>
                  <PencilSquareIcon className="w-4 h-4 text-white/80 mr-2" />
                  <span>Edytuj listę</span>
                </ActionButton>
              </div>
              <div className="flex flex-col gap-3 mt-6 mr-6">
                <DndContext
                  id="context"
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  modifiers={[restrictToParentElement]}
                  onDragEnd={handleDragEnd}
                  onDragStart={handleDragStart}
                >
                  <SortableContext
                    disabled={true}
                    items={currentUserPhase?.phase_ids ?? []}
                    strategy={verticalListSortingStrategy}
                  >
                    <AnimatePresence>
                      {phases?.map((phase, index) => (
                        <SortableDayProject
                          project={findProject(phase, projects)!}
                          isDeleting={
                            isLoading &&
                            !variables?.phase_ids.includes(phase.id)
                          }
                          phase={phase}
                          key={phase?.id}
                          last={index === phases.length - 1}
                          onRemove={() => onItemRemove(phase)}
                        />
                      ))}
                    </AnimatePresence>
                  </SortableContext>
                  <DragOverlay>
                    {dragPhase ? (
                      <div className="opacity-80">
                        <DayProject
                          project={findProject(dragPhase, projects)!}
                          phase={dragPhase}
                          last={false}
                          onRemove={() => onItemRemove(dragPhase)}
                        />
                      </div>
                    ) : null}
                  </DragOverlay>
                </DndContext>
              </div>
            </BaseAnimation>
          ) : (
            <NoProjects
              isLoading={projectsLoading}
              onAdd={() => setEditPhasesVisible(true)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default HoursList;
