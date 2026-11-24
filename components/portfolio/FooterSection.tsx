"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react"
import { toast } from "sonner"
import { IDENTITY } from "@/lib/portfolio-data"
import { ease, viewportOnce } from "@/lib/motion"
import Signature from "@/components/portfolio/Signature"
import SlotText from "@/components/portfolio/SlotText"
import BrandLogo from "@/components/portfolio/BrandLogo"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
] as const

const CONNECT_LINKS = [
  { label: "Email", href: IDENTITY.emailHref, icon: Mail, external: false },
  { label: "LinkedIn", href: IDENTITY.linkedin, icon: Linkedin, external: true },
  { label: "GitHub", href: IDENTITY.github, icon: Github, external: true },
  {
    label: "WhatsApp",
    href: IDENTITY.whatsappHref,
    icon: MessageCircle,
    external: true,
  },
  {
    label: "Resume",
    href: encodeURI(IDENTITY.resumePath),
    icon: FileText,
    external: true,
  },
] as const

export default function FooterSection() {
  const prefersReducedMotion = useReducedMotion()
  const [showOptions, setShowOptions] = useState(false)
  const [copied, setCopied] = useState(false)
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current)
      }
    }
  }, [])

  const scrollToTop = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
  }

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(IDENTITY.email)
      } else {
        const tempInput = document.createElement("textarea")
        tempInput.value = IDENTITY.email
        tempInput.setAttribute("readonly", "")
        tempInput.style.position = "absolute"
        tempInput.style.left = "-9999px"
        document.body.appendChild(tempInput)
        tempInput.select()
        document.execCommand("copy")
        document.body.removeChild(tempInput)
      }

      setCopied(true)
      toast.success("Email copied to clipboard", {
        description: IDENTITY.email,
      })

      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current)
      }
      copyTimerRef.current = setTimeout(() => {
        setCopied(false)
      }, 2200)
    } catch {
      toast.error("Could not copy email", {
        description: IDENTITY.email,
      })
    }
  }

  return (
    <footer
      id="contact"
      className="px-3 sm:px-5 lg:px-6 pb-4 sm:pb-6 pt-8 scroll-mt-20 bg-[var(--bg-deep)]"
    >
      {/* Framed Atmospheric Closing Panel */}
      <div
        className="rounded-2xl sm:rounded-[28px] overflow-hidden border border-[var(--border-accent)]/40 relative shadow-[0_30px_90px_rgba(0,0,0,0.65)] [.light_&]:shadow-[0_24px_60px_rgba(11,19,17,0.08)] bg-[radial-gradient(65%_55%_at_50%_85%,rgba(18,126,102,0.38),transparent_70%),radial-gradient(50%_45%_at_85%_20%,rgba(212,163,89,0.12),transparent_65%),linear-gradient(180deg,#091013_0%,#0A2520_65%,#071916_100%)] [.light_&]:!bg-[linear-gradient(180deg,#EDF5F2_0%,#DCEEE8_65%,#CEE7DF_100%)]"
      >
        {/* Subtle Dot Texture Overlay & Specular Top Rim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 editorial-dots opacity-55"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)]/45 to-transparent"
        />

        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-14 pt-16 sm:pt-24 pb-10 relative z-10 flex flex-col gap-16">
          {/* Top 12-Col Grid: CTA + Navigation & Connect */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-start">
            {/* Left: CTA + Expandable Initiate Contact Trigger */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                ease: ease.editorial,
              }}
              className="lg:col-span-7 flex flex-col gap-7"
            >
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent-primary)]">
                // Ready to Collaborate
              </p>

              <h2 className="text-4xl sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-medium tracking-[-0.025em] leading-[1.06] text-[var(--text-primary)]">
                Let&apos;s build secure,
                <br />
                <span className="font-serif italic font-normal text-[var(--accent-primary)]">
                  intelligent systems.
                </span>
              </h2>

              {/* Youssef's Elevated Expandable Initiate Contact Trigger */}
              <div className="flex flex-col items-start gap-4 mt-1">
                <button
                  type="button"
                  aria-expanded={showOptions}
                  aria-controls="footer-contact-channels"
                  onClick={() => setShowOptions((prev) => !prev)}
                  className="group inline-flex items-center gap-4 cursor-pointer rounded-full pr-4 focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-4"
                >
                  <span
                    className={cn(
                      "w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center transition-all duration-300",
                      showOptions
                        ? "bg-[var(--accent-primary)] border-[var(--accent-primary)] text-[var(--ink-dark)] shadow-[0_0_28px_rgba(38,208,168,0.35)]"
                        : "border-[var(--border-strong)] bg-[var(--bg-surface)]/80 backdrop-blur-sm text-[var(--text-secondary)] group-hover:bg-[var(--accent-primary)] group-hover:border-[var(--accent-primary)] group-hover:text-[var(--ink-dark)]"
                    )}
                  >
                    <ArrowRight
                      className={cn(
                        "w-5 h-5 transition-transform duration-300",
                        showOptions ? "rotate-90" : "group-hover:translate-x-1"
                      )}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>

                  <span className="text-lg sm:text-xl font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    <SlotText text="Initiate Contact" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {showOptions && (
                    <motion.div
                      id="footer-contact-channels"
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: -8, height: 0 }
                      }
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: -6, height: 0 }
                      }
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.28,
                        ease: ease.editorial,
                      }}
                      className="overflow-hidden w-full sm:w-auto"
                    >
                      <div className="inline-flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-[var(--bg-surface)]/92 backdrop-blur-xl border border-[var(--border-strong)] shadow-[0_20px_50px_rgba(0,0,0,0.55)] [.light_&]:shadow-[0_16px_40px_rgba(11,19,17,0.10)]">
                        <a
                          href={IDENTITY.whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[var(--accent-primary)] text-[var(--ink-dark)] hover:bg-[#34DFB7] [.light_&]:hover:bg-[#086650] font-mono text-xs uppercase tracking-[0.12em] font-medium transition-all active:scale-[0.97]"
                        >
                          <MessageCircle
                            className="w-4 h-4 shrink-0"
                            strokeWidth={1.9}
                            aria-hidden="true"
                          />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={IDENTITY.emailHref}
                          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)]/85 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.12em] transition-all active:scale-[0.97]"
                        >
                          <Mail
                            className="w-4 h-4 shrink-0"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          <span>Email</span>
                        </a>

                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)]/85 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.12em] transition-all active:scale-[0.97] cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check
                                className="w-4 h-4 shrink-0 text-[var(--accent-primary)]"
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                              <span className="text-[var(--accent-primary)]">
                                Copied
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy
                                className="w-4 h-4 shrink-0"
                                strokeWidth={1.75}
                                aria-hidden="true"
                              />
                              <span>Copy Email</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Visible Direct Contact Line */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-2 font-mono text-xs sm:text-[13px] text-[var(--text-secondary)]">
                <a
                  href={`tel:+${IDENTITY.phoneRaw}`}
                  className="inline-flex items-center gap-2 hover:text-[var(--accent-primary)] transition-colors tabular-nums"
                >
                  <Phone
                    className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span>{IDENTITY.phone}</span>
                </a>

                <span
                  aria-hidden="true"
                  className="hidden sm:inline text-[var(--border-strong)]"
                >
                  ·
                </span>

                <a
                  href={IDENTITY.emailHref}
                  className="inline-flex items-center gap-2 hover:text-[var(--accent-primary)] transition-colors break-all sm:break-normal"
                >
                  <Mail
                    className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span>{IDENTITY.email}</span>
                </a>
              </div>
            </motion.div>

            {/* Right: Navigation & Connect Columns */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : 0.1,
                ease: ease.editorial,
              }}
              className="lg:col-span-5 grid grid-cols-2 gap-8 sm:gap-12 lg:pt-2"
            >
              {/* Column 1: Navigation */}
              <div className="flex flex-col gap-5">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Navigation
                </h3>
                <nav
                  aria-label="Footer navigation"
                  className="flex flex-col gap-3.5"
                >
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="group inline-flex items-center gap-2.5 w-fit text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-0.5"
                    >
                      <span
                        aria-hidden="true"
                        className="w-0 h-px bg-[var(--accent-primary)] group-hover:w-3 transition-all duration-300"
                      />
                      <SlotText text={link.label} />
                    </a>
                  ))}
                </nav>
              </div>

              {/* Column 2: Connect */}
              <div className="flex flex-col gap-5">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Connect
                </h3>
                <nav
                  aria-label="Social and direct links"
                  className="flex flex-col gap-3.5"
                >
                  {CONNECT_LINKS.map((link) => {
                    const Icon = link.icon
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="group inline-flex items-center gap-2.5 w-fit text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors py-0.5"
                      >
                        <Icon
                          className="w-4 h-4 shrink-0"
                          strokeWidth={1.65}
                          aria-hidden="true"
                        />
                        <SlotText text={link.label} />
                        <ArrowUpRight
                          className="w-3.5 h-3.5 opacity-45 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 shrink-0"
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                      </a>
                    )
                  })}
                </nav>
              </div>
            </motion.div>
          </div>

          {/* Bottom Identity Bar */}
          <div className="border-t border-[var(--border-strong)]/60 pt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            {/* Left Identity Block (Classic Logo + Preserved Watermarks) */}
            <div className="flex flex-col gap-3.5">
              <BrandLogo variant="full" />

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-0.5">
                <span className="font-mono text-xs font-semibold text-[var(--text-secondary)] tracking-[0.16em] uppercase">
                  {IDENTITY.stylizedBrandLeft}
                  <span className="text-[var(--accent-primary)]">.</span>
                  {IDENTITY.stylizedBrandRight}
                </span>
                <span aria-hidden="true" className="text-[var(--border-strong)]">
                  ·
                </span>
                <span className="inline-flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-65" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34D399]" />
                  </span>
                  <span className="font-mono text-[11px] text-[var(--text-secondary)] tracking-[0.18em] uppercase">
                    {IDENTITY.systemStatus}
                  </span>
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-[var(--text-muted)] mt-1">
                {IDENTITY.legacyTagline}
              </p>
            </div>

            {/* Right Signature & Legal Block (100% Preserved) */}
            <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
              <Signature
                animated
                className="w-44 sm:w-48 rotate-2 origin-bottom-right"
                strokeClassName="stroke-[var(--text-secondary)] hover:stroke-[var(--accent-primary)] transition-colors duration-500"
              />

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full md:w-auto justify-between md:justify-end">
                <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-[0.1em]">
                  © {new Date().getFullYear()} {IDENTITY.fullName}. All rights
                  reserved.
                </span>

                <button
                  type="button"
                  onClick={scrollToTop}
                  className="group inline-flex items-center gap-2 font-mono text-[11px] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] uppercase tracking-[0.16em] transition-colors cursor-pointer"
                >
                  <span>Back to Top</span>
                  <ArrowUp
                    className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
