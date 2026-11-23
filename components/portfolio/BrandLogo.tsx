import { cn } from "@/lib/utils"

interface BrandMarkProps {
  className?: string
  size?: number
}

/**
 * Classic architectural YE monogram emblem for Youssef Elsayed.
 * Sculpted serif-inspired vector geometry in Obsidian, Alabaster, and Glacial Verdigris.
 */
export function BrandMark({ className, size = 36 }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {/* Outer classic hairline frame */}
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="10"
        fill="#0B1114"
        stroke="#F0F4F2"
        strokeOpacity="0.22"
        strokeWidth="1.25"
      />
      {/* Delicate inner architectural bevel */}
      <rect
        x="5"
        y="5"
        width="38"
        height="38"
        rx="7"
        stroke="#26D0A8"
        strokeOpacity="0.32"
        strokeWidth="0.9"
      />
      {/* Subtle corner crest diamond top-right */}
      <path
        d="M38.5 8.5L40 10L38.5 11.5L37 10L38.5 8.5Z"
        fill="#26D0A8"
        fillOpacity="0.85"
      />

      {/* Classic Serif-Inspired Y (Alabaster) */}
      <path
        d="M12.5 14.5H16.5M22.5 14.5H26.2M14.5 14.5L19.4 23.6L24.3 14.5M19.4 23.6V33.5M16.7 33.5H22.1"
        stroke="#F0F4F2"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Classic Serif-Inspired E (Glacial Verdigris) */}
      <path
        d="M28 14.5H35.6M28 14.5V33.5M28 23.8H34.1M28 33.5H35.8M35.6 14.5V16.4M35.8 33.5V31.6"
        stroke="#26D0A8"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface BrandLogoProps {
  variant?: "navbar" | "full" | "compact"
  className?: string
  showNameOnMobile?: boolean
}

/**
 * Simple classic personal brand logo lockup for Youssef Elsayed.
 * Pairs the sculpted YE crest mark with classic Instrument Serif wordmark typography.
 */
export default function BrandLogo({
  variant = "navbar",
  className,
  showNameOnMobile = false,
}: BrandLogoProps) {
  if (variant === "full") {
    return (
      <div className={cn("inline-flex items-center gap-3.5 select-none", className)}>
        <BrandMark size={44} />
        <div className="flex flex-col leading-none">
          <span className="font-serif text-[1.65rem] sm:text-[1.85rem] tracking-[-0.01em] text-[var(--text-primary)] leading-none">
            Youssef{" "}
            <span className="italic text-[var(--accent-primary)]">Elsayed</span>
          </span>
          <span className="mt-1.5 font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--text-muted)]">
            Systems / Security / AI
          </span>
        </div>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
        <BrandMark size={32} />
        <span className="font-serif text-[1.25rem] tracking-[-0.01em] text-[var(--text-primary)] leading-none">
          Youssef{" "}
          <span className="italic text-[var(--accent-primary)]">Elsayed</span>
        </span>
      </div>
    )
  }

  return (
    <div className={cn("inline-flex items-center gap-3 select-none", className)}>
      <BrandMark size={34} className="transition-transform duration-300 group-hover:scale-[1.04]" />
      <span
        className={cn(
          "border-l border-[var(--border-subtle)] pl-3 font-serif text-[1.22rem] sm:text-[1.32rem] tracking-[-0.01em] text-[var(--text-primary)] leading-none whitespace-nowrap",
          showNameOnMobile ? "inline-flex items-baseline gap-1" : "hidden sm:inline-flex items-baseline gap-1"
        )}
      >
        <span>Youssef</span>
        <span className="italic text-[var(--accent-primary)]">Elsayed</span>
      </span>
    </div>
  )
}
