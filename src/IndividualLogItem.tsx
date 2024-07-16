import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { Paper, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { deleteLogItem, editLogItem } from "./dbManagement";

import { DeleteButton } from "./DeleteButton";
import { LogItem } from "./LogTypes";
import { useState } from "react";

type LogItemDisplayParams = {
  logItem: LogItem;
  editMode: boolean;
};
export function IndividualLogItem({ logItem, editMode }: LogItemDisplayParams) {
  const { timestamp, note } = logItem;
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs(timestamp));

  const handleDeleteLogItem = () => {
    deleteLogItem(timestamp.toString());
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
      {!editMode && (
        <Typography>
          {dayjs(timestamp).format(dateFormat)} - {note}
        </Typography>
      )}
      {editMode && (
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
              editLogItem(timestamp.toString(), {
                timestamp: newValue ? newValue.valueOf() : 0,
                id: newValue ? newValue.valueOf().toString() : "0",
                logId: logItem.logId,
                note: logItem.note,
              });
            }}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: null,
            }}
          />
          <DeleteButton onClick={handleDeleteLogItem} />
        </>
      )}
    </Paper>
  );
}
