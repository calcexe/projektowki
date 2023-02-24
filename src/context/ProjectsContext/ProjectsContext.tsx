import { useGetUserPhases } from "@/api/userPhases/getUserPhases";
import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import useDateContext from "@/context/DateContext/useDateContext";
import { getMonth } from "date-fns";
import { Phase } from "@/api/types/Phase";
import { Project } from "@/api/types/Project";
import { UserPhase } from "@/api/types/UserPhase";

export type ProjectsContextType = {
  phases?: Phase[];
  projects?: Project[];
  userPhases?: UserPhase[];
  isLoading: boolean;
};

export const ProjectsContext = React.createContext<ProjectsContextType | null>(
  null
);

const ProjectsProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const { date } = useDateContext();
  const [fetchDate, setFetchDate] = useState(date);
  const { data: phasesData, isLoading } = useGetUserPhases(fetchDate);

  const month = getMonth(date);
  useEffect(() => {
    setFetchDate(date);
  }, [month]);

  return (
    <ProjectsContext.Provider
      value={{
        isLoading,
        phases: phasesData?.phases,
        projects: phasesData?.projects,
        userPhases: phasesData?.userPhases ?? undefined,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
