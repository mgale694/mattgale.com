import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/about-section";
import { WorkSection } from "@/components/portfolio/work-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { ScrollProgress } from "@/components/portfolio/scroll-progress";

export const Route = createFileRoute("/")({ component: Portfolio });
function Portfolio() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="portfolio" data-motion={paused ? "paused" : "active"}>
      <ScrollProgress />
      <HeroSection paused={paused} onToggleMotion={() => setPaused(!paused)} />
      <AboutSection paused={paused} />
      <WorkSection paused={paused} />
      <ContactSection paused={paused} />
    </div>
  );
}
