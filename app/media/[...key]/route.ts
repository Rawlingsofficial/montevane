import { files } from "@/lib/storage";

// Serves objects from the private bucket. Keys are immutable (a new upload
// gets a new key), so responses can be cached for a year.
export async function GET(_request: Request, { params }: { params: Promise<{ key: string[] }> }) {
  const key = (await params).key.join("/");
  if (!key.startsWith("uploads/") || key.includes("..")) return new Response("Not found", { status: 404 });

  try {
    const file = await files.download(key);
    return new Response(file.stream(), {
      headers: {
        "Content-Type": file.type || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
