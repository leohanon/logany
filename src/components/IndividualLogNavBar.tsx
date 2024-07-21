import { IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BaseNav } from "./BaseNav";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import EditIcon from "@mui/icons-material/Edit";
import { getLogDetails } from "../services/dbManagement";

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
  const [logName, setLogName] = useState("");

  useEffect(() => {
    getLogDetails(logId).then((x) => setLogName(x.data?.name ?? ""));
  }, [logId]);
  return (
    <BaseNav>
      <IconButton onClick={handleGoHome}>
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {logName}
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
