import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

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
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
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
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ height: 48 }} />
    </>
  );
}
