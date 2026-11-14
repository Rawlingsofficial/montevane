"use client";

import { usePathname } from "next/navigation";

import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { WhatsAppLink, type WhatsAppLine } from "@/components/whatsapp/WhatsAppLink";
import { stripLocale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/** Floating chat button. On phones, product pages use their sticky bar instead. */
export function WhatsAppFloat({ lines, message, label, chooseLabel }: { lines: WhatsAppLine[]; message: string; label: string; chooseLabel: string }) {
  const product = /^\/products\/(?!page\/)[^/]+$/.test(stripLocale(usePathname()));
  if (!lines.length) return null;
  return (
    <div className={cn("fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40", product && "max-lg:hidden")}>
      <WhatsAppLink
        lines={lines}
        message={message}
        location="float"
        chooseLabel={chooseLabel}
        ariaLabel={label}
        menuClassName="bottom-full right-0 mb-3"
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="size-7" />
      </WhatsAppLink>
    </div>
  );
}
