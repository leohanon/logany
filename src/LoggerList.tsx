import { CreateLogger } from "./CreateLogger";
import { LoggerListItem } from "./LoggerListItem";
import { LoggerListNav } from "./LoggerListNav";
import { Stack } from "@mui/material";
import { deleteLog } from "./dbManagement";
import { useLoggerListContext } from "./LoggerListContext";
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
              log={x}
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
