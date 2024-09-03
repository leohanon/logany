import { Box, Paper, Stack, Typography } from "@mui/material";

import { ConfirmableButton } from "./ui/ConfirmableButton";
import { DeleteButton } from "./ui/DeleteButton";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { LogViewRow } from "../../database.types";
import { TimeSince } from "../components/TimeSince";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.2 }}
    >
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: 50,
          }}
          onClick={() => navigate(`logs/${log.uuid}`, { replace: true })}
        >
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            {/* {isEditMode && (
              <Stack direction="row" spacing={1}>
                <Button
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
                </Button>
              </Stack>
            )} */}
            <Typography variant="h6" sx={{ paddingLeft: 1, fontSize: "large" }}>
              {log.name}
            </Typography>
            {!isEditMode && (
              <Typography sx={{ marginLeft: 1, fontSize: "medium" }}>
                <TimeSince
                  logItem={log}
                  isOunces={(log.name ?? "").toLowerCase().includes("feeding")}
                />
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
    </motion.div>
  );
}
