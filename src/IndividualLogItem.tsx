import { Paper, Typography } from "@mui/material";

import { DeleteButton } from "./DeleteButton";
import { LogItem } from "./LogTypes";
import { deleteLogItem } from "./dbManagement";
import { formatDate } from "./helper";

type LogItemDisplayParams = {
  logItem: LogItem;
  editMode: boolean;
};
export function IndividualLogItem({ logItem, editMode }: LogItemDisplayParams) {
  const { timestamp, note } = logItem;

  const handleDeleteLogItem = () => {
    deleteLogItem(timestamp.toString());
  };

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
      <Typography>
        {formatDate(timestamp)} - {note}
      </Typography>
      {editMode && <DeleteButton onDelete={handleDeleteLogItem} />}
    </Paper>
  );
}
