"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  Shield,
  BrainCircuit,
  Code2,
  GraduationCap,
  MapPin,
  Globe,
  ArrowRight,
  Download,
} from "lucide-react"
import Signature from "@/components/portfolio/Signature"
import SlotText from "@/components/portfolio/SlotText"
import {
  IDENTITY,
  FOCUS_PILLARS,
  type CapabilityPillar,
} from "@/lib/portfolio-data"
import { ease, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

const PILLAR_ICONS = [Shield, BrainCircuit, Code2] as const

function getPillarSurfaceClasses(tone: CapabilityPillar["tone"]) {
  switch (tone) {
    case "platinum":
      return {
        card: "bg-gradient-to-br from-[#ECEFEB] via-[#DFE6E2] to-[#CDD6D1] text-[#0B1114] border border-white/60 [.light_&]:border-[var(--border-strong)] shadow-[0_22px_54px_rgba(0,0,0,0.35)] [.light_&]:shadow-[0_18px_44px_rgba(11,19,17,0.08)]",
        iconWrap: "bg-[#0B1114]/[0.08] border border-[#0B1114]/15 text-[#0B1114]",
        focusLabel: "text-[#0B1114]/70",
        number: "text-[#0B1114]/45",
        title: "text-[#0B1114]",
        subtitle: "text-[#0B1114]/75",
        description: "text-[#162024]",
        divider: "border-[#0B1114]/12",
        tag: "bg-[#0B1114]/[0.08] border border-[#0B1114]/12 text-[#0B1114]",
      }
    case "verdigris":
      return {
        card: "bg-gradient-to-br from-[#0E6D5A] via-[#0A5243] to-[#07382E] text-[#F0F4F2] border border-[#26D0A8]/30 shadow-[0_24px_60px_rgba(10,82,67,0.34),inset_0_1px_0_rgba(240,244,242,0.12)]",
        iconWrap:
          "bg-[#F0F4F2]/12 border border-[#F0F4F2]/20 text-[#F0F4F2]",
        focusLabel: "text-[#C5EFE4]",
        number: "text-[#C5EFE4]/60",
        title: "text-[#F0F4F2]",
        subtitle: "text-[#D4F1EA]",
        description: "text-[#E3F3EF]",
        divider: "border-[#F0F4F2]/15",
        tag: "bg-[#06090B]/30 border border-[#F0F4F2]/20 text-[#F0F4F2]",
      }
    case "obsidian":
      return {
        card: "bg-gradient-to-br from-[#192228] to-[#0D1216] [.light_&]:from-[var(--bg-surface)] [.light_&]:to-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-strong)] shadow-[0_22px_54px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(240,244,242,0.06)] [.light_&]:shadow-[0_18px_44px_rgba(11,19,17,0.08)]",
        iconWrap:
          "bg-[var(--accent-deep)]/45 border border-[var(--border-accent)] text-[var(--accent-primary)]",
        focusLabel: "text-[var(--accent-primary)]",
        number: "text-[var(--text-muted)]",
        title: "text-[var(--text-primary)]",
        subtitle: "text-[var(--text-secondary)]",
        description: "text-[var(--text-secondary)]",
        divider: "border-[var(--border-subtle)]",
        tag: "bg-[var(--bg-deep)]/75 border border-[var(--border-subtle)] text-[var(--text-secondary)]",
      }
  }
}

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-24 sm:py-32 scroll-mt-20 border-t border-[var(--border-subtle)] bg-[var(--bg-deep)] overflow-x-clip"
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        {/* Part A — Editorial 12-Column Identity Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Architectural Portrait Frame + Tech Ruler + Signature Nameplate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: ease.editorial }}
            className="lg:col-span-5"
          >
            <div className="group relative aspect-[4/5] w-full max-w-[440px] mx-auto lg:mx-0 rounded-[20px] p-1.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)]/60 transition-colors duration-500 shadow-[0_24px_64px_rgba(0,0,0,0.52)] [.light_&]:shadow-[0_20px_50px_rgba(11,19,17,0.1)]">
              <div className="relative w-full h-full overflow-hidden rounded-[14px] bg-[var(--bg-deep)]">
                <Image
                  src="/profile.jpg"
                  alt="Portrait of Youssef Elsayed, Computer Science student and cybersecurity specialist"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover object-[50%_4%] scale-[1.04] contrast-[1.06] saturate-[0.82] brightness-[0.94] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.07]"
                />

                {/* Bottom vignette for seamless integration & nameplate legibility */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-[var(--bg-deep)]/35 to-transparent [.light_&]:from-[#0B1311]/45 [.light_&]:via-transparent"
                />

                {/* Studio radial edge fade so bright outdoor street edges recede cleanly */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 [.light_&]:opacity-35"
                  style={{
                    background:
                      "radial-gradient(ellipse 62% 58% at 50% 30%, transparent 36%, rgba(6, 9, 11, 0.55) 74%, rgba(6, 9, 11, 0.92) 100%)",
                  }}
                />

                {/* 10-Tick Right-Edge Tech Ruler (tick #6 accentuated in Glacial Verdigris) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 z-10 flex flex-col items-center gap-1.5"
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "block w-[3px] rounded-full",
                        i === 5
                          ? "h-4 bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-glow)]"
                          : "h-1 bg-[var(--text-primary)]/45 [.light_&]:bg-white/75"
                      )}
                    />
                  ))}
                </div>

                {/* Bottom Frosted Nameplate with Handwritten Signature */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-10 rounded-xl bg-[var(--bg-surface)]/85 backdrop-blur-md border border-[var(--border-subtle)] px-5 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(240,244,242,0.05)] [.light_&]:shadow-[0_14px_34px_rgba(11,19,17,0.14)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:-translate-y-1">
                  <div className="mb-2.5">
                    <Signature
                      animated
                      className="w-40 sm:w-44 -rotate-2"
                      strokeClassName="stroke-[var(--text-primary)]"
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="w-8 h-[1px] bg-[var(--accent-primary)] mb-2.5"
                  />
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-secondary)]">
                    {IDENTITY.portraitCaption}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Editorial Narrative + Actions + Metadata Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, delay: 0.1, ease: ease.editorial }}
            className="lg:col-span-7 flex flex-col justify-between gap-10"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--accent-primary)]">
                <span
                  aria-hidden="true"
                  className="w-6 h-[1px] bg-[var(--accent-primary)]"
                />
                <span>{"// About Me"}</span>
              </div>

              <h2
                id="about-heading"
                className="text-3xl sm:text-4xl lg:text-[2.65rem] font-sans font-semibold leading-[1.12] tracking-[-0.025em] text-[var(--text-primary)]"
              >
                Computer Science student passionate about building{" "}
                <span className="font-serif italic font-normal text-[var(--accent-primary)] serif-luminance">
                  secure
                </span>{" "}
                and{" "}
                <span className="font-serif italic font-normal text-[var(--accent-primary)] serif-luminance">
                  intelligent
                </span>{" "}
                systems.
              </h2>

              <div className="space-y-4 text-[15px] sm:text-base text-[var(--text-secondary)] leading-[1.7] max-w-[65ch]">
                {IDENTITY.aboutParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#projects"
                  className="group inline-flex items-center justify-center gap-2.5 h-11 px-5 rounded-xl bg-[var(--surface-platinum)] text-[var(--ink-dark)] text-[13px] font-medium tracking-[-0.01em] hover:opacity-92 transition-all duration-200 active:scale-[0.97] cursor-pointer"
                >
                  <SlotText text="View Projects" />
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href={IDENTITY.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 h-11 px-5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-[13px] font-medium tracking-[-0.01em] hover:border-[var(--border-accent)] hover:bg-[var(--bg-elevated)] transition-all duration-200 active:scale-[0.97] cursor-pointer"
                >
                  <SlotText text="Download CV" />
                  <Download
                    className="w-4 h-4 text-[var(--accent-primary)] transition-transform duration-200 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            {/* 3-Column Architectural Metadata Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-[var(--border-subtle)] pt-8">
              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--accent-primary)] shrink-0">
                  <GraduationCap className="w-4 h-4" aria-hidden="true" />
                </span>
                <div className="space-y-1">
                  <span className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-muted)]">
                    Education
                  </span>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {IDENTITY.education.degree}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {IDENTITY.education.institution}
                  </p>
                  <p className="font-mono text-[11px] text-[var(--text-muted)] tabular-nums">
                    {IDENTITY.education.standing}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--accent-primary)] shrink-0">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </span>
                <div className="space-y-1">
                  <span className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-muted)]">
                    Location
                  </span>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {IDENTITY.locationPrimary}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {IDENTITY.locationSecondary}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--accent-primary)] shrink-0">
                  <Globe className="w-4 h-4" aria-hidden="true" />
                </span>
                <div className="space-y-1">
                  <span className="block font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-muted)]">
                    Languages
                  </span>
                  {IDENTITY.languages.map((lang) => (
                    <p
                      key={lang.name}
                      className="text-sm font-medium text-[var(--text-primary)]"
                    >
                      {lang.name}{" "}
                      <span className="text-xs font-normal text-[var(--text-secondary)]">
                        ({lang.level})
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Part B — Crimson-Inspired 3-Tone Focus Pillar Trio */}
        <div className="mt-20 lg:mt-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, ease: ease.editorial }}
            className="text-center max-w-2xl mx-auto mb-12 lg:mb-14 space-y-3"
          >
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)]">
              {"// Core Focus Pillars"}
            </p>
            <h3 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-sans font-semibold leading-[1.15] tracking-[-0.025em] text-[var(--text-primary)]">
              Where my engineering focus meets{" "}
              <span className="font-serif italic font-normal text-[var(--accent-primary)] serif-luminance">
                craft
              </span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {FOCUS_PILLARS.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx] ?? Code2
              const styles = getPillarSurfaceClasses(pillar.tone)
              const perspectiveRest =
                idx === 0
                  ? "lg:[transform:perspective(1200px)_rotateY(3deg)]"
                  : idx === 2
                    ? "lg:[transform:perspective(1200px)_rotateY(-3deg)]"
                    : "lg:scale-[1.015]"

              return (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.08,
                    ease: ease.editorial,
                  }}
                  className="flex"
                >
                  <article
                    className={cn(
                      "relative w-full rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none",
                      "[@media(hover:hover)_and_(pointer:fine)]:hover:[transform:perspective(1200px)_rotateY(0deg)_translateY(-6px)]",
                      perspectiveRest,
                      styles.card
                    )}
                  >
                    <div className="space-y-5">
                      {/* Top Row: Icon + Focus Telemetry Label */}
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={cn(
                            "flex items-center justify-center w-11 h-11 rounded-xl shrink-0",
                            styles.iconWrap
                          )}
                        >
                          <Icon
                            className="w-5 h-5"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                        </span>
                        <span
                          className={cn(
                            "font-mono text-[10px] tracking-[0.16em] uppercase tabular-nums",
                            styles.focusLabel
                          )}
                        >
                          {pillar.focusLabel}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="space-y-1.5">
                        <h4
                          className={cn(
                            "text-2xl sm:text-[1.65rem] font-sans font-semibold leading-[1.15] tracking-[-0.025em] whitespace-pre-line",
                            styles.title
                          )}
                        >
                          {pillar.title}
                        </h4>
                        <p
                          className={cn(
                            "font-mono text-[11px] tracking-[0.08em]",
                            styles.subtitle
                          )}
                        >
                          {pillar.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p
                        className={cn(
                          "text-sm leading-[1.65]",
                          styles.description
                        )}
                      >
                        {pillar.description}
                      </p>
                    </div>

                    {/* Compact Tech Tags */}
                    <div className={cn("pt-5 border-t", styles.divider)}>
                      <ul
                        className="flex flex-wrap gap-1.5"
                        aria-label={`${pillar.title.replace("\n", " ")} focus areas`}
                      >
                        {pillar.tags.map((tag) => (
                          <li
                            key={tag}
                            className={cn(
                              "px-2.5 py-1 rounded-md font-mono text-[10px] tracking-[0.06em]",
                              styles.tag
                            )}
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
