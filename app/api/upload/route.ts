import { NextResponse } from "next/server";
import sharp from "sharp";

import { getAdmin } from "@/lib/auth";
import { files, mediaUrl } from "@/lib/storage";

const MAX_BYTES = 20 * 1024 * 1024;
// Google Merchant Center requires product photos of at least 500 × 500 px from 2027.
const MIN_SIDE = 500;
const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

// A route handler rather than a Server Action: actions cap request bodies at
// 1MB, and product photos are routinely larger.
export async function POST(request: Request) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Not authorized." }, { status: 401 });

  const file = (await request.formData()).get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file uploaded." }, { status: 400 });

  const ext = EXTENSIONS[file.type];
  if (!ext) return NextResponse.json({ error: "Use a JPG, PNG, WebP or AVIF image." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Image must be under 20MB." }, { status: 400 });

  try {
    const { width = 0, height = 0 } = await sharp(Buffer.from(await file.arrayBuffer())).metadata();
    if (Math.min(width, height) < MIN_SIDE)
      return NextResponse.json({ error: `Image is ${width} × ${height} px. Use at least ${MIN_SIDE} × ${MIN_SIDE} px so it can appear in Google Shopping.` }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Image could not be read." }, { status: 400 });
  }

  // A fresh key per upload, so cached copies never go stale.
  const key = `uploads/${crypto.randomUUID()}.${ext}`;
  try {
    await files().upload(key, file, { contentType: file.type });
  } catch (error) {
    console.error("Upload to Neon Object Storage failed", error);
    return NextResponse.json({ error: "Upload failed — storage is unavailable." }, { status: 502 });
  }

  return NextResponse.json({ url: mediaUrl(key) });
}
