import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ContactButtons } from "@/components/contact/ContactButtons";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { ProductAccordion } from "@/components/products/ProductAccordion";
import { ProductCard } from "@/components/products/ProductCard";
import { PAYMENT_NOTE } from "@/lib/contact";
import { AVAILABILITY_LABEL, getContactChannels, getProduct, getProducts } from "@/lib/data/catalog";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: product.metaTitle || `${product.name} — ${product.brand} | Montévane`,
    description: product.metaDescription || product.description.slice(0, 160),
    openGraph: { images: [product.images[0].url] },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [product, channels] = await Promise.all([getProduct(slug), getContactChannels()]);
  if (!product) notFound();

  const sameBrand = await getProducts({ brand: product.brandSlug, excludeSlug: product.slug, limit: 4 });
  const related = sameBrand.length > 0 ? sameBrand : await getProducts({ excludeSlug: product.slug, limit: 4 });

  const price = new Intl.NumberFormat("en-US", { style: "currency", currency: product.currency, maximumFractionDigits: 0 });
  const [main, ...rest] = product.images;
  const title = `${product.brand} ${product.name}`;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
      <nav className="mb-8 text-xs tracking-[0.1em] text-muted-foreground uppercase">
        <Link href="/products" className="hover:text-foreground">
          Products
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/brands/${product.brandSlug}`} className="hover:text-foreground">
          {product.brand}
        </Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="grid grid-cols-2 gap-3">
          {[main, ...rest].map((img, i) => (
            <div
              key={img.url + i}
              className={`relative aspect-square overflow-hidden bg-[var(--ivory)] ${i === 0 ? "col-span-2" : ""}`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                priority={i === 0}
                sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-[var(--gold)] uppercase">{product.brand}</p>
          <h1 className="mt-2 font-heading text-3xl font-light sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-xl">{price.format(product.price)}</p>
          <p
            className={`mt-2 text-xs font-medium tracking-[0.1em] uppercase ${
              product.availability === "in_stock" ? "text-[var(--gold)]" : "text-muted-foreground"
            }`}
          >
            {AVAILABILITY_LABEL[product.availability]}
          </p>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <p className="mb-3 text-xs tracking-[0.1em] text-muted-foreground uppercase">Contact us to purchase</p>
            <ContactButtons
              channels={channels}
              message={`Hello, I'm interested in the ${title}.`}
              subject={`Inquiry: ${title}`}
            />
            <p className="mt-4 max-w-md text-xs leading-relaxed text-muted-foreground">{PAYMENT_NOTE}</p>
          </div>

          <div className="mt-10">
            <ProductAccordion
              items={[
                {
                  title: "Details",
                  content: `Color: ${product.color}. Materials: ${product.materials}. Dimensions: ${product.dimensions}. Weight: ${product.weight}.`,
                },
                { title: "Payment & Shipping", content: PAYMENT_NOTE },
                {
                  title: "Authenticity",
                  content:
                    product.authenticityNotes ||
                    "Every piece is verified by an independent authenticator before listing, with certification included at delivery.",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <section id="inquire" className="mt-24 max-w-3xl scroll-mt-24">
        <h2 className="text-2xl">Prefer we contact you?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Leave your details and pick how you&apos;d like us to reach you.</p>
        <div className="mt-8">
          <InquiryForm product={{ id: product.id, name: title }} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-2xl">You May Also Like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} channels={channels} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
