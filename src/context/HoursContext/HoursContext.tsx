import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import useDateContext from "@/context/DateContext/useDateContext";
import { getMonth } from "date-fns";
import { useGetHours } from "@/api/hours/getHours";
import { Hour } from "@/api/types/Hour";

export type HoursContextType = {
  hours: Hour[];
  isLoading: boolean;
};

export const HoursContext = React.createContext<HoursContextType | null>(null);

const HoursProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const { date } = useDateContext();
  const [fetchDate, setFetchDate] = useState(date);

  const { data, isLoading } = useGetHours(fetchDate);

  const month = getMonth(date);
  useEffect(() => {
    setFetchDate(date);
  }, [month]);

  return (
    <HoursContext.Provider value={{ hours: data ?? [], isLoading }}>
      {children}
    </HoursContext.Provider>
  );
};

export default HoursProvider;
