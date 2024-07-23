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
  const { data, mutate } = useLogs();

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
      addMutation(logName, data ?? [], user.id),
      addMutationOptions(logName, data ?? []),
    );
  };

  const handleDeleteLog = async (logUuid: string) => {
    if (!user) {
      return;
    }
    await mutate(
      deleteMutation(logUuid, data ?? []),
      deleteMutationOptions(logUuid, data ?? []),
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
