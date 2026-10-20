import Link from "next/link";

// Rendered inside the [locale] layout; it receives no params, so it links to
// the English shop.
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 pt-40 pb-32 text-center">
      <h1 className="font-heading text-4xl font-light">Page not found</h1>
      <p className="mt-4 text-sm text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link
        href="/products"
        className="mt-8 bg-primary px-8 py-3.5 text-xs font-medium tracking-[0.2em] text-primary-foreground uppercase hover:bg-[var(--gold)] hover:text-primary"
      >
        Back to the shop
      </Link>
    </div>
  );
}
