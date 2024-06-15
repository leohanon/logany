import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type logger = {
  id: string;
  name: string;
};

type loggerListHook = [
  loggerList: logger[],
  setLoggerList: Dispatch<SetStateAction<logger[]>>,
];

const LoggerListContext = createContext<loggerListHook | undefined>(undefined);

export function LoggerListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggerList, setLoggerList] = useState<logger[]>([]);
  return (
    <LoggerListContext.Provider value={[loggerList, setLoggerList]}>
      {children}
    </LoggerListContext.Provider>
  );
}

export function useLoggerListContext() {
  const context = useContext(LoggerListContext);
  if (!context) {
    throw new Error(
      "useLoggerListContext must be used within a LoggerListContextProvider",
    );
  }
  return context;
}
