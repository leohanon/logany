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

type loggerListHook = {
  loggerList: Log[];
  updateUid: string;
  setLoggerList: Dispatch<SetStateAction<Log[]>>;
  handleAddLogList: (name: string) => void;
  handleAddToLog: (logId: string, message: string) => void;
  activeLogId: string;
  setActiveLogId: Dispatch<SetStateAction<string>>;
  handleMoveLogPosition: (logId: string, direction: 1 | -1) => void;
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
  const [activeLogId, setActiveLogId] = useState("");

  useEffect(() => {
    const logs = JSON.stringify(loggerList);
    localStorage.setItem("LOGS", logs);
  }, [loggerList]);

  const handleAddLogList = (name: string) => {
    const newLog = {
      id: crypto.randomUUID(),
      name: name,
      lastUpdated: Date.now(),
    };
    setLoggerList((oldList) => [...oldList, newLog]);
  };

  const handleAddToLog = (logId: string, message: string) => {
    const logItem = {
      id: Date.now().toString(),
      logId: logId,
      timestamp: Date.now(),
      note: message,
    };
    addLogItem(logItem);
    setLoggerList((oldList) =>
      oldList.map((x) =>
        x.id === logId ? { ...x, lastUpdated: Date.now() } : x,
      ),
    );
    setUpdateUid(crypto.randomUUID());
  };

  const handleMoveLogPosition = (logId: string, direction: 1 | -1) => {
    const index = loggerList.findIndex((x) => x.id === logId);
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= loggerList.length) {
      return;
    }

    const copy = [...loggerList];

    const item = copy[index];
    copy[index] = copy[newIndex];
    copy[newIndex] = item;

    setLoggerList(copy);
  };

  return (
    <LoggerListContext.Provider
      value={{
        loggerList,
        updateUid,
        setLoggerList,
        handleAddLogList,
        handleAddToLog,
        activeLogId,
        setActiveLogId,
        handleMoveLogPosition,
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
