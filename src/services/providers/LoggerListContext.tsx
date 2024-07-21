import { addLogItem, deleteLogItem, editLogItem } from "../dbManagement";
import { createContext, useState } from "react";

import { LogItemRow } from "../../../database.types";

export type logger = {
  id: string;
  name: string;
};

type loggerListHook = {
  updateUid: string;
  handleAddToLog: (logId: string, message: string) => void;
  handleEditLogItem: (logItem: LogItemRow) => void;
  handleDeleteLogItem: (logItemUuid: string) => void;
};

export const LoggerListContext = createContext<loggerListHook | undefined>(
  undefined,
);

export function LoggerListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [updateUid, setUpdateUid] = useState(() => crypto.randomUUID());

  const handleAddToLog = async (logId: string, message: string) => {
    const logItem = {
      log_uuid: logId,
      note: message,
    };
    await addLogItem(logItem);
    setUpdateUid(crypto.randomUUID());
  };

  const handleEditLogItem = async (logItem: LogItemRow) => {
    await editLogItem(logItem.uuid, logItem);
    setUpdateUid(crypto.randomUUID());
  };

  const handleDeleteLogItem = async (logItemUuid: string) => {
    await deleteLogItem(logItemUuid);
    setUpdateUid(crypto.randomUUID());
  };

  return (
    <LoggerListContext.Provider
      value={{
        updateUid,
        handleAddToLog,
        handleEditLogItem,
        handleDeleteLogItem,
      }}
    >
      {children}
    </LoggerListContext.Provider>
  );
}
