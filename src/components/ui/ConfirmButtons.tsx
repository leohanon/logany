import { IconButton, Stack } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

type ConfirmButtonsProps = {
  onConfirm: () => void;
  onCancel: () => void;
};
export function ConfirmButtons({ onConfirm, onCancel }: ConfirmButtonsProps) {
  return (
    <Stack direction={"row"}>
      <IconButton onClick={onCancel}>
        <ClearIcon fontSize="large" />
      </IconButton>
      <IconButton type="submit" onClick={onConfirm}>
        <CheckIcon fontSize="large" />
      </IconButton>
    </Stack>
  );
}
