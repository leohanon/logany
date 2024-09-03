import { createNewLog, removeLog } from "../services/dbManagement";

import { LogViewRow } from "../../database.types";
import dayjs from "dayjs";

export const addLogMutation = async (
  newLogUuid: string,
  newLogName: string,
) => {
  await createNewLog(newLogUuid, newLogName);
  return [];
};

export const addLogMutationOptions = (
  newLogUuid: string,
  newLogName: string,
) => {
  const newLogRow = {
    uuid: newLogUuid,
    name: newLogName,
    last_updated_at: null,
    created_at: dayjs().toISOString(),
    backlog: 0,
    next_mult: 1.25,
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
