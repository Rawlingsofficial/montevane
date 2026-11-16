import { cn } from "@/lib/utils";

// Accepted payment methods as the brands' own full-colour card marks
// (public/payment/*.svg, from Shopify's open-source payment_icons set; Zelle
// from Simple Icons in its brand colour; Chime as a wordmark in its green).

type Method = { id: string; label: string; file: string };

const METHODS: Method[] = [
  { id: "visa", label: "Visa", file: "visa" },
  { id: "mastercard", label: "Mastercard", file: "master" },
  { id: "amex", label: "American Express", file: "american_express" },
  { id: "paypal", label: "PayPal", file: "paypal" },
  { id: "applepay", label: "Apple Pay", file: "apple_pay" },
  { id: "googlepay", label: "Google Pay", file: "google_pay" },
  { id: "klarna", label: "Klarna", file: "klarna" },
  { id: "bancontact", label: "Bancontact", file: "bancontact" },
  { id: "ideal", label: "iDEAL", file: "ideal" },
  { id: "wero", label: "Wero", file: "wero" },
  { id: "twint", label: "TWINT", file: "twint" },
  { id: "chime", label: "Chime", file: "chime" },
  { id: "zelle", label: "Zelle", file: "zelle" },
  { id: "bitcoin", label: "Bitcoin (BTC)", file: "bitcoin" },
  { id: "ethereum", label: "Ethereum (ETH)", file: "ethereum" },
  { id: "tether", label: "Tether (USDT)", file: "usdt" },
];

// Crypto is shown only on the Payment & Shipping page (shopping platforms'
// automated reviews treat crypto on product pages as a risk signal).
const CRYPTO = new Set(["bitcoin", "ethereum", "tether"]);

export function PaymentMethods({
  label,
  tone = "light",
  crypto = false,
  className,
}: {
  label: string;
  tone?: "light" | "dark";
  /** Include the crypto marks (Payment & Shipping page only). */
  crypto?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={cn("mb-2.5 text-[11px] tracking-[0.15em] uppercase", tone === "dark" ? "text-white/50" : "text-muted-foreground")}>{label}</p>
      <ul aria-label={label} className="flex flex-wrap gap-1.5">
        {METHODS.filter((m) => crypto || !CRYPTO.has(m.id)).map((m) => (
          <li key={m.id} title={m.label}>
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVGs */}
            <img src={`/payment/${m.file}.svg`} alt={m.label} width={38} height={24} loading="lazy" className="h-6 w-[38px] rounded-[3px]" />
          </li>
        ))}
      </ul>
    </div>
  );
}
