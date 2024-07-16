import { IconButton, Stack } from "@mui/material";

import { ConfirmButtons } from "./ConfirmButtons";
import { useState } from "react";

type ConfirmableButtonProps = {
  onClick: () => void;
  Icon: React.ElementType;
  color?:
    | "default"
    | "inherit"
    | "error"
    | "warning"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | undefined;
};
export function ConfirmableButton({
  onClick,
  Icon,
  color,
}: ConfirmableButtonProps) {
  const [deleteMode, setDeleteMode] = useState(false);
  return (
    <>
      {!deleteMode && (
        <IconButton onClick={() => setDeleteMode(true)} color={color}>
          <Icon fontSize="large" />
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
          <Icon fontSize="large" sx={{ width: "51px" }} />
        </Stack>
      )}
    </>
  );
}
