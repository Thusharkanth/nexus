import { motion } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { MagneticButton } from "@/components/SiteChrome";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const v1 = useRef<HTMLVideoElement>(null);
  const v2 = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (v1.current) v1.current.playbackRate = 0.8;
    if (v2.current) v2.current.playbackRate = 0.8;
    // Initial play for v1
    if (v1.current) {
      v1.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const currentVid = activeVideo === 1 ? v1.current : v2.current;
    const nextVid = activeVideo === 1 ? v2.current : v1.current;
    
    if (!currentVid || !nextVid) return;

    let transitioned = false;

    const handleTime = () => {
      if (!currentVid.duration) return;
      const timeLeft = currentVid.duration - currentVid.currentTime;
      
      // Crossfade 0.8 seconds before the video ends
      if (timeLeft <= 0.8 && !transitioned) {
        transitioned = true;
        nextVid.currentTime = 0;
        nextVid.play().catch(() => {});
        setActiveVideo(activeVideo === 1 ? 2 : 1);
        
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 1500);
      }
    };

    currentVid.addEventListener("timeupdate", handleTime);
    return () => {
      currentVid.removeEventListener("timeupdate", handleTime);
    };
  }, [activeVideo]);

  return (
    <section ref={ref} className="relative h-[150vh] w-full bg-background">

      {/* Sticky viewport-locked container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Two videos for true crossfading */}
        <video
          ref={v1}
          src="/Hero/Diamond_rotating.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className={`absolute inset-0 h-full w-full object-cover z-10 transition-opacity duration-[800ms] ease-in-out ${activeVideo === 1 ? 'opacity-100' : 'opacity-0'}`}
        />
        <video
          ref={v2}
          src="/Hero/Diamond_rotating.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className={`absolute inset-0 h-full w-full object-cover z-10 transition-opacity duration-[800ms] ease-in-out ${activeVideo === 2 ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.72) 100%)",
          }}
        />

        {/* Bottom fade to blend with sections below */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 z-20"
          style={{
            background:
              "linear-gradient(to top, var(--background) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
          }}
        />

        {/* Floating shapes */}
        <FloatingShapes />
        
        {/* Transition particles that appear when video fades */}
        <TransitionParticles show={showParticles} />

        {/* Hero content */}
        <motion.div
          key="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.6 } }}
          className="absolute inset-0 z-30 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pt-32 pb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-4 sm:mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-[4px]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-neon" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            <span className="text-muted-foreground">A division of</span>
            <span className="font-semibold text-foreground">The Matrices Pvt Ltd</span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.2rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-balance">
            <RevealWords text="Engineering the" delay={0.3} />
            <br />
            <RevealWords text="future of" delay={0.5} className="text-muted-foreground/80" />
            <span className="ml-2 sm:ml-3 inline-block">
              <RevealWords text="business." delay={0.7} className="text-gradient" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-5 sm:mt-6 max-w-xl text-sm text-muted-foreground sm:text-base text-balance"
          >
            Nexus Solutions delivers AI-powered software, SaaS products, and digital transformation services
            built to help modern teams automate, scale, and lead.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4"
          >
            <Link to="/contact">
              <MagneticButton className="!px-5 !py-3 sm:!px-6 sm:!py-3.5 !text-sm sm:!text-base">
                Start a project <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
            <Link
              to="/allfix"
              className="group inline-flex items-center gap-3 rounded-full border border-border bg-surface/50 px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-medium transition-colors hover:bg-surface"
            >
              <span className="grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full bg-neon/15 text-neon transition-transform group-hover:scale-110">
                <Play className="h-3 w-3 fill-current" />
              </span>
              Explore ALLFIX SaaS
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.35 }}
            className="mt-10 sm:mt-14 grid max-w-3xl grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6 border-t border-border/60 pt-5 sm:pt-6 sm:grid-cols-4"
          >
            {[
              ["50+", "Projects shipped"],
              ["12", "Industries served"],
              ["2", "Global locations"],
              ["24/7", "Partner support"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-semibold text-foreground sm:text-3xl">{v}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{l}</div>
              </div>
            ))}
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
}

function RevealWords({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-block pb-1 ${className}`}
      >
        {text}
      </motion.span>
    </span>
  );
}

function FloatingShapes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      <div className="animate-float absolute left-[8%] top-[22%] h-24 w-24 rounded-2xl border border-neon/25 bg-neon/5" style={{ animationDelay: "0s" }} />
      <div className="animate-float absolute right-[10%] top-[30%] h-16 w-16 rounded-full border border-white/15 bg-white/5" style={{ animationDelay: "1.5s" }} />
      <div className="animate-float absolute right-[18%] bottom-[20%] h-20 w-20 rotate-12 border border-neon/25" style={{ animationDelay: "3s" }} />
      <div className="animate-float absolute left-[14%] bottom-[18%] h-3 w-3 rounded-full bg-neon glow-neon" style={{ animationDelay: "2s" }} />
    </div>
  );
}

function TransitionParticles({ show }: { show: boolean }) {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 1.5 + 1,
    }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="pointer-events-none absolute inset-0 z-[15] overflow-hidden"
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-neon shadow-[0_0_8px_rgba(4,210,148,0.8)]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={show ? {
            y: [0, -30, -60],
            opacity: [0, 0.8, 0],
            scale: [1, 1.5, 0.5],
          } : {}}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

