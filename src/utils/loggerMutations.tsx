import { createNewLog, deleteLog } from "../services/dbManagement";

import { LogRow } from "../../database.types";
import dayjs from "dayjs";

export const addMutation = async (
  newLog: string,
  logs: LogRow[],
  userUuid: string,
) => {
  const added = await createNewLog(newLog, userUuid);
  return added ? [...logs, added] : logs;
};

export const addMutationOptions = (newLog: string, logs: LogRow[]) => {
  return {
    optimisticData: [
      ...logs,
      {
        uuid: crypto.randomUUID(),
        name: newLog,
        last_log_at: dayjs().toISOString(),
        created_at: dayjs().toISOString(),
      },
    ],
    populateCache: true,
    revalidate: false,
  };
};

export const deleteMutation = async (logUuid: string, logs: LogRow[]) => {
  await deleteLog(logUuid);
  return logs.filter((x) => x.uuid != logUuid);
};

export const deleteMutationOptions = (logUuid: string, logs: LogRow[]) => {
  return {
    optimisticData: logs.filter((x) => x.uuid != logUuid),
    populateCache: true,
    revalidate: false,
  };
};
