import { Navbar, Footer, ScrollProgress, CursorGlow } from "@/components/SiteChrome";
import { AllfixHighlight, FinalCTA, FAQ } from "@/components/sections/Sections";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

export default function Allfix() {
  return (
    <div className="relative">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <section className="relative px-6 pb-12 pt-44 sm:pt-52">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] radial-glow opacity-70" />
        <div className="mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-neon">
            <Wrench className="h-3.5 w-3.5" /> ALLFIX · SaaS
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-display text-balance text-5xl font-semibold leading-[1.02] sm:text-6xl md:text-7xl">
            Run your repair shop <span className="text-gradient">from one screen.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            ALLFIX is the complete service-repair management system — built for modern repair businesses that want to move faster, retain customers, and grow.
          </motion.p>
        </div>
      </section>
      <AllfixHighlight />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
