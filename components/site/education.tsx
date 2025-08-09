"use client"

import { GraduationCap } from "lucide-react"
import { Card } from "@/components/ui/card"

export function Education() {
  return (
    <section className="relative bg-white py-16 dark:bg-[#0a0e27]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <header className="mb-12 text-center">
          <h3 className="bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
            Education
          </h3>
        </header>

        <Card className="mx-auto max-w-3xl border-slate-200/60 bg-white/80 p-6 shadow-lg dark:border-slate-700/60 dark:bg-slate-900/50">
          <div className="mb-2 inline-flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <GraduationCap className="h-5 w-5 text-cyan-500" />
            <h4 className="text-lg font-bold">B.Sc. in Computer Science Engineering</h4>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">German University in Cairo (GUC)</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Cairo, Egypt • 09/2016 - 07/2021</p>
        </Card>
      </div>
    </section>
  )
}
