import { NextResponse } from "next/server";

import { getAdmin } from "@/lib/auth";
import { files, mediaUrl } from "@/lib/storage";

const MAX_BYTES = 20 * 1024 * 1024;
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
