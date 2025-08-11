"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"
import { experience } from "@/lib/data"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ExperienceTimeline() {
  return (
    <section className="relative bg-slate-50/80 py-20 backdrop-blur-[1px] dark:bg-[#0f1433]/80">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <header className="mb-14 text-center">
          <h3 className="bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
            Experience
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Enterprise platforms, cloud-native systems, and immersive tech.
          </p>
        </header>

        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block">
            <div className="h-full w-[3px] rounded-full bg-gradient-to-b from-cyan-400 to-indigo-600 opacity-60" />
          </div>

          <div className="space-y-10 md:space-y-16">
            {experience.map((item, idx) => {
              const left = idx % 2 === 0
              return (
                <motion.div
                  key={item.title + idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={cn(
                    "md:grid md:grid-cols-2 md:items-start md:gap-10",
                    left && "md:[&>div:first-child]:order-2",
                  )}
                >
                  <div className="relative md:col-span-1">
                    <Card className="relative border-slate-200/70 bg-white/85 p-6 shadow-xl ring-1 ring-transparent transition-all hover:-translate-y-1 hover:ring-cyan-300/40 dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:ring-indigo-800/40">
                      <div className="mb-2 inline-flex items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-200 dark:ring-cyan-800">
                          <Briefcase className="h-3.5 w-3.5" />
                          {item.date}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <div className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                        {"🏢"} {item.company}
                      </div>
                      <ul className="list-none space-y-2 text-slate-600 dark:text-slate-300">
                        {item.points.map((p, i) => (
                          <li key={i} className="pl-5">
                            <span className="mr-2" aria-hidden="true">
                              ✨
                            </span>
                            {p}
                          </li>
                        ))}
                      </ul>
                      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)] dark:ring-white/10" />
                    </Card>
                    <span
                      className={cn(
                        "absolute top-6 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 ring-4 ring-slate-50 dark:ring-[#0f1433] md:block",
                        left ? "-left-6" : "-right-6",
                      )}
                    />
                  </div>

                  <div aria-hidden className="md:col-span-1" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
