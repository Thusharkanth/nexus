import { Navbar, Footer, ScrollProgress, CursorGlow } from "@/components/SiteChrome";
import { Services, FinalCTA, Process } from "@/components/sections/Sections";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <div className="relative">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <section className="relative px-6 pb-12 pt-44 sm:pt-52">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] radial-glow opacity-60" />
        <div className="mx-auto max-w-5xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-display text-balance text-5xl font-semibold leading-[1.02] sm:text-6xl md:text-7xl">
            Everything you need to <span className="text-gradient">ship and scale.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A full-stack technology partner — engineering, AI, design, and strategy under one roof.
          </motion.p>
        </div>
      </section>
      <Services />
      <Process />
      <FinalCTA />
      <Footer />
    </div>
  );
}
