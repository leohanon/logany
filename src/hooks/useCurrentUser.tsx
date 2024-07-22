import { supabase } from "../services/dbManagement";
import useSWR from "swr";

export function useCurrentUser() {
  return useSWR("user_id", () =>
    supabase.auth.getUser().then((x) => x.data.user),
  );
}
