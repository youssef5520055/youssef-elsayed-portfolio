"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, Activity, ShieldCheck, Cpu, Database, Mic, Code2, MonitorPlay, Smartphone, Receipt, Map, Layers, FileCode2 } from "lucide-react"

// 1. DEDUPLICATED & MERGED FEATURED PROJECTS
const featuredProjects = [
  {
    title: "App Voice Detection",
    subtitle: "AI / Audio Processing",
    icon: Mic,
    description: "A voice detection application designed to recognize and process voice input using advanced speech-related technologies.",
    tech: ["Voice Processing", "Speech Recognition", "AI Algorithms"],
    details: [
      { label: "Focus", value: "Audio Recognition" },
      { label: "Platform", value: "Application" }
    ],
    github: "https://github.com/youssef5520055/app_voice_detection"
  },
  {
    title: "Customer Retention Prediction",
    subtitle: "Machine Learning / Data Science",
    icon: Activity,
    description: "Developed and evaluated multiple machine learning classification models to predict customer churn. Performed extensive data preprocessing, feature engineering, and model evaluation across various algorithms.",
    tech: ["Python", "Pandas", "Scikit-learn", "Random Forest", "SVM"],
    details: [
      { label: "Objective", value: "Predict customer churn" },
      { label: "Algorithms", value: "5+ Classification Models" }
    ],
    github: "https://github.com/youssef5520055"
  },
  {
    title: "Linux Server Infrastructure Deployment",
    subtitle: "System Administration / Cybersecurity",
    icon: ShieldCheck,
    description: "Enterprise network services deployment using Ubuntu Server. Included complete configuration of web hosting, secure SSH access, MariaDB, and strict user/group permission management.",
    tech: ["Ubuntu Server", "Linux", "Bash", "Apache", "MariaDB"],
    details: [
      { label: "Environment", value: "Ubuntu Server" },
      { label: "Focus", value: "Secure Architecture" }
    ],
    github: "https://github.com/youssef5520055"
  },
  {
    title: "Personal Portfolio System",
    subtitle: "Full-Stack Design Engineering",
    icon: Code2,
    description: "A full-stack personal portfolio website showcasing my skills, projects, experience, and professional information, engineered with a premium cinematic design architecture.",
    tech: ["Next.js", "React", "Tailwind", "WebGL"],
    details: [
      { label: "Type", value: "Digital Experience" },
      { label: "Design", value: "Technical OS" }
    ],
    github: "https://github.com/youssef5520055/youssef-elsayed-portfolio"
  }
]

// 2. DEDUPLICATED ADDITIONAL REPOSITORIES (Grid)
// Removed the duplicate "Phone Store Management System" (Merged with Phone Stock Market)
// Removed duplicate PopStream
const additionalProjects = [
  {
    title: "PopStream",
    description: "A movie streaming website where users can explore movies and enjoy an organized online streaming experience.",
    tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    github: "https://github.com/youssef5520055/popstream",
    icon: MonitorPlay
  },
  {
    title: "Phone Stock Market",
    description: "A complete object-oriented phone inventory and stock management application for tracking mobile phones, products, and sales records.",
    tech: ["C++", "OOP", "Data Structures"],
    github: "https://github.com/youssef5520055/phone-stock-market",
    icon: Smartphone
  },
  {
    title: "Billing Management System",
    description: "A Java desktop application for phone stores that manages invoices, product sales, inventory, and customer transactions.",
    tech: ["Java", "Desktop App", "Database"],
    github: "https://github.com/youssef5520055/billing-management-system",
    icon: Receipt
  },
  {
    title: "MIU QuickBit",
    description: "Designed and developed a complete food ordering platform for university students with secure backend database functionality.",
    tech: ["PHP", "MySQL", "Bootstrap"],
    github: "https://github.com/youssef5520055",
    icon: Database
  },
  {
    title: "Tourism Platform",
    description: "A tourism website that helps users explore travel destinations, discover places, and find useful tourism information.",
    tech: ["Web Development", "UI/UX"],
    github: "https://github.com/youssef5520055/tourism",
    icon: Map
  },
  {
    title: "Plastiq",
    description: "A modern application concept focused on managing and presenting plastic-related products or services through an organized digital platform.",
    tech: ["Frontend Development", "UI/UX"],
    github: "https://github.com/youssef5520055/plastiq",
    icon: Layers
  },
  {
    title: "Student Grades Management",
    description: "A robust C++ student grading management system implementing efficient data structures for searching, sorting, and record management.",
    tech: ["C++", "Algorithms", "File Handling"],
    github: "https://github.com/youssef5520055",
    icon: FileCode2
  },
  {
    title: "16-bit Adder & Two's Complement",
    description: "Designed and implemented a 16-bit adder and two's complement digital logic circuit for arithmetic operations.",
    tech: ["Digital Logic", "Hardware Design"],
    github: "https://github.com/youssef5520055",
    icon: Cpu
  }
]

