import { Button, Stack, Typography } from "@mui/material";

import { acceptInvite } from "../services/dbManagement";
import { useInvite } from "../hooks/useInvite";
import { useSearchParams } from "react-router-dom";

export default function AcceptInvite() {
  const [searchParams] = useSearchParams();
  const inviteUuid = searchParams.get("id");
  const { data, error, isLoading } = useInvite(inviteUuid);

  if (isLoading) {
    return <Typography>Loading</Typography>;
  }

  if (error) {
    return <Typography color="error">There is an error!</Typography>;
  }

  console.log("hello");

  return (
    <Stack>
      <Typography>
        You've been invited to contribute to the log "{data?.logs?.name}"!
      </Typography>
      <Typography>
        To accept and see this log in your list, click below.
      </Typography>
      <Button onClick={() => (inviteUuid ? acceptInvite(inviteUuid) : null)}>
        Accept
      </Button>
    </Stack>
  );
}
