import { getInviteDetails, hasPermission } from "../services/dbManagement";

import { useCurrentUser } from "./useCurrentUser";
import useSWR from "swr";

export function useInvite(inviteUuid: string | null) {
  const user = useCurrentUser();
  const { data: hasAccess, isLoading: isAccessLoading } = useSWR(
    user ? [user.id, "hasPermission"] : null,
    ([user]) => hasPermission(user),
  );

  const { data, error, isLoading } = useSWR(
    isAccessLoading ? null : inviteUuid,
    getInviteDetails,
  );
  return { data, error, isLoading, hasAccess };
}
