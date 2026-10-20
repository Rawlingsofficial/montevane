import type { Metadata } from "next";

import { PageHero } from "@/components/common/PageHero";
import { ContactButtons } from "@/components/contact/ContactButtons";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { PAYMENT_NOTE } from "@/lib/contact";
import { getContactChannels } from "@/lib/data/catalog";

export const metadata: Metadata = {
  title: "Contact — Montévane",
};

export default async function ContactPage() {
  const channels = await getContactChannels();

  return (
    <>
      <PageHero
        eyebrow="Concierge"
        title="Get in Touch"
        description="Questions about a piece, payment, or a bespoke request? Reach us on any channel."
        image="hero_3"
      />

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 lg:grid-cols-[1fr_1.3fr] lg:px-10">
        <div>
          <h2 className="text-2xl">Reach Us Directly</h2>
          <div className="mt-8">
            <ContactButtons channels={channels} message="Hello Montévane," subject="Inquiry" />
          </div>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{PAYMENT_NOTE}</p>
        </div>

        <div>
          <h2 className="mb-8 text-2xl">Or Let Us Contact You</h2>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
