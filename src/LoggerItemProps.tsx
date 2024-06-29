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
  const { handleQuickAddToLog } = useLoggerListContext();
  const navigate = useNavigate();
  return (
    <li>
      <button onClick={() => navigate(`logs/${logId}`, { replace: true })}>
        View
      </button>
      {value}
      <button onClick={() => handleQuickAddToLog(logId)}>Quick Add</button>
      <button>CustomAdd</button>
      {editMode && <button onClick={onDelete}>Delete</button>}
    </li>
  );
}
