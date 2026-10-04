"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: (e?: any) => void
}

export default function TiltCard({ children, className = "", style = {}, onClick }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const xPct = useMotionValue(0)
  const yPct = useMotionValue(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [hovering, setHovering] = useState(false)

  // Spring physics for 3D rotation
  const xSpring = useSpring(xPct, { stiffness: 300, damping: 30 })
  const ySpring = useSpring(yPct, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const currentX = e.clientX - rect.left
    const currentY = e.clientY - rect.top

    mouseX.set(currentX)
    mouseY.set(currentY)

    xPct.set(currentX / rect.width - 0.5)
    yPct.set(currentY / rect.height - 0.5)
  }

  const handleMouseEnter = () => setHovering(true)
  const handleMouseLeave = () => {
    setHovering(false)
    xPct.set(0)
    yPct.set(0)
  }

  // The glowing highlight that follows the cursor
  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.12), transparent 50%)`

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...style,
      }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
        style={{ background, opacity: hovering ? 1 : 0 }}
      />
      <div style={{ transform: "translateZ(30px)" }} className="h-full w-full relative z-20">
        {children}
      </div>
    </motion.div>
  )
}
