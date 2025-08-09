"use client"

import { useEffect, useRef } from "react"
import { Navbar } from "@/components/site/navbar"
import { BackgroundOrbs } from "@/components/site/background-orbs"
import { ScrollProgress } from "@/components/site/scroll-progress"
import { BackToTop } from "@/components/site/back-to-top"
import { Hero } from "@/components/site/hero"
import { ExperienceTimeline } from "@/components/site/experience-timeline"
import { Skills } from "@/components/site/skills"
import { Projects } from "@/components/site/projects"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/footer"
import { MotionSection } from "@/components/site/motion-section"
import { Education } from "@/components/site/education"

export default function Page() {
  // Smooth scroll behavior on client
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
  }, [])

  // Reduce motion preference
  const prefersReducedMotion = useRef(false)
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  return (
    <main className="relative min-h-screen bg-white text-slate-900 dark:bg-[#0a0e27] dark:text-slate-100">
      <ScrollProgress />
      <BackgroundOrbs />
      <Navbar />
      <MotionSection id="home">
        <Hero />
      </MotionSection>
      <MotionSection id="experience">
        <ExperienceTimeline />
      </MotionSection>
      <MotionSection id="education">
        <Education />
      </MotionSection>
      <MotionSection id="skills">
        <Skills />
      </MotionSection>
      <MotionSection id="projects">
        <Projects />
      </MotionSection>
      <MotionSection id="contact">
        <Contact />
      </MotionSection>
      <Footer />
      <BackToTop />
    </main>
  )
}
