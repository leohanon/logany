import { Button, Stack, Typography } from "@mui/material";
import { acceptInvite, supabase } from "../services/dbManagement";

import { useSearchParams } from "react-router-dom";

export default function AcceptInvite() {
  const [searchParams] = useSearchParams();
  const inviteUuid = searchParams.get("id");

  return (
    <Stack>
      <Typography>You've been invited to contribute to this log!</Typography>
      <Typography>{inviteUuid}</Typography>
      <Typography>
        To accept and see this log in your list, click below.
      </Typography>
      <Button onClick={() => (inviteUuid ? acceptInvite(inviteUuid) : null)}>
        Accept
      </Button>
    </Stack>
  );
}
