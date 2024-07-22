import { fetchAllUserLogs } from "../services/dbManagement";
import { useCurrentUser } from "./useCurrentUser";
import useSWR from "swr";

export function useLogItems() {
  const { data: user } = useCurrentUser();
  const { data, error, isLoading } = useSWR(() => user?.id, fetchAllUserLogs);
  return {
    data,
    isLoading,
    error,
  };
}
