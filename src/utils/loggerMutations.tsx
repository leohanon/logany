import { createNewLog, removeLog } from "../services/dbManagement";

import { LogViewRow } from "../../database.types";
import dayjs from "dayjs";

export const addMutation = async (newLog: string, logs: LogViewRow[]) => {
  const added = await createNewLog(newLog);
  return added ? [...logs, added] : logs;
};

export const addMutationOptions = (newLog: string, logs: LogViewRow[]) => {
  return {
    optimisticData: [
      ...logs,
      {
        uuid: crypto.randomUUID(),
        name: newLog,
        last_updated_at: null,
        created_at: dayjs().toISOString(),
      },
    ],
    populateCache: true,
    revalidate: false,
  };
};

export const deleteMutation = async (logUuid: string, logs: LogViewRow[]) => {
  await removeLog(logUuid);
  return logs.filter((x) => x.uuid != logUuid);
};

export const deleteMutationOptions = (logUuid: string, logs: LogViewRow[]) => {
  return {
    optimisticData: logs.filter((x) => x.uuid != logUuid),
    populateCache: true,
    revalidate: false,
  };
};
