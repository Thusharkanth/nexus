import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Maximize2, MoveRight } from "lucide-react";
import { Navbar, Footer, ScrollProgress, CursorGlow } from "@/components/SiteChrome";
import { FinalCTA } from "@/components/sections/Sections";
import { PROJECTS_BY_PRACTICE, Project } from "@/data/portfolioData";

/* ─── Category config per practice ─── */
const CATEGORY_CONFIG: Record<
  string,
  { num: string; name: string; heading: string; desc: string; pills: string[] }
> = {
  design: {
    num: "01",
    name: "Design & Marketing",
    heading: "Design & Marketing Work",
    desc: "We help brands stand out, connect with the right audience, and grow with purpose-driven design and marketing.",
    pills: ["All Projects", "Branding", "UI/UX Design", "Digital Marketing", "Creative Direction"],
  },
  tech: {
    num: "02",
    name: "Tech Solutions",
    heading: "Tech Solutions Work",
    desc: "Scalable systems, intelligent automation, and robust infrastructure to power modern businesses.",
    pills: ["All Projects", "Custom Software", "AI & Automation", "Cloud Architecture", "Enterprise Systems"],
  },
  productions: {
    num: "03",
    name: "Our Products",
    heading: "Our Products & Platforms",
    desc: "Our in-house products and platforms built to solve real problems and drive meaningful change.",
    pills: ["All Projects", "SaaS Products", "AI Platforms", "Productivity Tools", "Internal Experiments"],
  },
};

const DEFAULT_KEY = "design";

/* ═══════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════ */
export default function PortfolioCategory() {
  const { category } = useParams<{ category: string }>();
  const practiceKey = category && CATEGORY_CONFIG[category] ? category : DEFAULT_KEY;
  const config = CATEGORY_CONFIG[practiceKey];
  const practiceProjects = PROJECTS_BY_PRACTICE[practiceKey] ?? [];

  const [activeFilter, setActiveFilter] = useState("All Projects");

  // Reset filter & scroll when route changes
  useEffect(() => {
    setActiveFilter("All Projects");
    window.scrollTo(0, 0);
  }, [practiceKey]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All Projects") return practiceProjects;
    return practiceProjects.filter((p) => p.category === activeFilter);
  }, [activeFilter, practiceProjects]);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const moreProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <div className="relative">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main className="pt-32 sm:pt-40 pb-20 min-h-screen">
        {/* ──────── Hero ──────── */}
        <section className="px-6 mb-20 sm:mb-32">
          <div className="mx-auto max-w-5xl text-center flex flex-col items-center">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              <span className="text-neon">{config.num}</span>
              <span className="text-border mx-1">&gt;</span>
              {config.name}
            </motion.div>

            {/* Heading — unique per practice */}
            <motion.h1
              key={practiceKey + "-h1"}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl mb-6"
            >
              {config.heading}
            </motion.h1>

            {/* Description */}
            <motion.p
              key={practiceKey + "-desc"}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground mb-12"
            >
              {config.desc}
            </motion.p>

            {/* Category filter pills — unique per practice */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-wrap items-center justify-center gap-3 max-w-3xl"
            >
              {config.pills.map((pill) => {
                const isActive = activeFilter === pill;
                return (
                  <button
                    key={pill}
                    onClick={() => setActiveFilter(pill)}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 border backdrop-blur-md ${
                      isActive
                        ? "bg-neon/10 border-neon/50 text-neon glow-neon"
                        : "bg-surface/30 border-border/50 text-muted-foreground hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    {pill}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ──────── Featured Projects ──────── */}
        {featuredProjects.length > 0 && (
          <section className="px-6 mb-32">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-8 lg:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {featuredProjects.map((project, idx) => (
                    <FeaturedProjectCard key={project.id} project={project} index={idx} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </section>
        )}

        {/* ──────── More Projects ──────── */}
        {moreProjects.length > 0 && (
          <section className="px-6 mb-32">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-12 flex items-center gap-4"
              >
                <h2 className="font-display text-3xl font-semibold">More Projects</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {moreProjects.map((project, idx) => (
                    <MoreProjectCard key={project.id} project={project} index={idx} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </section>
        )}

        {/* ──────── Stats ──────── */}
        <StatsSection />

        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Featured Card
   ═══════════════════════════════════════════════════════════════ */
function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-[24px] bg-[#080808] transition-all duration-500 border border-white/5"
      style={{ ["--accent" as string]: project.accentColor } as React.CSSProperties}
    >
      {/* Hover border glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-20"
        style={{ boxShadow: "inset 0 0 0 1px var(--accent)" }}
      />
      {/* Hover ambient glow */}
      <div
        className="pointer-events-none absolute -inset-0 rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-10 z-0 blur-2xl"
        style={{ backgroundColor: "var(--accent)" }}
      />

      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0A] z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80 z-10 mix-blend-multiply" />
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-6 right-6 z-20 text-white/50 transition-colors duration-300 group-hover:text-white">
          <div className="p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
            <Maximize2 className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-8 md:p-10 z-20 bg-[#080808]">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] mb-4"
          style={{
            borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
            backgroundColor: "color-mix(in srgb, var(--accent) 10%, transparent)",
            color: "var(--accent)",
          }}
        >
          {project.category}
        </div>

        <h3 className="font-display text-3xl font-semibold mb-3 text-white">{project.title}</h3>
        <p className="text-muted-foreground text-base max-w-md mb-8 line-clamp-2">{project.description}</p>

        <Link
          to={`/work/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/link"
          style={{ color: "var(--accent)" }}
        >
          View Case Study
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   More-projects Card
   ═══════════════════════════════════════════════════════════════ */
function MoreProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="group flex flex-col relative overflow-hidden rounded-2xl bg-[#080808] border border-white/5 transition-all duration-300 hover:-translate-y-1"
      style={{ ["--accent" as string]: project.accentColor } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
        style={{ boxShadow: "inset 0 0 0 1px var(--accent)" }}
      />

      <div className="relative aspect-video overflow-hidden bg-[#0A0A0A] z-10">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col relative z-20">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {project.category}
        </div>
        <h4 className="font-display text-lg font-medium text-white mb-4 line-clamp-1">{project.title}</h4>
        <div className="mt-auto">
          <Link
            to={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors group-hover:text-white"
          >
            View Project
            <MoveRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" style={{ color: "var(--accent)" }} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Stats
   ═══════════════════════════════════════════════════════════════ */
function StatsSection() {
  const stats = [
    { value: "150+", label: "Projects Delivered" },
    { value: "98%", label: "Client Retention" },
    { value: "12+", label: "Industry Awards" },
    { value: "5M+", label: "End Users Reached" },
  ];

  return (
    <section className="px-6 py-20 border-t border-border/50 bg-gradient-to-b from-transparent to-surface/20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <div className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">{s.value}</div>
              <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
