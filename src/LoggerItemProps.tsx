import { useNavigate } from "react-router-dom";
import { addLogItem } from "./dbManagement";

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
  const handleQuickAdd = () => {
    const logItem = {
      id: Date.now().toString(),
      logId: logId,
      timestamp: Date.now(),
      note: "",
    };
    addLogItem(logItem);
  };
  const navigate = useNavigate();
  return (
    <li>
      <button onClick={() => navigate(`/${logId}`, { replace: true })}>
        View
      </button>
      {value}
      <button onClick={handleQuickAdd}>Quick Add</button>
      <button>CustomAdd</button>
      {editMode && <button onClick={onDelete}>Delete</button>}
    </li>
  );
}
