import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV = [
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "ALLFIX", to: "/allfix" },
  { label: "About", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-neon glow-neon"
    />
  );
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [enabled] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(pointer: fine)").matches : true
  );
  useEffect(() => {
    if (!enabled) return;
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [enabled]);
  if (!enabled) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[55] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl transition-transform duration-300 ease-out"
      style={{
        left: pos.x,
        top: pos.y,
        background: "radial-gradient(circle, oklch(0.76 0.17 162 / 0.25), transparent 70%)",
      }}
    />
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  const [open, setOpen] = useState(false);

  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
      >
        <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 sm:px-6 ${scrolled ? "mx-4 sm:mx-auto bg-surface shadow-lg shadow-black/40 border border-border/50" : "bg-transparent"}`}>
          <Link to="/" className="group flex items-center relative w-36 md:w-48 h-8">
            <img 
              src="/logo/Nexus-01.png" 
              alt="Nexus Logo" 
              className="absolute left-0 top-1/2 -translate-y-[44%] h-24 md:h-28 lg:h-36 w-auto max-w-none origin-left drop-shadow-xl" 
            />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`group relative rounded-full px-4 py-2 text-sm transition-colors hover:text-foreground ${location.pathname === n.to ? "text-foreground" : "text-muted-foreground"}`}
              >
                {n.label}
                <span className="absolute inset-x-4 -bottom-px h-px origin-left scale-x-0 bg-neon transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/contact" className="hidden md:inline-flex">
              <MagneticButton>Start a project <ArrowUpRight className="h-4 w-4" /></MagneticButton>
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center"><LogoMark className="h-10" /></div>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex flex-col gap-2 px-6 pt-10">
              {NAV.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={n.to} className="block border-b border-border py-5 font-display text-3xl">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/contact" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-neon px-6 py-4 text-base font-semibold text-background">
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <img 
      src="/logo/Nexus-01.png" 
      alt="Nexus Logo" 
      className={`h-8 w-auto object-contain ${className}`} 
    />
  );
}

export function MagneticButton({ children, className = "", as = "span" }: { children: React.ReactNode; className?: string; as?: "span" | "button" }) {
  const [t, setT] = useState({ x: 0, y: 0 });
  const Tag: React.ElementType = as;
  return (
    <Tag
      onMouseMove={(e: React.MouseEvent<HTMLElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        setT({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25 });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{ transform: `translate(${t.x}px, ${t.y}px)` }}
      className={`inline-flex items-center gap-2 rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-background transition-transform duration-200 hover:scale-[1.03] glow-neon ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-border bg-surface/30">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 radial-glow" />
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center"><LogoMark /></div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The Tech Division of The Matrices Pvt Ltd,<br />
              Building Technology That Drives Business.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">Colombo · Badulla · Global</p>
          </div>
          <FooterCol title="Company" links={[["About", "/about"], ["Services", "/services"], ["Careers", "/careers"], ["Contact", "/contact"]]} />
          <FooterCol title="Product" links={[["ALLFIX", "/allfix"], ["Case Studies", "/#case-studies"], ["Team", "/#team"]]} />
          <FooterCol title="Connect" links={[["WhatsApp", "https://wa.me/94769696083"], ["Email", "mailto:01nexus.solutions@gmail.com"], ["Book a call", "/contact"]]} />
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Nexus Solutions — The Matrices Pvt Ltd. All rights reserved.</p>
          <p className="font-mono">v1.0 · Built with intent.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{title}</h4>
      <ul className="space-y-2">
        {links.map(([label, to]) => {
          const isExternal = to.startsWith("http") || to.startsWith("mailto:");
          return (
            <li key={label}>
              {isExternal ? (
                <a href={to} target={to.startsWith("http") ? "_blank" : undefined} rel={to.startsWith("http") ? "noopener noreferrer" : undefined} className="text-sm text-foreground/80 transition-colors hover:text-neon">
                  {label}
                </a>
              ) : (
                <Link to={to} className="text-sm text-foreground/80 transition-colors hover:text-neon">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SpaceParticles({ count = 40 }: { count?: number }) {
  const [particles] = useState(() =>
    Array.from({ length: count }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 15 + 15,
    }))
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: ["0%", "-50%"],
            opacity: [p.opacity, p.opacity * 1.2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
