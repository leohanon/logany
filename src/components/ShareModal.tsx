import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import IosShareIcon from "@mui/icons-material/IosShare";
import { createInviteCode } from "../services/dbManagement";
import { generateInviteLink } from "../utils/helper";
import { useState } from "react";

const style = {
  position: "absolute" as const,
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
};

type ShareModalProps = {
  logUuid: string;
};

export function ShareModal({ logUuid }: ShareModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const text = new ClipboardItem({
        "text/plain": createInviteCode(logUuid)
          .then((x) => generateInviteLink(x))
          .then((text) => new Blob([text], { type: "text/plain" })),
      });

      await navigator.clipboard.write([text]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <IosShareIcon fontSize="large" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Share Log
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Create an <b>invite link</b> to let others add and edit log items.
            (one per person)
          </Typography>
          <Stack
            sx={{ mt: 2 }}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <TextField defaultValue="mylog.logger.app?log=..." disabled />
            <Box sx={{ minWidth: 80, width: 100 }}>
              {!copied && <Button onClick={handleCopy}>Create Link</Button>}
              {copied && (
                <Typography
                  sx={{ minWidth: 64 }}
                  textAlign={"center"}
                  color="Highlight"
                >
                  Copied!
                </Typography>
              )}
            </Box>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
