import Image from "next/image";

import type { Cover } from "@/lib/journal/media";
import { cn } from "@/lib/utils";

/** A post's cover: product photos sit whole on white; editorial photos fill the box. */
export function CoverImage({ cover, className, sizes, priority = false }: { cover: Cover; className?: string; sizes: string; priority?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden", cover.product ? "bg-white" : "bg-[var(--ivory)]", className)}>
      <Image
        src={cover.url}
        alt={cover.alt}
        fill
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={cover.product ? "object-contain p-6 sm:p-8" : "object-cover"}
      />
    </div>
  );
}
