import { Phase } from "@/api/types/Phase";
import { Project } from "@/api/types/Project";

export const findProject = (phase: Phase, projects?: Project[]) =>
  projects?.find((project) => project.id === phase.project_id);
