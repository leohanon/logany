import { IconButton, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BaseNav } from "./BaseNav";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import EditIcon from "@mui/icons-material/Edit";
import { ShareModal } from "./ShareModal";
import { useLogDetails } from "../hooks/useLogDetails";

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
  const logName = useLogDetails(logId);
  return (
    <BaseNav>
      <IconButton onClick={handleGoHome}>
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {logName?.data?.name}
      </Typography>
      <ShareModal logUuid={logId} />
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
