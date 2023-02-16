import { useContext } from "react";
import { DateContext, DateContextType } from "./DateContext";

const useDateContext = () => {
  const context = useContext(DateContext) as DateContextType;
  return context;
};

export default useDateContext;
