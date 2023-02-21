import { UserPhase } from "@/api/types/UserPhase";
import useDateContext from "@/context/DateContext/useDateContext";
import useProjectsContext from "@/context/ProjectsContext/useProjectsContext";
import { toDate } from "@/utils/toDate";
import { differenceInDays } from "date-fns";
import { useEffect, useState } from "react";

export const useCurrentUserPhase = () => {
  const { date } = useDateContext();
  const { userPhases } = useProjectsContext();
  const [currentUserPhase, setCurrentUserPhase] = useState<
    UserPhase | undefined
  >(undefined);

  useEffect(() => {
    const sortedUserPhases =
      userPhases
        ?.filter(
          (phase) => differenceInDays(date, toDate(phase.created_at)!) >= 0
        )
        .sort(
          (a, b) =>
            toDate(b.created_at)!.getTime() - toDate(a.created_at)!.getTime()
        ) ?? [];

    setCurrentUserPhase(
      sortedUserPhases.length >= 0 ? sortedUserPhases[0] : undefined
    );
  }, [date, userPhases]);

  return currentUserPhase;
};
