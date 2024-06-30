import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Log } from "./LogTypes";
import { addLogItem } from "./dbManagement";

export type logger = {
  id: string;
  name: string;
};

type loggerListHook = {
  loggerList: Log[];
  updateUid: string;
  setLoggerList: Dispatch<SetStateAction<logger[]>>;
  handleAddLogList: (name: string) => void;
  handleQuickAddToLog: (logId: string) => void;
};

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

  const [updateUid, setUpdateUid] = useState(() => crypto.randomUUID());

  useEffect(() => {
    const logs = JSON.stringify(loggerList);
    localStorage.setItem("LOGS", logs);
  }, [loggerList]);

  const handleAddLogList = (name: string) => {
    const newLog = { id: crypto.randomUUID(), name: name };
    setLoggerList((oldList) => [...oldList, newLog]);
  };

  const handleQuickAddToLog = (logId: string) => {
    const logItem = {
      id: Date.now().toString(),
      logId: logId,
      timestamp: Date.now(),
      note: "",
    };
    addLogItem(logItem);
    setUpdateUid(crypto.randomUUID());
  };

  return (
    <LoggerListContext.Provider
      value={{
        loggerList,
        updateUid,
        setLoggerList,
        handleAddLogList,
        handleQuickAddToLog,
      }}
    >
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
