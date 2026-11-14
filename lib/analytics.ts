// GA4 events. gtag only exists when NEXT_PUBLIC_GA_ID is set (see GoogleAnalytics).
type Gtag = (command: "event", name: string, params: Record<string, string | number | undefined>) => void;

export function track(name: string, params: Record<string, string | number | undefined> = {}) {
  const gtag = (globalThis as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}
