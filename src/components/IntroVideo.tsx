"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

type IntroState = "loading" | "ready" | "playing" | "exiting" | "done";

interface IntroVideoProps {
  onComplete: () => void;
}

export function IntroVideo({ onComplete }: IntroVideoProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<IntroState>("loading");
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const isExiting = useRef(false);

  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
    document.body.style.height = "";
  }, []);

  // ─── Exit animation (Smooth cinematic fade) ──────────────────────────────
  const exitIntro = useCallback(() => {
    if (!overlayRef.current || isExiting.current) return;
    isExiting.current = true;
    setState("exiting");

    // Explicitly pause the video to prevent browsers from resetting to frame 0
    if (videoRef.current) {
      videoRef.current.pause();
    }

    // Fade out brand label
    gsap.to(brandRef.current, { opacity: 0, y: -20, duration: 0.4 });

    // Fade out the entire overlay
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        setState("done");
        unlockScroll();
        onComplete();
      },
    });
  }, [onComplete, unlockScroll]);

  useEffect(() => {
    lockScroll();
    const video = videoRef.current;
    if (!video) return;

    const handleMetadata = async () => {
      setState("ready");

      // Fade out loader
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = "none";
        },
      });

      // Fade in video
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // Fade in brand label
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
      );

      // Attempt autoplay
      try {
        video.playbackRate = 2; // Keep at 2x speed
        await video.play();
        setState("playing");
      } catch {
        setAutoplayBlocked(true);
        gsap.fromTo(
          playBtnRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }
        );
      }
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      
      // Stop slightly before the end to prevent rogue frame reset
      if (video.duration - video.currentTime <= 0.2 && !isExiting.current) {
        exitIntro();
      }
    };

    if (video.readyState >= 1) {
      handleMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleMetadata);
    }
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", exitIntro);

    return () => {
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", exitIntro);
    };
  }, [lockScroll, exitIntro]);

  const handleManualPlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 2;
    await video.play().catch(() => {});
    setState("playing");
    setAutoplayBlocked(false);
    gsap.to(playBtnRef.current, { opacity: 0, scale: 0.8, duration: 0.3 });
  };

  if (state === "done") return null;

  return (
    <div
      ref={overlayRef}
      className="intro-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        opacity: 0,
        backgroundColor: "#000",
        willChange: "opacity",
      }}
    >
      {/* ── Loading screen ─────────────────────────────────────────────── */}
      <div
        ref={loaderRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          background: "#000",
          gap: "1.25rem",
        }}
      >
        <div className="intro-spinner" />
        <span
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            fontFamily: "var(--font-sans)",
          }}
        >
          Loading experience…
        </span>
      </div>

      {/* ── Fullscreen video ─────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        src="/Hero/herovideo.mp4"
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload noplaybackrate nofullscreen"
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* ── Brand label (top-left) ────────────────────────────────────────── */}
      <div
        ref={brandRef}
        style={{
          position: "absolute",
          top: "clamp(1.25rem, 4vw, 2rem)",
          left: "clamp(1.25rem, 4vw, 2.5rem)",
          zIndex: 6,
          opacity: 0,
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#04d294",
            boxShadow: "0 0 12px oklch(0.76 0.17 162 / 0.9)",
          }}
        />
        <span
          style={{
            fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
            fontFamily: "var(--font-sans)",
          }}
        >
          Nexus Solutions
        </span>
      </div>

      {/* ── Autoplay blocked – manual play button ────────────────────────── */}
      {autoplayBlocked && (
        <div
          ref={playBtnRef}
          onClick={handleManualPlay}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            cursor: "pointer",
            opacity: 0,
          }}
        >
          <div className="intro-play-btn">
            <svg viewBox="0 0 24 24" fill="currentColor" width={28} height={28}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Tap to begin
          </span>
        </div>
      )}
    </div>
  );
}
