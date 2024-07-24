import { addLogItem, deleteLogItem, editLogItem } from "../dbManagement";

import { LogItemRow } from "../../../database.types";
import { createContext } from "react";
import { mutate } from "swr";

export type logger = {
  id: string;
  name: string;
};

type loggerListHook = {
  handleAddToLog: (logUuid: string, message: string) => void;
  handleEditLogItem: (logItem: LogItemRow) => void;
  handleDeleteLogItem: (logItemUuid: string, logUuid: string) => void;
};

export const LoggerListContext = createContext<loggerListHook | undefined>(
  undefined,
);

export function LoggerListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleAddToLog = async (logUuid: string, message: string) => {
    const logItem = {
      log_uuid: logUuid,
      note: message,
    };
    await addLogItem(logItem);
    mutate(["currentUser"]);
    mutate(logUuid);
  };

  const handleEditLogItem = async (logItem: LogItemRow) => {
    await editLogItem(logItem.uuid, logItem);
    mutate(["currentUser"]);
    mutate(logItem.log_uuid);
  };

  const handleDeleteLogItem = async (logItemUuid: string, logUuid: string) => {
    await deleteLogItem(logItemUuid);
    mutate(["currentUser"]);
    mutate(logUuid);
  };

  return (
    <LoggerListContext.Provider
      value={{
        handleAddToLog,
        handleEditLogItem,
        handleDeleteLogItem,
      }}
    >
      {children}
    </LoggerListContext.Provider>
  );
}
