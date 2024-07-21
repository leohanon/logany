import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { Paper, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { deleteLogItem, editLogItem } from "../services/dbManagement";

import { DeleteButton } from "./ui/DeleteButton";
import { LogItemRow } from "../../database.types";
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

  const handleDeleteLogItem = () => {
    deleteLogItem(created_at.toString());
  };

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
              editLogItem(created_at.toString(), {
                timestamp: newValue ? newValue.valueOf() : 0,
                id: newValue ? newValue.valueOf().toString() : "0",
                logId: logItem.uuid,
                note: logItem.note,
              });
            }}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: null,
            }}
          />
          <DeleteButton onDelete={handleDeleteLogItem} />
        </>
      )}
    </Paper>
  );
}
