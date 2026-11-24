"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Menu, X, Mail, FileText, ArrowUpRight } from "lucide-react"
import { toast } from "sonner"
import { IDENTITY } from "@/lib/portfolio-data"
import { ease, spring } from "@/lib/motion"
import { cn } from "@/lib/utils"
import SlotText from "@/components/portfolio/SlotText"
import BrandLogo from "@/components/portfolio/BrandLogo"

const NAV_LINKS = [
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Work", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "certifications", label: "Certs", href: "#certifications" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const

type SectionId = (typeof NAV_LINKS)[number]["id"] | ""

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<SectionId>("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  const menuTriggerRef = useRef<HTMLButtonElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const wasOpenRef = useRef(false)

  // Hydrate saved theme preference on mount
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("youssef-theme")
      if (saved === "light" || saved === "dark") {
        setTheme(saved)
        document.documentElement.classList.toggle("light", saved === "light")
        document.documentElement.classList.toggle("dark", saved === "dark")
      }
    } catch {}
  }, [])

  // Morph navbar on scroll (> 64px) & handle top/bottom edge active states
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 64)

      if (y < 220) {
        setActiveId("")
        return
      }

      const nearBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 80
      if (nearBottom) {
        setActiveId("contact")
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // IntersectionObserver scroll-spy for desktop & mobile active state
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id)
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 220) return
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id as SectionId)
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6],
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Accessible mobile drawer: Escape close, body scroll lock, focus management, desktop resize close
  useEffect(() => {
    if (mobileMenuOpen) {
      wasOpenRef.current = true
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"

      const focusTimer = setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 40)

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false)
        }
      }

      const onResize = () => {
        if (window.innerWidth >= 1024) {
          setMobileMenuOpen(false)
        }
      }

      window.addEventListener("keydown", onKeyDown)
      window.addEventListener("resize", onResize)

      return () => {
        clearTimeout(focusTimer)
        document.body.style.overflow = prevOverflow
        window.removeEventListener("keydown", onKeyDown)
        window.removeEventListener("resize", onResize)
      }
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false
      menuTriggerRef.current?.focus()
    }
  }, [mobileMenuOpen])

  // Toggle between Dark (Obsidian & Glacial Verdigris) and Light (Architectural Alabaster & Deep Verdigris)
  const handleThemeToggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark"
      document.documentElement.classList.toggle("light", next === "light")
      document.documentElement.classList.toggle("dark", next === "dark")
      try {
        window.localStorage.setItem("youssef-theme", next)
      } catch {}
      toast.success(
        next === "light" ? "Light Mode Enabled" : "Dark Mode Enabled",
        {
          description:
            next === "light"
              ? "Architectural Alabaster & Deep Verdigris palette active."
              : "Obsidian & Glacial Verdigris palette active.",
          duration: 2200,
        }
      )
      return next
    })
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 pointer-events-none transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "pt-3 sm:pt-4 px-3 sm:px-6"
            : "pt-5 sm:pt-7 lg:pt-8 px-5 sm:px-9 lg:px-12"
        )}
      >
        <nav
          aria-label="Primary navigation"
          className={cn(
            "pointer-events-auto mx-auto w-full flex items-center justify-between transition-[max-width,height,padding,background-color,border-color,border-radius,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled
              ? "max-w-[880px] h-[56px] px-3.5 sm:px-5 rounded-xl bg-[var(--bg-surface)]/88 [.light_&]:bg-[var(--bg-surface)]/96 backdrop-blur-md border border-[var(--border-strong)] shadow-[0_14px_40px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(240,244,242,0.06)] [.light_&]:shadow-[0_12px_36px_rgba(11,19,17,0.08)]"
              : "max-w-[1380px] h-[70px] px-2 sm:px-4 rounded-2xl bg-transparent border border-transparent shadow-none"
          )}
        >
          {/* Left: Classic YE Emblem + Youssef Elsayed Wordmark */}
          <a
            href="#top"
            onClick={() => setActiveId("")}
            aria-label={`${IDENTITY.displayName} — Back to top`}
            className="group flex items-center shrink-0 rounded-lg py-1 pr-1 transition-colors"
          >
            <BrandLogo variant="navbar" showNameOnMobile={false} />
          </a>

          {/* Center: Desktop 6 Links with SlotText & Scroll-Spy */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setActiveId(link.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "group relative inline-flex items-center justify-center px-3 py-2 rounded-lg text-[12px] font-medium tracking-[-0.01em] transition-colors duration-200",
                      isActive
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    <SlotText text={link.label} />
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        transition={spring.crisp}
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-0.5 h-[2px] rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-glow)]"
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right: Theme Toggle + Get in Touch CTA + Mobile Drawer Trigger */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleThemeToggle}
              aria-label={
                theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
              title={
                theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
              className="relative flex items-center justify-center w-10 h-10 rounded-lg border border-transparent hover:border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)]/80 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all duration-200 active:scale-[0.95] cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "light" ? (
                  <motion.span
                    key="sun"
                    initial={{ scale: 0.75, opacity: 0, rotate: -35 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.75, opacity: 0, rotate: 35 }}
                    transition={{ duration: 0.18, ease: ease.out }}
                    className="inline-flex items-center justify-center"
                  >
                    <Sun
                      className="w-[17px] h-[17px] text-[var(--accent-primary)]"
                      aria-hidden="true"
                    />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ scale: 0.75, opacity: 0, rotate: 35 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.75, opacity: 0, rotate: -35 }}
                    transition={{ duration: 0.18, ease: ease.out }}
                    className="inline-flex items-center justify-center"
                  >
                    <Moon className="w-[17px] h-[17px]" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <a
              href="#contact"
              onClick={() => setActiveId("contact")}
              className="group hidden lg:inline-flex items-center justify-center h-9 px-4 rounded-lg bg-[var(--surface-platinum)] text-[var(--ink-dark)] text-[12px] font-medium tracking-[-0.01em] hover:opacity-90 transition-all duration-200 active:scale-[0.97] shadow-[0_2px_10px_rgba(0,0,0,0.18)]"
            >
              <SlotText text="Get in Touch" />
            </a>

            <button
              ref={menuTriggerRef}
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={
                mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 text-[var(--text-primary)] hover:border-[var(--border-accent)] hover:text-[var(--accent-primary)] transition-all duration-200 active:scale-[0.95] cursor-pointer"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Full-Screen Frosted-Obsidian Navigation Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: ease.out }}
            className="fixed inset-0 z-[60] lg:hidden bg-[var(--bg-deep)]/95 backdrop-blur-xl flex flex-col justify-between px-6 py-6 overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-5">
              <a
                href="#top"
                onClick={() => {
                  setActiveId("")
                  setMobileMenuOpen(false)
                }}
                aria-label={`${IDENTITY.displayName} — Back to top`}
                className="flex items-center"
              >
                <BrandLogo variant="compact" />
              </a>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="flex items-center justify-center w-11 h-11 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-accent)] hover:text-[var(--accent-primary)] transition-colors active:scale-[0.95] cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Drawer Links */}
            <nav aria-label="Mobile sections" className="my-auto py-8">
              <ul className="flex flex-col divide-y divide-[var(--border-subtle)]">
                {NAV_LINKS.map((link, idx) => {
                  const isActive = activeId === link.id
                  return (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        onClick={() => {
                          setActiveId(link.id)
                          setMobileMenuOpen(false)
                        }}
                        aria-current={isActive ? "location" : undefined}
                        className="group flex items-center justify-between py-4 min-h-[56px] transition-colors"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--text-muted)] tabular-nums">
                            0{idx + 1}
                          </span>
                          <span
                            className={cn(
                              "font-serif text-3xl tracking-[-0.02em] transition-colors",
                              isActive
                                ? "italic text-[var(--accent-primary)]"
                                : "text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]"
                            )}
                          >
                            {link.label}
                          </span>
                        </div>
                        <ArrowUpRight
                          className={cn(
                            "w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                            isActive
                              ? "text-[var(--accent-primary)]"
                              : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                          )}
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Drawer Footer Quick Actions */}
            <div className="border-t border-[var(--border-subtle)] pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={IDENTITY.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 h-12 rounded-xl bg-[var(--surface-platinum)] text-[var(--ink-dark)] text-xs font-medium active:scale-[0.97] transition-transform"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Resume</span>
                </a>
                <a
                  href={IDENTITY.emailHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 h-12 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-xs font-medium active:scale-[0.97] transition-transform"
                >
                  <Mail
                    className="w-4 h-4 text-[var(--accent-primary)]"
                    aria-hidden="true"
                  />
                  <span>Email</span>
                </a>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-muted)]">
                <span>{IDENTITY.locationSecondary}</span>
                <span className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"
                    aria-hidden="true"
                  />
                  {IDENTITY.heroDomainPill}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
