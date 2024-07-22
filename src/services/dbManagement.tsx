import { LogItemInsert, LogItemRow } from "../../database.types";

import { Database } from "../../database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseKey = import.meta.env.VITE_ANON_API_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const fetchAllUserLogs = async (userUuid: string) => {
  const { data, error } = await supabase
    .from("logs")
    .select("*, log_permissions(*)")
    .eq("log_permissions.user_uuid", userUuid);
  if (error) {
    throw error;
  }
  return data;
};

export const getLogItems = async (logUuid: string) => {
  const { data, error } = await supabase
    .from("log_items")
    .select("*")
    .eq("log_uuid", logUuid)
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

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

const createLog = (logUuid: string, logName: string) => {
  return supabase.from("logs").insert({ name: logName, uuid: logUuid });
};

const createPermission = (
  logUuid: string,
  userUuid: string,
  accessLevel: string,
) => {
  return supabase.from("log_permissions").insert({
    log_uuid: logUuid,
    user_uuid: userUuid,
    access_level: accessLevel,
  });
};

export const createNewLog = async (logName: string, user_uuid: string) => {
  try {
    const uuid = crypto.randomUUID();
    console.log(uuid);

    const { error: logError } = await createLog(uuid, logName);
    if (logError) {
      throw logError;
    }

    const { error: permissionError } = await createPermission(
      uuid,
      user_uuid,
      "OWNER",
    );
    if (permissionError) {
      throw permissionError;
    }
  } catch (error) {
    console.error("Error adding log list:", error);
  }
};

export const getLogDetails = async (logUuid: string) => {
  return supabase.from("logs").select().eq("uuid", logUuid).single();
};

export const createInviteCode = async (logUuid: string) => {
  const inviteUuid = crypto.randomUUID();
  const { error } = await supabase
    .from("log_sharing_keys")
    .insert({ id: inviteUuid, log_uuid: logUuid });
  if (error) {
    throw error;
  }
  return inviteUuid;
};

const addInviteCodeToUserMetadata = async (inviteUuid: string) => {
  const { error } = await supabase.auth.updateUser({
    data: { invite_uuid: inviteUuid },
  });
  if (error) {
    throw error;
  }
};

const getLogUuidFromInviteCode = async (inviteUuid: string) => {
  return (
    await supabase
      .from("log_sharing_keys")
      .select("log_uuid")
      .eq("id", inviteUuid)
      .single()
  ).data?.log_uuid;
};

const deleteInviteCode = async (inviteUuid: string) => {
  const { error } = await supabase
    .from("log_sharing_keys")
    .delete()
    .eq("id", inviteUuid);
  if (error) {
    throw error;
  }
};

export const acceptInvite = async (inviteUuid: string) => {
  try {
    await addInviteCodeToUserMetadata(inviteUuid);

    const userUuid = (await supabase.auth.getUser()).data.user?.id;
    if (!userUuid) {
      throw new Error("No user uuid.");
    }

    const logUuid = await getLogUuidFromInviteCode(inviteUuid);
    if (!logUuid) {
      throw new Error("No user uuid.");
    }

    const { error: permissionError } = await createPermission(
      logUuid,
      userUuid,
      "COLLABORATOR",
    );
    if (permissionError) {
      throw permissionError;
    }

    await deleteInviteCode(inviteUuid);
  } catch (error) {
    console.error("Error accepting invite:", error);
  }
};
