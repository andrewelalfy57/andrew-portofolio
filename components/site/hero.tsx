"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Mail } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 pt-36 md:grid-cols-2 md:px-6 lg:gap-16 lg:pt-40">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          <span aria-hidden="true">🚀</span> Available for new opportunities
        </div>
        <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {"Andrew Ayman Alfy"}
        </h1>
        <h2 className="text-xl font-medium text-slate-600 dark:text-slate-300 sm:text-2xl">
          Software Engineer & Full-Stack Developer
        </h2>
        <p className="max-w-xl text-slate-600 dark:text-slate-300">
          Transforming ideas into elegant digital solutions. Specializing in enterprise applications, cloud
          architecture, and innovative AR experiences. Based in Dubai, working globally.
        </p>

        <motion.div
          className="flex flex-wrap gap-8 pt-2"
          initial="hidden"
          animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
        >
          {[
            { num: "5+", label: "Years Experience" },
            { num: "20+", label: "Projects Delivered" },
            { num: "10K+", label: "Users Impacted" },
          ].map((s) => (
            <motion.div key={s.label} variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
              <div className="bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-4xl font-extrabold text-transparent">
                {s.num}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500"
          >
            <a href="#contact">
              Let&apos;s build something amazing
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#projects">Explore my work</a>
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 text-sm text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800/70">
            <MapPin className="h-3.5 w-3.5 text-indigo-600" /> Dubai, UAE
          </span>
          <a
            href="mailto:andrew78041@gmail.com"
            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 hover:text-cyan-500 dark:bg-slate-800/70"
          >
            <Mail className="h-3.5 w-3.5 text-cyan-500" /> andrew78041@gmail.com
          </a>
        </div>
      </motion.div>

      {/* Static portrait (no rotation/tilt) */}
      <div className="relative mx-auto w-full max-w-md">
        <div className="relative rounded-3xl p-[2px]">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500 to-indigo-600" aria-hidden />
          <div className="relative rounded-[22px] bg-white/85 p-1 shadow-2xl backdrop-blur dark:bg-slate-900/60">
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
    </div>
  )
}
