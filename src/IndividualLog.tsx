import { useNavigate, useParams } from "react-router-dom";
import { getLogItems } from "./dbManagement";
import { useEffect, useState } from "react";
import { LogItem } from "./LogTypes";
import { LogItemDisplay } from "./LogItemDisplay";

export function IndividualLog() {
  const { logId } = useParams<{ logId: string }>();
  const [editMode, setEditMode] = useState(false);
  const [logItems, setLogItems] = useState<LogItem[]>([]);

  useEffect(() => {
    const fetchLogItems = async () => {
      try {
        const promise = getLogItems(logId ? logId : "");
        const items = await promise;
        setLogItems(items);
        console.log(logItems);
      } catch (error) {
        console.error("Failed to fetch log items:", error);
      }
    };

    fetchLogItems();
  }, []);

  const handleToggle = () => {
    setEditMode((oldMode) => !oldMode);
  };

  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/", { replace: true })}>Back</button>
      <button>add</button>
      <button onClick={handleToggle}>{editMode ? "save" : "edit"}</button>
      <ul>
        {logItems.map((x) => {
          return <LogItemDisplay key={x.id} logItem={x} editMode={editMode} />;
        })}
      </ul>
    </>
  );
}
