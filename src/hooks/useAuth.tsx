import { useEffect, useState } from "react";

import { supabase } from "../services/dbManagement";

export function useAuth() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setStatus(session ? "authenticated" : "anonymous");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? "authenticated" : "anonymous");
    });

    return () => subscription.unsubscribe();
  }, []);

  return status;
}
