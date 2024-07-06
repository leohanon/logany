import { useNavigate, useParams } from "react-router-dom";
import { getLogItems } from "./dbManagement";
import { useEffect, useState } from "react";
import { LogItem } from "./LogTypes";
import { LogItemDisplay } from "./LogItemDisplay";
import { useLoggerListContext } from "./LoggerListContext";
import { CreateLogger } from "./CreateLogger";
import { BiEditAlt, BiSave } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";

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

  const { handleAddToLog, setActiveLogId } = useLoggerListContext();

  useEffect(() => {
    setActiveLogId(logId ? logId : "");
  }, [logId, setActiveLogId]);

  const navigate = useNavigate();

  return (
    <>
      <div className="toolbar">
        <button
          className="editButton"
          onClick={() => navigate("/", { replace: true })}
        >
          <IoMdArrowRoundBack className="icon" />
        </button>
        <button className="editButton" onClick={handleToggle}>
          {editMode ? (
            <BiSave className="icon" />
          ) : (
            <BiEditAlt className="icon" />
          )}
        </button>
      </div>
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
