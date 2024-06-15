import { useEffect, useState } from "react";
import { Log } from "./LogTypes";
import { CreateLogger } from "./CreateLogger";
import { LoggerItem } from "./LoggerItemProps";

export function LoggerList() {
  const [loggerList, setLoggerList] = useState<Log[]>(() => {
    const logs = localStorage.getItem("LOGS");
    if (!logs) return [];
    return JSON.parse(logs);
  });

  useEffect(() => {
    const logs = JSON.stringify(loggerList);
    localStorage.setItem("LOGS", logs);
  }, [loggerList]);

  const handleAddLogList = (name: string) => {
    const newLog = { id: crypto.randomUUID(), name: name };
    setLoggerList((oldList) => [...oldList, newLog]);
  };

  return (
    <ul>
      {loggerList.map((x) => {
        return (
          <LoggerItem key={x.id} value={x.name} logId={x.id} editMode={false} />
        );
      })}
      <CreateLogger onSubmit={handleAddLogList} />
    </ul>
  );
}
