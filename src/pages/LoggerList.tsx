import { createNewLog, deleteLog } from "../services/dbManagement";

import { CreateLogger } from "../components/ui/CreateLogger";
import { LoggerListItem } from "../components/LoggerListItem";
import { LoggerListNav } from "../components/LoggerListNav";
import { Stack } from "@mui/material";
import { mutate } from "swr";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useLogs } from "../hooks/useLogs";
import { useState } from "react";

export function LoggerList() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: user } = useCurrentUser();
  const { data } = useLogs();

  const toggleEditMode = () => {
    setIsEditMode((oldMode) => {
      return !oldMode;
    });
  };

  const handleAddLogList = async (logName: string) => {
    if (!user) {
      return;
    }
    await createNewLog(logName, user.id);
    mutate(user.id);
  };

  const handleDeleteLog = async (logUuid: string) => {
    if (!user) {
      return;
    }
    await deleteLog(logUuid);
    mutate(user.id);
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
        {data?.map((x) => {
          return (
            <LoggerListItem
              key={x.uuid}
              value={x.name}
              logId={x.uuid}
              onDelete={() => handleDeleteLog(x.uuid)}
              isEditMode={isEditMode}
            />
          );
        })}
        {!isEditMode && <CreateLogger onSubmit={handleAddLogList} />}
      </Stack>
    </>
  );
}
