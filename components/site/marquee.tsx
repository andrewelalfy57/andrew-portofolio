"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type MarqueeProps = {
  text?: string;
  speed?: number; // seconds per loop
};

export function Marquee({
  text = "Available for new opportunities — Let’s collaborate — Contact me",
  speed = 18,
}: MarqueeProps) {
  const prefersReduced = useMemo(
    () =>
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false,
    []
  );

  const content = Array.from({ length: 8 }).map((_, i) => (
    <span
      key={i}
      className="mx-6 whitespace-nowrap font-semibold tracking-tight"
    >
      {text}
    </span>
  ));

  return (
    <div className="relative isolate overflow-hidden py-4">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient from-cyan-500 to-indigo-600 "
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient from-cyan-500 to-indigo-600 "
        aria-hidden
      />
      <div className="[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        {prefersReduced ? (
          <div className="flex items-center bg-gradient from-cyan-500 to-indigo-600">
            {content}
          </div>
        ) : (
          <motion.div
            className="flex items-center from-cyan-500 to-indigo-600"
            animate={{ x: [0, -800] }}
            transition={{ duration: speed, ease: "linear", repeat: Infinity }}
          >
            {content}
            {content}
          </motion.div>
        )}
      </div>
    </div>
  );
}
