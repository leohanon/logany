import { useNavigate } from "react-router-dom";
import { useLoggerListContext } from "./LoggerListContext";

type LoggerItemProps = {
  value: string;
  logId: string;
  editMode: boolean;
  onDelete: () => void;
};
export function LoggerItem({
  value,
  logId,
  editMode,
  onDelete,
}: LoggerItemProps) {
  const { handleAddToLog } = useLoggerListContext();
  const navigate = useNavigate();
  return (
    <li>
      {!editMode && (
        <button onClick={() => navigate(`logs/${logId}`, { replace: true })}>
          View
        </button>
      )}
      {value}
      {!editMode && (
        <button onClick={() => handleAddToLog(logId, "")}>Quick Add</button>
      )}
      {!editMode && <button>CustomAdd</button>}
      {editMode && <button onClick={onDelete}>Delete</button>}
    </li>
  );
}
