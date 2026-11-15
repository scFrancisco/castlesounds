import { isAdmin, sameOrigin } from "@/lib/auth";
import { readConfig, writeConfig } from "@/lib/store";
import { siteConfigSchema } from "@/lib/schema";
import type { SiteConfig } from "@/data/siteConfig";

const noStore = { "Cache-Control": "no-store" };

export async function GET(req: Request) {
  if (!isAdmin(req)) return Response.json({ error: "Unauthorized" }, { status: 401, headers: noStore });
  return Response.json(await readConfig(), { headers: noStore });
}

export async function PUT(req: Request) {
  if (!isAdmin(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!sameOrigin(req)) return Response.json({ error: "Bad origin" }, { status: 403 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = siteConfigSchema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return Response.json(
      { error: `${issue.path.join(" › ")}: ${issue.message}` },
      { status: 400 }
    );
  }

  await writeConfig(parsed.data as SiteConfig);
  return Response.json({ ok: true, savedAt: new Date().toISOString() });
}
