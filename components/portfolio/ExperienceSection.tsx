"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { MapPin } from "lucide-react"
import { EXPERIENCE_ITEMS } from "@/lib/portfolio-data"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 sm:py-32 scroll-mt-20 border-t border-[var(--border-subtle)] bg-transparent relative"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: ease.editorial }}
          className="mb-14 sm:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-muted)] mb-4 flex items-center gap-3">
              <span
                className="w-6 h-[1px] bg-[var(--accent-primary)]"
                aria-hidden="true"
              />
              // Trajectory
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.025em] leading-[1.06] text-[var(--text-primary)]">
              Operational{" "}
              <span className="font-serif italic font-normal text-[var(--accent-primary)] serif-luminance">
                History
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-[1.7] max-w-md">
            Verified academic progression at Misr International University
            paired with self-directed security, cloud, and full-stack
            engineering milestones.
          </p>
        </motion.div>

        {/* Full-Width Elena-Inspired Hairline Editorial Ledger */}
        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {EXPERIENCE_ITEMS.map((item, idx) => {
            const isEducation = item.type === "education"
            return (
              <motion.article
                key={item.id}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 16 }
                }
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : idx * 0.1,
                  ease: ease.editorial,
                }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 lg:py-12 px-2 sm:px-4 group transition-colors duration-200 hover:bg-[var(--bg-surface)]/45"
              >
                {/* Col 1–3: Period, Type Badge & Location */}
                <div className="lg:col-span-3 flex flex-col gap-3">
                  <p className="font-mono text-xs text-[var(--accent-primary)] tabular-nums tracking-[0.08em]">
                    {item.period}
                  </p>

                  <div>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10px] uppercase tracking-[0.18em] border",
                        isEducation
                          ? "text-[var(--accent-secondary)] border-[var(--accent-secondary)]/35 bg-[var(--accent-secondary)]/10"
                          : "text-[var(--accent-primary)] border-[var(--border-accent)] bg-[var(--accent-primary)]/10"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          isEducation
                            ? "bg-[var(--accent-secondary)]"
                            : "bg-[var(--accent-primary)]"
                        )}
                      />
                      {isEducation ? "EDUCATION" : "ENGINEERING"}
                    </span>
                  </div>

                  <p className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] mt-0.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{item.location}</span>
                  </p>
                </div>

                {/* Col 4–12: Role/Degree, Organization, Summary, Highlights & Tags */}
                <div className="lg:col-span-9 flex flex-col gap-5">
                  <div>
                    <h3 className="text-2xl sm:text-[1.75rem] font-semibold text-[var(--text-primary)] tracking-[-0.02em] leading-snug group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] font-medium text-[var(--text-secondary)] mt-1">
                      {item.organization}
                    </p>
                  </div>

                  <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-[1.7] max-w-[70ch]">
                    {item.summary}
                  </p>

                  {/* 2 Verified Achievements */}
                  <ul className="space-y-2.5">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-sm text-[var(--text-primary)]/90 leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "w-1.5 h-1.5 rounded-full mt-2 shrink-0",
                            isEducation
                              ? "bg-[var(--accent-secondary)]"
                              : "bg-[var(--accent-primary)]"
                          )}
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Subtle Mono Skill Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] group-hover:border-[var(--border-strong)] font-mono text-[11px] text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
