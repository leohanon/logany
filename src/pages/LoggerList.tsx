import { Stack, Typography } from "@mui/material";
import {
  addLogMutation,
  addLogMutationOptions,
  deleteLogMutation,
  deleteLogMutationOptions,
} from "../utils/loggerMutations";

import { CreateLogger } from "../components/ui/CreateLogger";
import { LoggerListItem } from "../components/LoggerListItem";
import { LoggerListNav } from "../components/LoggerListNav";
import { useLogs } from "../hooks/useLogs";
import { useState } from "react";

export function LoggerList() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: logList, error, isLoading, mutate } = useLogs();

  const toggleEditMode = () => {
    setIsEditMode((oldMode) => {
      return !oldMode;
    });
  };

  const handleAddLogList = async (logName: string) => {
    await mutate(addLogMutation(logName), addLogMutationOptions(logName));
  };

  const handleDeleteLog = async (logUuid: string) => {
    await mutate(deleteLogMutation(logUuid), deleteLogMutationOptions(logUuid));
  };

  let innerContent = null;
  if (error) {
    innerContent = <Typography color={"error"}>{error.message}</Typography>;
  } else if (isLoading) {
    innerContent = <Typography>Loading!</Typography>;
  } else {
    innerContent = (
      <>
        {logList?.map((log) => {
          return (
            <LoggerListItem
              key={log.uuid}
              onDelete={() => handleDeleteLog(log.uuid ?? "")}
              isEditMode={isEditMode}
              log={log}
            />
          );
        })}
        {!isEditMode && <CreateLogger onSubmit={handleAddLogList} />}
      </>
    );
  }
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
        {innerContent}
      </Stack>
    </>
  );
}
