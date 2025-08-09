"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-36 md:grid-cols-2 md:px-6 lg:gap-16 lg:pt-40">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <span aria-hidden="true">🚀</span> Available for new opportunities
        </motion.div>
        <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {"Andrew Ayman Alfy"}
        </h1>
        <h2 className="text-xl font-medium text-slate-600 dark:text-slate-300 sm:text-2xl">
          Software Engineer & Full-Stack Developer • Dubai, UAE
        </h2>
        <p className="max-w-xl text-slate-600 dark:text-slate-300">
          Transforming ideas into elegant digital solutions. Specializing in enterprise applications, cloud
          architecture, and innovative AR experiences. Based in Dubai, working globally.
        </p>

        <motion.div
          className="flex flex-wrap gap-8 pt-2"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          {[
            { num: "5+", label: "Years Experience" },
            { num: "20+", label: "Projects Delivered" },
            { num: "10K+", label: "Users Impacted" },
          ].map((s) => (
            <motion.div key={s.label} variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
              <div className="bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent">
                {s.num}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400">
            <a href="#contact">
              Let&apos;s build something amazing
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#projects">Explore my work</a>
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="relative mx-auto w-full max-w-md"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        <div className="relative rounded-[28px] p-1">
          <div className="morphing-card relative overflow-hidden rounded-[24px] p-[6px]">
            <div className="rounded-[18px] bg-white/70 p-1 shadow-2xl backdrop-blur dark:bg-slate-900/60">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                <Image
                  src="/images/andrew-portrait.jpg"
                  alt="A person seated outdoors with a pyramid in the background."
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 420px, 90vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-6 -top-6 hidden select-none sm:block">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800 shadow-lg backdrop-blur dark:bg-slate-900/60 dark:text-slate-100">
            <Rocket className="h-3.5 w-3.5 text-cyan-500" /> Full-Stack • Cloud • AR
          </span>
        </div>

        <style jsx>{`
          .morphing-card {
            background: conic-gradient(from 180deg at 50% 50%, #06b6d4, #ec4899, #a78bfa, #06b6d4);
            animation: spin 8s linear infinite, morph 10s ease-in-out infinite;
            filter: drop-shadow(0 25px 60px rgba(0,0,0,0.25));
          }
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes morph {
            0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
            50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
          }
        `}</style>
      </motion.div>
    </div>
  )
}
