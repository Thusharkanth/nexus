import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bot, Code2, Smartphone, Cloud, Cpu, LineChart, Palette, Compass,
  ShieldCheck, Sparkles, Zap, Globe, ArrowUpRight, Check, Plus, Minus,
  MessageCircle, Calendar, Mail, Workflow, Users, Wrench
} from "lucide-react";
import { MagneticButton } from "@/components/SiteChrome";

/* ----------------- Animated Section Header ----------------- */
export function SectionHeader({ eyebrow, title, sub, align = "left" }: { eyebrow: string; title: React.ReactNode; sub?: string; align?: "left" | "center" }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-neon glow-neon" /> {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="font-display text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 text-balance text-base text-muted-foreground sm:text-lg"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

/* ----------------- About Preview ----------------- */
export function AboutPreview() {
  return (
    <section id="about" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="About Nexus"
              title={<>We turn complexity into <span className="text-gradient">competitive advantage.</span></>}
              sub="As the IT & Technology division of The Matrices Pvt Ltd, Nexus Solutions exists to make world-class engineering accessible — combining AI, software, and design into systems that compound over time."
            />
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/about"><MagneticButton>Our story <ArrowUpRight className="h-4 w-4" /></MagneticButton></Link>
              <Link to="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground">See how we work →</Link>
            </div>
          </div>
          <OrbitVisual />
        </div>
      </div>
    </section>
  );
}

function OrbitVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Start at 3.5 seconds
    video.currentTime = 3.5;

    // Manually loop back to 3.5 seconds
    const handleEnded = () => {
      video.currentTime = 3.5;
      video.play().catch(() => {});
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <div className="relative w-full max-w-xl lg:max-w-2xl lg:scale-110 justify-self-center flex items-center justify-center">
      <video
        ref={videoRef}
        src="/Hero/herovideo.mp4"
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        className="w-full h-auto"
        style={{ 
          mixBlendMode: "screen",
          maskImage: "radial-gradient(circle, black 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle, black 60%, transparent 100%)"
        }}
      />
    </div>
  );
}

/* ----------------- Services ----------------- */
const SERVICES = [
  { icon: Code2, title: "Website Development", desc: "High-performance marketing & content sites that convert." },
  { icon: Workflow, title: "Web Applications", desc: "Production-grade web apps with delightful UX." },
  { icon: Smartphone, title: "Mobile App Development", desc: "iOS & Android products built for scale." },
  { icon: Cpu, title: "Custom Software", desc: "Bespoke systems tailored to your operations." },
  { icon: Cloud, title: "SaaS Development", desc: "Multi-tenant platforms ready for global growth." },
  { icon: Bot, title: "AI Chatbots", desc: "Conversational agents trained on your business." },
  { icon: Sparkles, title: "AI Automation", desc: "Eliminate repetitive work with intelligent workflows." },
  { icon: Zap, title: "AI Integration", desc: "Embed AI into the tools your team already uses." },
  { icon: LineChart, title: "Data Science & Analytics", desc: "Decisions backed by signal, not guesswork." },
  { icon: Palette, title: "UI/UX Design", desc: "Interfaces that feel inevitable." },
  { icon: Compass, title: "IT Consulting", desc: "Strategy for digital transformation that ships." },
  { icon: Globe, title: "Digital Transformation", desc: "Modernize legacy stacks without breaking flow." },
];

