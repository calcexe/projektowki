import { useContext } from "react";
import { ProjectsContext, ProjectsContextType } from "./ProjectsContext";

const useDateContext = () => {
  const context = useContext(ProjectsContext) as ProjectsContextType;
  return context;
};

export default useDateContext;
