import { Context } from "@netlify/functions";
import { Database } from "../../database.types";
import { createClient } from "@supabase/supabase-js";

const project_url = Netlify.env.get("SUPABASE_PROJECT_URL");
const apiKey = Netlify.env.get("SUPABASE_API_KEY");
const supabase = createClient<Database>(project_url ?? "", apiKey ?? "");

export default async (_req: Request, _context: Context) => {
  const { error } = await supabase.from("logs").insert({ name: "testing" });

  if (error?.code == "200") {
    return new Response("Welcome!");
  }

  return new Response(error?.message, { status: 401 });
};
