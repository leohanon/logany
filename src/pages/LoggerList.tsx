import { AnimatePresence, motion } from "framer-motion";
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
        <AnimatePresence initial={false}>
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
        </AnimatePresence>
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
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.2 }}
        key="loggerlist"
      >
        <Stack
          direction={"column"}
          justifyContent={"flex-start"}
          alignItems={"stretch"}
          spacing={1}
          sx={{ padding: 1 }}
        >
          {innerContent}
        </Stack>
      </motion.div>
    </>
  );
}
