import dynamic from "next/dynamic"
import Navbar from "@/components/portfolio/Navbar"
import HeroSection from "@/components/portfolio/HeroSection"
import ClientSetup from "@/components/portfolio/ClientSetup"
import Starfield from "@/components/ui/Starfield"

// Dynamically import below-the-fold sections to heavily reduce initial JS bundle and hydration delay
const AboutSection = dynamic(() => import("@/components/portfolio/AboutSection"))
const SkillsSection = dynamic(() => import("@/components/portfolio/SkillsSection"))
const ProjectsSection = dynamic(() => import("@/components/portfolio/ProjectsSection"))
const CertificationsSection = dynamic(() => import("@/components/portfolio/CertificationsSection"))
const FooterSection = dynamic(() => import("@/components/portfolio/FooterSection"))

export default function YoussefPortfolio() {
  return (
    <main className="relative text-[var(--text-primary)]">
      <ClientSetup />
      <Starfield />
      <Navbar />
      <HeroSection />
      
      {/* Container for sections that will share the starfield background. 
          We ensure these sections sit on top of the starfield but have transparent backgrounds. */}
      <div className="relative z-10">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
        <FooterSection />
      </div>
    </main>
  )
}
