import Image from "next/image";

import { asset } from "@/lib/images";
import { cn } from "@/lib/utils";

type AssetImageProps = {
  /** Asset base name in public/images/web_optimized (without extension). */
  base: string;
  alt: string;
  /** Applied to the wrapping box — put aspect-ratio / hover-scale classes here. */
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders a web-optimized WebP asset as a filled, cover-fit image inside a
 * relatively-positioned box. Fills its box with a cover-fit image:
 * the box takes the sizing/aspect classes and the image fills it.
 */
export function AssetImage({ base, alt, className, sizes = "100vw", priority = false }: AssetImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-[var(--ivory)]", className)}>
      <Image src={asset(base)} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
