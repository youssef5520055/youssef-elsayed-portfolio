"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  Eye,
  FileText,
  ShieldCheck,
  X,
} from "lucide-react"
import {
  CERTIFICATIONS,
  VERIFIED_ISSUERS,
  type CertificationItem,
} from "@/lib/portfolio-data"
import { ease, spring, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"

type CertFilter = "All" | CertificationItem["category"]

const FILTER_CATEGORIES: CertFilter[] = [
  "All",
  "Security",
  "Cloud & Linux",
  "Networking",
  "AI & Professional",
]

export default function CertificationsSection() {
  const prefersReducedMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState<CertFilter>("All")
  const [showAll, setShowAll] = useState(false)
  const [previewCert, setPreviewCert] = useState<CertificationItem | null>(null)
  const [isBrowser, setIsBrowser] = useState(false)

  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  // Lock body scroll, handle Escape key, and manage modal focus
  useEffect(() => {
    if (!previewCert) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const raf = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewCert(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.cancelAnimationFrame(raf)
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
      lastTriggerRef.current?.focus()
    }
  }, [previewCert])

  const categoryCounts = useMemo(() => {
    const counts: Record<CertFilter, number> = {
      All: CERTIFICATIONS.length,
      Security: 0,
      "Cloud & Linux": 0,
      Networking: 0,
      "AI & Professional": 0,
    }
    for (const cert of CERTIFICATIONS) {
      counts[cert.category] += 1
    }
    return counts
  }, [])

  const featuredCerts = useMemo(
    () => CERTIFICATIONS.filter((cert) => cert.featured),
    []
  )

  const visibleCerts = useMemo(() => {
    if (activeCategory === "All") {
      return showAll ? CERTIFICATIONS : featuredCerts
    }
    return CERTIFICATIONS.filter((cert) => cert.category === activeCategory)
  }, [activeCategory, featuredCerts, showAll])

  const handleOpenPreview = (
    cert: CertificationItem,
    triggerEl: HTMLButtonElement
  ) => {
    lastTriggerRef.current = triggerEl
    setPreviewCert(cert)
  }

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="py-24 sm:py-32 scroll-mt-20 border-t border-[var(--border-subtle)] bg-transparent relative"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: ease.editorial }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12"
        >
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent-primary)] mb-4">
              // Validations &amp; Clearances
            </p>
            <h2
              id="certifications-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.025em] leading-[1.06] text-[var(--text-primary)]"
            >
              Professional{" "}
              <span className="font-serif italic font-normal text-[var(--text-primary)] serif-luminance">
                Certifications
              </span>
            </h2>
          </div>

          <div className="inline-flex items-center gap-2.5 self-start lg:self-end px-4 py-2 rounded-full bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-[inset_0_1px_0_rgba(240,244,242,0.05)]">
            <ShieldCheck
              className="w-4 h-4 text-[var(--accent-primary)] shrink-0"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span className="font-mono text-xs tracking-[0.08em] text-[var(--text-secondary)] tabular-nums">
              {CERTIFICATIONS.length} Verified Credentials · {VERIFIED_ISSUERS.length} Issuers
            </span>
          </div>
        </motion.div>

        {/* Category Filter Bar */}
        <div
          role="group"
          aria-label="Filter certifications by category"
          className="flex flex-wrap items-center gap-2 mb-8 sm:mb-10"
        >
          {FILTER_CATEGORIES.map((category) => {
            const isActive = activeCategory === category
            const count = categoryCounts[category]
            const label = category === "All" ? `All (${count})` : category

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "relative px-4 py-2.5 rounded-full font-mono text-xs tracking-[0.08em] uppercase transition-colors cursor-pointer select-none active:scale-[0.98]",
                  isActive
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)]/55 border border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="cert-filter-pill"
                    transition={prefersReducedMotion ? { duration: 0 } : spring.layout}
                    className="absolute inset-0 rounded-full bg-[var(--accent-primary)]/14 border border-[var(--border-accent)] shadow-[0_0_24px_rgba(38,208,168,0.12)]"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2 tabular-nums">
                  <span>{label}</span>
                  {category !== "All" && (
                    <span
                      className={cn(
                        "text-[11px]",
                        isActive
                          ? "text-[var(--accent-primary)]"
                          : "text-[var(--text-muted)]"
                      )}
                    >
                      {count}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>

        {/* Elena-Inspired Hairline Credential Ledger */}
        <div
          className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]"
          aria-live="polite"
        >
          {visibleCerts.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.28,
                delay: prefersReducedMotion ? 0 : Math.min(index * 0.025, 0.2),
                ease: ease.out,
              }}
              className="py-5 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[var(--bg-surface)]/55 transition-colors px-3 sm:px-4 rounded-xl group"
            >
              {/* Left: Issuer, Title, Credential ID & Note */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md font-mono text-[11px] uppercase tracking-[0.12em] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--accent-primary)]">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                    {cert.category}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[var(--border-strong)] select-none"
                  >
                    ·
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    {cert.assetType.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-medium text-[var(--text-primary)] tracking-[-0.01em] leading-snug group-hover:text-white transition-colors">
                  {cert.name}
                </h3>

                {(cert.credentialId || cert.note) && (
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-[var(--text-muted)]">
                    {cert.credentialId && (
                      <span className="tabular-nums">ID: {cert.credentialId}</span>
                    )}
                    {cert.credentialId && cert.note && (
                      <span aria-hidden="true" className="text-[var(--border-strong)]">
                        /
                      </span>
                    )}
                    {cert.note && <span>{cert.note}</span>}
                  </div>
                )}
              </div>

              {/* Right: Issue Date + Preview & Verify Actions */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between md:justify-end gap-3 sm:gap-5 shrink-0 pt-1 md:pt-0">
                <span className="font-mono text-xs text-[var(--text-secondary)] tabular-nums whitespace-nowrap">
                  {cert.date}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(event) => handleOpenPreview(cert, event.currentTarget)}
                    aria-label={`Preview certificate document for ${cert.name}`}
                    className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 hover:text-[var(--accent-primary)] text-xs font-mono uppercase tracking-[0.12em] text-[var(--text-primary)] transition-all active:scale-[0.97] cursor-pointer"
                  >
                    {cert.assetType === "image" ? (
                      <Eye className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    ) : (
                      <FileText
                        className="w-3.5 h-3.5 shrink-0"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    )}
                    <span>Preview</span>
                  </button>

                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify ${cert.name} on official issuer portal`}
                      className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-[var(--border-accent)] bg-[var(--accent-primary)]/10 hover:bg-[var(--accent-primary)] hover:text-[var(--bg-deep)] text-xs font-mono uppercase tracking-[0.12em] text-[var(--accent-primary)] transition-all active:scale-[0.97]"
                    >
                      <span>Verify</span>
                      <ExternalLink
                        className="w-3.5 h-3.5 shrink-0"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Show All / Show Fewer Toggle (All category only) */}
        {activeCategory === "All" && CERTIFICATIONS.length > featuredCerts.length && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
              Showing {visibleCerts.length} of {CERTIFICATIONS.length} verified credentials
            </p>
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 text-xs font-mono uppercase tracking-[0.14em] text-[var(--text-primary)] transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>
                {showAll
                  ? "Show Fewer"
                  : `Show All ${CERTIFICATIONS.length} Credentials`}
              </span>
              {showAll ? (
                <ChevronUp
                  className="w-4 h-4 text-[var(--accent-primary)] group-hover:-translate-y-0.5 transition-transform"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDown
                  className="w-4 h-4 text-[var(--accent-primary)] group-hover:translate-y-0.5 transition-transform"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Interactive Certificate Document Preview Modal */}
      {isBrowser &&
        createPortal(
          <AnimatePresence>
            {previewCert && (
              <motion.div
                key="cert-preview-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                onClick={() => setPreviewCert(null)}
                className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 bg-[#06090B]/85 backdrop-blur-md"
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="cert-modal-title"
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, scale: 0.96, y: 12 }
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.97, y: 8 }
                  }
                  transition={prefersReducedMotion ? { duration: 0 } : spring.crisp}
                  onClick={(event) => event.stopPropagation()}
                  className="w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-[0_32px_90px_rgba(0,0,0,0.75)] overflow-hidden"
                >
                  {/* Modal Header */}
                  <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-[var(--border-subtle)] bg-[var(--bg-deep)]/65 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md font-mono text-[11px] uppercase tracking-[0.12em] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--accent-primary)]">
                          {previewCert.issuer}
                        </span>
                        <span className="font-mono text-xs text-[var(--text-secondary)] tabular-nums">
                          {previewCert.date}
                        </span>
                        {previewCert.credentialId && (
                          <span className="font-mono text-[11px] text-[var(--text-muted)] tabular-nums">
                            · ID: {previewCert.credentialId}
                          </span>
                        )}
                      </div>

                      <h3
                        id="cert-modal-title"
                        className="text-lg sm:text-xl font-medium text-[var(--text-primary)] leading-snug"
                      >
                        {previewCert.name}
                      </h3>

                      {previewCert.note && (
                        <p className="mt-1 font-mono text-[11px] text-[var(--text-muted)]">
                          {previewCert.note}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <a
                        href={encodeURI(previewCert.assetPath)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-xs font-mono uppercase tracking-[0.1em] text-[var(--text-primary)] transition-colors"
                      >
                        <span>Open Original File</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      </a>

                      {previewCert.verifyUrl && (
                        <a
                          href={previewCert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-[var(--border-accent)] bg-[var(--accent-primary)]/12 hover:bg-[var(--accent-primary)] hover:text-[var(--bg-deep)] text-xs font-mono uppercase tracking-[0.1em] text-[var(--accent-primary)] transition-colors"
                        >
                          <span>Verify Credential</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        </a>
                      )}

                      <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={() => setPreviewCert(null)}
                        aria-label="Close certificate preview"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-[var(--text-secondary)] transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Body */}
                  <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#070B0E]">
                    {previewCert.assetType === "image" ? (
                      <div className="flex flex-col items-center gap-4">
                        <img
                          src={encodeURI(previewCert.assetPath)}
                          alt={previewCert.name}
                          className="max-h-[70vh] w-auto mx-auto rounded-lg object-contain border border-[var(--border-subtle)] bg-[#0A0F12]"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <iframe
                          src={`${encodeURI(previewCert.assetPath)}#toolbar=0&navpanes=0&view=FitH`}
                          title={previewCert.name}
                          className="w-full h-[64vh] sm:h-[68vh] rounded-lg bg-[#0A0F12] border border-[var(--border-subtle)]"
                        />
                        <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-[var(--bg-surface)]/75 border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                          <span>
                            Embedded PDF preview unavailable in your browser or on mobile?
                          </span>
                          <div className="flex items-center gap-3 font-mono uppercase tracking-[0.1em]">
                            <a
                              href={encodeURI(previewCert.assetPath)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[var(--accent-primary)] hover:underline"
                            >
                              <span>Open PDF</span>
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                            <a
                              href={encodeURI(previewCert.assetPath)}
                              download
                              className="inline-flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Download</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  )
}
