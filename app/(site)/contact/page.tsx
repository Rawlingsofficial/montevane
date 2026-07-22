import type { Metadata } from "next";
import { Clock, Mail, MessageCircle } from "lucide-react";

import { PageHero } from "@/components/common/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact — Montévane",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Concierge"
        title="Get in Touch"
        description="Questions about a piece, an order, or a bespoke request? We're here to help."
        image="hero_3"
      />

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 lg:grid-cols-[1fr_1.3fr] lg:px-10">
        <div>
          <h2 className="text-2xl">Reach the House</h2>
          <div className="mt-8 space-y-6">
            <InfoRow icon={Mail} label="Email" value={CONTACT_INFO.email} />
            <InfoRow icon={MessageCircle} label="WhatsApp" value={CONTACT_INFO.whatsapp} />
            <InfoRow icon={Clock} label="Hours" value={CONTACT_INFO.hours} />
          </div>
        </div>

        <div>
          <h2 className="mb-8 text-2xl">Send a Message</h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="mt-0.5 size-4 text-[var(--gold)]" strokeWidth={1.5} />
      <div>
        <p className="text-xs tracking-[0.1em] text-muted-foreground uppercase">{label}</p>
        <p className="mt-1 text-sm">{value}</p>
      </div>
    </div>
  );
}
