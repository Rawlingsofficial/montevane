import Image from "next/image";

import { LOGO } from "@/lib/images";
import { cn } from "@/lib/utils";

// Wordmark is black line-art on transparency. `light` inverts it to white for
// dark backgrounds (transparent hero header, dark footer).
export function Logo({ light = false, className, height = 22 }: { light?: boolean; className?: string; height?: number }) {
  return (
    <Image
      src={LOGO.wordmark}
      alt="Montévane"
      width={Math.round((821 / 131) * height)}
      height={height}
      priority
      className={cn("h-auto w-auto object-contain", light && "brightness-0 invert", className)}
      style={{ height }}
    />
  );
}
