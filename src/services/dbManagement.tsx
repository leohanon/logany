import { LogItemInsert, LogItemUpdate } from "../../database.types";

import { Database } from "../../database.types";
import { createClient } from "@supabase/supabase-js";
import { mutate } from "swr";

const supabaseKey = import.meta.env.VITE_ANON_API_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

const getCurrentUserUuid = async () => {
  return (await supabase.auth.getSession()).data.session?.user?.id;
};

export const fetchAllUserLogs = async () => {
  const userUuid = await getCurrentUserUuid();
  if (!userUuid) {
    throw new Error("Error retrieving logs. There is no logged in userUuid.");
  }
  const { data, error } = await supabase
    .from("logs_summary")
    .select("*, log_permissions!inner()")
    .eq("log_permissions.user_uuid", userUuid)
    .order("created_at", { ascending: false });
  if (error) {
    error.message = "Error retrieving logs. " + error.message;
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
    error.message = "Error retrieving log items. " + error.message;
    throw error;
  }
  return data;
};

export const hasPermission = async (logUuid: string) => {
  const userUuid = await getCurrentUserUuid();
  if (!userUuid) {
    throw new Error(
      "Error getting permission. There is no logged in userUuid.",
    );
  }
  const { count, error } = await supabase
    .from("log_permissions")
    .select("*", { count: "exact", head: true })
    .eq("user_uuid", userUuid)
    .eq("log_uuid", logUuid);
  if (error) {
    throw error;
  }
  return count ? count > 0 : false;
};

const isOwner = async (logUuid: string) => {
  const userUuid = await getCurrentUserUuid();
  if (!userUuid) {
    throw new Error("Error checking if owner. There is no logged in userUuid.");
  }
  const { count, error } = await supabase
    .from("log_permissions")
    .select("*", { count: "exact", head: true })
    .eq("user_uuid", userUuid)
    .eq("log_uuid", logUuid)
    .eq("access_level", "OWNER");
  if (error) {
    throw error;
  }
  return count ? count > 0 : false;
};

export const getInviteDetails = async (inviteUuid: string) => {
  const { data, error } = await supabase
    .from("log_sharing_keys")
    .select("*, logs(*)")
    .eq("id", inviteUuid)
    .single();
  if (error) {
    throw error;
  }
  const userHasPermission = await hasPermission(data.log_uuid);
  return { ...data, hasPermission: userHasPermission };
};

export const addLogItem = async (logItem: LogItemInsert) => {
  const { error: logItemError } = await supabase
    .from("log_items")
    .insert(logItem);
  if (logItemError) {
    throw logItemError;
  }
};

export const editLogItem = async (id: string, logItem: LogItemUpdate) => {
  const { error } = await supabase
    .from("log_items")
    .update(logItem)
    .eq("uuid", id);
  if (error) {
    throw error;
  }
};

export const deleteLogItem = async (uuid: string) => {
  const { error } = await supabase.from("log_items").delete().eq("uuid", uuid);
  if (error) {
    throw error;
  }
};

const deleteLog = async (logUuid: string) => {
  const { data, error } = await supabase
    .from("logs")
    .delete()
    .eq("uuid", logUuid)
    .select();
  if (error) {
    throw error;
  }
  if (data.length === 0) {
    throw new Error(`Unable to delete log: ${logUuid}`);
  }
};

const deletePermission = async (logUuid: string) => {
  const userUuid = await getCurrentUserUuid();
  if (!userUuid) {
    throw new Error(
      "Error deleting permission. There is no logged in userUuid.",
    );
  }
  const { error } = await supabase
    .from("log_permissions")
    .delete()
    .eq("log_uuid", logUuid)
    .eq("user_uuid", userUuid)
    .neq("access_level", "OWNER");
  if (error) {
    throw error;
  }
};

export const removeLog = async (logUuid: string) => {
  if (await isOwner(logUuid)) {
    await deleteLog(logUuid);
  } else {
    await deletePermission(logUuid);
  }
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

export const createNewLog = async (logName: string) => {
  const uuid = crypto.randomUUID();
  const userUuid = await getCurrentUserUuid();
  if (!userUuid) {
    throw new Error("Error creating new log. There is no logged in userUuid.");
  }
  const { error: createLogError } = await createLog(uuid, logName);
  if (createLogError) {
    throw createLogError;
  }
  const { error: createPermissionError } = await createPermission(
    uuid,
    userUuid,
    "OWNER",
  );
  if (createPermissionError) {
    throw createPermissionError;
  }
  const { data, error } = await supabase
    .from("logs_summary")
    .select("*")
    .eq("uuid", uuid)
    .single();
  if (error) {
    throw error;
  }
  return data;
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

const addSelfToInviteRecord = async (inviteUuid: string) => {
  const userUuid = await getCurrentUserUuid();
  if (!userUuid) {
    throw new Error(
      "Error adding self to invite record. There is no logged in userUuid.",
    );
  }
  const { error } = await supabase
    .from("log_sharing_keys")
    .update({ claimer_uuid: userUuid })
    .eq("id", inviteUuid);
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

export const acceptInvite = async (inviteUuid: string) => {
  try {
    const userUuid = await getCurrentUserUuid();
    if (!userUuid) {
      throw new Error("No user uuid.");
    }

    await addSelfToInviteRecord(inviteUuid);

    const logUuid = await getLogUuidFromInviteCode(inviteUuid);
    if (!logUuid) {
      throw new Error("Couldn't retrieve a logUuid from inviteUuid");
    }

    const { error } = await createPermission(logUuid, userUuid, "COLLABORATOR");
    if (error) {
      throw error;
    }

    mutate([userUuid, logUuid, "hasPermission"]);
  } catch (error) {
    console.error("Error accepting invite:", error);
  }
};
