import { useEffect, useState } from "react";

import { supabase } from "../services/dbManagement";

export function useAuth() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const newStatus = session ? "authenticated" : "anonymous";
      if (status != newStatus) setStatus(newStatus);
    });

    return () => subscription.unsubscribe();
  }, []);

  return status;
}
