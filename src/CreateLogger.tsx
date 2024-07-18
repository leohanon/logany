import { Box, Button, TextField } from "@mui/material";
import { FormEvent, useEffect, useRef, useState } from "react";

import { ConfirmButtons } from "./ConfirmButtons";

type CreateLoggerProps = {
  onSubmit: (name: string) => void;
};
export function CreateLogger({ onSubmit }: CreateLoggerProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsEditMode(true);
  };

  const handleSubmit = (event: FormEvent<Element>) => {
    event.preventDefault();
    onSubmit(name);
    setIsEditMode(false);
    setName("");
  };

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <Box sx={{ height: 72, display: "flex", alignItems: "stretch" }}>
      {!isEditMode && (
        <Button sx={{ fontSize: "medium" }} fullWidth onClick={handleClick}>
          + Create New
        </Button>
      )}
      {isEditMode && (
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
          <ConfirmButtons
            onConfirm={() => {}}
            onCancel={() => {
              setIsEditMode(false);
              setName("");
            }}
          />
        </form>
      )}
    </Box>
  );
}
