import { useContext } from "react";
import { ProjectsContext, ProjectsContextType } from "./ProjectsContext";

const useProjectsContext = () => {
  const context = useContext(ProjectsContext) as ProjectsContextType;
  return context;
};

export default useProjectsContext;
