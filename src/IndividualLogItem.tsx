import { LogItem } from "./LogTypes";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteLogItem } from "./dbManagement";
import { formatDate } from "./helper";

type LogItemDisplayParams = {
  logItem: LogItem;
  editMode: boolean;
};
export function IndividualLogItem({ logItem, editMode }: LogItemDisplayParams) {
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
