import { IconButton, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BaseNav } from "./BaseNav";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useLoggerListContext } from "../hooks/useLoggerListContext";

type LogNavBarProps = {
  logId: string;
  isEditMode: boolean;
  handleGoHome: () => void;
  handleToggle: () => void;
};
export function IndividualLogNavBar({
  logId,
  handleGoHome,
  handleToggle,
  isEditMode: isEditMode,
}: LogNavBarProps) {
  const { loggerList } = useLoggerListContext();

  return (
    <BaseNav>
      <IconButton onClick={handleGoHome}>
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {logId && loggerList.find((x) => x.id == logId)?.name}
      </Typography>
      <IconButton onClick={handleToggle}>
        {isEditMode ? (
          <DoneOutlineIcon fontSize="large" />
        ) : (
          <EditIcon fontSize="large" />
        )}
      </IconButton>
    </BaseNav>
  );
}
