import { useNavigate } from "react-router-dom";
import { useLoggerListContext } from "./LoggerListContext";
import { CiViewList } from "react-icons/ci";
import { PiLightningBold } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

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
    <li className="liLog">
      <div className="liInternal">
        {!editMode && (
          <button
            className="viewButton"
            onClick={() => navigate(`logs/${logId}`, { replace: true })}
          >
            <CiViewList className="icon" />
          </button>
        )}
        {value}
      </div>
      <div className="liInternal">
        {!editMode && (
          <button className="customAddButton">
            <FiEdit className="icon" />
          </button>
        )}
        {!editMode && (
          <button
            className="liButton"
            onClick={() => handleAddToLog(logId, "")}
          >
            <PiLightningBold className="icon" />
          </button>
        )}
        {editMode && (
          <button className="liButton" onClick={onDelete}>
            <RiDeleteBin6Line className="icon" />
          </button>
        )}
      </div>
    </li>
  );
}
