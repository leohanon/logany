import { useEffect, useState } from "react";
import { Log } from "./LogTypes";
import { CreateLogger } from "./CreateLogger";
import { LoggerItem } from "./LoggerItemProps";
import { deleteLog } from "./dbManagement";

export function LoggerList() {
  const [loggerList, setLoggerList] = useState<Log[]>(() => {
    const logs = localStorage.getItem("LOGS");
    if (!logs) return [];
    return JSON.parse(logs);
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const logs = JSON.stringify(loggerList);
    localStorage.setItem("LOGS", logs);
  }, [loggerList]);

  const toggleEditMode = () => {
    setEditMode((oldMode) => {
      return !oldMode;
    });
  };

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
