"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Linkedin,
  Github,
  FileText,
  ArrowRight,
  ArrowDown,
} from "lucide-react"
import HeroAsciiOne from "@/components/ui/hero-ascii-one"
import SlotText from "@/components/portfolio/SlotText"
import { IDENTITY } from "@/lib/portfolio-data"
import { ease } from "@/lib/motion"

const CIPHER_CHARS = "0123456789abcdef/<>+-:*"

const QUICK_ACCESS_LINKS = [
  {
    icon: Mail,
    label: "EMAIL",
    href: IDENTITY.emailHref,
    external: false,
    ariaLabel: "Send an email to Youssef Elsayed",
  },
  {
    icon: Linkedin,
    label: "LINKEDIN",
    href: IDENTITY.linkedin,
    external: true,
    ariaLabel: "Visit Youssef Elsayed on LinkedIn",
  },
  {
    icon: Github,
    label: "GITHUB",
    href: IDENTITY.github,
    external: true,
    ariaLabel: "Visit Youssef Elsayed on GitHub",
  },
  {
    icon: FileText,
    label: "RESUME",
    href: IDENTITY.resumePath,
    external: true,
    ariaLabel: "Open Youssef Elsayed's CV PDF",
  },
] as const

function DecryptedText({ text }: { text: string }) {
  const [revealedCount, setRevealedCount] = useState(text.length)
  const [scrambleChars, setScrambleChars] = useState<string[]>(() => text.split(""))

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      setRevealedCount(text.length)
      setScrambleChars(text.split(""))
      return
    }

    let iteration = 0
    let intervalId: ReturnType<typeof setInterval> | undefined

    const nextScrambled = (locked: number) =>
      text.split("").map((char, idx) => {
        if (char === " " || idx < locked) return char
        return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)]
      })

    const timeoutId = setTimeout(() => {
      setRevealedCount(0)
      setScrambleChars(nextScrambled(0))

      intervalId = setInterval(() => {
        iteration += 1
        setRevealedCount(iteration)
        setScrambleChars(nextScrambled(iteration))

        if (iteration >= text.length) {
          if (intervalId) clearInterval(intervalId)
          setRevealedCount(text.length)
          setScrambleChars(text.split(""))
        }
      }, 30)
    }, 80)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [text])

  if (text === "& Cybersecurity Specialist") {
    const words = text.split(" ")
    let runningIdx = 0

    return (
      <span className="inline">
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {words.map((word, wIdx) => {
            const wordStart = runningIdx
            runningIdx += word.length + 1
            const isAmpersand = word === "&"

            return (
              <span key={`${word}-${wIdx}`}>
                <span
                  className={
                    isAmpersand
                      ? "inline-block whitespace-nowrap font-sans font-light text-[var(--text-muted)]"
                      : "inline-block whitespace-nowrap font-serif italic font-normal text-[var(--text-primary)] serif-luminance tracking-[-0.015em]"
                  }
                >
                  {word.split("").map((char, cIdx) => {
                    const globalIdx = wordStart + cIdx
                    const isLocked = globalIdx < revealedCount
                    const shown = isLocked ? char : (scrambleChars[globalIdx] ?? char)

                    return (
                      <span
                        key={cIdx}
                        className="relative inline-block align-baseline"
                      >
                        <span className={isLocked ? "" : "invisible select-none"}>
                          {char}
                        </span>
                        {!isLocked && (
                          <span className="absolute inset-0 flex items-center justify-center font-mono not-italic text-[0.58em] leading-none text-[var(--accent-primary)]/85 select-none">
                            {shown}
                          </span>
                        )}
                      </span>
                    )
                  })}
                </span>
                {wIdx < words.length - 1 ? " " : null}
              </span>
            )
          })}
        </span>
      </span>
    )
  }

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{scrambleChars.join("")}</span>
    </>
  )
}

function useCairoClock() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Africa/Cairo",
      hour: "2-digit",
      minute: "2-digit",
    })

    const update = () => setTime(formatter.format(new Date()))
    update()

    const timer = setInterval(update, 15_000)
    return () => clearInterval(timer)
  }, [])

  return time
}

