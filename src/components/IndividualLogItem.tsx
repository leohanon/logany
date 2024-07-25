import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { Paper, TextField, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useRef, useState } from "react";

import { DeleteButton } from "./ui/DeleteButton";
import { LogItemRow } from "../../database.types";
import { motion } from "framer-motion";
import { useLoggerListContext } from "../hooks/useLoggerListContext";

type LogItemDisplayParams = {
  logItem: LogItemRow;
  isEditMode: boolean;
};
export function IndividualLogItem({
  logItem,
  isEditMode,
}: LogItemDisplayParams) {
  const { created_at, note } = logItem;
  const nameRef = useRef<HTMLInputElement>(null);
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs(created_at));
  const { handleEditLogItem, handleDeleteLogItem } = useLoggerListContext();

  const dateFormat = "M/DD - h:mm A";

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
        {!isEditMode && (
          <Typography>
            {dayjs(created_at).format(dateFormat)} - {note}
          </Typography>
        )}
        {isEditMode && (
          <>
            <DateTimePicker
              views={["month", "day", "hours", "minutes"]}
              value={dateValue}
              disableFuture
              openTo="hours"
              format={dateFormat}
              onChange={(newValue) => {
                setDateValue(newValue);
              }}
              onAccept={(newValue) => {
                handleEditLogItem({
                  created_at: newValue
                    ? newValue.toISOString().toLocaleLowerCase()
                    : dayjs().toISOString().toLocaleLowerCase(),
                  uuid: logItem.uuid,
                  log_uuid: logItem.log_uuid,
                });
              }}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: null,
              }}
            />
            <TextField
              defaultValue={note}
              onBlur={() => {
                const currentValue = nameRef.current?.value ?? "";
                handleEditLogItem({
                  uuid: logItem.uuid,
                  note: currentValue,
                  log_uuid: logItem.log_uuid,
                });
              }}
              inputRef={nameRef}
            />
            <DeleteButton
              onDelete={() =>
                handleDeleteLogItem(logItem.uuid, logItem.log_uuid)
              }
            />
          </>
        )}
      </Paper>
    </motion.div>
  );
}
