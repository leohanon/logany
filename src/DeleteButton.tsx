import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";

type DeleteButtonProps = {
  onClick: () => void;
};
export function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <IconButton onClick={onClick} color="warning">
      <DeleteForeverIcon fontSize="large" />
    </IconButton>
  );
}
