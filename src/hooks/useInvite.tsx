import { getInviteDetails, hasPermission } from "../services/dbManagement";

import { useCurrentUser } from "./useCurrentUser";
import useSWR from "swr";

export function useInvite(inviteUuid: string | null) {
  const {
    data: inviteDetails,
    error: inviteDetailsError,
    isLoading: isInviteDetailsLoading,
  } = useSWR(inviteUuid, getInviteDetails);
  const user = useCurrentUser();
  const {
    data: hasAccess,
    error: permissionError,
    isLoading: isAccessLoading,
  } = useSWR(
    user && inviteDetails?.log_uuid
      ? [user.id, inviteDetails.log_uuid, "hasPermission"]
      : null,
    ([user, logUuid]) => hasPermission(user, logUuid),
  );

  const isLoading = isAccessLoading || isInviteDetailsLoading;
  const isError = inviteDetailsError || permissionError;

  console.log("test");

  return { inviteDetails, isError, isLoading, hasAccess };
}
