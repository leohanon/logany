import { BiEditAlt, BiSave } from "react-icons/bi";
import "./App.css";

type LoggerListNavProps = {
  editMode: boolean;
  onToggleEditMode: () => void;
};

export function LoggerListNav({
  editMode,
  onToggleEditMode,
}: LoggerListNavProps) {
  return (
    <div className="toolbar">
      <div>Logg</div>
      <button className="editButton" onClick={onToggleEditMode}>
        {editMode ? (
          <BiSave className="icon" />
        ) : (
          <BiEditAlt className="icon" />
        )}
      </button>
    </div>
  );
}
