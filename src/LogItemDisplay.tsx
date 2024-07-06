import { RiDeleteBin6Line } from "react-icons/ri";
import { LogItem } from "./LogTypes";
import { formatDate } from "./helper";
import { deleteLogItem } from "./dbManagement";

type LogItemDisplayParams = {
  logItem: LogItem;
  editMode: boolean;
};
export function LogItemDisplay({ logItem, editMode }: LogItemDisplayParams) {
  const { timestamp, note } = logItem;

  const handleDeleteLogItem = () => {
    deleteLogItem(timestamp.toString());
  };

  return (
    <li className="liLog">
      {formatDate(timestamp)} - {note}
      {editMode && (
        <button className="liButton" onClick={handleDeleteLogItem}>
          <RiDeleteBin6Line className="icon" />
        </button>
      )}
    </li>
  );
}
