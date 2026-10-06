"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, FileText, ArrowRight, Github } from "lucide-react"
import { useEffect, useState } from "react"
import EtchedAccretion from "@/components/ui/etched-accretion"

const DecryptedText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      setDisplayText(text)
      return
    }

    const CHARS = "ABCDEF0123456789!@#$%^&*()_+{}[];'<>"
    let iteration = 0
    let interval: NodeJS.Timeout

    setDisplayText(
      text.split("").map(c => c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]).join("")
    )

    const animate = () => {
      interval = setInterval(() => {
        setDisplayText((current) => 
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " "
              if (index < iteration) {
                return text[index]
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join("")
        )

        if (iteration >= text.length) {
          clearInterval(interval)
        }
        
        iteration += 0.8
      }, 30)
    }

    const timeout = setTimeout(animate, 50)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [text])

  if (text === "& Cybersecurity Specialist") {
    const ampersand = displayText.charAt(0)
    const rest = displayText.slice(1)
    return (
      <>
        <span className="text-[var(--text-muted)]">{ampersand}</span>{rest}
      </>
    )
  }

  return <span>{displayText}</span>
}

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
    { icon: Mail, label: "EMAIL", href: "mailto:Youssefelsayed5520055@gmail.com?subject=Professional%20Inquiry%3A%20Software%20Engineering%20%26%20Security&body=Hello%20Youssef%2C%0D%0A%0D%0AI%20recently%20reviewed%20your%20portfolio%20and%20was%20highly%20impressed%20by%20your%20expertise%20in%20software%20architecture%2C%20cybersecurity%2C%20and%20AI.%0D%0A%0D%0AI%20am%20reaching%20out%20to%20discuss%20a%20potential%20opportunity%20and%20would%20love%20to%20connect.%0D%0A%0D%0ABest%20regards%2C%0D%0A%5BYour%20Name%5D" },
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
      <div className="relative w-full flex-1 max-w-[1600px] mx-auto px-6 lg:px-12 pt-32 pb-12 z-10 flex flex-col justify-between pointer-events-none min-h-full">
        
        {/* Top-Right Contact Cards (Absolute on Desktop, Scrollable/Grid on Mobile) */}
        <div className="lg:absolute lg:top-32 lg:right-12 flex lg:flex-row flex-wrap lg:flex-nowrap gap-3 md:gap-4 z-20 mt-8 lg:mt-0 justify-start w-full lg:w-auto">
          {CONTACT_CARDS.map((card, idx) => (
            <motion.a
              key={card.label}
              href={card.href}
              target={card.label !== "EMAIL" ? "_blank" : undefined}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (idx * 0.1), duration: 0.6, ease: "easeOut" }}
              className="group relative flex flex-col items-center justify-center w-[calc(50%-6px)] sm:w-24 h-16 sm:h-20 md:w-32 md:h-24 border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/50 bg-black/40 backdrop-blur-md pointer-events-auto transition-all hover:bg-black/60 rounded-2xl overflow-hidden shadow-lg"
            >
              <card.icon className="w-4 h-4 md:w-5 md:h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)] mb-1 md:mb-2 transition-colors" strokeWidth={1.5} />
              <span className="text-[8px] md:text-[10px] font-mono tracking-widest text-[var(--text-secondary)] group-hover:text-white uppercase transition-colors">
                {card.label}
              </span>

              {/* Bottom active line on hover - softened */}
              <div className="absolute bottom-0 w-8 h-[2px] bg-transparent group-hover:bg-[var(--accent-cyan)] group-hover:shadow-[0_0_8px_var(--accent-cyan)] transition-all duration-300 rounded-t-full" />
            </motion.a>
          ))}
        </div>
        
        {/* Main Content Area */}
        <div className="w-full max-w-3xl space-y-6 md:space-y-8 mt-auto lg:mt-24 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-3 md:gap-4 text-[9px] md:text-xs font-mono tracking-[0.15em] md:tracking-[0.2em] text-[var(--text-muted)] uppercase"
          >
            <span className="w-4 md:w-6 h-[1px] bg-[var(--accent-cyan)] rounded-full" />
            // Building Secure, Intelligent Systems
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.2] lg:leading-[1.15] drop-shadow-lg"
          >
            Software Engineer <br className="hidden sm:block" />
              <DecryptedText text="& Cybersecurity Specialist" /> <br className="hidden sm:block" />
            Exploring <span className="text-[var(--accent-cyan)] drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">AI</span> <span className="text-[var(--text-muted)]">&</span> Building <br className="hidden sm:block" />
            What's Next
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed drop-shadow-md"
          >
            I build secure, scalable and intelligent systems — from machine learning models to real-world applications, with a focus on cybersecurity and modern software engineering.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-4 pointer-events-auto w-full sm:w-auto"
          >
            <button 
              onClick={scrollToNext}
              className="group relative px-6 py-3 border border-[var(--border-strong)] hover:border-[var(--accent-cyan)] bg-black/20 hover:bg-[var(--accent-cyan)]/5 backdrop-blur-sm transition-all flex items-center justify-center gap-3 text-[10px] md:text-xs font-mono tracking-widest text-white uppercase rounded-xl w-full sm:w-auto"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="mailto:Youssefelsayed5520055@gmail.com?subject=Professional%20Inquiry%3A%20Software%20Engineering%20%26%20Security&body=Hello%20Youssef%2C%0D%0A%0D%0AI%20recently%20reviewed%20your%20portfolio%20and%20was%20highly%20impressed%20by%20your%20expertise%20in%20software%20architecture%2C%20cybersecurity%2C%20and%20AI.%0D%0A%0D%0AI%20am%20reaching%20out%20to%20discuss%20a%20potential%20opportunity%20and%20would%20love%20to%20connect.%0D%0A%0D%0ABest%20regards%2C%0D%0A%5BYour%20Name%5D"
              className="group relative px-6 py-3 border border-transparent hover:border-[var(--border-subtle)] bg-transparent hover:bg-black/20 backdrop-blur-sm transition-all flex items-center justify-center gap-3 text-[10px] md:text-xs font-mono tracking-widest text-[var(--text-secondary)] hover:text-white uppercase rounded-xl w-full sm:w-auto"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex justify-between items-end pb-4 pt-12 lg:pt-0 pointer-events-none opacity-60">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-mono tracking-[0.15em] md:tracking-[0.2em] text-[var(--text-muted)] uppercase"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-[1px] h-6 md:h-8 bg-gradient-to-b from-transparent to-[var(--text-muted)]" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 border border-[var(--accent-cyan)] rotate-45" />
            </div>
            Scroll
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-[0.1em] sm:tracking-[0.2em] text-[var(--text-muted)] uppercase flex items-center gap-2 md:gap-3 text-right max-w-[50%]"
          >
            <span className="w-1.5 h-1.5 bg-[var(--accent-cyan)] animate-pulse flex-shrink-0" />
            <span className="truncate sm:overflow-visible sm:whitespace-normal">CS / Cyber / AI</span>
          </motion.div>
        </div>

      </div>
    </EtchedAccretion>
  )
}
