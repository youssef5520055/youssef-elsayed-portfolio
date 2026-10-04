"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Moon, Menu } from "lucide-react"

const NAV_LINKS = [
  { label: "HOME", href: "#" },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" }
]

export default function Navbar() {
  const [active, setActive] = useState("HOME")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[var(--bg-deep)]/80 backdrop-blur-md border-b border-[var(--border-subtle)] py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Logo Area */}
        <div className="flex items-center gap-4">
          <div className="font-bold text-xl tracking-tighter text-white">
            YE
          </div>
          <div className="hidden sm:block text-[10px] font-mono tracking-[0.2em] text-[var(--text-muted)] uppercase border-l border-[var(--border-subtle)] pl-4">
            Youssef Elsayed
          </div>
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              className="relative text-[10px] font-mono tracking-[0.15em] uppercase text-[var(--text-secondary)] hover:text-white transition-colors py-2"
            >
              {link.label}
              {active === link.label && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[var(--accent-cyan)] shadow-[0_0_8px_var(--accent-cyan)] rounded-full"
                />
              )}
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-6">
          <button className="text-[var(--text-muted)] hover:text-white transition-colors">
            <Moon className="w-4 h-4" />
          </button>
          <button className="text-[var(--text-muted)] hover:text-white transition-colors lg:hidden">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:flex flex-col gap-[4px] cursor-pointer group">
            <div className="w-6 h-[1px] bg-[var(--text-muted)] group-hover:bg-white transition-colors" />
            <div className="w-4 h-[1px] bg-[var(--text-muted)] group-hover:bg-white transition-colors ml-auto" />
            <div className="w-5 h-[1px] bg-[var(--text-muted)] group-hover:bg-white transition-colors ml-auto" />
          </div>
        </div>

      </div>
    </motion.nav>
  )
}
