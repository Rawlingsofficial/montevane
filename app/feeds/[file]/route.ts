import { gzipSync } from "node:zlib";

import { buildFeed, channelFiles, findChannel } from "@/lib/feeds/channels";

// Product feeds for every shopping channel, fetched on a schedule by each
// platform. Rebuilt hourly so new, sold and repriced pieces reach them without
// anyone uploading anything. Each is also offered gzipped (.gz).
export const dynamic = "force-static";
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return channelFiles().map((file) => ({ file }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const found = findChannel(file);
  if (!found) return new Response("Not found", { status: 404 });

  const body = await buildFeed(found.channel);
  if (found.gzip) {
    return new Response(new Uint8Array(gzipSync(body)), {
      headers: { "Content-Type": "application/gzip", "Content-Disposition": `inline; filename="${file}"` },
    });
  }
  return new Response(body, { headers: { "Content-Type": found.contentType } });
}
