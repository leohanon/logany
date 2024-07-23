import { fetchAllUserLogs } from "../services/dbManagement";
import { useCurrentUser } from "./useCurrentUser";
import useSWR from "swr";

export function useLogs() {
  const user = useCurrentUser();
  return useSWR(user?.id, fetchAllUserLogs);
}
