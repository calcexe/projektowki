import { motion } from "framer-motion";
import React, { FunctionComponent, useEffect, useState } from "react";
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
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import SortableDayProject from "./SortableDayProject";
import DayProject from "./DayProject";
import ActionButton from "./ActionButton";
import { CheckCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { isToday, format, getWeek } from "date-fns";
import useDateContext from "@/context/DateContext/useDateContext";

const HoursList: FunctionComponent = () => {
  const [items, setItems] = useState<string[]>([]);
  const [currentId, setCurrentId] = useState<string | null>();
  const { date } = useDateContext();

  useEffect(() => {
    setItems(Array.from(Array(getWeek(date)).keys()).map((i) => i.toString()));
  }, [date]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const onItemRemove = (item: string) => {
    setItems((items) => items.filter((i) => i !== item));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over!.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over!.id.toString());
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setCurrentId(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setCurrentId(event.active.id.toString());
  };

  return (
    <motion.div
      key="hours"
      className="w-full bg-gray-100 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="mt-16 text-sm font-semibold text-white/95">
        {isToday(date)
          ? "Tyle dziś pracowałeś:"
          : `Tyle pracowałeś ${format(date, "dd-MM-yyyy")}:`}
      </h1>

      <span className="bg-purple-dark rounded-2xl px-5 py-3 text-3xl font-semibold text-white/95 mt-4 mb-8">
        8:45/8
      </span>

      <div className="flex gap-2">
        <ActionButton>
          <PencilSquareIcon className="w-4 h-4 text-white/80 mr-2" />
          <span>Edytuj listę</span>
        </ActionButton>
        <ActionButton>
          <CheckCircleIcon className="w-4 h-4 text-white/80 mr-2" />
          <span>Zapisanoo</span>
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
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((id, index) => (
              <SortableDayProject
                key={id}
                last={index === items.length - 1}
                id={id}
                onRemove={() => onItemRemove(id)}
              />
            ))}
          </SortableContext>
          <DragOverlay>
            {currentId ? (
              <div className="opacity-80">
                <DayProject
                  last={false}
                  id={currentId}
                  onRemove={() => onItemRemove(currentId)}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </motion.div>
  );
};

export default HoursList;
