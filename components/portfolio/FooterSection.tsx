"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight, Mail, Linkedin, FileText, ArrowUpRight, Github, MessageCircle } from "lucide-react"

const Signature = () => (
  <svg 
    viewBox="0 0 300 120" 
    className="w-48 h-auto stroke-[var(--text-secondary)] fill-none opacity-50 hover:stroke-[var(--accent-cyan)] hover:opacity-100 transition-all duration-700 ease-out" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
  >
     <path d="M25,40 C35,20 50,20 55,35 C60,55 45,85 30,90 C15,95 10,80 15,65 C20,50 40,45 65,45" />
     <path d="M65,45 C75,35 75,55 85,50 C95,45 105,55 110,40 C115,25 115,60 110,70 C105,85 95,95 125,60" />
     <path d="M145,35 C130,25 120,45 130,50 C120,55 115,70 140,70" />
     <path d="M140,70 C155,25 160,20 155,60 C165,55 175,45 185,60 C195,75 195,45 205,45 C215,45 215,80 205,95 C195,110 220,80 230,65 C240,50 250,75 280,60" />
     <path d="M100,90 C150,110 230,95 280,85" strokeWidth="1.2" opacity="0.4" />
  </svg>
)

export default function FooterSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const [showOptions, setShowOptions] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
  ]

  const SOCIAL_LINKS = [
    { label: "Email", href: "mailto:Youssefelsayed5520055@gmail.com", icon: Mail },
    { label: "LinkedIn", href: "https://linkedin.com/in/youssef-elsayed-543695344", icon: Linkedin },
    { label: "GitHub", href: "https://github.com/youssef5520055", icon: Github },
    { label: "WhatsApp", href: "https://wa.me/201208682811", icon: MessageCircle },
    { label: "Resume", href: "/CV/Youssef_Elsayed_Abdelaziz.pdf", icon: FileText },
  ]

  return (
    <footer id="contact" ref={ref} className="relative pt-32 pb-12 border-t border-[var(--border-subtle)] overflow-hidden bg-transparent">
      
      {/* Grounding Gradient: Fades to deep black at the very bottom edge */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#020202] to-transparent pointer-events-none z-0" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col gap-24">
        
        {/* TOP SECTION: CTA & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* LEFT: CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col gap-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Let's build secure,<br />
              <span className="text-[var(--accent-cyan)]">intelligent systems.</span>
            </h2>
            
            <div className="relative w-fit mt-4">
              <button 
                onClick={() => setShowOptions(!showOptions)}
                className="group relative inline-flex items-center gap-4 cursor-pointer"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[var(--border-strong)] bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-[var(--accent-cyan)] group-hover:border-[var(--accent-cyan)] transition-all duration-500 overflow-hidden">
                  <ArrowRight className={`w-5 h-5 text-[var(--text-secondary)] group-hover:text-black transition-all duration-300 ${showOptions ? 'rotate-90 text-black' : 'group-hover:translate-x-1'}`} strokeWidth={1.5} />
                </div>
                <span className="text-lg md:text-xl font-medium text-[var(--text-secondary)] group-hover:text-white transition-colors duration-300">
                  Initiate Contact
                </span>
              </button>

              <AnimatePresence>
                {showOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-6 flex flex-col sm:flex-row gap-3 p-3 rounded-2xl bg-[#050505]/90 backdrop-blur-xl border border-[var(--border-strong)] shadow-2xl z-50 min-w-max"
                  >
                    <a 
                      href="https://wa.me/201208682811" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-[var(--accent-cyan)]/10 hover:text-white transition-colors border border-transparent hover:border-[var(--accent-cyan)]/30 text-[var(--text-secondary)] group/item"
                    >
                      <MessageCircle className="w-5 h-5 group-hover/item:text-[var(--accent-cyan)] transition-colors" />
                      <span className="font-mono text-xs tracking-widest uppercase mt-0.5">WhatsApp</span>
                    </a>
                    <a 
                      href="mailto:Youssefelsayed5520055@gmail.com" 
                      className="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-[var(--accent-cyan)]/10 hover:text-white transition-colors border border-transparent hover:border-[var(--accent-cyan)]/30 text-[var(--text-secondary)] group/item"
                    >
                      <Mail className="w-5 h-5 group-hover/item:text-[var(--accent-cyan)] transition-colors" />
                      <span className="font-mono text-xs tracking-widest uppercase mt-0.5">Email</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT: Navigation & Socials */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-4 lg:col-start-9 grid grid-cols-2 gap-12"
          >
            {/* Nav */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">Navigation</h4>
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map(link => (
                  <a 
                    key={link.label} 
                    href={link.href}
                    className="text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors flex items-center gap-2 group w-fit"
                  >
                    <span className="w-0 h-[1px] bg-[var(--accent-cyan)] group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">Connect</h4>
              <nav className="flex flex-col gap-4">
                {SOCIAL_LINKS.map(link => (
                  <a 
                    key={link.label} 
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors flex items-center gap-3 group w-fit"
                  >
                    <link.icon className="w-4 h-4" strokeWidth={1.5} />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" strokeWidth={2} />
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM SECTION: Identity, Signature, Metadata */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col gap-8"
        >
          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-[var(--border-subtle)] via-[var(--border-strong)] to-[var(--border-subtle)] opacity-50" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            
            {/* Identity */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <span className="font-mono text-xl md:text-2xl font-bold text-white tracking-widest uppercase">
                  Y<span className="text-[var(--accent-cyan)]">.</span>Elsayed
                </span>
                <span className="text-[10px] md:text-xs font-mono text-[var(--text-secondary)] tracking-widest uppercase mt-1">
                  Systems / Security / AI
                </span>
              </div>
              
              <div className="flex items-center gap-3 mt-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
                <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase">
                  SYS.STATUS // NORMAL
                </span>
              </div>
            </div>

            {/* Signature & Back to Top */}
            <div className="flex flex-col items-start md:items-end gap-6">
              <div className="transform rotate-2 origin-bottom-right">
                <Signature />
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 w-full justify-between md:justify-end">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                  © {new Date().getFullYear()} Youssef Elsayed. All rights reserved.
                </span>
                
                <button 
                  onClick={scrollToTop}
                  className="text-[10px] font-mono text-[var(--text-secondary)] hover:text-white uppercase tracking-widest flex items-center gap-2 group transition-colors"
                >
                  Back to Top
                  <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </button>
              </div>
            </div>
            
          </div>
        </motion.div>
        
      </div>
    </footer>
  )
}
