import { IconButton, Typography } from "@mui/material";

import { BaseNav } from "./BaseNav";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import EditIcon from "@mui/icons-material/Edit";

type LoggerListNavProps = {
  isEditMode: boolean;
  onToggleEditMode: () => void;
};

export function LoggerListNav({
  isEditMode,
  onToggleEditMode,
}: LoggerListNavProps) {
  return (
    <BaseNav>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Logg
      </Typography>
      <IconButton onClick={onToggleEditMode}>
        {isEditMode ? (
          <DoneOutlineIcon fontSize="large" />
        ) : (
          <EditIcon fontSize="large" />
        )}
      </IconButton>
    </BaseNav>
  );
}
