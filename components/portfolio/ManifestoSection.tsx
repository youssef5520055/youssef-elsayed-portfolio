"use client"

import { useMemo, useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { IDENTITY, VERIFIED_ISSUERS } from "@/lib/portfolio-data"
import { cn } from "@/lib/utils"

type WordStyle = "normal" | "italic-primary" | "italic-accent"

interface ManifestoToken {
  word: string
  style: WordStyle
}

const EMPHASIS_PHRASES: Array<{ phrase: string; style: WordStyle }> = [
  { phrase: "resilient software", style: "italic-primary" },
  { phrase: "hardened network architectures", style: "italic-primary" },
  { phrase: "protected and polished", style: "italic-accent" },
]

function buildManifestoTokens(text: string): ManifestoToken[] {
  const ranges = EMPHASIS_PHRASES.map(({ phrase, style }) => {
    const start = text.indexOf(phrase)
    return {
      start,
      end: start >= 0 ? start + phrase.length : -1,
      style,
    }
  }).filter((r) => r.start >= 0)

  const tokens: ManifestoToken[] = []
  for (const match of text.matchAll(/\S+/g)) {
    const word = match[0]
    const wordStart = match.index ?? 0
    const wordEnd = wordStart + word.length

    let style: WordStyle = "normal"
    for (const range of ranges) {
      if (wordStart < range.end && wordEnd > range.start) {
        style = range.style
        break
      }
    }

    tokens.push({ word, style })
  }

  return tokens
}

function ManifestoWord({
  word,
  style,
  progress,
  range,
  reduced,
}: {
  word: string
  style: WordStyle
  progress: MotionValue<number>
  range: [number, number]
  reduced: boolean
}) {
  const opacity = useTransform(progress, range, [0.24, 1])

  return (
    <motion.span
      style={reduced ? { opacity: 1 } : { opacity }}
      className={cn(
        "inline-block mr-[0.26em] last:mr-0 will-change-[opacity]",
        style === "italic-primary" &&
          "italic text-[var(--text-primary)] serif-luminance",
        style === "italic-accent" && "italic text-[var(--accent-primary)]"
      )}
    >
      {word}
    </motion.span>
  )
}

export default function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = Boolean(useReducedMotion())

  const tokens = useMemo(
    () => buildManifestoTokens(IDENTITY.manifestoText),
    []
  )

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.86", "end 0.5"],
  })

  return (
    <section
      id="manifesto"
      aria-label="Engineering manifesto and verified credential issuers"
      className="relative editorial-dots py-24 sm:py-32 lg:py-36 scroll-mt-20 overflow-hidden border-t border-[var(--border-subtle)] bg-[var(--bg-deep)]"
    >
      {/* Soft edge fades into obsidian ground */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--bg-deep)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--bg-deep)] to-transparent"
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-10">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10 font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)]">
          <span
            aria-hidden="true"
            className="w-6 h-[1px] bg-[var(--border-strong)]"
          />
          <span>{"// Engineering Ethos"}</span>
          <span
            aria-hidden="true"
            className="w-6 h-[1px] bg-[var(--border-strong)]"
          />
        </div>

        {/* Scroll-Illuminated Editorial Statement */}
        <div ref={containerRef} className="max-w-5xl mx-auto">
          <p className="font-serif text-[clamp(1.85rem,3.8vw,3.5rem)] leading-[1.15] tracking-[-0.025em] text-center text-[var(--text-primary)]">
            {tokens.map((token, idx) => {
              const total = tokens.length
              const start = (idx / total) * 0.78
              const end = Math.min(1, start + 0.24)
              return (
                <ManifestoWord
                  key={`${token.word}-${idx}`}
                  word={token.word}
                  style={token.style}
                  progress={scrollYProgress}
                  range={[start, end]}
                  reduced={prefersReducedMotion}
                />
              )
            })}
          </p>
        </div>

        {/* Verified Credential Issuers Marquee Bar */}
        <div className="mt-20 sm:mt-24 pt-10 border-t border-[var(--border-subtle)] flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          {/* Left Institutional Verification Badge */}
          <div className="shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[inset_0_1px_0_rgba(240,244,242,0.04)]">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent-deep)]/50 border border-[var(--border-accent)] text-[var(--accent-primary)]">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            </span>
            <div className="text-left">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--accent-primary)]">
                Verified Credentials
              </p>
              <p className="text-xs font-medium text-[var(--text-primary)]">
                Verified by {VERIFIED_ISSUERS.length} Institutions
              </p>
            </div>
          </div>

          {/* Right Continuous Marquee Track */}
          <div
            className="flex-1 w-full min-w-0 marquee-wrapper marquee-mask overflow-hidden py-2"
            aria-label="Certified by 11 institutions"
          >
            <div className="animate-issuer-marquee items-center motion-reduce:flex-wrap motion-reduce:w-full motion-reduce:justify-center motion-reduce:gap-y-3">
              {[0, 1].map((dupIndex) => (
                <div
                  key={dupIndex}
                  aria-hidden={dupIndex === 1 ? true : undefined}
                  className={cn(
                    "flex items-center shrink-0",
                    dupIndex === 1 && "motion-reduce:hidden",
                    dupIndex === 0 &&
                      "motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-2"
                  )}
                >
                  {VERIFIED_ISSUERS.map((issuer, idx) => {
                    const isSerif = idx % 2 === 0
                    return (
                      <div
                        key={`${dupIndex}-${issuer}`}
                        className="flex items-center shrink-0"
                      >
                        <span
                          className={cn(
                            "px-5 sm:px-7 whitespace-nowrap transition-colors duration-200 hover:text-[var(--text-primary)]",
                            isSerif
                              ? "font-serif text-lg sm:text-[21px] tracking-[-0.01em] text-[var(--text-primary)]/90"
                              : "font-mono text-[11px] sm:text-xs tracking-[0.16em] uppercase text-[var(--text-secondary)]"
                          )}
                        >
                          {issuer}
                        </span>
                        <span
                          aria-hidden="true"
                          className="w-1 h-1 rounded-full bg-[var(--accent-primary)]/50 shrink-0"
                        />
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
