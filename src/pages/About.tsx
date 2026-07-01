import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Target, Eye, Heart } from "lucide-react";
import { Navbar, Footer, ScrollProgress, CursorGlow, MagneticButton } from "@/components/SiteChrome";

export default function About() {
  return (
    <div className="relative">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <section className="relative px-6 pb-20 pt-44 sm:pt-52">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] radial-glow opacity-60" />
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-neon glow-neon" /> About us
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-display text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            Technology Partner for <span className="text-gradient">Modern Businesses.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Nexus Solutions is the technology division of The Matrices Pvt Ltd, helping growing businesses modernize operations, automate workflows, and scale through intelligent software, AI, and digital transformation solutions.
          </motion.p>
        </div>
      </section>

      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
          {[
            { icon: Eye, t: "Vision", d: "To be a leading technology and digital transformation partner recognized for innovation, excellence, and creating sustainable growth for businesses worldwide." },
            { icon: Target, t: "Mission", d: "We deliver affordable, high-quality technology solutions that help businesses modernize, automate, and scale. Through AI, software development, cloud technologies, and digital transformation services, we solve real business challenges while providing a premium customer experience. We build long-term partnerships founded on trust, reliability, innovation, and measurable results." },
            { icon: Heart, t: "Values", d: "Trust, reliability, innovation, and long-term partnerships built around measurable outcomes." },
          ].map((c, i) => (
            <motion.div key={c.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-border bg-surface/50 p-7">
              <c.icon className="h-7 w-7 text-neon" />
              <h3 className="mt-5 font-display text-xl font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Where we operate</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[["Colombo", "Sri Lanka · HQ"], ["Badulla", "Sri Lanka · Studio"]].map(([city, sub]) => (
              <div key={city} className="rounded-2xl border border-border bg-surface/50 p-6">
                <div className="font-display text-2xl font-semibold">{city}</div>
                <div className="text-sm text-muted-foreground">{sub}</div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/contact"><MagneticButton>Work with us <ArrowUpRight className="h-4 w-4" /></MagneticButton></Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
