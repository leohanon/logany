import { Box, Button, Stack, Typography } from "@mui/material";
import { Navigate, useSearchParams } from "react-router-dom";

import { LoggedOutNav } from "../components/LoggedOutNav";
import { acceptInvite } from "../services/dbManagement";
import { useInvite } from "../hooks/useInvite";

export default function AcceptInvite() {
  const [searchParams] = useSearchParams();
  const inviteUuid = searchParams.get("id");
  const { data, error, isLoading } = useInvite(inviteUuid);

  if (isLoading) {
    return <Typography>Loading</Typography>;
  }

  if (error) {
    console.error(error);
    return <Typography color="error">There is an error!</Typography>;
  }

  if (data?.hasPermission) {
    return <Navigate to={`/logs/${data?.log_uuid}`} replace />;
  }

  return (
    <>
      <LoggedOutNav />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Stack sx={{ width: "80%", maxWidth: "500px" }} spacing={1}>
          <Typography variant="h4">You're invited!</Typography>
          <Typography>
            You've been invited to contribute to the log "{data?.logs?.name}"!
          </Typography>
          <Typography>
            To accept and see this log in your list, click below.
          </Typography>
          <Button
            onClick={() => (inviteUuid ? acceptInvite(inviteUuid) : null)}
          >
            Accept
          </Button>
        </Stack>
      </Box>
    </>
  );
}
