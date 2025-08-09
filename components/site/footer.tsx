"use client"

export function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-slate-50 py-10 text-center text-sm text-slate-600 dark:border-slate-700/60 dark:bg-[#0f1433] dark:text-slate-300">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="mb-2">
          Built with{" "}
          <span className="bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text font-semibold text-transparent">
            care, craft, and performance
          </span>
          .
        </p>
        <p>© {new Date().getFullYear()} Andrew Ayman Alfy. All rights reserved.</p>
      </div>
    </footer>
  )
}
