"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import {
  SKILL_DOMAIN_CARDS,
  SKILL_CATEGORIES,
  type SkillCategory,
} from "@/lib/portfolio-data"
import { ease, spring } from "@/lib/motion"
import { cn } from "@/lib/utils"

type DomainFilter = "All Domains" | SkillCategory["domain"]

const DOMAIN_FILTERS: DomainFilter[] = [
  "All Domains",
  "Security & Infra",
  "AI & Data",
  "Engineering",
  "Foundations",
]

export default function SkillsSection() {
  const defaultCardId =
    SKILL_DOMAIN_CARDS.find((card) => card.featured)?.id ??
    SKILL_DOMAIN_CARDS[0]?.id ??
    "security-defense"

  const [activeCardId, setActiveCardId] = useState<string>(defaultCardId)
  const [activeDomain, setActiveDomain] = useState<DomainFilter>("All Domains")

  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })

  const totalSkills = SKILL_CATEGORIES.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  )

  const filteredCategories =
    activeDomain === "All Domains"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.domain === activeDomain)

  const visibleSkillCount = filteredCategories.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  )

  const getDomainSkillCount = (domain: DomainFilter) => {
    if (domain === "All Domains") return totalSkills
    return SKILL_CATEGORIES.filter((c) => c.domain === domain).reduce(
      (sum, c) => sum + c.items.length,
      0
    )
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 sm:py-32 scroll-mt-20 border-t border-[var(--border-subtle)] editorial-dots relative"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
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
              // Technical_Arsenal
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.025em] leading-[1.06] text-[var(--text-primary)]">
              Capabilities &amp;{" "}
              <span className="font-serif italic font-normal text-[var(--accent-primary)] serif-luminance">
                Core Competencies
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-2 max-w-md">
            <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-[1.7] lg:text-right">
              Multidisciplinary depth spanning cybersecurity defense, enterprise
              Linux &amp; cloud networking, machine learning pipelines, and
              modern full-stack engineering.
            </p>
            <span className="font-mono text-xs text-[var(--accent-primary)] tabular-nums">
              {totalSkills} Verified Skills · {SKILL_CATEGORIES.length} Core
              Disciplines
            </span>
          </div>
        </motion.div>

        {/* PART A — Elena-Inspired 4 Signature Domain Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
          role="group"
          aria-label="Signature capability domains"
        >
          {SKILL_DOMAIN_CARDS.map((card, idx) => {
            const isActive = activeCardId === card.id
            return (
              <motion.article
                key={card.id}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 16 }
                }
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: prefersReducedMotion ? 0 : idx * 0.06,
                  ease: ease.editorial,
                }}
                className={cn(
                  "group relative text-left rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 min-h-[320px]",
                  isActive
                    ? "bg-gradient-to-br from-[#0F735F] via-[#0A5243] to-[#07362C] border-[#26D0A8]/45 text-[#F0F4F2] shadow-[0_20px_50px_rgba(10,82,67,0.35)]"
                    : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]/60 text-[var(--text-primary)] [.light_&]:shadow-[0_12px_32px_rgba(11,19,17,0.06)]"
                )}
              >
                <div>
                  {/* Top Row: (01)..(04) + Elena Circular Arrow Badge */}
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <span
                      className={cn(
                        "font-mono text-xs tracking-[0.14em] tabular-nums transition-colors",
                        isActive
                          ? "text-[#E4F5F0]"
                          : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
                      )}
                    >
                      ({card.number})
                    </span>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                        isActive
                          ? "bg-[#E4EAE7] text-[#0B1114] shadow-sm"
                          : "border border-[var(--border-strong)] text-[var(--text-secondary)] group-hover:border-[var(--accent-primary)]/60 group-hover:text-[var(--accent-primary)]"
                      )}
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  {/* Interactive Card Trigger + Semantic Heading (valid HTML5 stretched-button pattern) */}
                  <h3
                    className={cn(
                      "text-xl font-semibold tracking-[-0.015em] leading-snug mb-3 transition-colors",
                      isActive ? "text-[#F0F4F2]" : "text-[var(--text-primary)]"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveCardId(card.id)}
                      aria-pressed={isActive}
                      className="text-left cursor-pointer focus-visible:outline-none after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-[var(--accent-primary)] focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-[var(--bg-deep)]"
                    >
                      {card.title}
                    </button>
                  </h3>

                  <p
                    className={cn(
                      "text-sm leading-[1.65] mb-6 transition-colors",
                      isActive
                        ? "text-[#E4F2EE]/90"
                        : "text-[var(--text-secondary)]"
                    )}
                  >
                    {card.summary}
                  </p>
                </div>

                {/* 4 Structured Highlights */}
                <ul
                  className={cn(
                    "space-y-2.5 pt-5 border-t transition-colors",
                    isActive
                      ? "border-[#F0F4F2]/20"
                      : "border-[var(--border-subtle)]"
                  )}
                >
                  {card.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className={cn(
                        "flex items-start gap-2.5 text-[13px] leading-snug",
                        isActive
                          ? "text-[#F0F4F2]/95"
                          : "text-[var(--text-secondary)]"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                          isActive
                            ? "bg-[#E4EAE7]"
                            : "bg-[var(--accent-primary)]"
                        )}
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>

        {/* PART B — Complete 9-Category Filterable Technical Matrix */}
        <div className="mt-16 sm:mt-20 pt-14 border-t border-[var(--border-subtle)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] tracking-[-0.015em] mb-1">
                Complete Technical Matrix
              </h3>
              <p className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
                Showing {visibleSkillCount} of {totalSkills} verified skills
                across {filteredCategories.length}{" "}
                {filteredCategories.length === 1 ? "category" : "categories"}
              </p>
            </div>

            {/* Domain Filter Pills */}
            <div
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label="Filter technical matrix by domain"
            >
              {DOMAIN_FILTERS.map((domain) => {
                const isSelected = activeDomain === domain
                return (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => setActiveDomain(domain)}
                    aria-pressed={isSelected}
                    className={cn(
                      "relative px-3.5 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer flex items-center gap-2 min-h-[40px] border",
                      isSelected
                        ? "border-[var(--border-accent)] text-[var(--text-primary)]"
                        : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                    )}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="skills-domain-pill"
                        transition={spring.crisp}
                        aria-hidden="true"
                        className="absolute inset-0 rounded-xl bg-[var(--accent-deep)]/65"
                      />
                    )}
                    <span className="relative z-10">{domain}</span>
                    <span
                      className={cn(
                        "relative z-10 text-[10px] tabular-nums px-1.5 py-0.5 rounded-md",
                        isSelected
                          ? "bg-[var(--bg-deep)]/60 text-[var(--accent-primary)]"
                          : "bg-[var(--bg-elevated)] text-[var(--text-muted)]"
                      )}
                    >
                      {getDomainSkillCount(domain)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3-Column Architectural Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            <AnimatePresence mode="popLayout">
              {filteredCategories.map((category) => (
                <motion.div
                  key={category.name}
                  layout={!prefersReducedMotion}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 8 }
                  }
                  transition={{ duration: 0.24, ease: ease.editorial }}
                  className="group rounded-2xl bg-[var(--bg-surface)]/90 border border-[var(--border-subtle)] hover:border-[var(--border-strong)] p-6 flex flex-col transition-colors duration-200 [.light_&]:shadow-[0_12px_32px_rgba(11,19,17,0.06)]"
                >
                  {/* Category Header + Hairline Rule */}
                  <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        aria-hidden="true"
                        className="w-2 h-2 rounded-full bg-[var(--accent-primary)] shrink-0"
                      />
                      <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-primary)] font-medium truncate">
                        {category.name}
                      </h4>
                    </div>
                    <span className="font-mono text-[11px] text-[var(--text-muted)] tabular-nums shrink-0">
                      {String(category.items.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Tactile Skill Chips */}
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)]/75 border border-[var(--border-subtle)] hover:border-[var(--border-accent)]/70 hover:text-[var(--text-primary)] text-[13px] text-[var(--text-secondary)] transition-colors duration-150 leading-snug"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Subtle Domain Footer */}
                  <div className="mt-auto pt-5 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      {category.domain}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
