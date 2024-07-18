import { Context } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

export default async (_req: Request, _context: Context) => {
  const project_url = Netlify.env.get("SUPABASE_PROJECT_URL");
  const apiKey = Netlify.env.get("SUPABASE_API_KEY");

  if (project_url == undefined) {
    return new Response("Supabase project URL is undefined", { status: 401 });
  }
  if (apiKey == undefined) {
    return new Response("Supabase API key is undefined", { status: 401 });
  }
  const supabase = createClient<Database>(project_url, apiKey);

  const { error } = await supabase.from("logs").insert({ name: "testing" });

  if (error?.code == "200") {
    return new Response("Welcome!");
  }

  return new Response(error?.message, { status: 401 });
};
