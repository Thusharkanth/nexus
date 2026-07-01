import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Home from "@/pages/Home";
import About from "@/pages/About";
import ServicesPage from "@/pages/ServicesPage";
import Contact from "@/pages/Contact";
import Allfix from "@/pages/Allfix";
import Portfolio from "@/pages/Portfolio";
import PortfolioCategory from "@/pages/PortfolioCategory";
import Careers from "@/pages/Careers";
import { IntroVideo } from "@/components/IntroVideo";

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppRoutes({ introComplete }: { introComplete: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Only animate AFTER the intro is completely finished and faded out to black
    if (introComplete && contentRef.current && !hasAnimated.current) {
      hasAnimated.current = true;
      // Reveal main content with a pure smooth fade-in
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut",
        }
      );
    }
  }, [introComplete]);

  return (
    <div
      ref={contentRef}
      className="opacity-0"
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:category" element={<PortfolioCategory />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/allfix" element={<Allfix />} />
      </Routes>
    </div>
  );
}

export default function App() {
  // Show intro only on "/" and only once per session
  const skipIntro = sessionStorage.getItem("nexus_intro_played") === "true";
  const [introComplete, setIntroComplete] = useState(skipIntro);
  const [showIntro, setShowIntro] = useState(!skipIntro);

  const handleIntroComplete = () => {
    sessionStorage.setItem("nexus_intro_played", "true");
    setShowIntro(false);
    setIntroComplete(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTopOnRouteChange />
      {showIntro && (
        <IntroVideo onComplete={handleIntroComplete} />
      )}
      <AppRoutes introComplete={introComplete} />
    </BrowserRouter>
  );
}
