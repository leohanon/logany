import { AnimatePresence, motion } from "framer-motion";
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
      <Stack direction={"row"} alignItems={"center"}>
        <AnimatePresence>
          {isDeleteMode && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.1 }}
            >
              <ConfirmButtons
                onConfirm={() => {
                  onClick();
                  setIsDeleteMode(false);
                }}
                onCancel={() => setIsDeleteMode(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <IconButton onClick={() => setIsDeleteMode(true)} color={color}>
          <Icon fontSize="large" />
        </IconButton>
      </Stack>
    </>
  );
}
