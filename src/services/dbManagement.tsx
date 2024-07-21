import { DBSchema, IDBPDatabase, openDB } from "idb";

import { LogItem } from "../utils/LogTypes";
import { LogItemInsert } from "../../database.types";
import { supabase } from "./supabase";

const DATABASE_NAME = "logsDatabase";
const STORE_NAME = "logs";
const VERSION = 1;

interface MyDB extends DBSchema {
  logs: {
    key: string;
    value: LogItem;
    indexes: { byLog: string };
  };
}

let dbInstance: IDBPDatabase<MyDB> | null = null;
const initDB = async () => {
  if (dbInstance) {
    return dbInstance;
  }
  dbInstance = await openDB<MyDB>(DATABASE_NAME, VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const logStore = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        logStore.createIndex("byLog", "logId");
      }
    },
  });
  return dbInstance;
};

export const addLogItem = async (logItem: LogItemInsert) => {
  try {
    const uuid = crypto.randomUUID();
    console.log(uuid);

    const { error: logError } = await supabase
      .from("log_items")
      .insert(logItem);

    if (logError) {
      throw logError;
    }
  } catch (error) {
    console.error("Error adding log list:", error);
  }
};

export const getLogItems = async (logId: string) => {
  return supabase.from("log_items").select().eq("log_uuid", logId);
};

export const editLogItem = async (id: string, logItem: LogItemInsert) => {
  deleteLogItem(id);
  addLogItem(logItem);
};

export const deleteLogItem = async (id: string) => {
  return supabase.from("logs").delete().eq("uuid", logId);
};

export const deleteLog = async (logId: string) => {
  return supabase.from("logs").delete().eq("uuid", logId);
};

export const getCount = async (logId: string) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME);
  const logIndexed = transaction.store.index("byLog");
  return logIndexed.count(logId);
};

export const createNewLog = async (logName: string, user_uuid: string) => {
  try {
    const uuid = crypto.randomUUID();
    console.log(uuid);

    const { error: logError } = await supabase
      .from("logs")
      .insert({ name: logName, uuid });

    if (logError) {
      throw logError;
    }

    const { error: permissionError } = await supabase
      .from("log_permissions")
      .insert({
        log_uuid: uuid,
        user_uuid: user_uuid,
        access_level: "OWNER",
      });

    if (permissionError) {
      throw permissionError;
    }
  } catch (error) {
    console.error("Error adding log list:", error);
  }
};

export const fetchAllUserLogs = async (user_uuid: string) => {
  console.log("fetching logs");
  return supabase
    .from("logs")
    .select("*, log_permissions(*)")
    .eq("log_permissions.user_uuid", user_uuid);
};
