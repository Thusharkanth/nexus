import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { MagneticButton } from "@/components/SiteChrome";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const videoLayerRef = useRef<HTMLVideoElement>(null);

  // Use a ref to track scroll/play state — avoids triggering React re-renders on every scroll event
  const isPlayingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  // Only a single boolean for React state — content overlay visibility
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);

  const handleScroll = useCallback(() => {
    const video = videoRef.current;
    const imageLayer = imageLayerRef.current;
    const videoLayer = videoLayerRef.current;
    if (!video || !imageLayer || !videoLayer) return;

    const scrollTop = window.scrollY;
    const threshold = 10;
    const outOfView = scrollTop > window.innerHeight * 1.5;

    if (scrollTop > threshold && !outOfView) {
      // Fade image out, video in — directly via style to avoid React render
      imageLayer.style.opacity = "0";
      videoLayer.style.opacity = "1";

      if (!isPlayingRef.current) {
        video.playbackRate = 2.0;
        video.play().catch(() => {});
        isPlayingRef.current = true;
      }

      if (!isScrolledRef.current) {
        isScrolledRef.current = true;
        setIsScrolled(true);
      }
    } else if (outOfView) {
      // Past hero — pause to save resources
      if (isPlayingRef.current) {
        video.pause();
        isPlayingRef.current = false;
      }
    } else {
      // Back at the top
      imageLayer.style.opacity = "1";
      videoLayer.style.opacity = "0";

      if (isPlayingRef.current) {
        video.pause();
        video.currentTime = 0;
        isPlayingRef.current = false;
      }

      if (isScrolledRef.current) {
        isScrolledRef.current = false;
        setIsScrolled(false);
      }
    }
  }, []);

  useEffect(() => {
    // Throttle scroll handler via requestAnimationFrame so it never fires more than once per frame
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        handleScroll();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // run once on mount

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  return (
    <section ref={ref} className="relative h-[150vh] w-full bg-background">

      {/* Sticky viewport-locked container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Static image — initial state. Controlled directly via ref (no re-render). */}
        <div
          ref={imageLayerRef}
          className="absolute inset-0 h-full w-full z-10"
          style={{
            opacity: 1,
            transition: "opacity 800ms ease-in-out",
            // GPU compositing hint — keeps this layer on its own compositor thread
            willChange: "opacity",
          }}
        >
          <img
            src="/Hero/NewDiamond.png"
            alt="Nexus Solutions Hero"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center"
            style={{ transform: "scale(1.05)", transformOrigin: "center" }}
          />
        </div>

        {/* Video — GPU-optimised: no overlapping blur/blend layers above it.
            willChange + transform: translateZ(0) forces hardware acceleration. */}
        <video
          ref={(el) => {
            (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
            (videoLayerRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
          }}
          src="/Hero/herovideo.mp4"
          playsInline
          muted
          loop
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            opacity: 0,
            transition: "opacity 800ms ease-in-out",
            willChange: "opacity",
            // Force the video onto its own compositor layer — critical for smooth decode
            transform: "translateZ(0)",
          }}
        />

        {/* Single lightweight gradient overlay — NO mix-blend, NO backdrop-blur.
            Pure GPU-friendly semi-transparent layer. */}
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

        {/* Floating shapes — backdrop-blur removed to prevent extra composite layers over video */}
        <FloatingShapes />

        {/* Hero content — stays visible on scroll over the video */}
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

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span>Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-black/30"
              >
                <ArrowDown className="h-4 w-4 text-neon" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RevealWords({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
}

// Floating shapes — backdrop-blur REMOVED to prevent GPU composite layers being created above video
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
