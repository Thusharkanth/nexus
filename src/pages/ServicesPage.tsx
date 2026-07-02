import { Navbar, Footer, ScrollProgress, CursorGlow, SpaceParticles } from "@/components/SiteChrome";
import { Services, FinalCTA, Process } from "@/components/sections/Sections";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <div className="relative">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <section className="relative px-6 pb-12 pt-48 sm:pt-56 overflow-hidden">
        <SpaceParticles />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] radial-glow opacity-60" />
        <div className="mx-auto max-w-5xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-display text-balance text-5xl font-semibold leading-[1.02] sm:text-6xl md:text-7xl">
            Solutions Designed Around <span className="text-gradient">Business Outcomes.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Our services are designed to help businesses improve efficiency, automate repetitive processes, increase visibility, and create better customer experiences.
          </motion.p>
        </div>
      </section>
      <Services showViewAll={false} />
      <Process />
      <FinalCTA />
      <Footer />
    </div>
  );
}
