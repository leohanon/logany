import { useState } from "react";
import { CreateLogger } from "./CreateLogger";
import { LoggerItem } from "./LoggerItemProps";
import { deleteLog } from "./dbManagement";
import { useLoggerListContext } from "./LoggerListContext";

export function LoggerList() {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((oldMode) => {
      return !oldMode;
    });
  };

  const [loggerList, setLoggerList] = useLoggerListContext();

  const handleAddLogList = (name: string) => {
    const newLog = { id: crypto.randomUUID(), name: name };
    setLoggerList((oldList) => [...oldList, newLog]);
  };

  const handleDelete = (id: string) => {
    setLoggerList((oldList) => oldList.filter((x) => x.id != id));
    deleteLog(id);
  };

  return (
    <>
      <button onClick={toggleEditMode}>{editMode ? "Save" : "Edit"}</button>
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
        <CreateLogger onSubmit={handleAddLogList} />
      </ul>
    </>
  );
}
