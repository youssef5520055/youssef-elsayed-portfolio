export const ease = {
  editorial: [0.22, 1, 0.36, 1] as const,
  out: [0.23, 1, 0.32, 1] as const,
}

export const spring = {
  micro: { type: "spring" as const, stiffness: 280, damping: 22 },
  layout: { type: "spring" as const, stiffness: 140, damping: 18 },
  crisp: { type: "spring" as const, duration: 0.32, bounce: 0 },
}

export const duration = {
  fast: 0.16,
  base: 0.28,
  slow: 0.55,
}

export const viewportOnce = {
  once: true,
  margin: "-80px",
} as const
