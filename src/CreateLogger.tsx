import { Box, Button, IconButton, TextField } from "@mui/material";
import { FormEvent, useEffect, useRef, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

type CreateLoggerProps = {
  onSubmit: (name: string) => void;
};
export function CreateLogger({ onSubmit }: CreateLoggerProps) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setEditMode(true);
  };

  const handleSubmit = (event: FormEvent<Element>) => {
    event.preventDefault();
    onSubmit(name);
    setEditMode(false);
    setName("");
  };

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <Box sx={{ height: 72, display: "flex", alignItems: "stretch" }}>
      {!editMode && (
        <Button sx={{ fontSize: "medium" }} fullWidth onClick={handleClick}>
          + Create New
        </Button>
      )}
      {editMode && (
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", display: "flex", alignItems: "center" }}
        >
          <TextField
            inputRef={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <IconButton
            onClick={() => {
              setEditMode(false);
            }}
          >
            <ClearIcon fontSize="large" />
          </IconButton>
          <IconButton type="submit">
            <CheckIcon fontSize="large" />
          </IconButton>
        </form>
      )}
    </Box>
  );
}
