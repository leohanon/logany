import { getLogDetails } from "../services/dbManagement";
import useSWR from "swr";

export function useLogDetails(logUuid: string | undefined) {
  const { data } = useSWR(
    () => (logUuid ? [logUuid, "details"] : null),
    ([logUuid]) => getLogDetails(logUuid),
  );
  return data;
}
