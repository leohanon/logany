import { supabase } from "./supabase";

async function signUpNewUser(email: string, password: string) {
  supabase.auth.signUp({
    email,
    password,
  });
}
