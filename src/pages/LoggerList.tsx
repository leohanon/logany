import {
  addMutation,
  addMutationOptions,
  deleteMutation,
  deleteMutationOptions,
} from "../utils/loggerMutations";

import { CreateLogger } from "../components/ui/CreateLogger";
import { LoggerListItem } from "../components/LoggerListItem";
import { LoggerListNav } from "../components/LoggerListNav";
import { Stack } from "@mui/material";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useLogs } from "../hooks/useLogs";
import { useState } from "react";

export function LoggerList() {
  const [isEditMode, setIsEditMode] = useState(false);
  const user = useCurrentUser();
  const { data: logList, mutate } = useLogs();

  const toggleEditMode = () => {
    setIsEditMode((oldMode) => {
      return !oldMode;
    });
  };

  const handleAddLogList = async (logName: string) => {
    if (!user) {
      return;
    }
    await mutate(
      addMutation(logName, logList ?? [], user.id),
      addMutationOptions(logName, logList ?? []),
    );
  };

  const handleDeleteLog = async (logUuid: string) => {
    if (!user) {
      return;
    }
    await mutate(
      deleteMutation(logUuid, logList ?? [], user.id),
      deleteMutationOptions(logUuid, logList ?? []),
    );
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
        {logList?.map((log) => {
          return (
            <LoggerListItem
              key={log.uuid}
              onDelete={() => handleDeleteLog(log.uuid)}
              isEditMode={isEditMode}
              log={log}
            />
          );
        })}
        {!isEditMode && <CreateLogger onSubmit={handleAddLogList} />}
      </Stack>
    </>
  );
}
