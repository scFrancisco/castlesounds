import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";
import { isAdmin, sameOrigin } from "@/lib/auth";
import { UPLOAD_DIR } from "@/lib/store";

const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_BYTES = 12 * 1024 * 1024;

/** Check the file's first bytes really are a JPEG / PNG / WebP. */
function sniff(buf: Buffer): string | null {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.subarray(0, 4).toString() === "RIFF" && buf.subarray(8, 12).toString() === "WEBP") return "webp";
  return null;
}

export async function POST(req: Request) {
  if (!isAdmin(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!sameOrigin(req)) return Response.json({ error: "Bad origin" }, { status: 403 });

  let file: File | null = null;
  try {
    const form = await req.formData();
    const f = form.get("file");
    if (f instanceof File) file = f;
  } catch {}
  if (!file) return Response.json({ error: "No file" }, { status: 400 });
  if (!TYPES[file.type]) return Response.json({ error: "Only JPG, PNG or WebP images" }, { status: 400 });
  if (file.size > MAX_BYTES) return Response.json({ error: "Image too large (max 12 MB)" }, { status: 400 });

  const buf = Buffer.from(await file.arrayBuffer());
  const ext = sniff(buf);
  if (!ext) return Response.json({ error: "Not a valid image" }, { status: 400 });

  const name = `${Date.now().toString(36)}-${randomBytes(6).toString("hex")}.${ext}`;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), buf);
  return Response.json({ ok: true, url: `/media/${name}` });
}
