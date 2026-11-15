import { adminEnabled, isAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  return Response.json(
    { authed: isAdmin(req), enabled: adminEnabled() },
    { headers: { "Cache-Control": "no-store" } }
  );
}
