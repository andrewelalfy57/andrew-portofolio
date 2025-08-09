"use client"

export function BackgroundOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full opacity-40 blur-[100px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-400 via-purple-400 to-pink-400 animate-[float_20s_ease-in-out_infinite]" />
      <div className="absolute -left-60 -bottom-60 h-[800px] w-[800px] rounded-full opacity-30 blur-[120px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-fuchsia-400 via-rose-400 to-amber-300 animate-[float_22s_ease-in-out_infinite] [animation-delay:-10s]" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-300 via-sky-300 to-pink-300 animate-[float_18s_ease-in-out_infinite] [animation-delay:-5s]" />
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(60px, -60px) scale(1.06); }
          50% { transform: translate(-60px, 60px) scale(0.96); }
          75% { transform: translate(30px, 30px) scale(1.02); }
        }
      `}</style>
    </div>
  )
}
