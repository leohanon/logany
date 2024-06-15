import { addLogItem } from "./dbManagement";

type LoggerItemProps = {
  value: string;
  logId: string;
  editMode: boolean;
};
export function LoggerItem({ value, logId, editMode }: LoggerItemProps) {
  const handleQuickAdd = () => {
    const logItem = {
      id: Date.now().toString(),
      logId: logId,
      timestamp: Date.now(),
      note: "",
    };
    addLogItem(logItem);
  };

  return (
    <li>
      <button>View</button>
      {value}
      <button onClick={handleQuickAdd}>Quick Add</button>
      <button>CustomAdd</button>
      {editMode && <button>Delete</button>}
    </li>
  );
}
