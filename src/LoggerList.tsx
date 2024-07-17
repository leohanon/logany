import { Button, Stack } from "@mui/material";

import { CreateLogger } from "./CreateLogger";
import { LoggerListItem } from "./LoggerListItem";
import { LoggerListNav } from "./LoggerListNav";
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

  const handleClick = () => {
    fetch("/.netlify/functions/create-new-log").then((x) => console.log(x));
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
        <Button onClick={handleClick}>hello</Button>
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
