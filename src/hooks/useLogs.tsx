import { LogViewRow } from "../../database.types";
import { fetchAllUserLogs } from "../services/dbManagement";
import useSWR from "swr";

export function useLogs() {
  return useSWR<LogViewRow[], Error>(["currentUserLogs"], fetchAllUserLogs);
}
