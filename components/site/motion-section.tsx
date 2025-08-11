"use client";

import { motion, useInView } from "framer-motion";
import type { PropsWithChildren } from "react";
import { useRef } from "react";

type MotionSectionProps = PropsWithChildren<{
  id: string;
  resetOnExit?: boolean;
}>;

export function MotionSection({
  id,
  children,
  resetOnExit = false,
}: MotionSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });

  const variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  if (resetOnExit) {
    return (
      <motion.section
        id={id}
        ref={sectionRef as any}
        className="relative"
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      id={id}
      className="relative"
      initial={variants.hidden}
      whileInView={variants.visible}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
