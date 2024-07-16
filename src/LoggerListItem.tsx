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
import { DeleteButton } from "./DeleteButton";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Padding } from "@mui/icons-material";
import { useLoggerListContext } from "./LoggerListContext";
import { useNavigate } from "react-router-dom";

type LoggerItemProps = {
  value: string;
  logId: string;
  editMode: boolean;
  onDelete: () => void;
};
export function LoggerListItem({
  value,
  logId,
  editMode,
  onDelete,
}: LoggerItemProps) {
  const { handleAddToLog } = useLoggerListContext();
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
            {!editMode && (
              <Tooltip title="View">
                <IconButton
                  onClick={() => navigate(`logs/${logId}`, { replace: true })}
                >
                  <MenuOpenIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            )}
            {editMode && (
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" sx={{ padding: "5px", minWidth: 0 }}>
                  <ArrowDropUpIcon fontSize="large" />
                </Button>
                <Button variant="outlined" sx={{ padding: "5px", minWidth: 0 }}>
                  <ArrowDropDownIcon fontSize="large" />
                </Button>
              </Stack>
            )}
            <Typography sx={{ marginLeft: 1 }}>{value}</Typography>
          </Stack>
        </Box>
        <Box>
          {/* {!editMode && (
            <button className="customAddButton">
              <FiEdit className="icon" />
            </button>
          )} */}
          {!editMode && (
            <IconButton onClick={() => handleAddToLog(logId, "")}>
              <ElectricBoltIcon fontSize="large" />
            </IconButton>
          )}
          {editMode && <DeleteButton onClick={onDelete} />}
        </Box>
      </Paper>
    </>
  );
}
