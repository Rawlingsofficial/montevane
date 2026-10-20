import "server-only";

import { Files } from "files-sdk";
import { neon } from "files-sdk/neon";

// Neon Object Storage (bucket declared in neon.ts). The bucket is private, so
// photos are served through /media/<key> rather than linked directly.
// Endpoint, region and credentials come from the AWS_* vars `neon deploy` pulls.
export const BUCKET = "assets";

export const files = new Files({ adapter: neon({ bucket: BUCKET }) });

export const mediaUrl = (key: string) => `/media/${key}`;
