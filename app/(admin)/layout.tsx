import type { Metadata } from "next";

import "../globals.css";
import { cormorant, inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Admin | Montévane",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
