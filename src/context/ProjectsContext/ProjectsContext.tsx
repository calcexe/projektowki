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
import { useUser } from "@supabase/auth-helpers-react";

export type ProjectsContextType = {
  phases?: Phase[];
  projects?: Project[];
  userPhases?: UserPhase[];
};

export const ProjectsContext = React.createContext<ProjectsContextType | null>(
  null
);

const ProjectsProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const { date } = useDateContext();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [fetchDate, setFetchDate] = useState(date);
  const { data: phasesData } = useGetUserPhases(fetchDate);
  const user = useUser();

  const month = getMonth(date);
  useEffect(() => {
    setFetchDate(date);
  }, [month]);

  useEffect(() => {
    setUserId(user?.id);
  }, [user?.id]);

  return (
    <ProjectsContext.Provider
      value={{
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
