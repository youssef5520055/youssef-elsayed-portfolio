"use client"

import { useRef, useState } from "react"
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion"

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  magneticPull?: number
}

export default function MagneticButton({ 
  children, 
  className = "", 
  magneticPull = 0.3,
  ...props 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    
    const hx = rect.left + rect.width / 2
    const hy = rect.top + rect.height / 2
    
    // Distance from center
    const dx = e.clientX - hx
    const dy = e.clientY - hy

    x.set(dx * magneticPull)
    y.set(dy * magneticPull)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      style={{
        x: mouseXSpring,
        y: mouseYSpring,
      }}
      className={className}
      {...props as any}
    >
      {children}
    </motion.button>
  )
}
