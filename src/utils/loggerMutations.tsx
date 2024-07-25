import { createNewLog, removeLog } from "../services/dbManagement";

import { LogViewRow } from "../../database.types";
import dayjs from "dayjs";

export const addLogMutation = async (newLog: string) => {
  await createNewLog(newLog);
  return [];
};

export const addLogMutationOptions = (newLog: string) => {
  const newLogRow = {
    uuid: crypto.randomUUID(),
    name: newLog,
    last_updated_at: null,
    created_at: dayjs().toISOString(),
  };
  return {
    optimisticData: (data: LogViewRow[] | undefined) => {
      return [...(data ?? []), newLogRow];
    },
    populateCache: false,
    revalidate: true,
  };
};

export const deleteLogMutation = async (logUuid: string) => {
  await removeLog(logUuid);
  return [];
};

export const deleteLogMutationOptions = (logUuid: string) => {
  return {
    optimisticData: (data: LogViewRow[] | undefined) => {
      return data?.filter((x) => x.uuid != logUuid) ?? [];
    },
    populateCache: false,
    revalidate: true,
  };
};
