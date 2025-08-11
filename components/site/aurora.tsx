"use client"

import type React from "react"
import { useEffect, useRef } from "react"

/**
 * Aurora background with:
 * - Parallax gradient layers (cyan -> indigo)
 * - Magnetic orbs on a Canvas that follow the cursor with smoothed motion
 * - Click ripples + brief repel pulse
 * - Prefers-reduced-motion respected
 * - Tuned for smoother, slower motion
 */
export function Aurora() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useRef(false)
  const rafRef = useRef<number | null>(null)

  // Raw mouse state (updated on events)
  const mouseRef = useRef({
    mx: 0,
    my: 0,
    xNorm: 0,
    yNorm: 0,
    pulse: 0, // 0..1
  })

  // Smoothed mouse state to drive physics (for silky movement)
  const smoothRef = useRef({
    mx: 0,
    my: 0,
  })

  // Mouse/interaction effect
  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const r = rootRef.current
    if (!r) return

    // Initialize to center
    const initX = window.innerWidth / 2
    const initY = window.innerHeight / 2
    mouseRef.current.mx = initX
    mouseRef.current.my = initY
    smoothRef.current.mx = initX
    smoothRef.current.my = initY

    r.style.setProperty("--x", "0")
    r.style.setProperty("--y", "0")
    r.style.setProperty("--mx", `${initX}px`)
    r.style.setProperty("--my", `${initY}px`)

    const onMove = (e: MouseEvent) => {
      mouseRef.current.mx = e.clientX
      mouseRef.current.my = e.clientY
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      mouseRef.current.xNorm = x
      mouseRef.current.yNorm = y

      // Update CSS variables for parallax/spotlight
      r.style.setProperty("--x", x.toString())
      r.style.setProperty("--y", y.toString())
      r.style.setProperty("--mx", `${e.clientX}px`)
      r.style.setProperty("--my", `${e.clientY}px`)
    }

    const onClick = (e: MouseEvent) => {
      // Ripple span for visual feedback
      const ripple = document.createElement("span")
      ripple.className = "aurora-ripple"
      ripple.style.left = `${e.clientX}px`
      ripple.style.top = `${e.clientY}px`
      r.appendChild(ripple)
      ripple.addEventListener("animationend", () => ripple.remove())

      // Trigger repel pulse
      mouseRef.current.pulse = 1
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("click", onClick)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("click", onClick)
    }
  }, [])

  // Canvas magnetic orbs
  useEffect(() => {
    if (reduceMotion.current) return // Respect reduced motion

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d", { alpha: true })
    if (!canvas || !ctx) return

    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    const state = {
      width: 0,
      height: 0,
    }

    type Orb = {
      x: number
      y: number
      vx: number
      vy: number
      r: number
      homeX: number
      homeY: number
      colorMix: number // 0..1 (0 cyan, 1 indigo)
    }

    const orbs: Orb[] = []

    const resize = () => {
      state.width = window.innerWidth
      state.height = window.innerHeight
      const { width, height } = state
      canvas.width = Math.max(1, Math.floor(width * DPR))
      canvas.height = Math.max(1, Math.floor(height * DPR))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    const initOrbs = () => {
      orbs.length = 0
      const isMobile = window.matchMedia("(max-width: 768px)").matches
      const ORB_COUNT = isMobile ? 24 : 48
      const cols = Math.ceil(Math.sqrt(ORB_COUNT))
      const rows = Math.ceil(ORB_COUNT / cols)
      const padding = 90
      const gw = (state.width - padding * 2) / Math.max(1, cols - 1)
      const gh = (state.height - padding * 2) / Math.max(1, rows - 1)
      let i = 0
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (i >= ORB_COUNT) break
          const baseX = padding + c * gw
          const baseY = padding + r * gh
          const jitter = 36
          const x = baseX + (Math.random() - 0.5) * jitter
          const y = baseY + (Math.random() - 0.5) * jitter
          const mix = Math.random()
          orbs.push({
            x,
            y,
            vx: 0,
            vy: 0,
            r: 6 + Math.random() * 9,
            homeX: x,
            homeY: y,
            colorMix: mix,
          })
          i++
        }
      }
    }

    resize()
    initOrbs()
    const onResize = () => {
      resize()
      initOrbs()
    }
    window.addEventListener("resize", onResize)

    // Colors
    const CYAN = [34, 211, 238] // #22d3ee
    const INDIGO = [99, 102, 241] // #6366f1
    const mixColor = (t: number) => {
      const rc = Math.round(CYAN[0] + (INDIGO[0] - CYAN[0]) * t)
      const gc = Math.round(CYAN[1] + (INDIGO[1] - CYAN[1]) * t)
      const bc = Math.round(CYAN[2] + (INDIGO[2] - CYAN[2]) * t)
      return { rc, gc, bc }
    }

    // Physics params (slower, smoother)
    const HOME_FORCE = 0.004 // was 0.008
    const MAGNET_STRENGTH = 650 // was 1400
    const PULSE_STRENGTH = 1200 // was 2200
    const FALLOFF = 1.6 // was 1.25
    const FRICTION = 0.95 // was 0.92
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const LINK_DIST = isMobile ? 80 : 120
    const MAX_SPEED = isMobile ? 4 : 6 // cap velocity for stability

    // Mouse smoothing factor (lerp)
    const SMOOTH_FOLLOW = 0.08

    let last = performance.now()
    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop)
      const dt = Math.min(32, now - last) / 16.6667 // ~60fps units
      last = now

      // Smooth the cursor position
      const target = mouseRef.current
      const smooth = smoothRef.current
      smooth.mx += (target.mx - smooth.mx) * (SMOOTH_FOLLOW * dt)
      smooth.my += (target.my - smooth.my) * (SMOOTH_FOLLOW * dt)

      // Decay the click pulse over time
      if (target.pulse > 0) target.pulse = Math.max(0, target.pulse - 0.05 * dt)

      ctx.clearRect(0, 0, state.width, state.height)

      // Light gradient haze centered at smoothed cursor
      const bgGrad = ctx.createRadialGradient(
        smooth.mx,
        smooth.my,
        0,
        smooth.mx,
        smooth.my,
        Math.max(state.width, state.height) * 0.75,
      )
      bgGrad.addColorStop(0, "rgba(255,255,255,0.04)")
      bgGrad.addColorStop(1, "rgba(255,255,255,0)")
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, state.width, state.height)

      // Update and draw orbs
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i]

        // spring to home (gentle)
        const hx = o.homeX - o.x
        const hy = o.homeY - o.y
        o.vx += hx * HOME_FORCE * dt
        o.vy += hy * HOME_FORCE * dt

        // magnetic attract to smoothed mouse
        const dx = smooth.mx - o.x
        const dy = smooth.my - o.y
        const dist = Math.hypot(dx, dy) + 0.0001
        const dirX = dx / dist
        const dirY = dy / dist

        const magnet = (MAGNET_STRENGTH * dt) / Math.pow(dist + 40, FALLOFF)
        o.vx += dirX * magnet
        o.vy += dirY * magnet

        // repel pulse on click (subtle)
        if (target.pulse > 0) {
          const repel = ((PULSE_STRENGTH * target.pulse) / Math.pow(dist + 20, FALLOFF)) * dt
          o.vx -= dirX * repel
          o.vy -= dirY * repel
        }

        // integrate
        o.vx *= FRICTION
        o.vy *= FRICTION

        // clamp speed for smoothness
        const sp = Math.hypot(o.vx, o.vy)
        if (sp > MAX_SPEED) {
          const s = MAX_SPEED / sp
          o.vx *= s
          o.vy *= s
        }

        o.x += o.vx
        o.y += o.vy

        // draw orb (soft radial)
        const { rc, gc, bc } = mixColor(o.colorMix)
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 2.2)
        grad.addColorStop(0, `rgba(${rc},${gc},${bc},0.70)`)
        grad.addColorStop(1, `rgba(${rc},${gc},${bc},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(o.x, o.y, o.r * 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw faint links for nearby orbs (slightly lighter)
      ctx.lineWidth = 1
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const orbA = orbs[i]
          const orbB = orbs[j]
          const dx = orbA.x - orbB.x
          const dy = orbA.y - orbB.y
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            const t = 1 - d / LINK_DIST
            const { rc, gc, bc } = mixColor((orbA.colorMix + orbB.colorMix) / 2)
            ctx.strokeStyle = `rgba(${rc},${gc},${bc},${0.12 * t})`
            ctx.beginPath()
            ctx.moveTo(orbA.x, orbA.y)
            ctx.lineTo(orbB.x, orbB.y)
            ctx.stroke()
          }
        }
      }
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={
        {
          ["--x" as any]: 0,
          ["--y" as any]: 0,
          ["--mx" as any]: "50vw",
          ["--my" as any]: "50vh",
        } as React.CSSProperties
      }
    >
      {/* Enhanced cyan→indigo parallax layers */}
      <div className="absolute inset-[-10%] will-change-transform [transform:translate3d(calc(var(--x)*-16px),calc(var(--y)*-16px),0)]">
        <div className="h-full w-full opacity-[0.28] blur-[60px] dark:opacity-[0.30] bg-[radial-gradient(40%_60%_at_20%_10%,rgba(34,211,238,0.8),transparent_60%),radial-gradient(35%_55%_at_80%_20%,rgba(99,102,241,0.65),transparent_60%),radial-gradient(40%_60%_at_30%_90%,rgba(14,165,233,0.6),transparent_60%)]" />
      </div>
      <div className="absolute inset-[-10%] will-change-transform [transform:translate3d(calc(var(--x)*10px),calc(var(--y)*10px),0)]">
        <div className="h-full w-full opacity-[0.18] blur-[90px] bg-[radial-gradient(35%_55%_at_15%_80%,rgba(34,211,238,0.55),transparent_60%),radial-gradient(35%_55%_at_85%_40%,rgba(99,102,241,0.55),transparent_60%)]" />
      </div>
      <div className="absolute inset-[-10%] will-change-transform [transform:translate3d(calc(var(--x)*5px),calc(var(--y)*5px),0)]">
        <div className="h-full w-full opacity-[0.14] blur-[100px] bg-[radial-gradient(40%_60%_at_50%_50%,rgba(79,70,229,0.5),transparent_60%)]" />
      </div>

      {/* Magnetic orbs canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Subtle spotlight follows cursor (uses raw vars, can be snappier than physics) */}
      <div className="absolute inset-0">
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: "var(--mx)",
            top: "var(--my)",
            width: 460,
            height: 460,
            background: "radial-gradient(230px 230px at center, rgba(255,255,255,0.12), rgba(255,255,255,0) 60%)",
            filter: "blur(6px)",
            opacity: 0.75,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      <style jsx>{`
        .aurora-ripple {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 999px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0) 70%);
          mix-blend-mode: overlay;
          animation: ripple 900ms ease-out forwards;
          pointer-events: none;
        }
        @keyframes ripple {
          0% { opacity: 0.6; transform: translate(-50%, -50%) scale(0.6); filter: blur(2px); }
          70% { opacity: 0.25; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(16); filter: blur(6px); }
        }
      `}</style>
    </div>
  )
}
