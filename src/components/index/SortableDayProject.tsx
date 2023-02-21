import { useSortable } from "@dnd-kit/sortable";
import React, { FunctionComponent } from "react";
import DayProject, { DayProjectProps } from "./DayProject";
import { CSS } from "@dnd-kit/utilities";

const SortableDayProject: FunctionComponent<DayProjectProps> = ({
  ...props
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.phase.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <DayProject {...props} />
    </div>
  );
};

export default SortableDayProject;
