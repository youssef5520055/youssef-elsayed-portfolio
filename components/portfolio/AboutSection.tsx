"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Shield, BrainCircuit, Code2, GraduationCap, MapPin, Globe, ArrowRight, Download } from "lucide-react"

const Signature = () => (
  <svg 
    viewBox="0 0 300 120" 
    className="w-48 h-auto stroke-white fill-none" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.6))" }}
  >
     {/* Y */}
     <path d="M25,40 C35,20 50,20 55,35 C60,55 45,85 30,90 C15,95 10,80 15,65 C20,50 40,45 65,45" />
     {/* oussef (compressed, fluid) */}
     <path d="M65,45 C75,35 75,55 85,50 C95,45 105,55 110,40 C115,25 115,60 110,70 C105,85 95,95 125,60" />
     {/* E */}
     <path d="M145,35 C130,25 120,45 130,50 C120,55 115,70 140,70" />
     {/* lsayed (tall l, dropping y) */}
     <path d="M140,70 C155,25 160,20 155,60 C165,55 175,45 185,60 C195,75 195,45 205,45 C215,45 215,80 205,95 C195,110 220,80 230,65 C240,50 250,75 280,60" />
     {/* subtle flourish */}
     <path d="M100,90 C150,110 230,95 280,85" strokeWidth="1.2" opacity="0.4" />
  </svg>
)

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="py-32 border-b border-[var(--border-subtle)] relative overflow-hidden bg-transparent">
      
      {/* Soft gradient fade from the Hero section into the Starfield */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[var(--bg-deep)] to-transparent pointer-events-none z-0" />
      
      {/* Removed grid per user request */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,229,255,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Photo & Signature Frame (lg:col-span-5) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 relative w-full h-[600px] lg:h-[750px] mx-auto"
          >
          {/* Portrait Container - Architectural frame */}
          <div className="relative w-full max-w-[380px] md:max-w-[420px] xl:max-w-[450px] mx-auto lg:mx-0 aspect-[3/4] group mb-8 p-1 rounded-[18px] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/30 transition-colors duration-700 bg-black/40 backdrop-blur-sm">
            
            <div className="w-full h-full relative overflow-hidden rounded-2xl">
              
              {/* Photo */}
              <Image
                src="/profile.jpg"
                alt="Youssef Elsayed"
                fill
                className="object-cover object-top filter contrast-110 saturate-[0.85] group-hover:saturate-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              
              {/* Internal Cinematic Shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-[var(--bg-deep)]/40 to-transparent opacity-90 pointer-events-none" />
              
              {/* Right Edge Tech Ruler */}
              <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col items-center gap-1 opacity-50">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={`w-1 bg-white ${i === 5 ? 'h-3 bg-[var(--accent-cyan)]' : 'h-1'}`} />
                ))}
              </div>

              {/* The Signature & Nameplate (Bottom Left) */}
              <div className="absolute bottom-8 left-8 right-8 xl:right-16 glass-panel border border-[var(--border-subtle)] p-6 bg-black/60 backdrop-blur-md rounded-2xl transform group-hover:-translate-y-2 transition-transform duration-700 ease-out shadow-2xl">
                <div className="mb-6 ml-2 transform -rotate-3 opacity-90">
                  <Signature />
                </div>
                <div className="w-8 h-[1px] bg-[var(--accent-cyan)] mb-3" />
                <p className="text-[9px] font-mono text-[var(--text-secondary)] tracking-widest uppercase">
                  Computer Science Student
                </p>
              </div>

            </div>
          </div>
        </motion.div>
          
          {/* RIGHT: Content & Modules (lg:col-span-7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col h-full justify-between gap-12"
          >
            
            {/* Top Grid: Main Text vs Current Focus */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              
              {/* Main Copy (md:col-span-8) */}
              <div className="md:col-span-8 space-y-8">
                <div>
                  <h2 className="text-[10px] font-mono text-[var(--accent-cyan)] uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
                    <span className="w-6 h-1 bg-[var(--accent-cyan)] rounded-full" />
                    // About Me
                  </h2>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
                    Computer Science student passionate about building <span className="text-[var(--accent-cyan)]">secure</span> and <span className="text-[var(--accent-cyan)]">intelligent</span> systems.
                  </h3>
                </div>

                <div className="text-[var(--text-secondary)] space-y-5 leading-relaxed text-sm">
                  <p>
                    I'm a Computer Science student at Misr International University, specializing in Cybersecurity and Network Security. I'm deeply passionate about Linux system administration, network security, secure software development, and the integration of machine learning into complex architectures.
                  </p>
                  <p>
                    My engineering approach focuses on building resilient web applications, deploying secure Linux server infrastructures, and developing AI-based solutions. I'm certified by Cisco, IBM, AWS Academy, and Google, and I continuously strive to apply modern security protocols to real-world software challenges.
                  </p>
                </div>
                
                {/* Actions */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="#projects" className="group relative px-6 py-3 border border-[var(--border-strong)] hover:border-[var(--accent-cyan)] bg-[var(--bg-panel)] hover:bg-[var(--accent-cyan)]/10 transition-all flex items-center gap-3 text-xs font-mono tracking-widest text-white uppercase rounded-xl">
                    View Projects
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[var(--accent-cyan)]" />
                  </a>
                  <a href="/CV/Youssef_Elsayed_Abdelaziz.pdf" target="_blank" className="group relative px-6 py-3 border border-[var(--border-subtle)] hover:border-[var(--text-muted)] bg-transparent transition-all flex items-center gap-3 text-xs font-mono tracking-widest text-[var(--text-secondary)] hover:text-white uppercase rounded-xl">
                    Download CV
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Current Focus Panel (md:col-span-4) */}
              <div className="md:col-span-4 border border-[var(--border-subtle)] bg-black/20 p-6 rounded-2xl relative hover:border-[var(--border-strong)] transition-colors">
                
                <h4 className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest mb-6 border-b border-[var(--border-subtle)] pb-4 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
                  Current Focus
                </h4>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-[var(--border-subtle)] bg-black/40 rounded-xl">
                      <Shield className="w-4 h-4 text-[var(--text-secondary)]" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white mb-1">Cybersecurity</h5>
                      <p className="text-[9px] text-[var(--text-muted)]">Security • Linux • Networking</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-[var(--border-subtle)] bg-black/40 rounded-xl">
                      <BrainCircuit className="w-4 h-4 text-[var(--text-secondary)]" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white mb-1">AI / ML</h5>
                      <p className="text-[9px] text-[var(--text-muted)]">Models • Data • Solutions</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-[var(--border-subtle)] bg-black/40 rounded-xl">
                      <Code2 className="w-4 h-4 text-[var(--text-secondary)]" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white mb-1">Software Engineering</h5>
                      <p className="text-[9px] text-[var(--text-muted)]">Web • Backend • Systems</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Grid: Education, Location, Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-[var(--border-subtle)]">
              
              <div className="flex gap-4">
                <GraduationCap className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" />
                <div>
                  <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2">Education</span>
                  <span className="text-sm font-medium text-white block">B.Sc. Computer Science</span>
                  <span className="text-[10px] text-[var(--text-secondary)]">Misr International University</span>
                  <span className="text-[10px] text-[var(--text-muted)] block mt-1">(2023 - 2027)</span>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" />
                <div>
                  <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2">Location</span>
                  <span className="text-sm font-medium text-white block">Obour City, Qalyubia</span>
                  <span className="text-[10px] text-[var(--text-secondary)]">Cairo, Egypt</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Globe className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" />
                <div>
                  <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2">Languages</span>
                  <span className="text-sm font-medium text-white block">Arabic <span className="text-[var(--text-secondary)] font-normal text-[10px]">(Native)</span></span>
                  <span className="text-sm font-medium text-white block mt-1">English <span className="text-[var(--text-secondary)] font-normal text-[10px]">(Professional)</span></span>
                </div>
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}
