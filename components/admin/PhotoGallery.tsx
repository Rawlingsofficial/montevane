"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImagePlus, Loader2, Star, X } from "lucide-react";

import { cn } from "@/lib/utils";

const MAX_BYTES = 20 * 1024 * 1024;
const PARALLEL_UPLOADS = 3;

type Pending = { id: string; name: string; error?: string };

async function upload(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Not an image");
  if (file.size > MAX_BYTES) throw new Error("Over 20MB");
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body });
  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !data.url) throw new Error(data.error ?? "Upload failed");
  return data.url;
}

/**
 * All product photos in one place: drop or pick many at once, drag to
 * reorder. The first photo is the main image on the shop and in Google.
 */
export function PhotoGallery({ images, onChange }: { images: string[]; onChange: (images: string[]) => void }) {
  const [pending, setPending] = useState<Pending[]>([]);
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dropActive, setDropActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // Uploads finish out of order; the ref always holds the latest list.
  const imagesRef = useRef(images);
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  async function addFiles(fileList: FileList | File[]) {
    const files = [...fileList].filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;
    const jobs = files.map((file) => ({ id: crypto.randomUUID(), file }));
    setPending((p) => [...p, ...jobs.map((j) => ({ id: j.id, name: j.file.name }))]);

    // Keep the chosen order: results are slotted in by index once all settle.
    const results: (string | null)[] = new Array(jobs.length).fill(null);
    let next = 0;
    async function worker() {
      while (next < jobs.length) {
        const i = next++;
        try {
          results[i] = await upload(jobs[i].file);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Upload failed";
          setPending((p) => p.map((x) => (x.id === jobs[i].id ? { ...x, error: message } : x)));
        }
      }
    }
    await Promise.all(Array.from({ length: Math.min(PARALLEL_UPLOADS, jobs.length) }, worker));
    const done = new Set(jobs.filter((_, i) => results[i]).map((j) => j.id));
    setPending((p) => p.filter((x) => !done.has(x.id)));
    onChange([...imagesRef.current, ...results.filter((u): u is string => Boolean(u))]);
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= images.length || from === to) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          if (dragFrom !== null) return;
          e.preventDefault();
          setDropActive(true);
        }}
        onDragLeave={() => setDropActive(false)}
        onDrop={(e) => {
          if (dragFrom !== null) return;
          e.preventDefault();
          setDropActive(false);
          void addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-border bg-muted/40 px-6 py-10 text-center transition-colors hover:border-[var(--gold)]",
          dropActive && "border-[var(--gold)] bg-[var(--gold)]/10"
        )}
      >
        <ImagePlus className="size-6 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm">Drop photos here or click to choose — select several at once</p>
        <p className="text-xs text-muted-foreground">JPG, PNG, WebP or AVIF · up to 20MB each · first photo = main image</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) void addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {(images.length > 0 || pending.length > 0) && (
        <ul className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {images.map((url, i) => (
            <li
              key={url}
              draggable
              onDragStart={() => setDragFrom(i)}
              onDragEnd={() => setDragFrom(null)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (dragFrom !== null) move(dragFrom, i);
                setDragFrom(null);
              }}
              className={cn(
                "group relative aspect-square cursor-grab overflow-hidden border bg-muted/40 active:cursor-grabbing",
                i === 0 ? "border-[var(--gold)] ring-1 ring-[var(--gold)]" : "border-border",
                dragFrom === i && "opacity-40"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="pointer-events-none h-full w-full object-cover" />
              <span
                className={cn(
                  "absolute top-1.5 left-1.5 px-1.5 py-0.5 text-[10px] tracking-[0.1em] uppercase",
                  i === 0 ? "bg-[var(--gold)] text-black" : "bg-black/60 text-white"
                )}
              >
                {i === 0 ? "Main" : i + 1}
              </span>
              <button
                type="button"
                aria-label="Remove photo"
                onClick={() => onChange(images.filter((_, j) => j !== i))}
                className="absolute top-1.5 right-1.5 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
              >
                <X className="size-3.5" />
              </button>
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/60 p-1 text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                <button type="button" aria-label="Move left" disabled={i === 0} onClick={() => move(i, i - 1)} className="p-1 disabled:opacity-30">
                  <ChevronLeft className="size-4" />
                </button>
                {i !== 0 && (
                  <button type="button" onClick={() => move(i, 0)} className="flex items-center gap-1 px-1 text-[10px] tracking-[0.1em] uppercase">
                    <Star className="size-3" /> Main
                  </button>
                )}
                <button type="button" aria-label="Move right" disabled={i === images.length - 1} onClick={() => move(i, i + 1)} className="p-1 disabled:opacity-30">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </li>
          ))}
          {pending.map((p) => (
            <li key={p.id} className="relative flex aspect-square flex-col items-center justify-center gap-2 border border-dashed border-border p-2 text-center">
              {p.error ? (
                <>
                  <p className="text-xs text-destructive">{p.error}</p>
                  <p className="line-clamp-1 text-[10px] text-muted-foreground">{p.name}</p>
                  <button type="button" onClick={() => setPending((x) => x.filter((y) => y.id !== p.id))} className="text-[10px] underline">
                    Dismiss
                  </button>
                </>
              ) : (
                <>
                  <Loader2 className="size-5 animate-spin text-muted-foreground" />
                  <p className="line-clamp-1 text-[10px] text-muted-foreground">{p.name}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
