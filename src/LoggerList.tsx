import { useEffect, useState } from "react";

import { CreateLogger } from "./CreateLogger";
import { LoggerListItem } from "./LoggerListItem";
import { LoggerListNav } from "./LoggerListNav";
import { Stack } from "@mui/material";
import { deleteLog } from "./dbManagement";
import { useLoggerListContext } from "./LoggerListContext";

export function LoggerList() {
  const [editMode, setEditMode] = useState(false);

  // re-render the entire app once per minute to update the "last updated mins ago" text
  const [renderPls, setRenderPls] = useState(0);
  useEffect(() => {
    const update = () => {
      setRenderPls(Date.now());
    };
    const timerID = setInterval(update, 60000);
    return () => clearInterval(timerID);
  }, [renderPls]);

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
              log={x}
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
