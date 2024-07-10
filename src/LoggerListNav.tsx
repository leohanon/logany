import "./App.css";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import EditIcon from "@mui/icons-material/Edit";

type LoggerListNavProps = {
  editMode: boolean;
  onToggleEditMode: () => void;
};

export function LoggerListNav({
  editMode,
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
              {editMode ? (
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
