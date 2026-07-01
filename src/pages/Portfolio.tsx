import { Navbar, Footer, ScrollProgress, CursorGlow, MagneticButton } from "@/components/SiteChrome";
import { FinalCTA } from "@/components/sections/Sections";
import { ArrowRight, Box, Code, PenTool, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PRACTICES = [
  {
    num: "01",
    title: "Design & Marketing",
    icon: PenTool,
    desc: "We create memorable brands, engaging experiences, and creative visuals that connect with the right audience.",
    tags: ["Branding", "UI/UX Design", "Digital Marketing", "Creative Direction"],
    link: "/portfolio/design",
    image: "/images/design_marketing.png",
  },
  {
    num: "02",
    title: "Tech Solutions",
    icon: Code,
    desc: "Scalable systems, intelligent automation, and robust infrastructure to power modern businesses.",
    tags: ["Custom Software", "AI & Automation", "Cloud Architecture", "Enterprise Systems"],
    link: "/portfolio/tech",
    image: "/images/tech_solutions.png",
  },
  {
    num: "03",
    title: "Our Products",
    icon: Box,
    desc: "Our in-house products and platforms built to solve real problems and drive meaningful change.",
    tags: ["SaaS Products", "AI Platforms", "Productivity Tools", "Internal Experiments"],
    link: "/portfolio/productions",
    image: "/portfolio/our_productions.png",
  },
];

export default function Portfolio() {
  return (
    <div className="relative">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main className="pt-32 sm:pt-40 pb-20">
        {/* Hero Section */}
        <section className="px-6 mb-32">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-neon glow-neon" />
              Portfolio / Our Work
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:px-12"
            >
              Work That Ships. <span className="text-gradient">Work That Scales.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground"
            >
              From custom software and AI systems to SaaS platforms and digital products,
              everything we build is engineered for performance, scalability, and real-world impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6"
            >
              <button
                onClick={() => {
                  document.getElementById("practices")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <MagneticButton className="!px-6 !py-3">
                  Browse categories <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </button>
              <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Practices Section */}
        <section id="practices" className="px-6 py-20 relative">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-12">
              <span className="text-neon"><Box className="h-4 w-4" /></span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Pick a practice</span>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>

            <div className="grid gap-8">
              {PRACTICES.map((practice, idx) => (
                <motion.div
                  key={practice.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`group relative flex flex-col md:flex-row ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} overflow-hidden rounded-[2rem] border border-border bg-[#020503]/60 transition-all duration-500 hover:border-neon/40 hover:bg-[#050a06]`}
                >
                  <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-neon/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-40" />

                  {/* Content Side */}
                  <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 w-full md:w-1/2">
                    <div className="text-neon font-display text-lg mb-4">{practice.num}</div>

                    <div className="mb-8 inline-grid h-12 w-12 place-items-center rounded-full bg-neon/10 text-neon transition-transform duration-300 group-hover:scale-110">
                      <practice.icon className="h-5 w-5" />
                    </div>

                    <h3 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-wide mb-4">{practice.title}</h3>
                    <p className="text-base leading-relaxed text-muted-foreground/90 max-w-md mb-8">{practice.desc}</p>

                    <div className="flex flex-col gap-3 mb-12">
                      {practice.tags.map(tag => (
                        <div key={tag} className="flex items-center gap-3">
                          <CheckCircle2 className="h-[14px] w-[14px] text-neon" />
                          <span className="text-sm text-muted-foreground">{tag}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center">
                      <Link to={practice.link} className="inline-flex items-center gap-2 text-neon text-sm font-semibold transition-transform duration-200 hover:gap-3">
                        {practice.num === "03" ? "Explore products" : "Explore services"} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="flex-1 relative min-h-[300px] md:min-h-[400px] md:w-1/2 bg-gradient-to-br from-[#020503] to-[#0a150c] overflow-hidden flex items-center justify-center p-8">
                    <div className="absolute inset-0 bg-neon/5 mix-blend-overlay" />
                    <img
                      src={practice.image}
                      alt={practice.title}
                      className="relative z-10 w-full max-w-[450px] object-contain opacity-90 transition-transform duration-700 group-hover:scale-105 mix-blend-screen"
                      style={{
                        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)',
                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)'
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
