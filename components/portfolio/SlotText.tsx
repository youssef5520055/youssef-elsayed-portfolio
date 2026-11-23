import { cn } from "@/lib/utils"

interface SlotTextProps {
  text: string
  className?: string
}

/**
 * Vertical slot-roll hover micro-interaction inspired by Template 1 (Crimson).
 * Respects reduced-motion and hover-capable pointers via styles/globals.css.
 */
export default function SlotText({ text, className }: SlotTextProps) {
  return (
    <span className={cn("slot-roll", className)}>
      <span className="slot-roll-track">
        <span className="block h-[1.3em] leading-[1.3em] shrink-0 whitespace-nowrap">
          {text}
        </span>
        <span
          aria-hidden="true"
          className="block h-[1.3em] leading-[1.3em] shrink-0 whitespace-nowrap"
        >
          {text}
        </span>
      </span>
    </span>
  )
}
