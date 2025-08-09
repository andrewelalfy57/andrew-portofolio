"use client"

import { motion } from "framer-motion"
import type { PropsWithChildren } from "react"

type MotionSectionProps = PropsWithChildren<{ id: string }>

export function MotionSection({ id, children }: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      className="relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  )
}
