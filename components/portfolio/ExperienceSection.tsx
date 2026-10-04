"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const experienceData = [
  {
    type: "education",
    title: "B.Sc. Computer Science",
    org: "Misr International University",
    date: "2023 - 2027",
    desc: "Specialization in Cybersecurity, Network Security, and Systems Architecture.",
    skills: ["Linux", "Networks", "Software Architecture"],
  },
  {
    type: "experience",
    title: "Security Engineering Student",
    org: "Self-Directed / Academic",
    date: "Present",
    desc: "Applying rigorous security methodologies to modern software development, focusing on penetration testing and infrastructure security.",
    skills: ["Pen Testing", "SecOps", "Cloud Infra"],
  }
]

export default function ExperienceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" ref={ref} className="py-24 border-b border-[var(--border-subtle)] relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <h2 className="text-sm font-mono text-[var(--accent-cyan)] mb-4 tracking-wider uppercase">// Trajectory</h2>
          <h3 className="text-3xl font-bold text-[var(--text-primary)]">Operational History</h3>
        </motion.div>

        <div className="relative border-l border-[var(--border-strong)] ml-4 sm:ml-0">
          {experienceData.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: idx * 0.2 }}
              className="mb-12 last:mb-0 pl-8 relative"
            >
              {/* Timeline node */}
              <div className="absolute w-3 h-3 bg-[var(--bg-deep)] border-2 border-[var(--accent-cyan)] rounded-full -left-[6.5px] top-1.5" />
              
              <div className="glass-panel p-6 rounded-lg card-hover-effect">
                <span className="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-deep)] border border-[var(--border-subtle)] px-2 py-1 rounded inline-block mb-4">
                  {item.date}
                </span>
                
                <h4 className="text-xl font-semibold text-[var(--text-primary)] mb-1">{item.title}</h4>
                <p className="text-sm text-[var(--accent-cyan)] mb-4">{item.org}</p>
                
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {item.skills.map(s => (
                    <span key={s} className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 bg-[var(--bg-panel)] border border-[var(--border-subtle)] rounded text-[var(--text-muted)]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
