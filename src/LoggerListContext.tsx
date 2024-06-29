import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Log } from "./LogTypes";

export type logger = {
  id: string;
  name: string;
};

type loggerListHook = [
  loggerList: Log[],
  setLoggerList: Dispatch<SetStateAction<logger[]>>,
];

const LoggerListContext = createContext<loggerListHook | undefined>(undefined);

export function LoggerListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggerList, setLoggerList] = useState<Log[]>(() => {
    const logs = localStorage.getItem("LOGS");
    if (!logs) return [];
    return JSON.parse(logs);
  });
  useEffect(() => {
    const logs = JSON.stringify(loggerList);
    localStorage.setItem("LOGS", logs);
  }, [loggerList]);
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
