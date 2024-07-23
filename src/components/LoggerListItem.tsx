import {
  Box,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { ConfirmableButton } from "./ui/ConfirmableButton";
import { DeleteButton } from "./ui/DeleteButton";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { LogViewRow } from "../../database.types";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { TimeSince } from "../components/TimeSince";
import dayjs from "dayjs";
import { useLoggerListContext } from "../hooks/useLoggerListContext";
import { useNavigate } from "react-router-dom";

type LoggerItemProps = {
  log: LogViewRow;
  isEditMode: boolean;
  onDelete: () => void;
};
export function LoggerListItem({ log, isEditMode, onDelete }: LoggerItemProps) {
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
            {!isEditMode && (
              <Tooltip title="View">
                <IconButton
                  onClick={() =>
                    navigate(`logs/${log.uuid}`, { replace: true })
                  }
                >
                  <MenuOpenIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            )}
            {isEditMode && (
              <Stack direction="row" spacing={1}>
                {/* <Button
                  onClick={() => {
                    handleMoveLogPosition(log.id, -1);
                  }}
                  variant="outlined"
                  sx={{ padding: "5px", minWidth: 0 }}
                >
                  <ArrowDropUpIcon fontSize="large" />
                </Button>
                <Button
                  onClick={() => {
                    handleMoveLogPosition(log.id, 1);
                  }}
                  variant="outlined"
                  sx={{ padding: "5px", minWidth: 0 }}
                >
                  <ArrowDropDownIcon fontSize="large" />
                </Button> */}
              </Stack>
            )}
            <Typography variant="h6" sx={{ marginLeft: 1, fontSize: "large" }}>
              {log.name}
            </Typography>
            {!isEditMode && (
              <Typography sx={{ marginLeft: 1, fontSize: "medium" }}>
                <TimeSince lastUpdate={dayjs(log.last_updated_at).valueOf()} />
              </Typography>
            )}
          </Stack>
        </Box>
        <Box>
          {!isEditMode && (
            <ConfirmableButton
              onClick={() => handleAddToLog(log.uuid ?? "", "")}
              Icon={ElectricBoltIcon}
            />
          )}
          {isEditMode && <DeleteButton onDelete={onDelete} />}
        </Box>
      </Paper>
    </>
  );
}
