import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { Paper, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

import { DeleteButton } from "./ui/DeleteButton";
import { LogItemRow } from "../../database.types";
import { useLoggerListContext } from "../hooks/useLoggerListContext";
import { useState } from "react";

type LogItemDisplayParams = {
  logItem: LogItemRow;
  isEditMode: boolean;
};
export function IndividualLogItem({
  logItem,
  isEditMode,
}: LogItemDisplayParams) {
  const { created_at, note } = logItem;
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs(created_at));
  const { handleEditLogItem, handleDeleteLogItem } = useLoggerListContext();

  const dateFormat = "M/DD - h:mm A";

  return (
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
                note: logItem.note,
              });
            }}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: null,
            }}
          />
          <Typography>{note}</Typography>
          <DeleteButton onDelete={() => handleDeleteLogItem(logItem.uuid)} />
        </>
      )}
    </Paper>
  );
}
