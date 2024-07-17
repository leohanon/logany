import { Context } from "@netlify/functions";

export default async (_req: Request, _context: Context) => {
  const project_url = Netlify.env.get("SUPABASE_PROJECT_URL");

  return new Response(project_url);
};
