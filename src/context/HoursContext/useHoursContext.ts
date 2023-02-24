import { useContext } from "react";
import { HoursContext, HoursContextType } from "./HoursContext";

const useHoursContext = () => {
  const context = useContext(HoursContext) as HoursContextType;
  return context;
};

export default useHoursContext;
