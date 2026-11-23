"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SignatureProps {
  className?: string
  animated?: boolean
  strokeClassName?: string
}

/**
 * Youssef Elsayed's authentic 5-path handwritten SVG signature (viewBox="0 0 300 120").
 * Exact cubic-Bézier strokes preserved verbatim from original AboutSection & FooterSection.
 */
export default function Signature({
  className,
  animated = false,
  strokeClassName = "stroke-[var(--text-primary)]",
}: SignatureProps) {
  const paths = [
    {
      d: "M25,40 C35,20 50,20 55,35 C60,55 45,85 30,90 C15,95 10,80 15,65 C20,50 40,45 65,45",
      width: 2,
      opacity: 1,
      delay: 0.05,
    },
    {
      d: "M65,45 C75,35 75,55 85,50 C95,45 105,55 110,40 C115,25 115,60 110,70 C105,85 95,95 125,60",
      width: 2,
      opacity: 1,
      delay: 0.18,
    },
    {
      d: "M145,35 C130,25 120,45 130,50 C120,55 115,70 140,70",
      width: 2,
      opacity: 1,
      delay: 0.32,
    },
    {
      d: "M140,70 C155,25 160,20 155,60 C165,55 175,45 185,60 C195,75 195,45 205,45 C215,45 215,80 205,95 C195,110 220,80 230,65 C240,50 250,75 280,60",
      width: 2,
      opacity: 1,
      delay: 0.42,
    },
    {
      d: "M100,90 C150,110 230,95 280,85",
      width: 1.2,
      opacity: 0.45,
      delay: 0.65,
    },
  ]

  return (
    <svg
      viewBox="0 0 300 120"
      role="img"
      aria-label="Handwritten signature of Youssef Elsayed"
      className={cn("w-44 sm:w-48 h-auto fill-none", strokeClassName, className)}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths.map((p, idx) =>
        animated ? (
          <motion.path
            key={idx}
            d={p.d}
            strokeWidth={p.width}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: p.opacity }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              pathLength: { duration: 0.65, delay: p.delay, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.2, delay: p.delay },
            }}
          />
        ) : (
          <path key={idx} d={p.d} strokeWidth={p.width} opacity={p.opacity} />
        )
      )}
    </svg>
  )
}