export function Services() {
  return (
    <section id="services" className="relative px-6 py-32 sm:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="What we do"
            title={<>A full-stack technology partner, <span className="text-gradient">all under one roof.</span></>}
          />
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-neon">
            View all services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon: Icon, title, desc, index }: { icon: React.ElementType; title: string; desc: string; index: number }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-[#020503]/60 p-8 transition-all duration-300 hover:border-neon/40 hover:bg-[#050a06]"
      style={{ ["--mx" as string]: `${pos.x}%`, ["--my" as string]: `${pos.y}%` } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(400px circle at var(--mx) var(--my), oklch(0.88 0.24 145 / 0.12), transparent 60%)" }}
      />
      <div className="relative">
        <div className="mb-6 inline-grid h-12 w-12 place-items-center rounded-full bg-neon/10 text-neon transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-display text-[17px] font-semibold text-white tracking-wide">{title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground/90">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ----------------- Marquee strip ----------------- */
export function Marquee() {
  const items = ["AI Solutions", "SaaS", "Digital Transformation", "Cloud Native", "Automation", "UI/UX", "Data Analytics", "Mobile", "Web Apps", "Consulting"];
  return (
    <section aria-hidden className="relative overflow-hidden border-y border-border bg-surface/30 py-6">
      <div className="marquee-track flex gap-12 whitespace-nowrap">
        {[...items, ...items].map((it, i) => (
          <div key={i} className="flex items-center gap-12 font-display text-xl uppercase tracking-[0.2em] text-muted-foreground">
            <span>{it}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-neon" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------- ALLFIX Highlight ----------------- */
export function AllfixHighlight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="allfix" ref={ref} className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-8 sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-neon/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-neon/10 blur-3xl" />
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neon">
                <Wrench className="h-3.5 w-3.5" /> Product · SaaS
              </div>
              <h3 className="font-display text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
                ALLFIX — repair management, <span className="text-gradient">reimagined.</span>
              </h3>
              <p className="mt-5 max-w-lg text-muted-foreground">
                The complete service-repair management platform for modern repair businesses.
                Track repairs, manage customers, automate workflows, and run your shop from one place.
              </p>
              <ul className="mt-8 grid gap-3">
                {["Repair tracking system", "Customer management", "Workflow automation", "Service shop management"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-neon/15 text-neon"><Check className="h-3 w-3" /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link to="/allfix"><MagneticButton>Explore ALLFIX <ArrowUpRight className="h-4 w-4" /></MagneticButton></Link>
                <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">Book a demo →</Link>
              </div>
            </div>
            <motion.div style={{ y }} className="relative">
              <AllfixMock />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AllfixMock() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-neon/20 to-transparent blur-2xl" />
      <div className="relative rounded-2xl border border-border bg-background p-4 shadow-2xl glow-neon">
        <div className="flex items-center gap-1.5 border-b border-border pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-neon" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground">allfix.app/dashboard</span>
        </div>
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Active repairs</div>
              <div className="font-display text-3xl font-semibold">24</div>
            </div>
            <div className="rounded-full bg-neon/15 px-3 py-1 text-[10px] font-semibold text-neon">+18% this week</div>
          </div>
          <div className="rounded-lg border border-border bg-surface/50 p-3">
            <div className="mb-2 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>Workflow</span><span>Step 3 / 5</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-border">
              <motion.div initial={{ width: 0 }} whileInView={{ width: "60%" }} transition={{ duration: 1.2, delay: 0.3 }} viewport={{ once: true }} className="h-full bg-neon glow-neon" />
            </div>
          </div>
          {[
            ["#R-1042", "iPhone 15 · Screen", "In progress"],
            ["#R-1041", "MacBook Pro · Battery", "QA"],
            ["#R-1040", "iPad Air · Charging", "Ready"],
          ].map(([id, item, status], i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-between rounded-lg bg-surface/50 p-2.5"
            >
              <div>
                <div className="font-mono text-[10px] text-muted-foreground">{id}</div>
                <div className="text-xs font-medium">{item}</div>
              </div>
              <span className="rounded-full bg-neon/10 px-2 py-0.5 text-[10px] text-neon">{status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------- Why Choose Us ----------------- */
const WHY = [
  { icon: ShieldCheck, title: "Trust by design", text: "Long-term partnerships built on reliability and measurable outcomes — not contracts." },
  { icon: Sparkles, title: "AI-first thinking", text: "We embed intelligence into every layer, from interface to infrastructure." },
  { icon: Zap, title: "Ship velocity", text: "Modern stacks and disciplined process let us move from idea to production fast." },
  { icon: Globe, title: "Global craft, local roots", text: "Two studios in Sri Lanka serving clients across the world, end-to-end." },
];

export function WhyChoose() {
  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Why Nexus"
          title={<>Premium engineering, <span className="text-gradient">without the premium overhead.</span></>}
          sub="We compete on craft, speed, and partnership — built to feel like an in-house team that ships."
          align="center"
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative bg-background p-8 transition-colors hover:bg-surface"
            >
              <w.icon className="h-7 w-7 text-neon transition-transform duration-300 group-hover:-translate-y-1" />
              <h3 className="mt-5 font-display text-lg font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
              <Counter target={[98, 4, 24, 10][i]} suffix={["%", "x", "h", "+"][i]} label={["Client retention", "Faster shipping", "Avg response", "Years combined"][i]} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.6, ease: "easeOut",
      onUpdate: (latest) => setVal(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, target]);
  return (
    <div ref={ref} className="mt-6 border-t border-border/60 pt-4">
      <div className="font-display text-2xl font-semibold text-foreground">{val}{suffix}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}

/* ----------------- Case Studies ----------------- */
const CASES = [
  { tag: "SaaS · Repair", title: "ALLFIX", desc: "From shop floor to scalable SaaS — a full workflow OS for service businesses.", color: "from-neon/30 to-transparent" },
  { tag: "AI · Automation", title: "Conversational Ops", desc: "Cut customer-support load by 60% with an AI agent trained on internal docs.", color: "from-emerald-400/20 to-transparent" },
  { tag: "Digital Transformation", title: "Legacy → Cloud", desc: "Migrated a regional retailer to a modern cloud stack with zero downtime.", color: "from-teal-400/20 to-transparent" },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Proof of work"
            title={<>Selected work that <span className="text-gradient">moved the numbers.</span></>}
          />
          <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-neon">
            Discuss your project <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {CASES.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface/50 transition-all duration-500 hover:border-neon/40"
            >
              <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${c.color}`}>
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-display text-5xl font-bold text-foreground/15 transition-transform duration-700 group-hover:scale-110">{c.title}</div>
                </div>
                <div className="absolute right-4 top-4 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-wider">{c.tag}</div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-neon">
                  Read the case <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------- Process / Timeline ----------------- */
const STEPS = [
  { n: "01", title: "Discover", desc: "We start with deep listening — your goals, constraints, and the real problem worth solving." },
  { n: "02", title: "Design", desc: "Strategy, UX, and technical architecture in one fluid track. Prototypes, not slides." },
  { n: "03", title: "Build", desc: "Modern stacks, weekly demos, and tight feedback loops. You see progress, not promises." },
  { n: "04", title: "Scale", desc: "We stay on as your long-term partner — measuring, refining, and compounding results." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="How we work"
          title={<>A process built for <span className="text-gradient">momentum.</span></>}
          align="center"
        />
        <div ref={ref} className="relative mt-20 pl-12 sm:pl-20">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-border sm:left-5" />
          <motion.div style={{ height: lineHeight }} className="absolute left-3 top-0 w-px bg-neon glow-neon sm:left-5" />
          <div className="space-y-16">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="relative"
              >
                <div className="absolute -left-[36px] top-1.5 grid h-7 w-7 place-items-center rounded-full border border-neon/40 bg-background sm:-left-[60px] sm:h-9 sm:w-9">
                  <span className="h-2 w-2 rounded-full bg-neon glow-neon" />
                </div>
                <div className="font-mono text-xs text-neon">{s.n}</div>
                <h3 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{s.title}</h3>
                <p className="mt-2 max-w-xl text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Team ----------------- */
const TEAM = ["Lathurshan", "Hindujaan", "Shukri Ahmed", "Thusharkanth", "Kaveen", "Kavisheak", "Suhab"];
const ROLES = ["Mobile Engineer", "AI & Automation", "Full-Stack Engineer", "Founder & Tech Lead", "Backend Engineer", "Product Designer", "Data & Analytics"];

export function Team() {
  const renderCard = (name: string, i: number) => (
    <motion.div
      key={name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface/50 p-6 transition-all hover:border-neon/40 hover:bg-surface w-full max-w-[280px] sm:w-[280px]"
    >
      <div className="mb-5 grid aspect-square w-full place-items-center rounded-xl bg-gradient-to-br from-neon/20 to-transparent">
        <span className="font-display text-5xl font-bold text-foreground/30 transition-transform duration-500 group-hover:scale-110">{name[0]}</span>
      </div>
      <div className="font-display text-base font-semibold">{name}</div>
      <div className="text-xs text-muted-foreground">{ROLES[i]}</div>
    </motion.div>
  );

  return (
    <section id="team" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="The team"
          title={<>Builders, designers & <span className="text-gradient">problem-solvers.</span></>}
          sub="A tight group of senior engineers and creatives who care as much about your business as you do."
          align="center"
        />
        
        <div className="mt-16 flex flex-col items-center">
          {/* Tree Top Node (N Icon) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="grid h-16 w-16 place-items-center rounded-2xl border border-neon/30 bg-neon/10 glow-neon">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-neon" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 20 L4 4 L20 20 L20 4" />
              </svg>
            </div>
            <div className="h-10 w-px bg-gradient-to-b from-neon/50 to-border my-2" />
          </motion.div>

          {/* Row 1 (2 Items) */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
            {TEAM.slice(0, 2).map((name, i) => renderCard(name, i))}
          </div>

          {/* Connector */}
          <div className="h-10 w-px bg-border my-2" />

          {/* Row 2 (5 Items + Join Us) */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
            {TEAM.slice(2, 7).map((name, i) => renderCard(name, i + 2))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: TEAM.length * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-dashed border-neon/40 bg-neon/5 p-6 w-full max-w-[280px] sm:w-[280px]"
            >
              <div className="mb-5 grid aspect-square w-full place-items-center rounded-xl">
                <Users className="h-12 w-12 text-neon" />
              </div>
              <div className="font-display text-base font-semibold">Join us</div>
              <div className="text-xs text-muted-foreground">We're growing the team.</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Testimonials ----------------- */
const QUOTES = [
  { q: "Nexus felt like our internal team from day one. They shipped what others promised in pitch decks.", a: "Operations Lead, Retail SME" },
  { q: "Their AI integration cut our manual support load in half. The ROI was obvious within a month.", a: "Founder, SaaS Startup" },
  { q: "Premium craft at a fair price. Rare combination. Now our long-term tech partner.", a: "CTO, Service Business" },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % QUOTES.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeader eyebrow="Said about us" title={<>Trusted to <span className="text-gradient">deliver.</span></>} align="center" />
        <div className="relative mt-16 min-h-[180px]">
          {QUOTES.map((q, idx) => (
            <motion.blockquote
              key={idx}
              initial={false}
              animate={{ opacity: i === idx ? 1 : 0, y: i === idx ? 0 : 20, pointerEvents: i === idx ? "auto" : "none" }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <p className="font-display text-2xl leading-snug text-balance sm:text-3xl md:text-4xl">"{q.q}"</p>
              <footer className="mt-6 text-sm uppercase tracking-[0.2em] text-muted-foreground">— {q.a}</footer>
            </motion.blockquote>
          ))}
        </div>
        <div className="mt-10 flex justify-center gap-2">
          {QUOTES.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} aria-label={`Quote ${idx + 1}`} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-neon" : "w-1.5 bg-border"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------- FAQ ----------------- */
const FAQS = [
  { q: "What kind of projects do you take on?", a: "From custom AI workflows and SaaS products to full-stack web and mobile apps. If it involves modern software, we can build it." },
  { q: "How quickly can we start?", a: "Discovery can begin within a week of first contact. Most engagements kick off within two." },
  { q: "Do you work with startups and SMEs?", a: "Yes — they're our core focus. We've designed our process to give smaller teams enterprise-grade engineering." },
  { q: "Can we license or adopt ALLFIX?", a: "Absolutely. Book a demo from the ALLFIX page and we'll walk you through it." },
  { q: "Where are you based?", a: "Colombo and Badulla, Sri Lanka. We work with clients globally." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-4xl">
        <SectionHeader eyebrow="FAQ" title={<>Questions, <span className="text-gradient">answered.</span></>} align="center" />
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={`overflow-hidden rounded-2xl border transition-colors ${isOpen ? "border-neon/40 bg-surface" : "border-border bg-surface/50"}`}
              >
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-6 p-6 text-left">
                  <span className="font-display text-lg font-medium">{f.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-neon">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-muted-foreground">{f.a}</div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------- Final CTA ----------------- */
export function FinalCTA() {
  return (
    <section id="cta" className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2rem] border border-neon/30 bg-gradient-to-br from-surface to-background p-10 sm:p-16 lg:p-24 text-center glow-neon"
        >
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
          <div className="pointer-events-none absolute inset-0 radial-glow" />
          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neon">
              <Sparkles className="h-3.5 w-3.5" /> Ready when you are
            </div>
            <h2 className="font-display text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
              Let's build something <span className="text-gradient">worth scaling.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              Tell us about your project. We'll come back within 24 hours with a clear next step.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <MagneticButton className="!px-7 !py-4 !text-base">
                  Start a project <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-3 rounded-full border border-border bg-surface/50 px-6 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:bg-surface">
                <MessageCircle className="h-4 w-4 text-neon" /> Chat on WhatsApp
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-neon" /> hello@nexus.lk</span>
              <span className="inline-flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-neon" /> Book a call</span>
              <span className="inline-flex items-center gap-2"><MessageCircle className="h-3.5 w-3.5 text-neon" /> WhatsApp priority</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
