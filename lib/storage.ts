import "server-only";

import { Files } from "files-sdk";
import { neon } from "files-sdk/neon";

// Neon Object Storage (bucket declared in neon.ts). The bucket is private, so
// photos are served through /media/<key> rather than linked directly.
// Endpoint, region and credentials come from the AWS_* vars `neon deploy` pulls.
export const BUCKET = "assets";

// Created on first use, not at import: the adapter throws when the AWS_* vars
// are absent, and importing must not break `next build` or unrelated pages.
let client: Files | undefined;
export function files(): Files {
  client ??= new Files({ adapter: neon({ bucket: BUCKET }) });
  return client;
}

export const mediaUrl = (key: string) => `/media/${key}`;
