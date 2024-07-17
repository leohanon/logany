import { Context } from "@netlify/functions";

export default async (_req: Request, _context: Context) => {
  return new Response("Hi there!");
};
