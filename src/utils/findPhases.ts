import { Phase } from "@/api/types/Phase";
import { UserPhase } from "@/api/types/UserPhase";

export const findPhases = (userPhase?: UserPhase, phases?: Phase[]) =>
  userPhase?.phase_ids
    .map((phaseId) => phases?.find((phase) => phase.id === phaseId)!)
    .filter((p) => p !== undefined);
