import {
  addLogItem,
  deleteLogItem,
  editLogItem,
  supabase,
} from "../dbManagement";

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
    const user = (await supabase.auth.getSession()).data.session?.user.id;
    await addLogItem(logItem);
    mutate(user);
    mutate(logUuid);
  };

  const handleEditLogItem = async (logItem: LogItemRow) => {
    const user = (await supabase.auth.getSession()).data.session?.user.id;
    await editLogItem(logItem.uuid, logItem);
    mutate(user);
    mutate(logItem.log_uuid);
  };

  const handleDeleteLogItem = async (logItemUuid: string, logUuid: string) => {
    const user = (await supabase.auth.getSession()).data.session?.user.id;
    await deleteLogItem(logItemUuid);
    mutate(user);
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
