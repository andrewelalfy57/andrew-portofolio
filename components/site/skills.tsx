"use client"

import { skills } from "@/lib/data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export function Skills() {
  return (
    <section className="relative bg-white/90 py-20 backdrop-blur-[1px] dark:bg-[#0a0e27]/90">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <header className="mb-14 text-center">
          <h3 className="bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
            Skills
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Modern, battle-tested tools across the stack.</p>
        </header>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {skills.map((group, idx) => (
            <motion.div
              key={group.title + idx}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            >
              <Card className="group relative overflow-hidden border-slate-200/60 bg-white/85 p-6 shadow-xl ring-1 ring-transparent transition-all hover:-translate-y-1 hover:ring-cyan-300/40 dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:ring-indigo-800/40">
                <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)]; [background-size:24px_24px] [mask-image:radial-gradient(80%_80%_at_50%_50%,black,transparent)]" />
                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-cyan-500 to-indigo-600 transition-all duration-300 group-hover:w-full" />
                <div className="relative mb-4 inline-flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  {group.icon}
                  <h4 className="text-lg font-bold">{group.title}</h4>
                </div>
                <p className="relative mb-4 text-sm text-slate-600 dark:text-slate-300">{group.subtitle}</p>
                <div className="relative flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="border-cyan-200/50 bg-cyan-50/50 text-cyan-700 transition-colors hover:bg-cyan-100 dark:border-cyan-800/60 dark:bg-cyan-900/20 dark:text-cyan-200"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
