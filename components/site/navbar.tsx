"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Menu, Download, Moon, Sun } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>("#home")

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)

      // Active section detection
      const sections = navItems.map((n) => document.querySelector(n.href) as HTMLElement | null)
      let current = "#home"
      sections.forEach((sec) => {
        if (!sec) return
        const top = sec.offsetTop - 120
        if (window.scrollY >= top) current = `#${sec.id}`
      })
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all",
        scrolled
          ? "backdrop-blur-xl bg-white/70 dark:bg-[#0a0e27]/70 border-b border-slate-200/60 dark:border-slate-700/60 py-2"
          : "bg-transparent py-4",
      )}
      role="banner"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6" aria-label="Primary">
        <Link href="#home" className="group inline-flex items-center gap-2" aria-label="Go to home">
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-sky-400 to-pink-400 bg-clip-text text-transparent">
            Andrew.
          </span>
          <span className="sr-only">{"Andrew Ayman Alfy"}</span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "relative text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:text-cyan-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded",
                  active === item.href && "text-cyan-500",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-pink-400 transition-all",
                    active === item.href ? "w-full" : "group-hover:w-full",
                  )}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle
            lightIcon={<Sun className="h-4 w-4" />}
            darkIcon={<Moon className="h-4 w-4" />}
            label="Toggle theme"
          />
          <Button
            asChild
            className="hidden sm:inline-flex bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400"
          >
            <a href="/Andrew_Alfy_Resume.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="mt-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-base font-medium text-slate-700 dark:text-slate-200"
                  >
                    {item.label}
                  </a>
                ))}
                <Button asChild className="bg-gradient-to-r from-cyan-500 to-pink-500">
                  <a href="/Andrew_Alfy_Resume.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
