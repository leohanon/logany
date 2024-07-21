import { LogItemInsert, LogItemRow } from "../../database.types";

import { supabase } from "./supabase";

export const addLogItem = async (logItem: LogItemInsert) => {
  try {
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

export const getLogItems = (logUuid: string) => {
  return supabase
    .from("log_items")
    .select()
    .eq("log_uuid", logUuid)
    .order("created_at", { ascending: false });
};

export const editLogItem = async (id: string, logItem: LogItemRow) => {
  try {
    const response = await supabase
      .from("log_items")
      .update(logItem)
      .eq("uuid", id);

    if (response.error) {
      throw response.error;
    }
    return response;
  } catch (error) {
    console.error("Error editing log item:", error);
  }
};

export const deleteLogItem = (uuid: string) => {
  return supabase.from("log_items").delete().eq("uuid", uuid);
};

export const deleteLog = (uuid: string) => {
  return supabase.from("logs").delete().eq("uuid", uuid);
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

export const fetchAllUserLogs = (user_uuid: string) => {
  return supabase
    .from("logs")
    .select("*, log_permissions(*)")
    .eq("log_permissions.user_uuid", user_uuid);
};

export const getLogDetails = (logUuid: string) => {
  return supabase.from("logs").select().eq("uuid", logUuid).single();
};
