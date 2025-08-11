"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/site/navbar"
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
import { Aurora } from "@/components/site/aurora"
import { Splash } from "@/components/site/splash"

export default function Page() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    const seen = window.sessionStorage.getItem("seenSplash")
    if (seen === "1") setShowSplash(false)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showSplash ? "hidden" : ""
  }, [showSplash])

  return (
    <main className="relative min-h-screen text-slate-900 dark:text-slate-100">
      {showSplash && <Splash onDone={() => setShowSplash(false)} />}
      <ScrollProgress />
      <Aurora />
      <div className="relative z-10">
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
      </div>
      <BackToTop />
    </main>
  )
}
