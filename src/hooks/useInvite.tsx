import { getInviteDetails } from "../services/dbManagement";
import useSWR from "swr";

export function useInvite(inviteUuid: string | null) {
  const { data, error, isLoading } = useSWR(inviteUuid, getInviteDetails);
  return { data, error, isLoading };
}
