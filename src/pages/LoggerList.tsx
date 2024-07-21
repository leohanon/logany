import { useEffect, useState } from "react";

import { CreateLogger } from "../components/ui/CreateLogger";
import { Database } from "../../database.types";
import { LoggerListItem } from "../components/LoggerListItem";
import { LoggerListNav } from "../components/LoggerListNav";
import { Stack } from "@mui/material";
import { createNewLog } from "../services/dbManagement";
import { supabase } from "../services/supabase";
import { useAuth } from "../hooks/useAuth";

type LogRow = Database["public"]["Tables"]["logs"]["Row"];

export function LoggerList() {
  const [isEditMode, setIsEditMode] = useState(false);
  const session = useAuth();

  const toggleEditMode = () => {
    setIsEditMode((oldMode) => {
      return !oldMode;
    });
  };

  const fetchLogs = async () => {
    const { data, error } = await supabase.from("logs").select();

    if (error) {
      console.error("Error fetching logs:", error);
    } else {
      setLoggerList(data);
    }
  };

  const handleAddLogList = async (logName: string) => {
    await createNewLog(logName, session?.user.id ?? "");
    await fetchLogs();
  };

  const [loggerList, setLoggerList] = useState<LogRow[] | null>([]);
  useEffect(() => {
    fetchLogs();
  }, []);

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
