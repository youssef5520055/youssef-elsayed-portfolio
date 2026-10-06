"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

const skillCategories = [
  {
    name: "Cybersecurity",
    items: ["Network Security", "Vulnerability Assessment", "Web Application Security", "SIEM Fundamentals", "Security Monitoring", "Linux Security", "Secure Software Development", "Firewall Configuration", "Basic Penetration Testing"]
  },
  {
    name: "System Administration",
    items: ["Ubuntu Server", "Linux Administration", "Bash Scripting", "Apache", "MariaDB", "User & Permission Management", "System Monitoring"]
  },
  {
    name: "Machine Learning",
    items: ["Data Preprocessing", "Feature Engineering", "Model Evaluation", "Classification Algorithms", "Scikit-learn"]
  },
  {
    name: "Networking",
    items: ["TCP/IP", "Routing & Switching", "VLANs", "Subnetting", "DNS", "DHCP", "SSH", "Network Troubleshooting"]
  },
  {
    name: "Programming Languages",
    items: ["Python", "C++", "Java", "SQL", "HTML", "CSS", "JavaScript", "PHP"]
  },
  {
    name: "Development",
    items: ["Object-Oriented Programming", "Data Structures", "Algorithms", "Git & GitHub", "REST APIs"]
  },
  {
    name: "Tools & Platforms",
    items: ["Kali Linux", "Ubuntu", "Cisco Packet Tracer", "VMware", "Git", "GitHub", "Visual Studio Code", "Burp Suite", "Wireshark", "Nmap", "VirtualBox"]
  },
  {
    name: "Databases",
    items: ["MySQL", "SQL", "Database Design"]
  },
  {
    name: "Soft Skills",
    items: ["Problem Solving", "Analytical Thinking", "Team Collaboration", "Communication", "Time Management", "Adaptability", "Attention to Detail"]
  }
]

export default function SkillsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" ref={ref} className="py-32 border-b border-[var(--border-subtle)] bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 lg:mb-24"
        >
          <h2 className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
            <span className="w-6 h-[1px] bg-[var(--accent-cyan)]" />
            // Technical_Arsenal
          </h2>
          <h3 className="text-4xl font-bold text-white tracking-tight">Core Competencies</h3>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Content - Skills */}
          <div className="w-full lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-10">
            {skillCategories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="relative group"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-[var(--border-subtle)] pb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] opacity-70 group-hover:opacity-100 transition-opacity" />
                  <h4 className="text-xs font-mono text-white uppercase tracking-widest">{cat.name}</h4>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 leading-relaxed">
                  {cat.items.map((item, itemIdx) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="text-sm text-[var(--text-secondary)] group-hover:text-gray-300 transition-colors">
                        {item}
                      </span>
                      {itemIdx < cat.items.length - 1 && (
                        <span className="text-[var(--text-muted)]/30 text-xs">·</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Content - Spline 3D Scene */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="w-full lg:w-[40%] h-[350px] lg:h-auto lg:min-h-[550px]"
          >
            <Card className="w-full h-full bg-[#0a0a0a]/50 backdrop-blur-sm border-[var(--border-subtle)] relative overflow-hidden rounded-2xl p-0 flex flex-col justify-center">
              <Spotlight
                className="-top-40 left-0 md:left-20 md:-top-20"
                fill="var(--accent-cyan)"
              />
              <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-[#050505] to-transparent opacity-50" />
              <div className="relative w-full h-full z-10">
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
