import { LogItemRow, LogViewRow } from "../../../database.types";
import {
  addLogItem,
  deleteLogItem,
  editLogItem,
  fetchAllUserLogs,
} from "../dbManagement";

import { createContext } from "react";
import dayjs from "dayjs";
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
    const newUuid = crypto.randomUUID();
    const logItem = {
      log_uuid: logUuid,
      note: message,
      uuid: newUuid,
      created_at: dayjs().toISOString(),
    };
    mutate(["currentUserLogs"], () => {}, {
      optimisticData: (data: LogViewRow[] | undefined) => {
        if (!data) return [];
        return data.map((log) =>
          log.uuid === logUuid
            ? { ...log, last_updated_at: dayjs().toISOString() }
            : log,
        );
      },
      revalidate: false,
      populateCache: false,
    });
    mutate(
      logUuid,
      async () => {
        try {
          await addLogItem(logItem);
        } catch (error) {
          console.error("item was unable to be added!");
        }
        await mutate(["currentUserLogs"]);
      },
      {
        optimisticData: (data: LogItemRow[] | undefined) => {
          return [...(data ?? []), logItem].sort(
            (a, b) =>
              dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf(),
          );
        },
        revalidate: true,
        populateCache: false,
      },
    );
  };

  const handleEditLogItem = async (logItem: LogItemRow) => {
    await editLogItem(logItem.uuid, logItem);
    mutate(["currentUserLogs"], fetchAllUserLogs, { revalidate: false });
    mutate(logItem.log_uuid);
  };

  const handleDeleteLogItem = async (logItemUuid: string, logUuid: string) => {
    await deleteLogItem(logItemUuid);
    mutate(["currentUserLogs"], fetchAllUserLogs, { revalidate: false });
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
