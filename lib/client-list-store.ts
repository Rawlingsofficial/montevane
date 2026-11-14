"use client";

import { useSyncExternalStore } from "react";

// A small list kept in localStorage (wishlist, recently viewed). Reads are
// cached; every tab stays in sync through the storage event. Private mode or
// blocked storage just means an empty list.

export type SavedItem = {
  slug: string;
  title: string;
  image: string | null;
  usd: number;
  eur: number | null;
};

const EMPTY: SavedItem[] = [];

export function createListStore(key: string, max: number) {
  const listeners = new Set<() => void>();
  let cache: SavedItem[] | null = null;

  const read = (): SavedItem[] => {
    if (cache) return cache;
    try {
      const parsed = JSON.parse(localStorage.getItem(key) ?? "[]");
      cache = Array.isArray(parsed) ? parsed : [];
    } catch {
      cache = [];
    }
    return cache!;
  };
  const write = (list: SavedItem[]) => {
    cache = list;
    try {
      localStorage.setItem(key, JSON.stringify(list));
    } catch {
      // Storage full or blocked: the list still works for this page view.
    }
    listeners.forEach((l) => l());
  };
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      cache = null;
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  };

  return {
    useItems: () => useSyncExternalStore(subscribe, read, () => EMPTY),
    add: (item: SavedItem) => write([item, ...read().filter((i) => i.slug !== item.slug)].slice(0, max)),
    remove: (slug: string) => write(read().filter((i) => i.slug !== slug)),
    toggle: (item: SavedItem) =>
      read().some((i) => i.slug === item.slug) ? write(read().filter((i) => i.slug !== item.slug)) : write([item, ...read()].slice(0, max)),
  };
}

export const wishlist = createListStore("mv-wishlist", 100);
export const recentlyViewed = createListStore("mv-recent", 12);
