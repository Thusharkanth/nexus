import { Hero } from "@/components/sections/Hero";
import {
  AboutPreview, Services, Marquee, AllfixHighlight, WhyChoose,
  CaseStudies, Process, Team, Testimonials, FAQ, FinalCTA
} from "@/components/sections/Sections";
import { Navbar, Footer, ScrollProgress, CursorGlow, SpaceParticles } from "@/components/SiteChrome";

export default function Home() {
  return (
    <div className="relative">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Hero />
      <div className="relative z-10 bg-black overflow-hidden">
        <SpaceParticles count={30} />
        <AboutPreview />
      </div>
      <div 
        className="relative z-10 overflow-hidden"
        style={{ backgroundColor: "color-mix(in srgb, var(--neon) 2%, black)" }}
      >
        <SpaceParticles count={150} />
        <Marquee />
        <Services />
        <AllfixHighlight />
        <WhyChoose />
        <CaseStudies />
        <Process />
        <Team />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