export default function HeroSection() {
  const cairoTime = useCairoClock()

  return (
    <div id="top" className="relative p-3 sm:p-5 lg:p-6 bg-[var(--bg-deep)]">
      <div className="relative rounded-2xl sm:rounded-[24px] overflow-hidden border border-[var(--border-subtle)] min-h-[calc(100svh-24px)] sm:min-h-[calc(100svh-40px)] lg:min-h-[calc(100svh-48px)] flex flex-col bg-[var(--bg-deep)] shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
        <HeroAsciiOne className="flex-1 justify-between">
          {/* Multi-layered readability scrim: protects left editorial copy without obscuring right ASCII figure */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#06090B]/88 via-[#06090B]/45 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06090B]/80 via-transparent to-[#06090B]/35"
          />

          {/* Main Inset Hero Grid */}
          <div className="relative z-10 w-full flex-1 max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-between pointer-events-none">
            {/* Top-Right Quick-Access Rail (Desktop tucked below navbar; crisp compact bar on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: ease.editorial }}
              className="pointer-events-auto pt-24 sm:pt-28 lg:pt-0 lg:absolute lg:top-24 lg:right-10 z-20 w-full lg:w-auto"
            >
              <div className="grid grid-cols-4 lg:flex items-center gap-1.5 sm:gap-2">
                {QUICK_ACCESS_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    aria-label={item.ariaLabel}
                    className="group relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 min-h-[50px] sm:min-h-0 sm:h-10 px-1.5 sm:px-3.5 rounded-xl border border-[var(--border-subtle)] bg-[#0D1216]/72 backdrop-blur-md hover:border-[var(--border-accent)] hover:bg-[#141C21]/90 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 cursor-pointer shadow-[inset_0_1px_0_rgba(240,244,242,0.04)]"
                  >
                    <item.icon
                      className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors shrink-0"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.08em] sm:tracking-[0.14em] uppercase text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Center-Left Editorial Narrative */}
            <div className="w-full max-w-3xl pt-10 sm:pt-14 lg:pt-36 pb-10 sm:pb-12 my-auto space-y-6 sm:space-y-7">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: ease.editorial }}
                className="flex items-center gap-3 font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase text-[var(--text-secondary)]"
              >
                <span
                  aria-hidden="true"
                  className="w-7 h-[1px] bg-[var(--accent-primary)] shrink-0"
                />
                <span>{IDENTITY.heroEyebrow}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.08,
                  ease: ease.editorial,
                }}
                className="text-[clamp(2.35rem,5.4vw,4.75rem)] leading-[1.06] tracking-[-0.03em] text-[var(--text-primary)]"
              >
                <span className="block font-sans font-semibold">
                  Software Engineer
                </span>
                <span className="block mt-0.5">
                  <DecryptedText text="& Cybersecurity Specialist" />
                </span>
                <span className="block mt-1 font-sans font-semibold">
                  Exploring{" "}
                  <span className="text-[var(--accent-primary)]">AI</span>
                  <span className="text-[var(--text-muted)]"> &amp; </span>
                  Building What&apos;s Next
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.16,
                  ease: ease.editorial,
                }}
                className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed"
              >
                {IDENTITY.heroSubtitle}
              </motion.p>

              {/* Primary & Secondary CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.24,
                  ease: ease.editorial,
                }}
                className="pointer-events-auto flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-3.5 pt-2"
              >
                <a
                  href="#projects"
                  className="group inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-xl bg-[var(--surface-platinum)] text-[var(--ink-dark)] text-[13px] font-medium tracking-[-0.01em] hover:bg-white transition-all duration-200 active:scale-[0.97] shadow-[0_10px_28px_rgba(0,0,0,0.4)] cursor-pointer"
                >
                  <SlotText text="View Projects" />
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href={IDENTITY.emailHref}
                  className="group inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-xl border border-[var(--border-strong)] bg-[#0D1216]/65 backdrop-blur-md text-[var(--text-primary)] text-[13px] font-medium tracking-[-0.01em] hover:border-[var(--border-accent)] hover:bg-[#141C21]/88 transition-all duration-200 active:scale-[0.97] cursor-pointer"
                >
                  <SlotText text="Contact Me" />
                </a>
              </motion.div>
            </div>

            {/* Bottom Telemetry Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: ease.out }}
              className="pointer-events-auto w-full flex items-center justify-between gap-4 border-t border-[var(--border-subtle)]/80 py-4 sm:py-5"
            >
              {/* Left: Live Cairo Clock */}
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--text-secondary)] tabular-nums">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]"
                />
                <span>
                  {cairoTime ? `${cairoTime} · ` : ""}
                  {IDENTITY.timezoneLabel}
                </span>
              </div>

              {/* Center: Scroll to Explore */}
              <a
                href="#manifesto"
                aria-label="Scroll to explore manifesto section"
                className="group inline-flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors min-h-[36px] min-w-[36px] px-2 rounded-md cursor-pointer"
              >
                <span className="hidden sm:inline">Scroll to Explore</span>
                <ArrowDown
                  className="w-3.5 h-3.5 text-[var(--accent-primary)] transition-transform duration-300 group-hover:translate-y-0.5 motion-safe:animate-bounce"
                  style={{ animationDuration: "2.6s" }}
                  aria-hidden="true"
                />
              </a>

              {/* Right: Domain Telemetry */}
              <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--text-secondary)]">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-primary)]" />
                </span>
                <span>{IDENTITY.heroDomainPill}</span>
              </div>
            </motion.div>
          </div>
        </HeroAsciiOne>
      </div>
    </div>
  )
}
