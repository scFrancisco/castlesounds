"use client";

/*
  Phone photos are often 5–15 MB. Before uploading, scale the image down so
  its long side is at most 2000px and re-encode as JPEG — fast pages, small
  volume, and it also normalises odd formats/orientation via the canvas.
*/
const MAX_SIDE = 2000;

async function downscale(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.85));
    return blob ?? file;
  } catch {
    return file; // browser couldn't decode it (e.g. HEIC on desktop) — let the server judge
  }
}

export async function uploadImage(file: File): Promise<string> {
  const blob = await downscale(file);
  const form = new FormData();
  const name = file.name.replace(/\.[^.]+$/, "") + (blob.type === "image/jpeg" ? ".jpg" : "");
  form.append("file", new File([blob], name, { type: blob.type || file.type }));
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Upload failed (${res.status})`);
  return data.url as string;
}
