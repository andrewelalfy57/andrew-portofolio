"use client"

import Image from "next/image"
import { projects } from "@/lib/data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Globe, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function Projects() {
  return (
    <section className="relative bg-slate-50/80 py-20 backdrop-blur-[1px] dark:bg-[#0f1433]/80">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <header className="mb-14 text-center">
          <h3 className="bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
            Projects
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Selected work spanning web, cloud, and immersive experiences.
          </p>
        </header>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {projects.map((p) => (
            <motion.div key={p.title} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
              <Card className="group overflow-hidden border-slate-200/60 bg-white/85 shadow-xl ring-1 ring-transparent transition-all hover:-translate-y-1 hover:shadow-2xl hover:ring-cyan-300/40 dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:ring-indigo-800/40">
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-indigo-600" />
                  <Image
                    src={p.image ?? "/placeholder.svg?height=600&width=1200&query=project%20preview%20hero%20wide"}
                    alt={p.title}
                    fill
                    className="object-cover mix-blend-overlay transition-transform duration-500 group-hover:scale-[1.05]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="shimmer absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/85 px-2 py-1 text-xs font-semibold text-slate-800 backdrop-blur dark:bg-slate-900/70 dark:text-slate-100">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                    {p.label}
                  </div>
                </div>
                <div className="space-y-3 p-5">
                  <h4 className="text-lg font-bold">{p.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    {p.live && (
                      <Button asChild size="sm" className="bg-gradient-to-r from-cyan-500 to-indigo-600">
                        <a href={p.live} target="_blank" rel="noopener noreferrer">
                          <Globe className="mr-2 h-4 w-4" /> Live
                        </a>
                      </Button>
                    )}
                    {p.code && (
                      <Button asChild size="sm" variant="outline">
                        <a href={p.code} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style jsx>{`
        .shimmer {
          background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.4) 20%, transparent 40%);
          transform: translateX(-100%);
          animation: sweep 1.8s ease-out infinite;
        }
        @keyframes sweep {
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  )
}