export default function ProjectsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" ref={ref} className="py-32 border-b border-[var(--border-subtle)] bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
              <span className="w-6 h-[1px] bg-[var(--accent-cyan)]" />
              // Execution_Logs
            </h2>
            <h3 className="text-4xl font-bold text-white tracking-tight">Featured Repositories</h3>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-sm">
            A deduplicated selection of complex systems, machine learning models, and software architectures sourced directly from GitHub and my CV.
          </p>
        </motion.div>

        {/* Featured Projects (Heavy Editorial Layout) */}
        <div className="space-y-32 mb-32">
          {featuredProjects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.15, duration: 0.7 }}
              className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}
            >
              {/* Visual Side - Softened with rounded-2xl */}
              <div className="w-full lg:w-1/2 relative aspect-video glass-panel border border-[var(--border-subtle)] flex items-center justify-center group overflow-hidden bg-black/40 rounded-2xl">
                

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08),transparent_60%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.15),transparent_70%)] transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-deep)] via-transparent to-black/50" />
                
                {/* Massive Animated Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="relative z-10"
                >
                  <project.icon className="w-32 h-32 md:w-40 md:h-40 text-[var(--border-strong)] group-hover:text-[var(--accent-cyan)] transition-colors duration-700 drop-shadow-[0_0_20px_rgba(0,229,255,0)] group-hover:drop-shadow-[0_0_30px_rgba(0,229,255,0.4)]" strokeWidth={0.5} />
                </motion.div>
                
                {/* Tech Overlays - Softened points */}
                <div className="absolute top-6 left-6 flex gap-1.5 opacity-50">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10">
                  <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest bg-black/50 px-3 py-1.5 rounded-md backdrop-blur-sm">
                    ID: PRJ_{100 + idx}
                  </div>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)] hover:text-black transition-all flex items-center justify-center rounded-xl bg-[var(--bg-deep)] text-white shadow-lg">
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-8">
                <div>
                  <span className="text-[10px] font-mono text-[var(--accent-cyan)] uppercase tracking-widest mb-3 block">
                    {project.subtitle}
                  </span>
                  <h4 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">{project.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[var(--border-subtle)]">
                  {project.details.map(detail => (
                    <div key={detail.label}>
                      <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase mb-1">{detail.label}</span>
                      <span className="text-sm text-white font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>

                {/* Flowing Tech Stack instead of harsh boxes */}
                <div className="flex flex-wrap items-center gap-2 pt-4">
                  {project.tech.map((t, i) => (
                    <div key={t} className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[var(--text-secondary)] uppercase">
                        {t}
                      </span>
                      {i < project.tech.length - 1 && (
                        <span className="text-[var(--accent-cyan)]/50 text-[10px]">/</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Projects (Grid Layout) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="border-t border-[var(--border-subtle)] pt-24"
        >
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white tracking-tight">Additional Repositories</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {additionalProjects.map((project, idx) => (
              <div 
                key={idx}
                className="group relative flex flex-col p-8 border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] bg-black/20 hover:bg-black/40 transition-colors h-full rounded-2xl"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] hover:text-white transition-colors bg-black/50 p-2 rounded-lg">
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
                
                <project.icon className="w-8 h-8 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transition-colors mb-6" strokeWidth={1.5} />
                
                <h4 className="text-base font-bold text-white mb-3 group-hover:text-[var(--accent-cyan)] transition-colors leading-snug">{project.title}</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-1.5 mt-auto">
                  {project.tech.map((t, i) => (
                    <div key={t} className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors uppercase">
                        {t}
                      </span>
                      {i < project.tech.length - 1 && (
                        <span className="text-[var(--border-strong)] text-[10px]">•</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </section>
  )
}
