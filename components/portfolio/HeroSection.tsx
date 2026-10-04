"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, FileText, ArrowRight, Github } from "lucide-react"
import { useEffect, useState } from "react"
import EtchedAccretion from "@/components/ui/etched-accretion"

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const scrollToNext = () => {
    const nextSection = document.getElementById('projects')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Cyan "Technical OS" styling for the singularity
  const accretionParams = {
    diskColor: "#00E5FF",       // accent-cyan
    streakColor: "#ffffff",     // bright white inner
    glowColor: "#00E5FF",       // cyan flare
    cloudColor: "#0a192f",      // dark navy for nebula
    background: "#050505",      // bg-deep
    crimson: 0.15,
    angle: -10,                 
    inclination: 0.35,          // match the tilt in the reference
    center: [0.7, 0.5] as [number, number], // push to the right side
    speed: 0.8,
    grain: 0.8,
    lensing: 1.2,
    exposure: 1.2
  }

  const CONTACT_CARDS = [
    { icon: Mail, label: "EMAIL", href: "mailto:Youssefelsayed5520055@gmail.com" },
    { icon: Linkedin, label: "LINKEDIN", href: "https://linkedin.com/in/youssef-elsayed-543695344" },
    { icon: Github, label: "GITHUB", href: "https://github.com/youssef5520055" },
    { icon: FileText, label: "RESUME", href: "/CV/Youssef_Elsayed_Abdelaziz.pdf" }
  ]

  return (
    <EtchedAccretion 
      height="100svh" 
      params={accretionParams} 
      className=""
    >
      <div className="relative w-full flex-1 max-w-[1600px] mx-auto px-6 lg:px-12 pt-32 pb-12 z-10 flex flex-col justify-between pointer-events-none">
        
        {/* Top-Right Contact Cards */}
        <div className="absolute top-32 right-6 lg:right-12 flex gap-4 md:gap-6 z-20">
          {CONTACT_CARDS.map((card, idx) => (
            <motion.a
              key={card.label}
              href={card.href}
              target={card.label !== "EMAIL" ? "_blank" : undefined}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (idx * 0.1), duration: 0.6, ease: "easeOut" }}
              className="group relative flex flex-col items-center justify-center w-24 h-20 md:w-32 md:h-24 border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 bg-black/40 backdrop-blur-md pointer-events-auto transition-all hover:bg-black/60 rounded-2xl overflow-hidden shadow-lg"
            >
              <card.icon className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)] mb-2 transition-colors" strokeWidth={1.5} />
              <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-[var(--text-secondary)] group-hover:text-white uppercase transition-colors">
                {card.label}
              </span>

              {/* Bottom active line on hover - softened */}
              <div className="absolute bottom-0 w-8 h-[2px] bg-transparent group-hover:bg-[var(--accent-cyan)] group-hover:shadow-[0_0_8px_var(--accent-cyan)] transition-all duration-300 rounded-t-full" />
            </motion.a>
          ))}
        </div>
        
        {/* Main Content Area */}
        <div className="w-full max-w-3xl space-y-8 mt-auto md:mt-24 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-4 text-[10px] md:text-xs font-mono tracking-[0.2em] text-[var(--text-muted)] uppercase"
          >
            <span className="w-6 h-[1px] bg-[var(--accent-cyan)] rounded-full" />
            // Building Secure, Intelligent Systems
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-lg"
          >
            Software Engineer <br />
            <span className="text-[var(--text-muted)]">&</span> Cybersecurity Specialist <br />
            Exploring <span className="text-[var(--accent-cyan)] drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">AI</span> <span className="text-[var(--text-muted)]">&</span> Building <br />
            What's Next
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed drop-shadow-md"
          >
            I build secure, scalable and intelligent systems — from machine learning models to real-world applications, with a focus on cybersecurity and modern software engineering.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4 pointer-events-auto"
          >
            <button 
              onClick={scrollToNext}
              className="group relative px-6 py-3 border border-[var(--border-strong)] hover:border-[var(--accent-cyan)] bg-black/20 hover:bg-[var(--accent-cyan)]/5 backdrop-blur-sm transition-all flex items-center gap-3 text-xs font-mono tracking-widest text-white uppercase rounded-xl"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="mailto:Youssefelsayed5520055@gmail.com"
              className="group relative px-6 py-3 border border-transparent hover:border-[var(--border-subtle)] bg-transparent hover:bg-black/20 backdrop-blur-sm transition-all flex items-center gap-3 text-xs font-mono tracking-widest text-[var(--text-secondary)] hover:text-white uppercase rounded-xl"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex justify-between items-end pb-4 pt-12 md:pt-0 pointer-events-none opacity-60">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-4 text-[10px] font-mono tracking-[0.2em] text-[var(--text-muted)] uppercase"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-[var(--text-muted)]" />
              <div className="w-2 h-2 border border-[var(--accent-cyan)] rotate-45" />
            </div>
            Scroll
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-[9px] md:text-[10px] font-mono tracking-[0.2em] text-[var(--text-muted)] uppercase flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 bg-[var(--accent-cyan)] animate-pulse" />
            CS / Cybersecurity / AI / ML
          </motion.div>
        </div>

      </div>
    </EtchedAccretion>
  )
}
