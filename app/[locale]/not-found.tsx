import Link from "next/link";

import { GalleryImage } from "@/components/common/GalleryImage";
import { gallery } from "@/lib/catalog/gallery";

// Rendered inside the [locale] layout; it receives no params, so it links to
// the English shop.
const LINKS = [
  { label: "All pieces", href: "/products" },
  { label: "Birkin bags", href: "/shop/birkin-bags" },
  { label: "Rare watches", href: "/shop/watches" },
  { label: "Contact us", href: "/contact" },
];

export default function NotFound() {
  const scene = gallery("service");
  return (
    <section className="mt-16 bg-[#f5f0e9] lg:mt-[100px]">
      <div className="mx-auto max-w-xl px-6 pt-16 text-center lg:pt-20">
        <p className="text-xs font-medium tracking-[0.25em] text-[var(--gold)] uppercase">404</p>
        <h1 className="mt-3 font-heading text-4xl font-light sm:text-5xl">This piece isn&apos;t on view</h1>
        <p className="mt-4 text-sm text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved. These are a good place to start:</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={
                  i === 0
                    ? "inline-flex min-h-11 items-center bg-foreground px-6 text-xs font-medium tracking-[0.2em] text-white uppercase hover:bg-[var(--gold)] hover:text-foreground"
                    : "inline-flex min-h-11 items-center border border-foreground px-6 text-xs tracking-[0.15em] uppercase hover:border-[var(--gold)] hover:text-[var(--gold)]"
                }
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {scene && <GalleryImage scene={scene} className="mt-6 aspect-[4/3] w-full lg:aspect-[5/2] lg:max-h-[50vh]" imgClassName="object-bottom lg:object-[100%_75%]" />}
    </section>
  );
}
