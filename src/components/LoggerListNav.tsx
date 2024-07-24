import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { LoggedOutNav } from "./LoggedOutNav";

type LoggerListNavProps = {
  isEditMode: boolean;
  onToggleEditMode: () => void;
};

export function LoggerListNav({
  isEditMode,
  onToggleEditMode,
}: LoggerListNavProps) {
  return (
    <LoggedOutNav>
      <IconButton onClick={onToggleEditMode}>
        {isEditMode ? (
          <DoneOutlineIcon fontSize="large" />
        ) : (
          <EditIcon fontSize="large" />
        )}
      </IconButton>
    </LoggedOutNav>
  );
}
