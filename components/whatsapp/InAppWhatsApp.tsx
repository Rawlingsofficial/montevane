"use client";

import { useEffect } from "react";

// In-app browsers (Pinterest, Instagram, TikTok, Facebook…) don't hand wa.me
// links to the WhatsApp app, so the chat never opens. There we open the app
// directly with its own link, falling back to WhatsApp's web page.
const IN_APP = /Pinterest|Instagram|FBAN|FBAV|FB_IAB|musical_ly|Bytedance|TikTok|Snapchat|Line\//i;

export function InAppWhatsApp() {
  useEffect(() => {
    const ua = navigator.userAgent;
    if (!IN_APP.test(ua)) return;
    const android = /Android/i.test(ua);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="https://wa.me/"]');
      if (!a) return;
      e.preventDefault();
      const url = new URL(a.href);
      const query = `phone=${url.pathname.replace(/\D/g, "")}&text=${encodeURIComponent(url.searchParams.get("text") ?? "")}`;
      const fallback = `https://api.whatsapp.com/send?${query}`;
      if (android) {
        window.location.href = `intent://send?${query}#Intent;scheme=whatsapp;S.browser_fallback_url=${encodeURIComponent(fallback)};end`;
        return;
      }
      window.location.href = `whatsapp://send?${query}`;
      setTimeout(() => {
        if (document.visibilityState === "visible") window.location.href = fallback;
      }, 1500);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
