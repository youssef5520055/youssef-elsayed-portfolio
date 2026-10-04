"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { Shield, Cloud, Server, BookOpen, Award, ChevronDown, ChevronUp } from "lucide-react"

const certifications = [
  // Top 8 (Most relevant / impressive)
  { name: "Certified Kubernetes Security Specialist (CKS)", issuer: "UDEMY", icon: Shield },
  { name: "CC Certified in Cybersecurity", issuer: "Cisco Networking Academy", icon: Shield },
  { name: "Ethical Hacker", issuer: "Cisco Networking Academy", icon: Shield },
  { name: "Cloud Architecting", issuer: "AWS Academy Graduate", icon: Cloud },
  { name: "Red Hat System Administration I (RH124)", issuer: "Red Hat", icon: Server },
  { name: "CCNA: Introduction to Networks", issuer: "Cisco Networking Academy", icon: Server },
  { name: "Foundations of Cybersecurity", issuer: "Google via Coursera", icon: Shield },
  { name: "Cybersecurity Fundamentals", issuer: "IBM SkillsBuild", icon: Shield },
  
  // Remaining Certifications (Hidden by default)
  { name: "OPSWAT Academy Certification", issuer: "OPSWAT Academy", icon: Shield },
  { name: "Cloud Computing Fundamentals", issuer: "IBM SkillsBuild", icon: Cloud },
  { name: "IBM and Cybersecurity", issuer: "IBM SkillsBuild", icon: Shield },
  { name: "Computer Networks for v1.0", issuer: "Huawei ICT Academy", icon: Server },
  { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", icon: Shield },
  { name: "Information Technology Fundamentals", issuer: "IBM SkillsBuild", icon: Server },
  { name: "Working in a Digital World", issuer: "IBM", icon: BookOpen },
  { name: "Cybersecurity Terminology", issuer: "LinkedIn Learning", icon: BookOpen },
  { name: "Project Management Fundamentals", issuer: "IBM SkillsBuild", icon: Award },
  { name: "Developing Your Emotional Intelligence", issuer: "LinkedIn Learning", icon: BookOpen }
]

export default function CertificationsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const [showAll, setShowAll] = useState(false)

  const displayedCerts = showAll ? certifications : certifications.slice(0, 8)

  return (
    <section id="certifications" ref={ref} className="py-32 border-b border-[var(--border-subtle)] bg-transparent relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center flex flex-col items-center"
        >
          <h2 className="text-[10px] font-mono text-[var(--accent-cyan)] mb-4 tracking-[0.2em] uppercase">// Validations & Clearances</h2>
          <h3 className="text-4xl font-bold text-white tracking-tight">Professional Certifications</h3>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence>
            {displayedCerts.map((cert, idx) => (
              <motion.div
                key={cert.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-6 rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] transition-colors flex flex-col items-center justify-center min-h-[160px] text-center group cursor-default"
              >
                <cert.icon className="w-6 h-6 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] mb-4 transition-colors" strokeWidth={1.5} />
                <h4 className="text-xs font-semibold text-white mb-2 leading-relaxed">{cert.name}</h4>
                <span className="text-[10px] uppercase font-mono text-[var(--text-secondary)]">{cert.issuer}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          layout
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <button 
            onClick={() => setShowAll(!showAll)}
            className="group relative px-6 py-3 border border-[var(--border-strong)] hover:border-[var(--accent-cyan)] bg-black/20 hover:bg-[var(--accent-cyan)]/5 backdrop-blur-sm transition-all flex items-center gap-3 text-xs font-mono tracking-widest text-white uppercase rounded-xl"
          >
            {showAll ? "Show Less" : `View All ${certifications.length} Certifications`}
            {showAll ? (
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            ) : (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            )}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
