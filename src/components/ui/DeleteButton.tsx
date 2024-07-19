import { ConfirmableButton } from "./ConfirmableButton";
import { DeleteForever } from "@mui/icons-material";

export function DeleteButton({ onDelete }: { onDelete: () => void }) {
  return (
    <ConfirmableButton
      onClick={onDelete}
      Icon={DeleteForever}
      color="warning"
    />
  );
}
