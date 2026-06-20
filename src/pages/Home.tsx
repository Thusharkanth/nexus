import { Hero } from "@/components/sections/Hero";
import {
  AboutPreview, Services, Marquee, AllfixHighlight, WhyChoose,
  CaseStudies, Process, Team, Testimonials, FAQ, FinalCTA
} from "@/components/sections/Sections";
import { Navbar, Footer, ScrollProgress, CursorGlow } from "@/components/SiteChrome";

export default function Home() {
  return (
    <div className="relative">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Hero />
      <AboutPreview />
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
  );
}
