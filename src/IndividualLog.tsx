import { useNavigate, useParams } from "react-router-dom";
import { getLogItems } from "./dbManagement";
import { useEffect, useState } from "react";
import { LogItem } from "./LogTypes";
import { LogItemDisplay } from "./LogItemDisplay";
import { useLoggerListContext } from "./LoggerListContext";
import { CreateLogger } from "./CreateLogger";
import { IndividualLogNavBar } from "./IndividualLogNavBar";

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
  const navigate = useNavigate();
  const handleGoHome = () => navigate("/", { replace: true });

  const { handleAddToLog, setActiveLogId } = useLoggerListContext();

  useEffect(() => {
    setActiveLogId(logId ? logId : "");
  }, [logId, setActiveLogId]);

  return (
    <>
      <IndividualLogNavBar
        logId={logId ? logId : ""}
        editMode={editMode}
        handleGoHome={handleGoHome}
        handleToggle={handleToggle}
      />
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
