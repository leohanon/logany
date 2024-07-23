import { getLogItems } from "../services/dbManagement";
import useSWR from "swr";

export function useLogItems(logUuid: string | undefined) {
  const { data, error, isLoading } = useSWR(logUuid, getLogItems);
  return {
    data,
    isLoading,
    error,
  };
}
