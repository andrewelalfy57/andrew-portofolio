"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/site/navbar";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { BackToTop } from "@/components/site/back-to-top";
import { Hero } from "@/components/site/hero";
import { ExperienceTimeline } from "@/components/site/experience-timeline";
import { Skills } from "@/components/site/skills";
import { Projects } from "@/components/site/projects";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { MotionSection } from "@/components/site/motion-section";
import { Education } from "@/components/site/education";
import { Aurora } from "@/components/site/aurora";
import { Splash } from "@/components/site/splash";
import { Marquee } from "@/components/site/marquee";

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const seen = window.sessionStorage.getItem("seenSplash");
    if (seen === "1") {
      setShowSplash(false);
      setIsTransitioning(false);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      showSplash || isTransitioning ? "hidden" : "";
  }, [showSplash, isTransitioning]);

  return (
    <main className="relative min-h-screen text-slate-900 dark:text-slate-100">
      <AnimatePresence onExitComplete={() => setIsTransitioning(false)}>
        {showSplash && (
          <Splash key="splash" onDone={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Exposure overlay for a subtle white-to-content fade after splash */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[65] bg-white dark:bg-[#0a0e27]"
        initial={{ opacity: 0 }}
        animate={showSplash ? { opacity: 0 } : { opacity: 0 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        key="content"
        className="relative z-10"
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={
          showSplash
            ? { opacity: 0 }
            : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <ScrollProgress />
        <Aurora />
        <Navbar />
        <MotionSection id="home">
          <Hero />
        </MotionSection>
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Marquee />
        </div>
        <MotionSection id="experience" resetOnExit>
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
      </motion.div>

      <BackToTop />
    </main>
  );
}
