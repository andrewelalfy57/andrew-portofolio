"use client"

import type React from "react"

import { motion, useMotionValue, useTransform } from "framer-motion"
import type { PropsWithChildren, CSSProperties } from "react"

type ParallaxCardProps = PropsWithChildren<{
  className?: string
  intensity?: number // 0.0 - 1.0
}>

export function ParallaxCard({ children, className, intensity = 0.5 }: ParallaxCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10])

  function onMove(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    x.set((px - 0.5) * intensity)
    y.set((py - 0.5) * intensity)
    ;(e.currentTarget as HTMLElement).style.setProperty("--px", `${px}`)
    ;(e.currentTarget as HTMLElement).style.setProperty("--py", `${py}`)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY } as CSSProperties}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.7 }}
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 [background:radial-gradient(200px_200px_at_calc(var(--px,0.5)*100%)_calc(var(--py,0.5)*100%),_rgba(255,255,255,0.35),_transparent_60%)] group-hover:opacity-100 dark:[background:radial-gradient(180px_180px_at_calc(var(--px,0.5)*100%)_calc(var(--py,0.5)*100%),_rgba(255,255,255,0.12),_transparent_60%)]" />
        {children}
      </div>
    </motion.div>
  )
}
