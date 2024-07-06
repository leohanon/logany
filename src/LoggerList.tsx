import { useState } from "react";
import { CreateLogger } from "./CreateLogger";
import { LoggerItem } from "./LoggerItem";
import { deleteLog } from "./dbManagement";
import { useLoggerListContext } from "./LoggerListContext";
import { LoggerListNav } from "./LoggerListNav";

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
      <ul>
        {loggerList.map((x) => {
          return (
            <LoggerItem
              key={x.id}
              value={x.name}
              logId={x.id}
              onDelete={() => handleDelete(x.id)}
              editMode={editMode}
            />
          );
        })}
        {!editMode && <CreateLogger onSubmit={handleAddLogList} />}
      </ul>
    </>
  );
}
