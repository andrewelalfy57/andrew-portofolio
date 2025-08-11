"use client"

import type React from "react"
import { useEffect, useRef } from "react"

/**
 * Aurora background with:
 * - Parallax gradient layers (cyan -> indigo)
 * - Magnetic orbs on a Canvas attracted to the cursor and springing back to home
 * - Click ripples and a brief repel pulse
 * - Respects prefers-reduced-motion
 */
export function Aurora() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useRef(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const r = rootRef.current
    if (!r) return

    // Mouse tracking for parallax and canvas magnet
    const state = {
      xNorm: 0,
      yNorm: 0,
      mx: window.innerWidth / 2,
      my: window.innerHeight / 2,
      pulse: 0, // repel pulse 0..1
    }

    const onMove = (e: MouseEvent) => {
      if (!r) return
      state.mx = e.clientX
      state.my = e.clientY
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      state.xNorm = x
      state.yNorm = y
      r.style.setProperty("--x", x.toString())
      r.style.setProperty("--y", y.toString())
      r.style.setProperty("--mx", `${e.clientX}px`)
      r.style.setProperty("--my", `${e.clientY}px`)
    }

    const onClick = (e: MouseEvent) => {
      if (!r) return
      // Ripple span for visual feedback
      const ripple = document.createElement("span")
      ripple.className = "aurora-ripple"
      ripple.style.left = `${e.clientX}px`
      ripple.style.top = `${e.clientY}px`
      r.appendChild(ripple)
      ripple.addEventListener("animationend", () => ripple.remove())

      // Kick a short repel pulse for the orbs
      state.pulse = 1
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
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    const state = {
      width: 0,
      height: 0,
      mx: window.innerWidth / 2,
      my: window.innerHeight / 2,
      xNorm: 0,
      yNorm: 0,
      pulse: 0,
    }

    // Read CSS variables from rootRef so parallax mouse stays in sync
    const syncMouse = () => {
      const root = rootRef.current
      if (!root) return
      const mx = getComputedStyle(root).getPropertyValue("--mx").replace("px", "")
      const my = getComputedStyle(root).getPropertyValue("--my").replace("px", "")
      const x = getComputedStyle(root).getPropertyValue("--x")
      const y = getComputedStyle(root).getPropertyValue("--y")
      state.mx = Number(mx) || state.mx
      state.my = Number(my) || state.my
      state.xNorm = Number(x) || state.xNorm
      state.yNorm = Number(y) || state.yNorm
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
    function resize() {
      const w = (state.width = window.innerWidth)
      const h = (state.height = window.innerHeight)
      canvas.width = Math.max(1, Math.floor(w * DPR))
      canvas.height = Math.max(1, Math.floor(h * DPR))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()

    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const ORB_COUNT = isMobile ? 24 : 48

    // Distribute home positions on a loose grid with jitter
    function initOrbs() {
      orbs.length = 0
      const cols = Math.ceil(Math.sqrt(ORB_COUNT))
      const rows = Math.ceil(ORB_COUNT / cols)
      const padding = 80
      const gw = (state.width - padding * 2) / Math.max(1, cols - 1)
      const gh = (state.height - padding * 2) / Math.max(1, rows - 1)
      let i = 0
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (i >= ORB_COUNT) break
          const baseX = padding + c * gw
          const baseY = padding + r * gh
          const jitter = 40
          const x = baseX + (Math.random() - 0.5) * jitter
          const y = baseY + (Math.random() - 0.5) * jitter
          const mix = Math.random() // color mix
          orbs.push({
            x,
            y,
            vx: 0,
            vy: 0,
            r: 6 + Math.random() * 10,
            homeX: x,
            homeY: y,
            colorMix: mix,
          })
          i++
        }
      }
    }
    initOrbs()

    function onResize() {
      resize()
      initOrbs()
    }
    window.addEventListener("resize", onResize)

    const CYAN = [34, 211, 238] // #22d3ee
    const INDIGO = [99, 102, 241] // #6366f1
    function mixColor(t: number) {
      const r = Math.round(CYAN[0] + (INDIGO[0] - CYAN[0]) * t)
      const g = Math.round(CYAN[1] + (INDIGO[1] - CYAN[1]) * t)
      const b = Math.round(CYAN[2] + (INDIGO[2] - CYAN[2]) * t)
      return { r, g, b }
    }

    // Physics params
    const HOME_FORCE = 0.008 // spring back to home
    const MAGNET_STRENGTH = 1400 // cursor attract strength
    const PULSE_STRENGTH = 2200 // repel on click
    const FALLOFF = 1.25 // distance falloff factor
    const FRICTION = 0.92
    const LINK_DIST = isMobile ? 90 : 130

    let last = performance.now()
    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop)
      const dt = Math.min(32, now - last) / 16.6667 // ~ 60fps units
      last = now

      // Sync mouse from CSS vars updated in the other effect
      syncMouse()

      // Decay pulse
      if (state.pulse > 0) state.pulse = Math.max(0, state.pulse - 0.06 * dt)

      ctx.clearRect(0, 0, state.width, state.height)

      // Light gradient haze so the orbs feel embedded
      const bgGrad = ctx.createRadialGradient(
        state.mx,
        state.my,
        0,
        state.mx,
        state.my,
        Math.max(state.width, state.height) * 0.8,
      )
      bgGrad.addColorStop(0, "rgba(255,255,255,0.05)")
      bgGrad.addColorStop(1, "rgba(255,255,255,0)")
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, state.width, state.height)

      // Update and draw orbs
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i]

        // spring to home
        const hx = o.homeX - o.x
        const hy = o.homeY - o.y
        o.vx += hx * HOME_FORCE * dt
        o.vy += hy * HOME_FORCE * dt

        // magnetic attract to mouse
        const dx = state.mx - o.x
        const dy = state.my - o.y
        const distSq = dx * dx + dy * dy
        const dist = Math.sqrt(distSq) + 0.0001
        const dirX = dx / dist
        const dirY = dy / dist

        // attract
        const magnet = (MAGNET_STRENGTH * dt) / Math.pow(dist + 20, FALLOFF)
        o.vx += dirX * magnet
        o.vy += dirY * magnet

        // repel pulse on click
        if (state.pulse > 0) {
          const repel = ((PULSE_STRENGTH * state.pulse) / Math.pow(dist + 10, FALLOFF)) * dt
          o.vx -= dirX * repel
          o.vy -= dirY * repel
        }

        // integrate
        o.vx *= FRICTION
        o.vy *= FRICTION
        o.x += o.vx
        o.y += o.vy

        // draw orb (soft radial)
        const { r, g, b } = mixColor(o.colorMix)
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 2.2)
        grad.addColorStop(0, `rgba(${r},${g},${b},0.75)`)
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(o.x, o.y, o.r * 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw faint links for nearby orbs
      ctx.lineWidth = 1
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const a = orbs[i]
          const b = orbs[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            const t = 1 - d / LINK_DIST
            const { r, g, b } = mixColor((a.colorMix + b.colorMix) / 2)
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.15 * t})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
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

      {/* Subtle spotlight follows cursor */}
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
