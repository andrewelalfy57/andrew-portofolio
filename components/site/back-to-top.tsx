"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-6 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 shadow-xl",
        "transition-all hover:from-cyan-400 hover:to-pink-400",
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-6",
      )}
      size="icon"
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5 text-white" />
    </Button>
  )
}
