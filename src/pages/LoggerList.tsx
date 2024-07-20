import { CreateLogger } from "../components/ui/CreateLogger";
import { LoggerListItem } from "../components/LoggerListItem";
import { LoggerListNav } from "../components/LoggerListNav";
import { Stack } from "@mui/material";
import { deleteLog } from "../services/dbManagement";
import { useLoggerListContext } from "../hooks/useLoggerListContext";
import { useState } from "react";

export function LoggerList() {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((oldMode) => {
      return !oldMode;
    });
  };

  const { loggerList, setLoggerList, handleAddLogList } =
    useLoggerListContext();

  const handleDelete = (id: string) => {
    setLoggerList((oldList) => oldList.filter((x) => x.id != id));
    deleteLog(id);
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
        {loggerList.map((x) => {
          return (
            <LoggerListItem
              key={x.id}
              value={x.name}
              logId={x.id}
              onDelete={() => handleDelete(x.id)}
              isEditMode={isEditMode}
            />
          );
        })}
        {!isEditMode && <CreateLogger onSubmit={handleAddLogList} />}
      </Stack>
    </>
  );
}
