"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react"

export function Contact() {
  return (
    <section className="relative bg-white/90 py-20 backdrop-blur-[1px] dark:bg-[#0a0e27]/90">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <header className="mb-14 text-center">
          <h3 className="bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
            Contact
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Open to collaborations, roles, and exciting challenges worldwide.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-slate-200/60 bg-white/85 p-6 shadow-xl ring-1 ring-transparent transition-all hover:-translate-y-1 hover:ring-cyan-300/40 dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:ring-indigo-800/40">
            <Mail className="mb-3 h-8 w-8 text-cyan-500" />
            <h4 className="mb-1 text-base font-semibold">Email</h4>
            <a className="text-slate-600 hover:text-cyan-500 dark:text-slate-300" href="mailto:andrew78041@gmail.com">
              andrew78041@gmail.com
            </a>
          </Card>
          <Card className="border-slate-200/60 bg-white/85 p-6 shadow-xl ring-1 ring-transparent transition-all hover:-translate-y-1 hover:ring-indigo-300/40 dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:ring-indigo-800/40">
            <Phone className="mb-3 h-8 w-8 text-indigo-600" />
            <h4 className="mb-1 text-base font-semibold">Phone</h4>
            <a className="text-slate-600 dark:text-slate-300" href="tel:+971501982257">
              +971 50 198 2257
            </a>
          </Card>
          <Card className="border-slate-200/60 bg-white/85 p-6 shadow-xl ring-1 ring-transparent transition-all hover:-translate-y-1 hover:ring-cyan-300/40 dark:border-slate-700/60 dark:bg-slate-900/60 dark:hover:ring-indigo-800/40">
            <MapPin className="mb-3 h-8 w-8 text-cyan-500" />
            <h4 className="mb-1 text-base font-semibold">Location</h4>
            <p className="text-slate-600 dark:text-slate-300">Dubai, UAE • Open to remote</p>
          </Card>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <Button variant="outline" asChild>
            <a href="https://github.com/andrewelalfy57" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://linkedin.com/in/andrew-alalfy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
