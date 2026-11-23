"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Check, Copy, FileText, Mail, MessageCircle } from "lucide-react"
import { toast } from "sonner"
import { IDENTITY, VERIFIED_METRICS } from "@/lib/portfolio-data"
import { ease, viewportOnce } from "@/lib/motion"
import { BrandMark } from "@/components/portfolio/BrandLogo"

interface AnimatedCounterProps {
  value: number
  suffix: string
  label: string
}

function AnimatedCounter({ value, suffix, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const prefersReducedMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState<number>(value)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value)
      hasAnimatedRef.current = true
      return
    }

    if (!inView || hasAnimatedRef.current) return
    hasAnimatedRef.current = true

    const durationMs = value >= 1000 ? 1150 : 900
    const startTime = performance.now()
    let frameId = 0

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const nextVal = Math.round(eased * value)
      setDisplayValue(nextVal)

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick)
      } else {
        setDisplayValue(value)
      }
    }

    setDisplayValue(0)
    frameId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [inView, prefersReducedMotion, value])

  const formattedFinal = `${value.toLocaleString("en-US")}${suffix}`

  return (
    <span
      ref={ref}
      aria-label={`${formattedFinal} ${label}`}
      className="font-serif text-4xl sm:text-5xl text-[var(--text-primary)] tabular-nums tracking-[-0.02em] leading-none inline-flex items-baseline"
    >
      <span>{displayValue.toLocaleString("en-US")}</span>
      {suffix && (
        <span className="text-[var(--accent-primary)] ml-0.5">{suffix}</span>
      )}
    </span>
  )
}

export default function ContactDeckSection() {
  const prefersReducedMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current)
      }
    }
  }, [])

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
    <section
      aria-labelledby="contact-deck-heading"
      className="py-24 sm:py-32 border-t border-[var(--border-subtle)] editorial-dots bg-transparent relative"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Centered Editorial Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.55,
            ease: ease.editorial,
          }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent-primary)] mb-4">
            // Direct Channels
          </p>
          <h2
            id="contact-deck-heading"
            className="text-[clamp(2.5rem,5vw,4.25rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[var(--text-primary)]"
          >
            Get In{" "}
            <span className="font-serif italic font-normal serif-luminance">
              Touch
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
            Open to cybersecurity internships, software engineering roles, and
            technical collaborations.
          </p>
        </motion.div>

        {/* 12-Col Split: Dual Tilted Contact Deck + Verified Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-16">
          {/* Left: Dual Overlapping Tilted Contact Cards */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              ease: ease.editorial,
            }}
            className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-0 py-2 sm:py-6"
          >
            {/* Card 1: Personal Portrait Card */}
            <div className="relative z-10 w-full max-w-[320px] sm:w-[272px] xl:w-[292px] sm:-mr-3 sm:-rotate-3 sm:hover:rotate-0 sm:hover:-translate-y-2 hover:z-20 motion-reduce:rotate-0 motion-reduce:hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] bg-gradient-to-b from-[#172127] to-[#0D1216] border border-[var(--border-strong)] rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />

              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[var(--accent-primary)]/25 bg-[var(--accent-deep)] shrink-0 shadow-[0_12px_28px_rgba(0,0,0,0.45)]">
                <img
                  src="/profile.jpg"
                  alt="Youssef Elsayed"
                  className="w-full h-full object-cover object-[50%_8%] scale-105"
                />
              </div>

              <h3 className="font-serif italic text-3xl leading-[0.98] text-[var(--text-primary)] mt-5">
                Youssef
                <br />
                Elsayed
              </h3>

              <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                Software &amp; Security Engineer
              </p>

              <div className="grid grid-cols-2 gap-2.5 w-full mt-6 pt-5 border-t border-[var(--border-subtle)]">
                <a
                  href={IDENTITY.emailHref}
                  className="h-10 rounded-xl bg-[var(--surface-platinum)] text-[var(--ink-dark)] hover:bg-white font-medium text-xs inline-flex items-center justify-center gap-1.5 transition-all active:scale-[0.97]"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" strokeWidth={1.85} aria-hidden="true" />
                  <span>Email</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy Youssef's email address to clipboard"
                  className="h-10 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-deep)]/70 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-[var(--text-primary)] font-medium text-xs inline-flex items-center justify-center gap-1.5 transition-all active:scale-[0.97] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check
                        className="w-3.5 h-3.5 shrink-0 text-[var(--accent-primary)]"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span className="text-[var(--accent-primary)]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Card 2: YE Connect Card */}
            <div className="relative z-10 w-full max-w-[320px] sm:w-[272px] xl:w-[292px] sm:-ml-3 sm:mt-8 sm:rotate-3 sm:hover:rotate-0 sm:hover:-translate-y-2 hover:z-20 motion-reduce:rotate-0 motion-reduce:hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] bg-gradient-to-b from-[#122622] to-[#0A1315] border border-[var(--border-accent)] rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)]/45 to-transparent"
              />

              <div
                aria-hidden="true"
                className="w-24 h-24 rounded-full bg-[var(--accent-deep)]/65 ring-4 ring-[var(--accent-primary)]/25 flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(240,244,242,0.18),0_12px_28px_rgba(0,0,0,0.45)]"
              >
                <BrandMark size={62} />
              </div>

              <h3 className="font-serif italic text-3xl leading-[0.98] text-[var(--text-primary)] mt-5">
                Say
                <br />
                Hello
              </h3>

              <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                Internships, projects &amp; talks
              </p>

              <div className="grid grid-cols-2 gap-2.5 w-full mt-6 pt-5 border-t border-[var(--border-accent)]/30">
                <a
                  href={IDENTITY.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 rounded-xl bg-[var(--accent-primary)] text-[var(--ink-dark)] hover:bg-[#34DFB7] font-medium text-xs inline-flex items-center justify-center gap-1.5 transition-all active:scale-[0.97]"
                >
                  <MessageCircle
                    className="w-3.5 h-3.5 shrink-0"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={encodeURI(IDENTITY.resumePath)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-deep)]/65 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-[var(--text-primary)] font-medium text-xs inline-flex items-center justify-center gap-1.5 transition-all active:scale-[0.97]"
                >
                  <FileText
                    className="w-3.5 h-3.5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: 3 Hairline-Divided Verified Metrics */}
          <div className="lg:col-span-6 divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
            {VERIFIED_METRICS.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  delay: prefersReducedMotion ? 0 : idx * 0.08,
                  ease: ease.editorial,
                }}
                className="py-7 sm:py-8 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
              >
                <div className="sm:col-span-4">
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                    label={metric.label}
                  />
                </div>
                <div className="sm:col-span-8">
                  <h3 className="text-base sm:text-lg font-medium text-[var(--text-primary)] tracking-[-0.01em]">
                    {metric.label}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
