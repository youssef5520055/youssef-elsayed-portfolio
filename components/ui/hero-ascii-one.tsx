"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized?: boolean
      init?: () => void
      destroy?: () => void
    }
  }
}

interface HeroAsciiOneProps {
  className?: string
  children?: React.ReactNode
}

const UNICORN_SCRIPT_SRC =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js"
const UNICORN_PROJECT_ID = "OMzqyUv6M3kSnv0JeAtC"

/**
 * Interactive ASCII Atlas / Sisyphus background shape from UnicornStudio (OMzqyUv6M3kSnv0JeAtC),
 * positioned to occupy the right visual focal area on desktop and centered behind copy on mobile.
 */
export default function HeroAsciiOne({
  className,
  children,
}: HeroAsciiOneProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const style = document.createElement("style")
    style.setAttribute("data-hero-ascii-style", "true")
    style.textContent = `
      [data-us-project="${UNICORN_PROJECT_ID}"] {
        position: relative !important;
        overflow: hidden !important;
      }
      [data-us-project="${UNICORN_PROJECT_ID}"] canvas {
        clip-path: inset(0 0 8% 0) !important;
      }
      [data-us-project="${UNICORN_PROJECT_ID}"] * {
        pointer-events: none !important;
      }
      [data-us-project="${UNICORN_PROJECT_ID}"] a[href*="unicorn"],
      [data-us-project="${UNICORN_PROJECT_ID}"] button[title*="unicorn"],
      [data-us-project="${UNICORN_PROJECT_ID}"] div[title*="Made with"],
      [data-us-project="${UNICORN_PROJECT_ID}"] img[src*="made_in_us"],
      [data-us-project="${UNICORN_PROJECT_ID}"] img[src*="free_user_logo"],
      [data-us-project="${UNICORN_PROJECT_ID}"] .unicorn-brand,
      [data-us-project="${UNICORN_PROJECT_ID}"] [class*="brand"],
      [data-us-project="${UNICORN_PROJECT_ID}"] [class*="credit"],
      [data-us-project="${UNICORN_PROJECT_ID}"] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `
    document.head.appendChild(style)

    const hideBranding = () => {
      const root = hostRef.current ?? document
      const containers = root.querySelectorAll(
        `[data-us-project], [data-us-project="${UNICORN_PROJECT_ID}"], .unicorn-studio-container`
      )
      containers.forEach((container) => {
        container.querySelectorAll("*").forEach((el) => {
          if (el.tagName.toLowerCase() === "canvas") return
          const text = (el.textContent || "").toLowerCase()
          const title = (el.getAttribute("title") || "").toLowerCase()
          const href = (el.getAttribute("href") || "").toLowerCase()
          const src = (el.getAttribute("src") || "").toLowerCase()

          if (
            text.includes("made with") ||
            text.includes("unicorn") ||
            title.includes("made with") ||
            title.includes("unicorn") ||
            href.includes("unicorn.studio") ||
            src.includes("made_in_us") ||
            src.includes("free_user_logo")
          ) {
            const htmlEl = el as HTMLElement
            htmlEl.style.display = "none"
            htmlEl.style.visibility = "hidden"
            htmlEl.style.opacity = "0"
            htmlEl.style.pointerEvents = "none"
            try {
              el.remove()
            } catch {}
          }
        })
      })
    }

    const initUnicorn = () => {
      try {
        if (window.UnicornStudio?.init) {
          window.UnicornStudio.init()
          window.UnicornStudio.isInitialized = true
        }
      } catch {}
      hideBranding()
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${UNICORN_SCRIPT_SRC}"]`
    )

    if (existingScript) {
      initUnicorn()
    } else {
      window.UnicornStudio = window.UnicornStudio || { isInitialized: false }
      const script = document.createElement("script")
      script.src = UNICORN_SCRIPT_SRC
      script.async = true
      script.onload = initUnicorn
      document.head.appendChild(script)
    }

    hideBranding()
    const interval = setInterval(hideBranding, 80)
    const timeouts = [400, 1000, 2200, 4500].map((ms) =>
      setTimeout(hideBranding, ms)
    )

    return () => {
      clearInterval(interval)
      timeouts.forEach(clearTimeout)
      if (style.parentNode) style.parentNode.removeChild(style)
    }
  }, [])

  return (
    <section
      ref={hostRef}
      aria-label="Hero introduction with interactive ASCII Atlas visual"
      className={cn(
        "relative isolate w-full overflow-hidden flex flex-col bg-[#06090B]",
        className
      )}
    >
      {/* Subtle Ambient Star/Dot Backdrop across entire Hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 18% 26%, rgba(240,244,242,0.85), transparent),
            radial-gradient(1px 1px at 42% 68%, rgba(240,244,242,0.7), transparent),
            radial-gradient(1px 1px at 56% 22%, rgba(38,208,168,0.75), transparent),
            radial-gradient(1px 1px at 78% 16%, rgba(240,244,242,0.8), transparent),
            radial-gradient(1px 1px at 88% 62%, rgba(240,244,242,0.7), transparent),
            radial-gradient(1px 1px at 31% 82%, rgba(240,244,242,0.75), transparent),
            radial-gradient(1px 1px at 14% 58%, rgba(240,244,242,0.7), transparent),
            radial-gradient(1px 1px at 68% 44%, rgba(38,208,168,0.65), transparent)
          `,
          backgroundSize:
            "200% 200%, 180% 180%, 240% 240%, 220% 220%, 190% 190%, 230% 230%, 210% 210%, 225% 225%",
        }}
      />

      {/* UnicornStudio ASCII Atlas Shape:
          In OMzqyUv6M3kSnv0JeAtC, the Atlas figure is drawn at x ≈ 22% of the canvas.
          Shifting the canvas right places the figure squarely on the right side on desktop (where the planet was)
          and centered on mobile/tablet. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-y-0 w-full h-full translate-x-[24%] sm:translate-x-[34%] lg:translate-x-[47%] opacity-65 sm:opacity-80 lg:opacity-95"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 90%, transparent 100%)",
            WebkitMaskComposite: "source-in",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 90%, transparent 100%)",
            maskComposite: "intersect",
          }}
        >
          <div
            data-us-project={UNICORN_PROJECT_ID}
            style={{ width: "100%", height: "100%", minHeight: "100%" }}
          />
        </div>
      </div>

      {children}
    </section>
  )
}
