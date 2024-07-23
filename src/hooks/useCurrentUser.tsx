import { supabase } from "../services/dbManagement";
import useSWR from "swr";

export function useCurrentUser() {
  const { data } = useSWR("user_id", () =>
    supabase.auth.getUser().then((x) => x.data.user),
  );
  return data;
}
