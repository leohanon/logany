import { useNavigate, useParams } from "react-router-dom";
import { getLogItems } from "./dbManagement";
import { useEffect, useState } from "react";
import { LogItem } from "./LogTypes";
import { LogItemDisplay } from "./LogItemDisplay";
import { useLoggerListContext } from "./LoggerListContext";
import { CreateLogger } from "./CreateLogger";

export function IndividualLog() {
  const { logId } = useParams<{ logId: string }>();
  const [editMode, setEditMode] = useState(false);
  const [logItems, setLogItems] = useState<LogItem[]>([]);
  const { updateUid } = useLoggerListContext();

  useEffect(() => {
    const fetchLogItems = async () => {
      try {
        const promise = getLogItems(logId ? logId : "");
        const items = await promise;
        setLogItems(items);
      } catch (error) {
        console.error("Failed to fetch log items:", error);
      }
    };

    fetchLogItems();
  }, [logId, logItems, updateUid]);

  const handleToggle = () => {
    setEditMode((oldMode) => !oldMode);
  };

  const { handleAddToLog } = useLoggerListContext();

  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/", { replace: true })}>Back</button>
      <button onClick={handleToggle}>{editMode ? "save" : "edit"}</button>
      <ul>
        {!editMode && (
          <CreateLogger
            onSubmit={(value: string) =>
              handleAddToLog(logId ? logId : "", value)
            }
          />
        )}
        {logItems.map((x) => {
          return <LogItemDisplay key={x.id} logItem={x} editMode={editMode} />;
        })}
      </ul>
    </>
  );
}
