"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowDownRight, Plus, Quote } from "lucide-react"
import { ENDORSEMENTS_PLACEHOLDER, FAQ_ITEMS } from "@/lib/portfolio-data"
import { ease, spring, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

export default function FaqEndorsementsSection() {
  const prefersReducedMotion = useReducedMotion()
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null)

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section
      aria-labelledby="faq-heading"
      className="py-24 sm:py-32 border-t border-[var(--border-subtle)] bg-transparent relative"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Part A — Editorial FAQ Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Asymmetric Editorial Header Column */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.55,
              ease: ease.editorial,
            }}
            className="lg:col-span-4 lg:sticky lg:top-28"
          >
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent-primary)] mb-4">
              // Engineering FAQ
            </p>
            <h2
              id="faq-heading"
              className="text-4xl sm:text-5xl font-medium tracking-[-0.025em] leading-[1.06] text-[var(--text-primary)]"
            >
              Frequently Asked{" "}
              <span className="font-serif italic font-normal text-[var(--text-primary)] serif-luminance">
                Questions
              </span>
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] max-w-sm">
              Direct answers on domain focus, availability for internships and
              engineering roles, and how to verify credentials.
            </p>

            <a
              href="#contact"
              className="mt-7 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-colors group"
            >
              <span>Have a specific inquiry</span>
              <ArrowDownRight
                className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"
                aria-hidden="true"
              />
            </a>
          </motion.div>

          {/* Hairline-Separated Expandable Rows */}
          <div className="lg:col-span-8 border-y border-[var(--border-subtle)] divide-y divide-[var(--border-subtle)]">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openId === item.id
              const panelId = `faq-panel-${item.id}`
              const triggerId = `faq-trigger-${item.id}`

              return (
                <div key={item.id} className="group">
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => handleToggle(item.id)}
                      className="w-full py-6 sm:py-7 flex items-center justify-between gap-5 sm:gap-8 text-left cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-2"
                    >
                      <span className="flex items-baseline gap-4 sm:gap-5 min-w-0">
                        <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "text-lg sm:text-xl font-medium tracking-[-0.015em] leading-snug transition-colors",
                            isOpen
                              ? "text-[var(--text-primary)]"
                              : "text-[var(--text-primary)]/90 group-hover:text-[var(--accent-primary)]"
                          )}
                        >
                          {item.question}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className={cn(
                          "w-10 h-10 rounded-full border shrink-0 flex items-center justify-center transition-colors duration-300",
                          isOpen
                            ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/14 text-[var(--accent-primary)]"
                            : "border-[var(--border-strong)] bg-[var(--bg-surface)]/45 text-[var(--text-secondary)] group-hover:border-[var(--accent-primary)] group-hover:text-[var(--accent-primary)]"
                        )}
                      >
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={
                            prefersReducedMotion ? { duration: 0 } : spring.micro
                          }
                          className="inline-flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" strokeWidth={1.75} />
                        </motion.span>
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={
                          prefersReducedMotion
                            ? { opacity: 1, height: "auto" }
                            : { opacity: 0, height: 0 }
                        }
                        animate={{ opacity: 1, height: "auto" }}
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0, height: 0 }
                            : { opacity: 0, height: 0 }
                        }
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.32,
                          ease: ease.editorial,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pl-0 sm:pl-10 pr-2 sm:pr-14">
                          <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] max-w-[64ch]">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Part B — Honest Clearly-Marked Endorsements Placeholder */}
        {ENDORSEMENTS_PLACEHOLDER.enabled && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              ease: ease.editorial,
            }}
            className="mt-20 rounded-2xl border border-dashed border-[var(--accent-secondary)]/35 bg-[var(--bg-surface)]/55 p-6 sm:p-8 lg:p-10"
          >
            <div className="flex flex-col gap-3 max-w-3xl">
              <span className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[var(--accent-secondary)]/12 border border-[var(--accent-secondary)]/35 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent-secondary)]">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]"
                />
                {ENDORSEMENTS_PLACEHOLDER.label}
              </span>

              <h3 className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[var(--text-primary)] mt-1">
                {ENDORSEMENTS_PLACEHOLDER.heading}
              </h3>

              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {ENDORSEMENTS_PLACEHOLDER.note}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              {ENDORSEMENTS_PLACEHOLDER.slots.map((slot) => (
                <div
                  key={slot.role}
                  className="rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-deep)]/60 p-6 flex flex-col justify-between gap-6"
                >
                  <div className="flex flex-col gap-3">
                    <Quote
                      className="w-5 h-5 text-[var(--accent-secondary)]/55"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <p className="font-mono text-xs sm:text-[13px] leading-relaxed text-[var(--text-muted)]">
                      {slot.prompt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {slot.role}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      {slot.org}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
