"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { AssetImage } from "@/components/common/AssetImage";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <AssetImage base="hero_1" alt="" priority sizes="100vw" className="absolute inset-0" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs font-medium tracking-[0.3em] text-white/80 uppercase"
        >
          Twelve Houses. One Address.
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-4 max-w-3xl font-heading text-5xl font-extralight text-white sm:text-6xl lg:text-7xl"
        >
          Timeless Elegance,
          <br />
          Curated for You
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-md text-sm font-light text-white/70"
        >
          Authentic handbags from the world&apos;s most prestigious fashion houses,
          each piece verified and delivered with care.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <Link
            href="/products"
            className="mt-10 inline-block bg-white px-10 py-4 text-xs font-medium tracking-[0.2em] text-black uppercase transition-colors hover:bg-[var(--gold)]"
          >
            Explore the Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
