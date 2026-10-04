"use client"

import { useEffect, useRef } from "react"

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    interface Star {
      x: number
      y: number
      z: number // Depth for parallax (higher = further away)
      size: number
      baseAlpha: number
      color: string
      speed: number
    }

    const stars: Star[] = []
    const particleDensity = window.innerWidth < 768 ? 150 : 350

    // Initialize stars
    for (let i = 0; i < particleDensity; i++) {
      const z = Math.random() * 3 + 0.5 // Depth between 0.5 and 3.5
      // Mix of cool white, very faint blue, and subtle cyan
      const colorType = Math.random()
      let color = "255, 255, 255" // Cool white
      if (colorType > 0.85) color = "0, 229, 255" // Cyan
      else if (colorType > 0.7) color = "200, 230, 255" // Muted blue

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        size: (Math.random() * 1.5 + 0.5) / z, // Further stars are smaller
        baseAlpha: (Math.random() * 0.5 + 0.2) / z, // Further stars are dimmer
        color,
        speed: (Math.random() * 0.2 + 0.05) / z, // Further stars drift slower
      })
    }

    let mouseX = 0
    let mouseY = 0
    let currentScrollY = window.scrollY
    let targetScrollY = window.scrollY

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return
      // Calculate mouse offset from center
      mouseX = (e.clientX - width / 2) * 0.03
      mouseY = (e.clientY - height / 2) * 0.03
    }

    const handleScroll = () => {
      targetScrollY = window.scrollY
    }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    let time = 0

    const render = () => {
      time += 0.005
      
      // Smooth scroll interpolation
      currentScrollY += (targetScrollY - currentScrollY) * 0.1

      // Clear with completely transparent background
      ctx.clearRect(0, 0, width, height)

      stars.forEach((star) => {
        // Base drift
        if (!prefersReducedMotion) {
          star.y -= star.speed
        }

        // Apply parallax offsets
        // Scroll pushes stars up (so subtract scrollY). Further stars move less.
        const scrollOffset = currentScrollY * (0.3 / star.z)
        const mouseOffsetX = mouseX / star.z
        const mouseOffsetY = mouseY / star.z

        // Wrap coordinates seamlessly
        let x = (star.x + mouseOffsetX) % width
        if (x < 0) x += width
        
        let y = (star.y - scrollOffset + mouseOffsetY) % height
        if (y < 0) y += height

        // Twinkle effect
        const twinkle = Math.sin(time * 2 + star.x) * 0.2
        const alpha = Math.max(0.1, Math.min(0.8, star.baseAlpha + twinkle))

        ctx.beginPath()
        ctx.arc(x, y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${star.color}, ${alpha})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-50"
      style={{ background: "var(--bg-deep)" }}
    />
  )
}
