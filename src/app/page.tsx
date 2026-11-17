import { Hero } from "@/components/home/hero";
import { StatsSection } from "@/components/home/stats-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ServicesSection } from "@/components/home/services-section";
import { InteractiveTerminal } from "@/components/home/interactive-terminal";
import { TechStack } from "@/components/home/tech-stack";
import { ProcessSection } from "@/components/home/process-section";
import { AboutPreview } from "@/components/home/about-preview";
import { ContactCTA } from "@/components/home/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedProjects />
      <ServicesSection />
      <InteractiveTerminal />
      <TechStack />
      <ProcessSection />
      <AboutPreview />
      <ContactCTA />
    </>
  );
}
