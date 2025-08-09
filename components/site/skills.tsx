"use client"

import { skills } from "@/lib/data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export function Skills() {
  return (
    <section className="relative bg-white py-16 dark:bg-[#0a0e27]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <header className="mb-12 text-center">
          <h3 className="bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
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
              <Card className="group relative overflow-hidden border-slate-200/60 bg-white/80 p-6 shadow-lg ring-0 transition-all hover:-translate-y-1 hover:ring-2 hover:ring-cyan-300/50 dark:border-slate-700/60 dark:bg-slate-900/50 dark:hover:ring-cyan-700/40">
                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-cyan-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
                <div className="mb-4 inline-flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  {group.icon}
                  <h4 className="text-lg font-bold">{group.title}</h4>
                </div>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">{group.subtitle}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="border-cyan-200/50 bg-cyan-50/50 text-cyan-700 hover:bg-cyan-100 dark:border-cyan-800/60 dark:bg-cyan-900/20 dark:text-cyan-200"
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
