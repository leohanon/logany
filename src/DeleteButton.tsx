import { IconButton, Stack } from "@mui/material";

import { ConfirmButtons } from "./ConfirmButtons";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";

type DeleteButtonProps = {
  onClick: () => void;
};
export function DeleteButton({ onClick }: DeleteButtonProps) {
  const [deleteMode, setDeleteMode] = useState(false);
  return (
    <>
      {!deleteMode && (
        <IconButton onClick={() => setDeleteMode(true)} color="warning">
          <DeleteForeverIcon fontSize="large" />
        </IconButton>
      )}
      {deleteMode && (
        <Stack direction={"row"} alignItems={"center"}>
          <ConfirmButtons
            onConfirm={() => {
              onClick();
              setDeleteMode(false);
            }}
            onCancel={() => setDeleteMode(false)}
          />
          <DeleteForeverIcon fontSize="large" sx={{ width: "51px" }} />
        </Stack>
      )}
    </>
  );
}
