// import { useCommandBar } from "./useCommandbar";
import { useEffect, useState } from "react";

import { Auth } from "@supabase/auth-ui-react";
import { Outlet } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../services/supabase";

export function MainMenu() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return <Outlet></Outlet>;
  }
}
