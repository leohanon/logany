import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ConfirmableButton } from "./ConfirmableButton";
import { DeleteButton } from "./DeleteButton";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { Log } from "./LogTypes";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { TimeSince } from "./TimeSince";
import { useLoggerListContext } from "./LoggerListContext";
import { useNavigate } from "react-router-dom";

type LoggerItemProps = {
  log: Log;
  isEditMode: boolean;
  onDelete: () => void;
};
export function LoggerListItem({ log, isEditMode, onDelete }: LoggerItemProps) {
  const { handleAddToLog, handleMoveLogPosition } = useLoggerListContext();
  const navigate = useNavigate();
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
          height: 56,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            {!isEditMode && (
              <Tooltip title="View">
                <IconButton
                  onClick={() => navigate(`logs/${log.id}`, { replace: true })}
                >
                  <MenuOpenIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            )}
            {isEditMode && (
              <Stack direction="row" spacing={1}>
                <Button
                  onClick={() => {
                    handleMoveLogPosition(logId, -1);
                  }}
                  variant="outlined"
                  sx={{ padding: "5px", minWidth: 0 }}
                >
                  <ArrowDropUpIcon fontSize="large" />
                </Button>
                <Button
                  onClick={() => {
                    handleMoveLogPosition(logId, 1);
                  }}
                  variant="outlined"
                  sx={{ padding: "5px", minWidth: 0 }}
                >
                  <ArrowDropDownIcon fontSize="large" />
                </Button>
              </Stack>
            )}
            <Typography variant="h6" sx={{ marginLeft: 1, fontSize: "large" }}>
            {log.name}
          </Typography>
          {!isEditMode && (
            <Typography sx={{ marginLeft: 1, fontSize: "medium" }}>
              <TimeSince lastUpdate={log.lastUpdated} />
            </Typography>
          </Stack>
          )}
        </Box>
        <Box>
          {!isEditMode && (
            <ConfirmableButton
              onClick={() => handleAddToLog(log.id, "")}
              Icon={ElectricBoltIcon}
            />
          )}
          {isEditMode && <DeleteButton onDelete={onDelete} />}
        </Box>
      </Paper>
    </>
  );
}
