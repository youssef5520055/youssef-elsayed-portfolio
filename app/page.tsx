import dynamic from "next/dynamic"
import Navbar from "@/components/portfolio/Navbar"
import HeroSection from "@/components/portfolio/HeroSection"
import ClientSetup from "@/components/portfolio/ClientSetup"

const ManifestoSection = dynamic(() => import("@/components/portfolio/ManifestoSection"))
const AboutSection = dynamic(() => import("@/components/portfolio/AboutSection"))
const ProjectsSection = dynamic(() => import("@/components/portfolio/ProjectsSection"))
const SkillsSection = dynamic(() => import("@/components/portfolio/SkillsSection"))
const ExperienceSection = dynamic(() => import("@/components/portfolio/ExperienceSection"))
const CertificationsSection = dynamic(() => import("@/components/portfolio/CertificationsSection"))
const FaqEndorsementsSection = dynamic(() => import("@/components/portfolio/FaqEndorsementsSection"))
const ContactDeckSection = dynamic(() => import("@/components/portfolio/ContactDeckSection"))
const FooterSection = dynamic(() => import("@/components/portfolio/FooterSection"))

export default function YoussefPortfolio() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-deep)] text-[var(--text-primary)]">
      <ClientSetup />
      <Navbar />
      <main id="main-content" className="relative">
        <HeroSection />
        <ManifestoSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <CertificationsSection />
        <FaqEndorsementsSection />
        <ContactDeckSection />
      </main>
      <FooterSection />
    </div>
  )
}
