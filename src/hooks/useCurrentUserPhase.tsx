import { UserPhase } from "@/api/types/UserPhase";
import useProjectsContext from "@/context/ProjectsContext/useProjectsContext";
import { toDate } from "@/utils/toDate";
import { isBefore, isSameDay } from "date-fns";
import { useEffect, useState } from "react";

export const useCurrentUserPhase = (date: Date) => {
  const { userPhases } = useProjectsContext();
  const [currentUserPhase, setCurrentUserPhase] = useState<
    UserPhase | undefined
  >(undefined);

  useEffect(() => {
    const sortedUserPhases =
      userPhases
        ?.filter(({ created_at }) => {
          const createdAt = toDate(created_at)!;
          return isBefore(createdAt, date) || isSameDay(date, createdAt);
        })
        .sort((a, b) => {
          return (
            toDate(b.created_at)!.getTime() - toDate(a.created_at)!.getTime()
          );
        }) ?? [];

    setCurrentUserPhase(
      sortedUserPhases.length > 1 ? sortedUserPhases[0] : undefined
    );
  }, [date, userPhases]);

  return currentUserPhase;
};
