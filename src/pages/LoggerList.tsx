import { createNewLog, fetchAllUserLogs } from "../services/dbManagement";
import { useCallback, useEffect, useState } from "react";

import { CreateLogger } from "../components/ui/CreateLogger";
import { Database } from "../../database.types";
import { LoggerListItem } from "../components/LoggerListItem";
import { LoggerListNav } from "../components/LoggerListNav";
import { Stack } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

type LogRow = Database["public"]["Tables"]["logs"]["Row"];

export function LoggerList() {
  const [isEditMode, setIsEditMode] = useState(false);
  const session = useAuth();
  const [loggerList, setLoggerList] = useState<LogRow[] | null>([]);

  const toggleEditMode = () => {
    setIsEditMode((oldMode) => {
      return !oldMode;
    });
  };

  const fetchLogs = useCallback(async () => {
    if (!session?.user.id) {
      return;
    }
    const { data, error } = await fetchAllUserLogs(session.user.id);
    if (error) {
      console.error("Error fetching logs:", error);
    } else {
      setLoggerList(data);
    }
  }, [session?.user.id]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleAddLogList = async (logName: string) => {
    if (!session) {
      return;
    }
    await createNewLog(logName, session.user.id);
    await fetchLogs();
  };

  return (
    <>
      <LoggerListNav
        isEditMode={isEditMode}
        onToggleEditMode={toggleEditMode}
      />
      <Stack
        direction={"column"}
        justifyContent={"flex-start"}
        alignItems={"stretch"}
        spacing={1}
      >
        {loggerList?.map((x) => {
          return (
            <LoggerListItem
              key={x.uuid}
              value={x.name}
              logId={x.uuid}
              onDelete={() => {}}
              isEditMode={isEditMode}
            />
          );
        })}
        {!isEditMode && <CreateLogger onSubmit={handleAddLogList} />}
      </Stack>
    </>
  );
}
