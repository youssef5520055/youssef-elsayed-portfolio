"use client"

import { useEffect, useRef } from "react"

export default function SplineRobot() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamically load the Spline viewer script
    const script = document.createElement("script")
    script.type = "module"
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js"
    document.head.appendChild(script)

    // Once script is loaded (or already loaded), create the spline-viewer element
    const createViewer = () => {
      if (!containerRef.current) return
      containerRef.current.innerHTML = ""
      const viewer = document.createElement("spline-viewer") as any
      viewer.setAttribute("url", "https://prod.spline.design/qBwR113P0630O92z/scene.splinecode")
      viewer.setAttribute("loading-anim-type", "none")
      viewer.style.width = "100%"
      viewer.style.height = "100%"
      viewer.style.background = "transparent"
      containerRef.current.appendChild(viewer)
    }

    if (document.readyState === "complete") {
      createViewer()
    } else {
      script.onload = createViewer
      window.addEventListener("load", createViewer, { once: true })
    }

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = ""
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-10 pointer-events-none sm:pointer-events-auto"
      style={{ opacity: 1 }}
    />
  )
}
