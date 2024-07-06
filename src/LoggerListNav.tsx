import { BiEditAlt, BiSave } from "react-icons/bi";
import "./App.css";
import { IconContext } from "react-icons";

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
      <div className="logo">Logg</div>
      <button className="editButton" onClick={onToggleEditMode}>
        <IconContext.Provider value={{ color: "white" }}>
          {editMode ? (
            <BiSave className="icon" />
          ) : (
            <BiEditAlt className="icon" />
          )}
        </IconContext.Provider>
      </button>
    </div>
  );
}
