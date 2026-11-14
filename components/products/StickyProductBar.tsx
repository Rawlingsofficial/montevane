import { Price, type PriceAmounts } from "@/components/common/Price";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { WhatsAppLink, type WhatsAppLine } from "@/components/whatsapp/WhatsAppLink";

/** Phones only: price and the two ways to buy stay in reach while scrolling a product. */
export function StickyProductBar({
  locale,
  amounts,
  lines,
  message,
  itemId,
  labels,
}: {
  locale: string;
  amounts: PriceAmounts;
  lines: WhatsAppLine[];
  message: string;
  itemId: string;
  labels: { enquire: string; whatsapp: string; choose: string };
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <div className="flex items-center gap-3">
        <Price amounts={amounts} locale={locale} className="mr-auto text-base" />
        <a href="#inquire" className="flex min-h-11 items-center border border-foreground px-4 text-xs font-medium tracking-[0.1em] uppercase">
          {labels.enquire}
        </a>
        <WhatsAppLink
          lines={lines}
          message={message}
          location="sticky_bar"
          itemId={itemId}
          chooseLabel={labels.choose}
          ariaLabel={labels.whatsapp}
          menuClassName="bottom-full right-0 mb-2"
          className="flex size-11 items-center justify-center bg-[#25D366] text-white"
        >
          <WhatsAppIcon className="size-5" />
        </WhatsAppLink>
      </div>
    </div>
  );
}
