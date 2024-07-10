import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import EditIcon from "@mui/icons-material/Edit";
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
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <IconButton onClick={handleGoHome}>
              <ArrowBackIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {logId && loggerList.find((x) => x.id == logId)?.name}
            </Typography>
            <IconButton onClick={handleToggle}>
              {editMode ? (
                <DoneOutlineIcon fontSize="large" />
              ) : (
                <EditIcon fontSize="large" />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ height: 64 }} />
    </>
  );
}
