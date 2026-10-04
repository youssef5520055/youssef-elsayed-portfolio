"use client"

import Navbar from "@/components/portfolio/Navbar"
import HeroSection from "@/components/portfolio/HeroSection"
import AboutSection from "@/components/portfolio/AboutSection"
import SkillsSection from "@/components/portfolio/SkillsSection"
import ProjectsSection from "@/components/portfolio/ProjectsSection"
import CertificationsSection from "@/components/portfolio/CertificationsSection"
import FooterSection from "@/components/portfolio/FooterSection"
import Starfield from "@/components/ui/Starfield"

export default function YoussefPortfolio() {
  return (
    <main className="relative text-[var(--text-primary)]">
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
