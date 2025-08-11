"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SplashProps = { onDone: () => void };

export function Splash({ onDone }: SplashProps) {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useMemo(
    () =>
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false,
    []
  );

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(
      () => {
        window.sessionStorage.setItem("seenSplash", "1");
        onDone();
      },
      prefersReduced ? 400 : 2300
    );
    return () => clearTimeout(t);
  }, [onDone, prefersReduced]);

  if (!mounted) return null;
  const name = "Andrew Ayman Alfy";
  const chars = name.split("");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.015, filter: "blur(5px)" }}
        transition={{
          duration: prefersReduced ? 0.2 : 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="fixed inset-0 z-[70] grid place-items-center bg-white dark:bg-[#0a0e27]"
        role="dialog"
        aria-label="Intro"
      >
        <div className="relative">
          <motion.div
            className="pointer-events-none absolute -inset-24 opacity-60 blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: prefersReduced ? 0.2 : 0.6 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          >
            {/* Cyan + Indigo ambient */}
            <div className="h-full w-full bg-[radial-gradient(40%_60%_at_20%_10%,rgba(34,211,238,0.55),transparent_60%),radial-gradient(35%_55%_at_80%_20%,rgba(99,102,241,0.5),transparent_60%),radial-gradient(40%_60%_at_30%_90%,rgba(14,165,233,0.45),transparent_60%)]" />
          </motion.div>

          <h1 className="relative text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            <span className="sr-only">{name}</span>
            <motion.span
              className="inline-flex flex-wrap gap-1"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: prefersReduced ? 0 : 0.06 },
                },
              }}
            >
              {chars.map((c, i) => (
                <motion.span
                  key={i + c}
                  className="bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent"
                  variants={{
                    hidden: { opacity: 0, y: "0.5em" },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {c === " " ? "\u00A0" : c}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          <button
            onClick={() => {
              window.sessionStorage.setItem("seenSplash", "1");
              onDone();
            }}
            className="absolute -bottom-10 right-0 rounded-full border border-slate-200/60 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50 dark:border-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-800/60"
            aria-label="Skip intro"
          >
            Skip
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
