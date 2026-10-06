"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"
import { toast } from "sonner"

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleThemeToggle = () => {
    setIsLight(true)
    toast.error("System Override Prevented", {
      description: "Dark mode is strictly enforced for optimal security visibility.",
      duration: 3000,
    })
    // Revert back to moon after a short delay
    setTimeout(() => {
      setIsLight(false)
    }, 1500)
  }

  return (
    <>
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
            <button 
              onClick={handleThemeToggle}
              className="text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors relative"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait">
                {isLight ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4 text-[var(--accent-cyan)]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: 90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <button className="text-[var(--text-muted)] hover:text-white transition-colors lg:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="hidden lg:flex flex-col gap-[4px] cursor-pointer group p-1"
              aria-label="Open Menu"
            >
              <div className="w-6 h-[1px] bg-[var(--text-muted)] group-hover:bg-white transition-colors" />
              <div className="w-4 h-[1px] bg-[var(--text-muted)] group-hover:bg-white transition-colors ml-auto" />
              <div className="w-5 h-[1px] bg-[var(--text-muted)] group-hover:bg-white transition-colors ml-auto" />
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-[var(--text-muted)] hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setActive(link.label)
                    setMobileMenuOpen(false)
                  }}
                  className="text-lg font-mono tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-white hover:text-[var(--accent-cyan)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
