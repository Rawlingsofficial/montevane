import { ChevronDown } from "lucide-react";

type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

export function ProductAccordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="divide-y divide-border border-t border-b border-border">
      {items.map((item, i) => (
        <details key={item.title} className="group py-4" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium tracking-wide uppercase">
            {item.title}
            <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <div className="mt-3 text-sm text-muted-foreground">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
