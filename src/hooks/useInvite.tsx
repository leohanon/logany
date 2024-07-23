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
  const logUuid = inviteDetails?.log_uuid;
  const {
    data: hasAccess,
    error: permissionError,
    isLoading: isAccessLoading,
  } = useSWR(
    user && logUuid ? [user.id, logUuid, "hasPermission"] : null,
    ([userUuid, logUuid]) => hasPermission(userUuid, logUuid),
  );

  const isLoading = isAccessLoading || isInviteDetailsLoading;
  const isError = inviteDetailsError || permissionError;

  return { inviteDetails, isError, isLoading, hasAccess };
}
