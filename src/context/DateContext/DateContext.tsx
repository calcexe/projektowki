import React, { FunctionComponent, ReactNode } from "react";

export type DateContextType = {
  date: Date;
  setDate: (_: Date) => void;
};

export const DateContext = React.createContext<DateContextType | null>(null);

const DateProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [date, setDate] = React.useState(new Date());

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;
