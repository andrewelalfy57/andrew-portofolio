"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

type ThemeToggleProps = {
  lightIcon?: React.ReactNode
  darkIcon?: React.ReactNode
  label?: string
}
export function ThemeToggle({ lightIcon, darkIcon, label = "Toggle theme" }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const dark = stored ? stored === "dark" : prefersDark
    applyTheme(dark)
  }, [])

  const applyTheme = (dark: boolean) => {
    setIsDark(dark)
    const root = document.documentElement
    if (dark) {
      root.classList.add("dark")
      root.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.remove("dark")
      root.setAttribute("data-theme", "light")
      localStorage.setItem("theme", "light")
    }
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" aria-label={label}>
        {lightIcon}
      </Button>
    )
  }

  return (
    <Button variant="outline" size="icon" onClick={() => applyTheme(!isDark)} aria-label={label} title={label}>
      {isDark ? darkIcon : lightIcon}
    </Button>
  )
}
