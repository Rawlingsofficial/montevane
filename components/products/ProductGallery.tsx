"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "@/lib/utils";

type Img = { url: string; alt: string };
type Labels = { open: string; close: string; prev: string; next: string; show: string };

/**
 * Product photos: swipeable track (scroll-snap) with thumbnails; tapping a photo
 * opens a full-screen viewer where a click/tap zooms into that point.
 */
export function ProductGallery({ images, labels }: { images: Img[]; labels: Labels }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);

  const scrollTo = (i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: el.clientWidth * i, behavior: "smooth" });
  };

  return (
    <div>
      <div className="relative">
        <div
          ref={track}
          onScroll={(e) => {
            const el = e.currentTarget;
            setIndex(Math.round(el.scrollLeft / el.clientWidth));
          }}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <button
              key={img.url + i}
              type="button"
              onClick={() => setViewer(i)}
              aria-label={labels.open.replace("{n}", String(i + 1))}
              className="relative aspect-[4/5] w-full shrink-0 snap-center cursor-zoom-in bg-white"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                className="object-contain p-4"
              />
            </button>
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label={labels.prev}
              onClick={() => scrollTo(Math.max(0, index - 1))}
              disabled={index === 0}
              className="absolute top-1/2 left-2 hidden size-11 -translate-y-1/2 items-center justify-center bg-white/90 shadow-sm disabled:opacity-0 lg:flex"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label={labels.next}
              onClick={() => scrollTo(Math.min(images.length - 1, index + 1))}
              disabled={index === images.length - 1}
              className="absolute top-1/2 right-2 hidden size-11 -translate-y-1/2 items-center justify-center bg-white/90 shadow-sm disabled:opacity-0 lg:flex"
            >
              <ChevronRight className="size-5" />
            </button>
            {/* Dots on phones */}
            <div className="mt-3 flex justify-center gap-1.5 lg:hidden" aria-hidden="true">
              {images.map((_, i) => (
                <span key={i} className={cn("h-1.5 rounded-full transition-all", i === index ? "w-5 bg-foreground" : "w-1.5 bg-border")} />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 hidden grid-cols-6 gap-2 lg:grid">
          {images.map((img, i) => (
            <button
              key={img.url + i}
              type="button"
              aria-label={labels.show.replace("{n}", String(i + 1))}
              aria-current={i === index}
              onClick={() => scrollTo(i)}
              className={cn("relative aspect-square border bg-white transition-colors", i === index ? "border-foreground" : "border-border hover:border-foreground/40")}
            >
              <Image src={img.url} alt="" fill sizes="80px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}

      {viewer !== null && <Viewer images={images} start={viewer} labels={labels} onClose={() => setViewer(null)} />}
    </div>
  );
}

function Viewer({ images, start, labels, onClose }: { images: Img[]; start: number; labels: Labels; onClose: () => void }) {
  const [i, setI] = useState(start);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const go = (d: number) => {
    setZoom(null);
    setI((v) => (v + d + images.length) % images.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  });

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[70] flex flex-col bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <span className="text-xs tracking-[0.15em] text-muted-foreground">
          {i + 1} / {images.length}
        </span>
        <button type="button" aria-label={labels.close} onClick={onClose} autoFocus className="flex size-11 items-center justify-center">
          <X className="size-6" />
        </button>
      </div>
      <div
        className={cn("relative flex-1 overflow-hidden", zoom ? "cursor-zoom-out" : "cursor-zoom-in")}
        onClick={(e) => {
          if (zoom) return setZoom(null);
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
      >
        <Image
          src={images[i].url}
          alt={images[i].alt}
          fill
          sizes="100vw"
          className="object-contain transition-transform duration-300"
          style={zoom ? { transform: "scale(2.5)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
        />
      </div>
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-6 py-4">
          <button type="button" aria-label={labels.prev} onClick={() => go(-1)} className="flex size-12 items-center justify-center border border-border">
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" aria-label={labels.next} onClick={() => go(1)} className="flex size-12 items-center justify-center border border-border">
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
