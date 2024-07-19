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
import { ConfirmableButton } from "./ui/ConfirmableButton";
import { DeleteButton } from "./ui/DeleteButton";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useLoggerListContext } from "../services/providers/LoggerListContext";
import { useNavigate } from "react-router-dom";

type LoggerItemProps = {
  value: string;
  logId: string;
  isEditMode: boolean;
  onDelete: () => void;
};
export function LoggerListItem({
  value,
  logId,
  isEditMode,
  onDelete,
}: LoggerItemProps) {
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
                  onClick={() => navigate(`logs/${logId}`, { replace: true })}
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
            <Typography sx={{ marginLeft: 1 }}>{value}</Typography>
          </Stack>
        </Box>
        <Box>
          {!isEditMode && (
            <ConfirmableButton
              onClick={() => handleAddToLog(logId, "")}
              Icon={ElectricBoltIcon}
            />
          )}
          {isEditMode && <DeleteButton onDelete={onDelete} />}
        </Box>
      </Paper>
    </>
  );
}
