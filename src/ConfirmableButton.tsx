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
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  return (
    <>
      {!isDeleteMode && (
        <IconButton onClick={() => setIsDeleteMode(true)} color={color}>
          <Icon fontSize="large" />
        </IconButton>
      )}
      {isDeleteMode && (
        <Stack direction={"row"} alignItems={"center"}>
          <ConfirmButtons
            onConfirm={() => {
              onClick();
              setIsDeleteMode(false);
            }}
            onCancel={() => setIsDeleteMode(false)}
          />
          <Icon fontSize="large" sx={{ width: "51px" }} />
        </Stack>
      )}
    </>
  );
}
