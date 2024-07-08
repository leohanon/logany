import { BiEditAlt, BiSave } from "react-icons/bi";

import { IconContext } from "react-icons";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLoggerListContext } from "./LoggerListContext";

type LogNavBarProps = {
  logId: string;
  editMode: boolean;
  handleGoHome: () => void;
  handleToggle: () => void;
};
export function IndividualLogNavBar({
  logId,
  handleGoHome,
  handleToggle,
  editMode,
}: LogNavBarProps) {
  const { loggerList } = useLoggerListContext();

  return (
    <IconContext.Provider value={{ color: "white" }}>
      <div className="toolbar">
        <button className="editButton" onClick={handleGoHome}>
          <IoMdArrowRoundBack className="icon" />
        </button>
        {logId && loggerList.find((x) => x.id == logId)?.name}
        <button className="editButton" onClick={handleToggle}>
          {editMode ? (
            <BiSave className="icon" />
          ) : (
            <BiEditAlt className="icon" />
          )}
        </button>
      </div>
    </IconContext.Provider>
  );
}
