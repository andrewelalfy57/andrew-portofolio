"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, Download, Moon, Sun } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/site/magnetic";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      let current = "#home";
      for (const item of navItems) {
        const sec = document.querySelector(item.href) as HTMLElement | null;
        if (!sec) continue;
        const top = sec.offsetTop - 140;
        if (window.scrollY >= top) current = item.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all",
        scrolled
          ? "backdrop-blur-xl bg-white/70 dark:bg-[#0a0e27]/70 border-b border-slate-200/60 dark:border-slate-700/60 py-2"
          : "bg-transparent py-4"
      )}
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6"
        aria-label="Primary"
      >
        <Link
          href="#home"
          className="group inline-flex items-center gap-2"
          aria-label="Go to home"
        >
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
            Andrew.
          </span>
          <span className="sr-only">{"Andrew Ayman Alfy"}</span>
        </Link>

        <ul className="relative hidden items-center gap-2 rounded-full border border-slate-200/60 bg-white/60 p-1.5 backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/40 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href} className="relative">
                <Magnetic strength={0.3}>
                  <a
                    href={item.href}
                    className={cn(
                      "relative z-10 block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                      isActive
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-300"
                    )}
                  >
                    {item.label}
                  </a>
                </Magnetic>
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full bg-slate-900/5 dark:bg-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle
            lightIcon={<Sun className="h-4 w-4" />}
            darkIcon={<Moon className="h-4 w-4" />}
            label="Toggle theme"
          />
          <Button
            asChild
            className="hidden sm:inline-flex bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500"
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
              <div className="mt-6 flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-2 py-2 text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/60"
                  >
                    {item.label}
                  </a>
                ))}
                <Button
                  asChild
                  className="mt-2 bg-gradient-to-r from-cyan-500 to-indigo-600"
                >
                  <a href="/Andrew_Alfy_Resume.pdf" download>
                    Download CV
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
