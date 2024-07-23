import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";

type ConfirmButtonsProps = {
  onConfirm: () => void;
  onCancel: () => void;
};
export function ConfirmButtons({ onConfirm, onCancel }: ConfirmButtonsProps) {
  return (
    <>
      <IconButton onClick={onCancel}>
        <ClearIcon fontSize="large" />
      </IconButton>
      <IconButton type="submit" onClick={onConfirm}>
        <CheckIcon fontSize="large" />
      </IconButton>
    </>
  );
}
