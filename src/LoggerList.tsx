import { CreateLogger } from "./CreateLogger";
import { LoggerListItem } from "./LoggerItem";
import { LoggerListNav } from "./LoggerListNav";
import { Stack } from "@mui/material";
import { deleteLog } from "./dbManagement";
import { useLoggerListContext } from "./LoggerListContext";
import { useState } from "react";

export function LoggerList() {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((oldMode) => {
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
      <LoggerListNav editMode={editMode} onToggleEditMode={toggleEditMode} />
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
              editMode={editMode}
            />
          );
        })}
        {!editMode && <CreateLogger onSubmit={handleAddLogList} />}
      </Stack>
    </>
  );
}
