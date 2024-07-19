import { DBSchema, IDBPDatabase, openDB } from "idb";

import { LogItem } from "../utils/LogTypes";

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

export const addLogItem = async (logItem: LogItem) => {
  const db = await initDB();
  return db.add(STORE_NAME, logItem);
};

export const getLogItems = async (logId: string) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const logIndexed = transaction.store.index("byLog");
  let cursor = await logIndexed.openCursor(logId, "prev");
  const items = [];
  while (cursor) {
    items.push(cursor.value);
    cursor = await cursor.continue(); // Move to the next item in the index
  }

  await transaction.done; // Ensure the transaction is completed before returning
  return items;
};

export const editLogItem = async (id: string, logItem: LogItem) => {
  deleteLogItem(id);
  addLogItem(logItem);
};

export const deleteLogItem = async (id: string) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};

export const deleteLog = async (logId: string) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME);
  const logIndexed = transaction.store.index("byLog");
  return (await logIndexed.getAll(logId)).map((x) =>
    db.delete(STORE_NAME, x.id),
  );
};

export const getCount = async (logId: string) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME);
  const logIndexed = transaction.store.index("byLog");
  return logIndexed.count(logId);
};
